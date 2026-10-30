# Swak Markdown

Antigravity IDE / VS Codeで、Swakの装飾を使ってMarkdownを直接編集できるローカル拡張です。**ライブプレビュー（編集）・標準プレビュー（閲覧）・ソース**を切り替えられます。ライト／ダークはIDEのテーマに追従します。

- Obsidian形式のコールアウト13種類、ネスト、`[!type]+` / `[!type]-` の折りたたみ
- Swakで指定したLucideアイコン
- `==ハイライト==`、`***赤太字***`、`==***赤太字＋ハイライト***==`
- 番号付き／番号なしのタスクチェックボックス（ライブプレビューではクリックで変更）
- 見出し、表、引用、リスト、太字・斜体・ハイライトの編集とUndo／Redo

## Usage / 使い方

Markdownを開き、右上の鉛筆アイコン「Swak: ライブプレビューで編集」を選ぶと、表示された本文を直接編集できます。上部の「プレビュー」で閲覧用表示、「ソース」でMarkdownの直接編集へ切り替えます。本のアイコン「Swak: プレビューで読む」からも閲覧用表示を開けます。

ライブプレビューでは `⌘S` または「保存」で保存します。`⌘Z`／`⇧⌘Z` または矢印ボタンでUndo／Redoできます。Windowsでは `Ctrl` を使います。表のセル移動は `Tab`／`Shift+Tab` です。

ファイルは通常のMarkdownのままです。変更した段落・リストなどのブロックは標準的な記法へ整形されますが、未変更のブロックは元の記法や空行を保ちます。別の画面から同時更新された場合は、競合した入力を未保存の別タブへ退避します。

Obsidianと同一の編集エンジンではありません。数式・YAML・HTML・Wikiリンク／ノート埋め込みは、ライブプレビューでは元記法を保持して表示します。これらの編集は「ソース」を使ってください。コードブロックは編集できますが、Mermaidの図への変換は追加していません。コールアウトのタイトル欄も元のMarkdown記法で編集します。標準プレビューの数式表示はIDE標準の数式拡張を使います。

IDE全体の配色、ソースエディター、Office Viewerには装飾を適用しません。

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

ライブプレビューを既定にする場合は、ユーザー設定の既存の `workbench.editorAssociations` に以下を設定します。他の拡張子の設定は保持してください。

```json
"*.md": "swak.markdown.live"
```

既存の自動整形拡張による保存時の全文変更を避けるには、既存の `[markdown]` 設定に `"editor.formatOnSave": false` を加えます。保存時の全文整形や外部更新が入ると、ライブプレビュー内のUndo履歴は再構築されます。

## Restore / 元に戻す

`workbench.editorAssociations` の `*.md` を変更するだけで、開き方を戻せます。

| 開き方 | 設定値 |
| --- | --- |
| Swakライブプレビュー | `swak.markdown.live` |
| 標準プレビュー | `vscode.markdown.preview.editor` |
| 通常のテキストエディター | `default` |
| Office Viewer | `cweijan.markdownViewer` |

装飾も外す場合は「Swak Markdown」拡張を無効化します。追加したMarkdown用の `editor.formatOnSave` を削除すれば、従来の自動整形設定を継承します。アプリ本体やMarkdownファイルを作り直す必要はありません。

## Maintenance / 更新

配色とカスタムアイコンの正本はルートの [`theme.css`](../../theme.css) です。ビルド時にDOMセレクターをプレビュー向けへ置き換え、必要なアイコンを取り込みます。[`media/preview.css`](media/preview.css) は共通の基礎レイアウト、[`media/live.css`](media/live.css) は編集画面用の調整です。ライブ編集はProseMirrorとVS CodeのCustom Text Editor APIで実装し、IDE本体は変更していません。

テーマを変更したら、再ビルド・検証・VSIX再インストールとウィンドウの再読み込みが必要です。生成物は `dist/` に置き、Gitには含めません。編集処理はローカルで動き、本文の外部送信や利用状況の収集は行いません。文書に外部画像が含まれる場合は、その画像URLへアクセスします。

表示確認用の公開サンプル: [日本語サンプル](../../ui-sample-ja.md) / [全装飾リファレンス](../../ui-reference.md)
