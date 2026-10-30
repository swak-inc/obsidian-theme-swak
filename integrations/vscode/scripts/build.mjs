import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
await mkdir(dist, { recursive: true });
const theme = await readFile(new URL('../../theme.css', root), 'utf8');

// 配色・アイコンの正本はObsidian用theme.css。プレビューのDOM名だけ合わせる。
const previewTheme = theme
  .replaceAll('.markdown-rendered', '.markdown-body')
  .replaceAll('.theme-dark', ':is(.vscode-dark, .vscode-high-contrast)')
  .replaceAll('.theme-light', ':is(.vscode-light, .vscode-high-contrast-light)')
  .replace(/\bdetails(?=[\s[.{:])/g, 'details:not(.callout)');
await writeFile(new URL('theme.css', dist), previewTheme);

const icons = {};
for (const match of theme.matchAll(/([^{}]+)\{[^{}]*--callout-icon:\s*([^;]+);[^{}]*\}/g)) {
  const [, selector, value] = match;
  let svg;
  if (value.startsWith('lucide-')) {
    svg = await readFile(new URL(`node_modules/lucide-static/icons/${value.trim().slice(7)}.svg`, root), 'utf8');
  } else if (value.trim().startsWith("'<svg")) {
    svg = value.trim().slice(1, -1);
  } else {
    throw new Error(`未対応のコールアウトアイコン: ${value}`);
  }
  for (const type of selector.matchAll(/data-callout="([a-z-]+)"/g)) icons[type[1]] = svg;
}
await writeFile(new URL('icons.json', dist), JSON.stringify(icons, null, 2) + '\n');

await build({
  absWorkingDir: fileURLToPath(root),
  entryPoints: ['src/extension.cjs'],
  outfile: 'dist/extension.cjs',
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'cjs',
  legalComments: 'eof'
});

await copyFile(new URL('../../LICENSE', root), new URL('LICENSE', root));
const notices = [];
for (const [name, license] of [
  ['markdown-it-obsidian-callouts', 'LICENSE'],
  ['markdown-it-mark', 'LICENSE'],
  ['markdown-it-task-lists', 'LICENSE'],
  ['lucide-static', 'LICENSE']
]) {
  notices.push(`${name}\n${await readFile(new URL(`node_modules/${name}/${license}`, root), 'utf8')}`);
}
await writeFile(new URL('THIRD-PARTY-NOTICES.txt', dist), notices.join('\n\n---\n\n'));
