const { test } = require('node:test');
const assert = require('node:assert/strict');
const { registerLiveEditor } = require('../src/live-provider.cjs');

async function createHost() {
  const uri = path => ({ scheme: 'file', toString: () => path });
  const sent = [], recovered = [], opened = [];
  let change, save, receive, provider;
  const disposable = { dispose() {} };
  const document = {
    uri: uri('/test.md'), version: 1, isDirty: false, text: '元の本文',
    getText() { return this.text; }, positionAt(offset) { return offset; },
    async save() { this.isDirty = false; change({ document: this, contentChanges: [] }); save(this); return true; }
  };
  const vscode = {
    Uri: { joinPath: (base, ...parts) => uri(base + '/' + parts.join('/')) },
    ViewColumn: { Active: 1, Beside: 2 },
    Range: class { constructor(from, to) { this.from = from; this.to = to; } },
    WorkspaceEdit: class { replace(uri, range, text) { Object.assign(this, { uri, range, text }); } },
    workspace: {
      onDidChangeTextDocument(fn) { change = fn; return disposable; },
      onDidSaveTextDocument(fn) { save = fn; return disposable; },
      async applyEdit(edit) {
        document.text = document.text.slice(0, edit.range.from) + edit.text + document.text.slice(edit.range.to);
        document.version++; document.isDirty = true;
        change({ document, contentChanges: [edit] }); return true;
      },
      async openTextDocument(value) { recovered.push(value); return value; }
    },
    window: {
      registerCustomEditorProvider(type, value) { provider = value; return disposable; },
      showTextDocument: async () => {}, showWarningMessage() {}, showErrorMessage() {}
    },
    commands: { registerCommand: () => disposable, executeCommand: async (...args) => opened.push(args) }
  };
  const panel = {
    webview: { cspSource: 'test:', asWebviewUri: value => value, postMessage: async value => sent.push(value), onDidReceiveMessage(fn) { receive = fn; return disposable; } },
    onDidDispose() {}
  };
  registerLiveEditor({ extensionUri: uri('/extension'), subscriptions: [] }, vscode);
  await provider.resolveCustomTextEditor(document, panel);
  const message = async value => { receive(value); await new Promise(resolve => setImmediate(resolve)); };
  return { document, sent, recovered, opened, message, change, vscode };
}

test('編集の応答と保存通知を分離し、保存だけでUndo用の文書を再読込しない', async () => {
  const host = await createHost();
  await host.message({ type: 'ready' });
  await host.message({ type: 'edit', text: '更新した本文😀', version: 1 });
  await host.message({ type: 'action', action: 'save' });
  assert.equal(host.document.text, '更新した本文😀');
  assert.deepEqual(host.sent.map(item => item.type), ['document', 'ack', 'saved']);
  assert.equal(host.sent[1].version, 2);
  assert.equal(host.document.isDirty, false);
});

test('外部変更と古い編集が競合しても上書きせず、最新の編集内容を別タブに保持する', async () => {
  const host = await createHost();
  host.document.text = '外部の編集'; host.document.version++;
  host.change({ document: host.document, contentChanges: [{}] });
  await host.message({ type: 'edit', text: '古い送信内容', version: 1 });
  assert.equal(host.document.text, '外部の編集');
  assert.deepEqual(host.sent.map(item => item.type), ['document', 'conflict']);
  await host.message({ type: 'recover', text: '送信後も入力していた最新の本文' });
  assert.equal(host.recovered[0].content, '送信後も入力していた最新の本文');
});

test('反映失敗を報告し、表示切替では同じ文書を指定したエディターで開く', async () => {
  const host = await createHost();
  host.vscode.workspace.applyEdit = async () => false;
  await host.message({ type: 'edit', text: '更新した本文', version: 1 });
  assert.equal(host.sent[0].type, 'error');
  assert.equal(host.document.text, '元の本文');
  await host.message({ type: 'action', action: 'preview' });
  await host.message({ type: 'action', action: 'source' });
  assert.equal(host.opened[0][2], 'vscode.markdown.preview.editor');
  assert.equal(host.opened[1][2], 'default');
});
