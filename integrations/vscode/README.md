# Swak Markdown Preview

Antigravity IDE / VS Codeの**標準Markdownプレビュー**で、Swakの見出し・表・引用・リスト・文字装飾を表示するローカル拡張です。ライト／ダークはIDEのテーマに追従します。

- Obsidian形式のコールアウト13種類、ネスト、`[!type]+` / `[!type]-` の折りたたみ
- Swakで指定したLucideアイコン
- `==ハイライト==`、`***赤太字***`、`==***赤太字＋ハイライト***==`
- 番号付き／番号なしのタスクチェックボックス（プレビュー内は閲覧専用）

IDE全体の配色、ソースエディター、Office Viewerには適用しません。Obsidian専用のノート埋め込み・内部リンク解決は追加していません。数式はIDE標準のMarkdown数式拡張に任せます。

## Build and install / ビルドと導入

このディレクトリで実行します。

```sh
npm ci --ignore-scripts
npm run build
npm test
npm run package
antigravity-ide --install-extension dist/swak-markdown-preview.vsix
```

VS Codeでは最後のコマンドを `code --install-extension ...` に置き換えます。

Markdownのプレビューを既定にする場合は、ユーザー設定の既存の `workbench.editorAssociations` に以下を設定します。他の拡張子の設定は保持してください。

```json
"*.md": "vscode.markdown.preview.editor"
```

ソースを編集するときは「エディターを再度開く → テキスト エディター」を選びます。Office Viewerへ戻す場合は同じ関連付けを `cweijan.markdownViewer` に変更します。拡張を無効にすると標準プレビューの装飾に戻ります。

## Maintenance / 更新

配色とカスタムアイコンの正本はルートの [`theme.css`](../../theme.css) です。ビルド時にDOMセレクターを標準プレビュー向けへ置き換え、必要なアイコンを取り込みます。[`media/preview.css`](media/preview.css) はObsidian本体が提供している基礎レイアウトを補います。

テーマを変更したら、再ビルド・検証・VSIX再インストールが必要です。生成物は `dist/` に置き、Gitには含めません。ネットワーク通信や利用状況の収集は行いません。

表示確認用の公開サンプル: [日本語サンプル](../../ui-sample-ja.md) / [全装飾リファレンス](../../ui-reference.md)
