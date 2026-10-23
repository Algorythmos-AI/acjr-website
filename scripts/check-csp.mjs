// Fails if any inline <script> or <style> in the built pages is missing from that page's CSP,
// or if the page inlines data: fonts or images that the CSP would block.
// A missing hash means the browser blocks the code; this caught the hand-written `js` class
// script, which ran only because it happened to sit above the CSP <meta>.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const builds = ['dist', 'dist-drafts', 'dist-fixtures'].filter((d) => existsSync(d));
const hash = (text) => `'sha256-${createHash('sha256').update(text).digest('base64')}'`;
const problems = [];
let pages = 0;

function check(file) {
  const html = readFileSync(file, 'utf8');
  pages++;
  const csp = html.match(/<meta http-equiv="content-security-policy" content="([^"]+)"/i)?.[1].replaceAll('&#39;', "'");
  if (!csp) return problems.push(`${file}: no CSP <meta>`);
  const directive = (name) => csp.split(';').map((d) => d.trim()).find((d) => d.startsWith(`${name} `)) ?? '';
  const scriptSrc = directive('script-src');
  const styleSrc = directive('style-src');
  for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=/.test(attrs) || /application\/ld\+json/.test(attrs) || !body) continue;
    if (!scriptSrc.includes(hash(body))) problems.push(`${file}: inline script not in script-src: ${body.slice(0, 60)}`);
  }
  for (const [, body] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)) {
    if (!styleSrc.includes(hash(body))) problems.push(`${file}: inline style not in style-src: ${body.slice(0, 60)}`);
  }
  // Inlined assets must be allowed too: a data: font is blocked unless font-src allows data:.
  if (/url\(\s*["']?data:font/.test(html) && !directive('font-src').includes('data:')) problems.push(`${file}: data: font blocked by font-src`);
  if (/url\(\s*["']?data:image/.test(html) && !directive('img-src').includes('data:')) problems.push(`${file}: data: image blocked by img-src`);
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) check(path);
  }
}
builds.forEach(walk);

if (problems.length) {
  console.error([...new Set(problems)].slice(0, 20).map((p) => `✘ ${p}`).join('\n'));
  process.exit(1);
}
console.log(`✔ every inline script and style is in the CSP (${pages} pages in ${builds.join(', ')})`);
