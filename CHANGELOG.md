# Changelog / 変更履歴

## 1.1.5

- Separate consecutive tables with paragraph spacing in Reading view and the VS Code preview. / 表が続く箇所に段落と同じ余白を入れました（閲覧モード・VS Codeプレビュー）。
- Keep the compact spacing after H3 headings in PDF export. / PDF書き出しでもH3直後の余白をコンパクトに保ちます。
- Apply the same compact spacing after H4 headings in Reading, Live Preview, and PDF. / H4直後もH3と同じコンパクトな余白にしました（閲覧・ライブプレビュー・PDF）。

## 1.1.4

- Restore compact spacing after H3 headings without negative margins or table overlap. / H3直後をコンパクトに戻し、負の余白を使わず表の重なりを防ぎました。
- Add 6px before H2 headings in Reading and Live Preview, including adjacent headings. / 閲覧・ライブプレビューでH2の前を6px広げ、見出しが続く箇所にも反映しました。

## 1.1.3

- Add paragraph spacing around fenced code blocks inside lists in Reading view. / 閲覧モードのリスト内コードブロックに上下の段落間隔を確保しました。
- Preserve chapter spacing after callouts when earlier headings are outside Obsidian's rendered viewport. / 長いノートで前の見出しが描画対象外になっても、コールアウト後の章間余白を維持します。

## 1.1.2

- Add breathing room to body text, paragraphs, lists, heading banners, tables, callouts, and properties in Reading and Live Preview. / 閲覧・ライブプレビューの本文行間、段落、リスト、見出し帯、表、コールアウト、プロパティの余白を少し広げました。
- Restore normal spacing after H3 headings and remove the matching negative-spacing corrections from Live Preview. / H3直後を通常の段落間隔へ戻し、ライブプレビュー側の詰める補正も整理しました。

## 1.1.1

- Match heading spacing after callouts to paragraphs and tables in Reading and Live Preview, while keeping the opening H1 and adjacent headings compact. / 閲覧・ライブプレビューでコールアウト後の見出し余白を本文・テーブル後と統一し、冒頭のH1と見出しが連続する箇所はコンパクトに保ちます。

## 1.1.0

- Add a readable property card with clear labels, body-size values, and full descriptions in both Reading and Live Preview. / 閲覧・編集のプロパティを読みやすいカード表示に統一し、項目名を明確に、値を本文サイズで、長い説明文を省略せず表示します。
- Align the space after properties in both modes; hidden YAML no longer adds a chapter gap. / プロパティ後の余白を両モードで揃え、非表示YAMLに章間余白が加わる問題を修正しました。
- Use 64px before H1 chapter transitions while keeping introductory content and adjacent headings compact. / H1の章区切りは64pxとし、冒頭や見出しが続く箇所はコンパクトに保ちます。
- In PDF export, the first body H1 does not force a page break; the second and subsequent body H1 headings start a new page. The optional filename title does not count as a body H1. / PDFでは本文の最初のH1で強制改ページせず、2つ目以降のH1で改ページします。ファイル名タイトルは本文のH1として数えません。
- Refresh README screenshots and add reusable property and meeting samples. / READMEのスクリーンショットを更新し、プロパティ・会議資料のサンプルを追加しました。
