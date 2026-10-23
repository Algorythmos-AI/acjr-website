// Internal link check for every built page: href, src, srcset, og:url and og:image,
// including absolute URLs on the site's own origin (canonical, hreflang) and #fragments.
// Runs on all three builds. External URLs are collected for the weekly external check.
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, posix } from 'node:path';

const builds = ['dist', 'dist-drafts', 'dist-fixtures'].filter((d) => existsSync(d));
// The canonical link of the home page gives the configured site origin.
const origin = new URL(readFileSync('dist/fr/index.html', 'utf8').match(/<link rel="canonical" href="([^"]+)"/)[1]).origin;

const problems = [];
const external = new Set();
const idCache = new Map();
let checked = 0;

const ids = (file) => {
  if (!idCache.has(file)) idCache.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\s(?:id|name)="([^"]+)"/g)].map((m) => m[1])));
  return idCache.get(file);
};

function resolveFile(build, pathname) {
  const clean = decodeURIComponent(pathname);
  for (const candidate of [clean, posix.join(clean, 'index.html')]) {
    const file = join(build, candidate);
    if (existsSync(file) && statSync(file).isFile()) return file;
  }
  return null;
}

function check(build, file) {
  const html = readFileSync(file, 'utf8');
  const pagePath = '/' + file.slice(build.length + 1).replace(/index\.html$/, '');
  const urls = [
    ...[...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
    ...[...html.matchAll(/<meta property="og:(?:url|image)" content="([^"]+)"/g)].map((m) => m[1]),
  ];
  for (const raw of urls) {
    const value = raw.replaceAll('&amp;', '&');
    if (/^(mailto|tel|data|javascript):/i.test(value)) continue;
    const url = new URL(value, origin + pagePath);
    if (url.origin !== origin) {
      external.add(url.href);
      continue;
    }
    checked++;
    const target = url.pathname === pagePath && value.startsWith('#') ? file : resolveFile(build, url.pathname);
    if (!target) problems.push(`${file}: broken link ${value}`);
    else if (url.hash && !ids(target).has(decodeURIComponent(url.hash.slice(1)))) problems.push(`${file}: missing anchor ${value}`);
  }
}

function walk(build, dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(build, path);
    else if (name.endsWith('.html')) check(build, path);
  }
}
for (const build of builds) walk(build, build);

mkdirSync('test-results', { recursive: true });
writeFileSync('test-results/external-links.json', JSON.stringify([...external].sort(), null, 2));
if (problems.length) {
  console.error([...new Set(problems)].map((p) => `✘ ${p}`).join('\n'));
  process.exit(1);
}
console.log(`✔ ${checked} internal links and anchors OK in ${builds.join(', ')} (${external.size} external URLs listed)`);
