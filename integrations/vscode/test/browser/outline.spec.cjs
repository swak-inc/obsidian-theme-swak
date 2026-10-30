const { test, expect } = require('@playwright/test');
const { setup } = require('../helpers/browser.cjs');

const filler = Array.from({ length: 16 }, (_, index) => `本文 ${index + 1}。\n`).join('\n');
const source = `# 文書タイトル\n\n## 概要\n\n${filler}\n### 同じ見出し\n\n${filler}\n### 同じ見出し\n\n${filler}\n> [!tip]- 折りたたみ\n> #### 詳細な手順\n> 内容です。\n\n\`\`\`md\n# コード内の見出し\n\`\`\`\n\n${filler}`;

test('右側の目次に階層と同名の見出しを表示し、文書を変更せず移動する', async ({ page }) => {
  const { host, errors } = await setup(page, source);
  await expect(page.locator('#outline')).toBeVisible();
  const buttons = page.locator('#outline-list button');
  await expect(buttons).toHaveText(['文書タイトル', '概要', '同じ見出し', '同じ見出し', '詳細な手順']);
  const geometry = await page.evaluate(() => ({
    contentRight: document.getElementById('document-content').getBoundingClientRect().right,
    outlineLeft: document.getElementById('outline').getBoundingClientRect().left
  }));
  expect(geometry.outlineLeft).toBeGreaterThanOrEqual(geometry.contentRight);
  await buttons.nth(3).click();
  await page.evaluate(() => window.scrollBy(0, -1));
  await expect(buttons.nth(3)).toHaveAttribute('aria-current', 'location');
  const position = await page.locator('.ProseMirror h3').nth(1).evaluate(element => ({
    heading: element.getBoundingClientRect().top,
    toolbar: document.getElementById('toolbar').getBoundingClientRect().bottom
  }));
  expect(position.heading).toBeGreaterThan(position.toolbar);
  expect(position.heading - position.toolbar).toBeLessThan(30);
  expect(host.document.text).toBe(source);
  expect(host.document.isDirty).toBe(false);
  await buttons.last().click();
  await expect(page.locator('.ProseMirror .callout-content')).toBeVisible();
  expect(host.document.text).toContain('[!tip]-');
  expect(errors).toEqual([]);
});

test('見出しの打鍵・Undoと閲覧切替に追従し、折りたたみ内にも移動できる', async ({ page }) => {
  const { host, errors } = await setup(page, source);
  await page.locator('#outline-list button').nth(1).click();
  await page.keyboard.insertText('更新');
  await expect(page.locator('#outline-list button').nth(1)).toHaveText('更新概要');
  await page.locator('[data-command="undo"]').click();
  await expect(page.locator('#outline-list button').nth(1)).toHaveText('概要');
  await page.getByRole('button', { name: 'プレビュー', exact: true }).click();
  await page.locator('#outline-list button').last().click();
  await expect(page.locator('#preview details')).toHaveAttribute('open', '');
  await expect(page.locator('#outline-list button').last()).toHaveAttribute('aria-current', 'location');
  expect(host.opened).toEqual([]);
  expect(host.document.text).toBe(source);
  expect(errors).toEqual([]);
});

test('スクロールで現在位置を更新し、狭い画面では目次を開閉できる', async ({ page }) => {
  const { host, errors } = await setup(page, source);
  await page.locator('.ProseMirror h3').first().evaluate(element => element.scrollIntoView({ block: 'start' }));
  await expect(page.locator('#outline-list button').nth(2)).toHaveAttribute('aria-current', 'location');
  await page.setViewportSize({ width: 600, height: 720 });
  await expect(page.locator('#outline')).toBeHidden();
  await page.getByRole('button', { name: '目次', exact: true }).click();
  await expect(page.locator('#outline')).toBeVisible();
  await page.locator('#outline-list button').first().click();
  await expect(page.locator('#outline')).toBeHidden();
  const width = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth }));
  expect(width.page).toBeLessThanOrEqual(width.viewport);
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(page.locator('#outline')).toBeVisible();
  await page.getByRole('button', { name: '目次を閉じる', exact: true }).click();
  await expect(page.locator('#outline')).toBeHidden();
  expect(host.document.text).toBe(source);
  expect(errors).toEqual([]);
});

test('見出しがない文書でも編集でき、見出し追加後に目次が現れる', async ({ page }) => {
  const { errors } = await setup(page, '本文です。\n');
  await expect(page.locator('#outline-empty')).toBeVisible();
  await page.locator('.ProseMirror p').click();
  await page.getByRole('button', { name: 'H2', exact: true }).click();
  await expect(page.locator('#outline-list button')).toHaveText(['本文です。']);
  await expect(page.locator('#outline-empty')).toBeHidden();
  expect(errors).toEqual([]);
});

test('見出しレベルの飛び・変更に合わせて親子関係とガイド線を更新する', async ({ page }) => {
  const text = `## 概要\n\n#### 詳細\n\n###### 補足\n\n### 次の項目\n\n## 別の章\n\n${filler}`;
  const { host, errors } = await setup(page, text);
  const roots = page.locator('#outline-list > li > button');
  const children = page.locator('#outline-list > li:first-child > ol > li > button');
  await expect(roots).toHaveText(['概要', '別の章']);
  await expect(children).toHaveText(['詳細', '次の項目']);
  await page.locator('#outline-list button').filter({ hasText: /^補足$/ }).click();
  await expect(page.locator('#outline-list .outline-branch-active')).toHaveCount(2);
  await expect(page.locator('#outline-list ol').first()).toHaveCSS('border-left-width', '1px');
  expect(host.document.text).toBe(text);

  await page.locator('#outline-list button').filter({ hasText: /^詳細$/ }).click();
  await page.getByRole('button', { name: 'H2', exact: true }).click();
  await expect(roots).toHaveText(['概要', '詳細', '別の章']);
  await expect(page.locator('#outline-list > li:nth-child(2) > ol > li > button')).toHaveText(['補足', '次の項目']);
  await page.locator('[data-command="undo"]').click();
  await expect(roots).toHaveText(['概要', '別の章']);
  await expect(children).toHaveText(['詳細', '次の項目']);
  await page.getByRole('button', { name: 'プレビュー', exact: true }).click();
  await expect(roots).toHaveText(['概要', '別の章']);
  await expect(children).toHaveText(['詳細', '次の項目']);
  expect(host.document.text).toBe(text);
  expect(errors).toEqual([]);
});
