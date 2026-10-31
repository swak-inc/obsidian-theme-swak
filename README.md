# Swak — Refined Business Document Theme for Obsidian

[![GitHub release](https://img.shields.io/github/v/release/swak-inc/obsidian-theme-swak?style=flat-square&color=0E3A60)](https://github.com/swak-inc/obsidian-theme-swak/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

![Swak Theme Preview](./screenshot.png?v=1.1.0)

---

## Overview / 概要

**English**

Swak is an executive-level Obsidian theme focused on "Simple is Best" business structural beauty. It delivers disciplined typography and logical visual hierarchy so that strategic proposals, meeting minutes, and knowledge repositories remain distraction-free and instantly comprehensible.

**日本語**

Swakは、「シンプルイズベスト」に徹底してこだわった、ビジネス特化型の構造美を体現するObsidianテーマです。過剰な装飾を排し、端正なタイポグラフィと明確な視覚的階層によって、戦略提案書、議事録、社内ナレッジを直感的かつ瞬時に理解できるドキュメント環境を提供します。

---

## Business Structural Features / ビジネス構造美の特徴

**English**

- **Executive Heading Architecture**: Solid deep navy banners (`#0B3D63`) for H1 chapter shifts, soft-blue filled containers (`#E6EFF7`) for H2 section boundaries, and distinctive rounded square badges (`■`) for H3 action points.
- **High-Contrast Text Emphasis**: Bold statements, italicized parameters, code literals (`inline code`), and strikethroughs are balanced for immediate scanning without visual fatigue.
- **Refined Callouts**: Subtle fills and clear borders distinguish supporting information. Tip uses the Lucide `lightbulb` icon; Danger uses `circle-alert`.
- **Disciplined Business Tables**: Engineered specifically for cost comparisons, matrix evaluations, and project timelines with balanced padding and slate-gray headers.
- **Structured Lists and Quotes**: Bullets and numbers match the body text color. Compact nesting and neutral quote lines keep the spacing balanced around markers and text.
- **Reading and Live Preview Alignment**: Heading spacing, lists, quotes, callouts, and embedded elements stay closely aligned while switching between reading and editing. Properties use one paragraph of space before the body in both modes; hidden YAML does not add a chapter gap.
- **Readable Properties**: A subtle card, distinct labels, and body-size values make metadata easy to scan. Long descriptions remain fully visible.
- **Chapter Spacing and PDF Pagination**: H1 headings following body content use a 64px top gap. In PDF export, the first body H1 does not force a page break; the second and subsequent body H1 headings start a new page. The optional filename title does not count as a body H1.
- **Light and Dark Support**: Calibrated colors for both appearances.

**日本語**

- **明瞭な見出し体系（H1・H2・H3）**: 重厚なネイビーの帯見出し（H1）、淡青のセクション区分（H2）、角丸スクエアバッジ（H3）により、長文でも論理構造が一目で把握できます。
- **視認性に優れた文字強調**: 太字（**重要決定事項**）、斜体（*パラメータ*）、インラインコード（`DATABASE_URL`）、打ち消し線（~~旧要件~~）が端正に調和し、必要な情報を迷いなく識別できます。
- **洗練されたコールアウト**: 淡い背景と明確な枠線で補足情報を整理。推奨（Tip）はLucideの `lightbulb`、危険（Danger）は `circle-alert` を使用します。
- **実務志向の表組み**: 比較表や進捗表の可読性を極限まで高めたテーブルスタイリング。
- **整然としたリストと引用**: 箇条書きの点・数字を本文色に統一。コンパクトなネストとグレー系の引用線で、記号・線と文字の余白を整えます。
- **閲覧・編集の見え方を統一**: リーディングビューとライブプレビューの見出し、リスト、引用、コールアウト、埋め込み要素の余白を近づけています。プロパティから本文までは両モードとも段落1つ分の間隔とし、非表示のYAMLに章間余白を加えません。
- **読みやすいプロパティ**: 控えめな背景と枠、強弱をつけた項目名、本文サイズの値で情報を整理します。長い説明文も省略せず表示します。
- **章の区切りとPDF改ページ**: 本文からH1へ移る上余白は64px。PDFでは本文の最初のH1で強制改ページせず、2つ目以降のH1で改ページします。ファイル名タイトルは本文のH1として数えません。
- **ライト/ダーク両対応**: どちらの環境でも一貫した可読性とトーンを維持します。

### Properties / プロパティ

**English**

Properties use the same card in Reading and Live Preview. Labels and values are aligned, descriptions wrap without truncation, and the native property controls remain available. [Open the sample](./ui-properties.md).

**日本語**

プロパティは閲覧・編集とも同じカード表示です。項目名と値を揃え、説明文は省略せず折り返します。Obsidian標準の値編集・項目追加・折りたたみをそのまま使用できます。[プロパティのサンプル](./ui-properties.md)。

#### Light / ライト

![Properties — Light](./assets/ui-properties-light.png)

#### Dark / ダーク

![Properties — Dark](./assets/ui-properties-dark.png)

### Chapter Spacing & PDF Export / 章の余白とPDFエクスポート

**English**

Screen spacing separates chapters without adding manual blank lines. In PDF export, the first body H1 does not force a page break; the second and subsequent body H1 headings start a new page. This rule applies regardless of what appears before the first H1. The optional filename title does not count as a body H1. Use Obsidian's **Export to PDF** command. [Open the meeting sample](./ui-meeting.md).

| Location | Screen | PDF export |
| --- | --- | --- |
| Properties → body | One paragraph (14px at 14px body text) | Properties follow Obsidian's export behavior |
| First body H1 | Spacing depends on the preceding block | No forced page break |
| Paragraph/list → next H1 | 64px | New page |
| Callout → next H1 | 64px (opening H1 stays compact) | New page |
| Callout → H2–H6 | Same as after a paragraph or table | Keep with following content where possible |
| Consecutive headings | Compact | Keep headings with following content where possible |

See [1.1.0 release notes](./CHANGELOG.md).

**日本語**

画面では手動の空行を増やさず、テーマの余白で章を区切ります。PDFでは**本文の最初のH1で強制改ページせず、2つ目以降のH1で改ページ**します。最初のH1より前に何が書かれているかには依存しません。ファイル名タイトルは本文のH1として数えません。Obsidianの「PDFにエクスポート」を使用してください。[会議資料のサンプル](./ui-meeting.md)。

| 箇所 | 画面 | PDF |
| --- | --- | --- |
| プロパティ→本文 | 段落1つ分（本文14px時は14px） | プロパティの出力はObsidian標準に従う |
| 本文の最初のH1 | 直前の要素に応じた間隔 | 強制改ページなし |
| 本文の段落・リスト→次の章のH1 | 64px | 改ページ |
| コールアウト→次の章のH1 | 64px（冒頭のH1は通常の間隔） | 改ページ |
| コールアウト→H2〜H6 | 本文・テーブル後と同じ間隔 | 後続の内容と同じページになるよう調整 |
| 見出しが続く箇所 | 通常の間隔 | 見出しがページ末尾に孤立しないよう調整 |

[1.1.0の変更履歴](./CHANGELOG.md)。

#### Light / ライト

![Meeting chapter spacing — Light](./assets/ui-meeting-light.png)

#### Dark / ダーク

![Meeting chapter spacing — Dark](./assets/ui-meeting-dark.png)

### Formatting Examples / 記法例

**English**

| Appearance | Markdown |
| :--- | :--- |
| Bold | `**text**` |
| Red bold | `***text***` |
| Highlight | `==text==` |
| Red bold with highlight | `==***text***==` |

For red bold with highlighting, place `***` inside `==`. Use `[!tip]` for recommendations and `[!danger]` for risks or prohibited actions.

**日本語**

| 表示 | Markdown |
| :--- | :--- |
| 太字 | `**text**` |
| 赤太字 | `***text***` |
| ハイライト | `==text==` |
| 赤太字＋ハイライト | `==***text***==` |

赤太字＋ハイライトは、`==` の内側に `***` を置きます。推奨事項は `[!tip]`、危険・禁止事項は `[!danger]` を使用します。

### Callout Colors / コールアウトの配色

**English**

| Color | Purpose | Types |
| :--- | :--- | :--- |
| Blue | Information and routine work | `note`, `abstract`, `info`, `example`, `todo` |
| Green | Recommendations and success | `tip`, `success` |
| Yellow | Caution and review | `question`, `warning` |
| Red | Danger, failure, and bugs | `danger`, `failure`, `bug` |
| Gray | Quotations | `quote` |

**日本語**

| 色 | 用途 | 種類 |
| :--- | :--- | :--- |
| 青 | 情報・通常の作業 | `note`, `abstract`, `info`, `example`, `todo` |
| 緑 | 推奨・成功 | `tip`, `success` |
| 黄色 | 注意・確認 | `question`, `warning` |
| 赤 | 危険・失敗・不具合 | `danger`, `failure`, `bug` |
| グレー | 引用 | `quote` |

---

## Complete UI Reference / 全装飾の表示例

**English**

For Antigravity IDE / VS Code, the separately maintained [Swak Markdown extension](https://github.com/swak-inc/vscode-swak-markdown) adds an editable live preview and styles the built-in Markdown preview.

Seven bilingual reference sheets show the theme in Light and Dark appearances. [Open the complete sample Markdown](./ui-reference.md).

**日本語**

Antigravity IDE / VS Codeでは、専用リポジトリで管理する[Swak Markdown拡張](https://github.com/swak-inc/vscode-swak-markdown)で、直接編集できるライブプレビューと標準プレビューの両方にSwakの装飾を適用できます。

装飾を7分類に分け、ライト・ダーク両方の実画面を英日併記で掲載しています。[全装飾のサンプルMarkdown](./ui-reference.md)。

### 1. Typography / 文字装飾

**English**

H1–H6, bold, italic, red bold, highlights, strikethroughs, links, footnotes, and horizontal rules.

**日本語**

H1–H6、太字、斜体、赤太字、ハイライト、打ち消し線、リンク、脚注、水平線。

#### Light / ライト

![Swak Typography / 文字装飾 — Light](./assets/ui-reference-typography-light.png)

#### Dark / ダーク

![Swak Typography / 文字装飾 — Dark](./assets/ui-reference-typography-dark.png)

### 2. Structure / 表・リスト・引用

**English**

Left-, center-, and right-aligned tables, bullets, numbered lists, checkboxes, and three-level quotes.

**日本語**

表の左・中央・右揃え、箇条書き、番号リスト、チェックボックス、3階層の引用。

#### Light / ライト

![Swak Structure / 表・リスト・引用 — Light](./assets/ui-reference-structure-light.png)

#### Dark / ダーク

![Swak Structure / 表・リスト・引用 — Dark](./assets/ui-reference-structure-dark.png)

### 3. Callouts 1 / 情報・要約・推奨

**English**

Types: `note`, `abstract`, `info`, `example`, `todo`, `tip`, `success`.

**日本語**

種類: `note`, `abstract`, `info`, `example`, `todo`, `tip`, `success`。

#### Light / ライト

![Swak Callouts 1 / 情報・要約・推奨 — Light](./assets/ui-reference-callouts-information-light.png)

#### Dark / ダーク

![Swak Callouts 1 / 情報・要約・推奨 — Dark](./assets/ui-reference-callouts-information-dark.png)

### 4. Callouts 2 / 注意・危険・参照

**English**

Types: `question`, `warning`, `failure`, `danger`, `bug`, `quote`.

**日本語**

種類: `question`, `warning`, `failure`, `danger`, `bug`, `quote`。

#### Light / ライト

![Swak Callouts 2 / 注意・危険・参照 — Light](./assets/ui-reference-callouts-attention-light.png)

#### Dark / ダーク

![Swak Callouts 2 / 注意・危険・参照 — Dark](./assets/ui-reference-callouts-attention-dark.png)

### 5. Callout Layout / 折りたたみ・ネスト

**English**

Title-only, initially expanded or collapsed, and three-level nested callouts, plus callouts with tasks.

**日本語**

本文なし、初期展開・折りたたみ、3階層のネスト、コールアウト内のタスク。

#### Light / ライト

![Swak Callout Layout / 折りたたみ・ネスト — Light](./assets/ui-reference-callouts-layout-light.png)

#### Dark / ダーク

![Swak Callout Layout / 折りたたみ・ネスト — Dark](./assets/ui-reference-callouts-layout-dark.png)

### 6. Code & Diagrams / コード・図・数式

**English**

JavaScript, Mermaid flowcharts, inline math, and block math.

**日本語**

JavaScript、Mermaidフロー図、インライン数式、ブロック数式。

#### Light / ライト

![Swak Code & Diagrams / コード・図・数式 — Light](./assets/ui-reference-code-diagrams-light.png)

#### Dark / ダーク

![Swak Code & Diagrams / コード・図・数式 — Dark](./assets/ui-reference-code-diagrams-dark.png)

### 7. Details & Embeds / 折りたたみ・埋め込み

**English**

Collapsed and expanded HTML details, images, and an [embedded note sample](./ui-embed-sample.md).

**日本語**

HTML detailsの開閉、画像、[ノートの埋め込みサンプル](./ui-embed-sample.md)。

#### Light / ライト

![Swak Details & Embeds / 折りたたみ・埋め込み — Light](./assets/ui-reference-details-embeds-light.png)

#### Dark / ダーク

![Swak Details & Embeds / 折りたたみ・埋め込み — Dark](./assets/ui-reference-details-embeds-dark.png)

---

## Business Document Samples / 業務文書の表示例

### 1. English UI Showcase / 英語UIサンプル集

**English**

An implementation plan with a comparison table, recommendation and danger callouts, task lists, and nested lists and quotes. [Open the English sample](./ui-sample-en.md).

**日本語**

導入計画の英語サンプルです。比較表、推奨・危険のコールアウト、タスクリスト、階層リスト、引用ネストを確認できます。[英語サンプルのMarkdown](./ui-sample-en.md)。

#### Light / ライト

![English UI Sample - Light Mode](./assets/ui-sample-en-light.png?v=1.1.0)

#### Dark / ダーク

![English UI Sample - Dark Mode](./assets/ui-sample-en-dark.png?v=1.1.0)

---

### 2. Japanese UI Showcase / 日本語UIサンプル集

**English**

The same document structure in Japanese, including red bold highlighting and compact nesting. [Open the Japanese sample](./ui-sample-ja.md).

**日本語**

同じ構成の日本語サンプルです。赤太字＋ハイライト、リストと引用のネストも確認できます。[日本語サンプルのMarkdown](./ui-sample-ja.md)。

#### Light / ライト

![Japanese UI Sample - Light Mode](./assets/ui-sample-ja-light.png?v=1.1.0)

#### Dark / ダーク

![Japanese UI Sample - Dark Mode](./assets/ui-sample-ja-dark.png?v=1.1.0)

### 3. Live Preview / ライブプレビュー

**English**

The Japanese sample in Live Preview. Spacing is aligned with Reading view; Markdown markers on the active line and some editor-specific elements can still look different.

**日本語**

日本語サンプルをライブプレビューで表示した例です。閲覧時に近い余白で編集できます。カーソル行のMarkdown記号や、一部のエディター固有要素には表示差が残ります。

![Japanese UI Sample - Live Preview](./assets/ui-sample-ja-live-preview.png?v=1.1.0)

### Screenshot Details / 撮影情報

**English**

Screenshots captured in Obsidian 1.14.5 at 14px body text, using the sample notes and UI reference above.

**日本語**

上記の業務文書・UIリファレンスをObsidian 1.14.5・本文14pxで表示し、実画面を撮影しています。

---

## Installation / インストール方法

### Option 1: Community Themes (Recommended) / コミュニティテーマから（推奨）

**English**

Swak is available in the [Obsidian Community directory](https://community.obsidian.md/themes/swak). Select **Add to Obsidian** on the listing page, or install it from within Obsidian:

1. Open **Settings** in Obsidian (`Cmd + ,` or `Ctrl + ,`).
2. Navigate to **Appearance** -> **Themes** -> **Community themes**.
3. Click **Manage**, search for **Swak**, and click **Use**.

**日本語**

[Obsidian Communityに掲載されています](https://community.obsidian.md/themes/swak)。掲載ページの **Add to Obsidian**、または次の手順でObsidian内から導入できます。

1. Obsidianの「設定」を開きます（`Cmd + ,` または `Ctrl + ,`）。
2. 「外観」 -> 「テーマ」 -> 「コミュニティテーマ」へ進みます。
3. 「管理」をクリックし、**Swak** で検索して「使用」をクリックします。

### Option 2: Manual Installation / 手動インストール

**English**

1. Download `theme.css` and `manifest.json` from the [Latest Release](https://github.com/swak-inc/obsidian-theme-swak/releases/latest).
2. Create a folder named `Swak` under `<Your Vault>/.obsidian/themes/`.
3. Place `theme.css` and `manifest.json` inside `<Your Vault>/.obsidian/themes/Swak/`.
4. In Obsidian, go to **Settings** -> **Appearance** -> **Theme**, and select **Swak**.

**日本語**

1. [最新リリース](https://github.com/swak-inc/obsidian-theme-swak/releases/latest) から `theme.css` と `manifest.json` をダウンロードします。
2. 保管庫の `.obsidian/themes/` 配下に `Swak` フォルダを作成します。
3. `Swak` フォルダ内にダウンロードした2つのファイルを配置します。
4. Obsidianの「設定」 -> 「外観」 -> 「テーマ」から **Swak** を選択します。

---

## About Swak Inc. / 株式会社Swak

**English**

**Swak Inc.**

- Web: [https://swak.jp](https://swak.jp)
- Business: E-commerce Operations / Digital Marketing / Software Development / AI Solutions / Consulting

**日本語**

**株式会社Swak**

- Web: [https://swak.jp](https://swak.jp)
- 事業内容: EC運営 / Webマーケティング / システム開発 / AIソリューション / 各種コンサルティング

---

## License / ライセンス

**English**

Licensed under the [MIT License](./LICENSE).

The embedded `square-text` icon is from [Lucide](https://lucide.dev/icons/square-text) under the ISC License; its notice is included in `theme.css`.

**日本語**

MITライセンスに基づき配布されています。

埋め込みの `square-text` アイコンはLucideのISCライセンスに基づき使用し、ライセンス表記を `theme.css` に含めています。
