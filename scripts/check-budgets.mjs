// Performance and robustness budgets on the production build (dist/), checked on every page:
// - HTML ≤ 60 KB gzipped (CSS is inlined, so this caps CSS too);
// - our own JavaScript ≤ 6 KB gzipped, counting inline scripts and the /_astro/ modules a page loads
//   with their static imports (Pagefind is lazy-loaded on demand and excluded);
// - each inline illustration (svg.illo) ≤ 3 KB of markup, and at most two per page;
// - no `animation` shorthand that carries a scroll timeline: the minifier can fold
//   `animation-timeline: view()` into the shorthand, which browsers reject, so the effect silently dies.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const LIMITS = { html: 60 * 1024, js: 6 * 1024, illo: 3 * 1024, illosPerPage: 2 };
const dir = 'dist';
if (!existsSync(dir)) {
  console.error('✘ dist/ not found: run the build first, from the project root');
  process.exit(1);
}
const gz = (text) => gzipSync(text).length;
const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const problems = [];
const timelineInShorthand = /animation:[^;}]*\b(?:view|scroll)\(/;
let pages = 0;
let maxHtml = 0;
let maxJs = 0;

/** A module and everything it imports statically, each counted once. */
function moduleTree(file, seen) {
  if (seen.has(file) || !existsSync(file)) return;
  seen.add(file);
  const code = readFileSync(file, 'utf8');
  for (const [, spec] of code.matchAll(/(?:import|from)\s*["'](\.{1,2}\/[^"']+\.js)["']/g)) moduleTree(join(file, '..', spec), seen);
}

function check(file) {
  const html = readFileSync(file, 'utf8');
  pages++;
  const htmlSize = gz(html);
  maxHtml = Math.max(maxHtml, htmlSize);
  if (htmlSize > LIMITS.html) problems.push(`${file}: HTML is ${kb(htmlSize)} gzipped (max ${kb(LIMITS.html)})`);

  let js = '';
  const modules = new Set();
  for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/application\/ld\+json/.test(attrs)) continue;
    const src = attrs.match(/\bsrc="([^"]+)"/)?.[1];
    if (src?.startsWith('/_astro/')) moduleTree(join(dir, src), modules);
    else if (!src) {
      js += body;
      for (const [, spec] of body.matchAll(/(?:import|from)\s*["'](\/_astro\/[^"']+\.js)["']/g)) moduleTree(join(dir, spec), modules);
    }
  }
  for (const m of modules) js += readFileSync(m, 'utf8');
  const jsSize = js ? gz(js) : 0;
  maxJs = Math.max(maxJs, jsSize);
  if (jsSize > LIMITS.js) problems.push(`${file}: own JavaScript is ${kb(jsSize)} gzipped (max ${kb(LIMITS.js)})`);

  const illos = [...html.matchAll(/<svg[^>]*class="[^"]*\billo\b[^"]*"[\s\S]*?<\/svg>/g)];
  if (illos.length > LIMITS.illosPerPage) problems.push(`${file}: ${illos.length} illustrations (max ${LIMITS.illosPerPage})`);
  for (const [svg] of illos) if (svg.length > LIMITS.illo) problems.push(`${file}: an illustration is ${kb(svg.length)} (max ${kb(LIMITS.illo)})`);

  for (const [, css] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)) {
    const hit = css.match(timelineInShorthand);
    if (hit) problems.push(`${file}: scroll timeline inside an animation shorthand (${hit[0].slice(0, 60)}); write longhands`);
  }
}

function walk(d) {
  for (const name of readdirSync(d)) {
    const path = join(d, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) check(path);
    else if (name.endsWith('.css') && timelineInShorthand.test(readFileSync(path, 'utf8'))) problems.push(`${path}: scroll timeline inside an animation shorthand; write longhands`);
  }
}
walk(dir);

if (pages === 0) problems.push('no HTML pages found');
if (problems.length) {
  console.error([...new Set(problems)].slice(0, 20).map((p) => `✘ ${p}`).join('\n'));
  process.exit(1);
}
console.log(`✔ budgets OK on ${pages} pages (largest HTML ${kb(maxHtml)}, largest own JS ${kb(maxJs)} gzipped)`);
