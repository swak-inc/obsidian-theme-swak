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
