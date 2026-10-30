# Development / 開発

## Build & Verify / ビルド・検証

Run from this directory with Node.js 20 or later. / Node.js 20以上で、このディレクトリから実行します。

```sh
npm ci --ignore-scripts
npm run build
npm test
npx playwright install chromium
npm run test:browser
npm run test:editor
npm run package
```

Install the resulting VSIX locally. / 生成したVSIXをローカルにインストールします。

```sh
antigravity-ide --install-extension dist/swak-markdown-preview.vsix
# VS Code
code --install-extension dist/swak-markdown-preview.vsix
```

Reload the editor window after updating. / 更新後はエディターのウィンドウを再読み込みします。

`test:editor` launches the installed VS Code in a temporary profile and workspace, tests activation, editor commands, tab reuse, and document saving, then removes its temporary files. On macOS it uses `/Applications/Visual Studio Code.app`; set `SWAK_EDITOR_EXECUTABLE` to use another executable. Browser tests separately verify actual webview typing and rendering.

`test:editor` は、一時プロファイルとワークスペースでインストール済みVS Codeを起動し、有効化・編集コマンド・タブ再利用・保存を検証して一時ファイルを片付けます。macOSでは `/Applications/Visual Studio Code.app` を使い、別の実行ファイルは `SWAK_EDITOR_EXECUTABLE` で指定できます。Webview内の実打鍵・描画は別途ブラウザテストで検証します。

## Shared Styling / 共通スタイル

The source of colors and callout icons is [`theme.css`](../../theme.css). The build translates Obsidian selectors for the preview DOM and bundles the icons. [`media/preview.css`](media/preview.css) supplies base preview layout; [`media/live.css`](media/live.css) handles the editor layout.

配色とコールアウトアイコンの正本は [`theme.css`](../../theme.css) です。ビルド時にプレビュー向けのDOMセレクターへ変換し、アイコンを取り込みます。[`media/preview.css`](media/preview.css) がプレビューの基礎レイアウト、[`media/live.css`](media/live.css) が編集画面の調整です。

The editor uses ProseMirror and the VS Code Custom Text Editor API. ProseMirror packages and `orderedmap` resolve to a single ESM entry to avoid mixing incompatible copies of their classes.

編集はProseMirrorとVS Code Custom Text Editor APIで実装しています。ProseMirror各パッケージと `orderedmap` のESMエントリーを統一し、別々のクラスが混在する問題を避けています。

Browser tests load the built assets and provider-generated HTML with an isolated host bridge. They cover typing, Japanese IME, tables, saves, undo/redo, view switching, outline navigation, folding, and resizing.

ブラウザテストは、ビルド済みファイルと本体が生成したHTMLを独立したホスト接続で検証します。打鍵、日本語IME、表、保存、Undo/Redo、表示切替、目次の移動・開閉・幅調整が対象です。

## Screenshots / スクリーンショット

```sh
npm run screenshots
```

The script renders the public sample Markdown using the actual webview assets in isolated Chromium. Light/dark classes and editor color variables reproduce the IDE host inputs. Images capture the content pane, without simulated IDE chrome. The icon is the existing Swak GitHub organization avatar, used unchanged.

公開サンプルのMarkdownを拡張本体のWebview資材で独立したChromiumに描画します。ライト・ダークのクラスと色変数でIDEからの入力を再現し、IDEの外枠を合成せず本文ペインを撮影します。アイコンは既存のSwak GitHub組織アバターを変更せず使用しています。

## Packaging / 配布物

The package command sets explicit content/image base URLs because the extension lives in a repository subdirectory. Push the reviewed README, screenshots, and source to GitHub before uploading the VSIX to Marketplace, so these URLs resolve.

拡張はリポジトリ内のサブディレクトリにあるため、パッケージ作成時にリンク・画像の基準URLを指定しています。MarketplaceへVSIXをアップロードする前に、確認済みのREADME・画像・コードをGitHubへ反映し、リンクを有効にします。

Generated bundles, VSIX files, and copied licenses are ignored by Git. Source, test, and capture scripts are excluded from the VSIX. License notices remain in the distribution.

生成したバンドル・VSIX・コピーしたライセンスはGit追跡対象外です。ソース・テスト・撮影スクリプトはVSIXへ含めず、必要なライセンス表記は配布物に同梱します。
