# Changelog / 変更履歴

## Unreleased / 未公開

- Match heading spacing after callouts to paragraphs and tables in Reading and Live Preview, while keeping the opening H1 and adjacent headings compact. / 閲覧・ライブプレビューでコールアウト後の見出し余白を本文・テーブル後と統一し、冒頭のH1と見出しが連続する箇所はコンパクトに保ちます。

## 1.1.0

- Add a readable property card with clear labels, body-size values, and full descriptions in both Reading and Live Preview. / 閲覧・編集のプロパティを読みやすいカード表示に統一し、項目名を明確に、値を本文サイズで、長い説明文を省略せず表示します。
- Align the space after properties in both modes; hidden YAML no longer adds a chapter gap. / プロパティ後の余白を両モードで揃え、非表示YAMLに章間余白が加わる問題を修正しました。
- Use 64px before H1 chapter transitions while keeping introductory content and adjacent headings compact. / H1の章区切りは64pxとし、冒頭や見出しが続く箇所はコンパクトに保ちます。
- In PDF export, the first body H1 does not force a page break; the second and subsequent body H1 headings start a new page. The optional filename title does not count as a body H1. / PDFでは本文の最初のH1で強制改ページせず、2つ目以降のH1で改ページします。ファイル名タイトルは本文のH1として数えません。
- Refresh README screenshots and add reusable property and meeting samples. / READMEのスクリーンショットを更新し、プロパティ・会議資料のサンプルを追加しました。
