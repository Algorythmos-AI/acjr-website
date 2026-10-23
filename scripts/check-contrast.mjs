// Recomputes WCAG contrast for every foreground/background pair the design relies on.
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const tokens = Object.fromEntries([...css.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));

// [foreground, background, minimum ratio, where it is used]
const pairs = [
  ['ink', 'white', 4.5, 'body text'],
  ['ink', 'grey-50', 4.5, 'text on grey bands'],
  ['ink', 'ochre-50', 4.5, 'text in warning notices'],
  ['grey-600', 'white', 4.5, 'meta text'],
  ['grey-600', 'grey-50', 4.5, 'meta text on grey'],
  ['blue-700', 'white', 4.5, 'links'],
  ['blue-700', 'grey-50', 4.5, 'links on grey'],
  ['blue-800', 'white', 4.5, 'hover links'],
  ['white', 'blue-700', 4.5, 'primary button'],
  ['white', 'blue-800', 4.5, 'primary button hover'],
  ['blue-700', 'blue-50', 4.5, 'ghost button hover, notices'],
  ['navy-900', 'white', 4.5, 'headings'],
  ['white', 'navy-900', 4.5, 'text on navy'],
  ['white', 'charcoal', 4.5, 'footer text'],
  ['link-on-dark', 'charcoal', 4.5, 'footer links'],
  ['link-on-dark', 'navy-900', 4.5, 'links on navy'],
  ['ochre-500', 'navy-900', 3, 'large numerals on navy'],
  ['ochre-500', 'charcoal', 3, 'fact strip numerals'],
  ['ochre-700', 'white', 4.5, 'ochre text on white'],
  ['ochre-700', 'grey-50', 4.5, 'ochre labels on grey cards'],
  ['error', 'white', 4.5, 'form errors'],
  ['success', 'grey-50', 4.5, 'form success'],
];

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

let failed = 0;
for (const [fg, bg, min, use] of pairs) {
  if (!tokens[fg] || !tokens[bg]) {
    console.error(`✘ unknown token in pair ${fg}/${bg}`);
    failed++;
    continue;
  }
  const r = ratio(tokens[fg], tokens[bg]);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? '✔' : '✘'} ${r.toFixed(2)}:1 (min ${min}) ${fg} on ${bg} — ${use}`);
}
if (failed) {
  console.error(`\n${failed} contrast pair(s) failed.`);
  process.exit(1);
}
