// Lighthouse (mobile profile) on the key templates; every category must score >= 95.
// Performance is noisy under simulated throttling, so each page gets up to two runs. A page passes
// only if one run meets the bar in every category; scores from different runs are never mixed.
import { spawn, execFile } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { promisify } from 'node:util';

const run = promisify(execFile);
const MIN = 95;
// [build, path, categories to ignore]. Draft articles are deliberately noindex, so SEO is not scored there.
const pages = [
  ['dist', '/fr/', []],
  ['dist', '/en/about/', []],
  ['dist', '/ar/contact/', []],
  ['dist-drafts', '/fr/actualites/nouveaux-statuts/', ['seo']],
];

let chromePath = process.env['CHROME_PATH'];
if (!chromePath) chromePath = (await import('@playwright/test')).chromium.executablePath();

const servers = { dist: 4401, 'dist-drafts': 4402 };
const procs = Object.entries(servers).map(([dir, port]) => spawn('node', ['scripts/serve.mjs', dir, String(port)], { stdio: 'ignore' }));

// Wait until every server answers instead of guessing with a fixed delay.
async function ready(port) {
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch(`http://localhost:${port}/fr/`)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`server on port ${port} did not start`);
}
await Promise.all(Object.values(servers).map(ready));

const out = new URL('../test-results/lighthouse.json', import.meta.url).pathname;
let failed = 0;
try {
  for (const [dir, path, ignore] of pages) {
    let best = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      await run('npx', ['lighthouse', `http://localhost:${servers[dir]}${path}`, '--quiet', '--output=json', `--output-path=${out}`,
        '--chrome-flags=--headless=new --no-sandbox'], { env: { ...process.env, CHROME_PATH: chromePath }, maxBuffer: 1 << 26 });
      const report = JSON.parse(readFileSync(out, 'utf8'));
      const scores = Object.fromEntries(
        Object.values(report.categories).filter((c) => !ignore.includes(c.id)).map((c) => [c.id, Math.round(c.score * 100)]),
      );
      // Keep the better run as a whole: the one with the higher lowest score.
      if (!best || Math.min(...Object.values(scores)) > Math.min(...Object.values(best))) best = scores;
      if (Object.values(best).every((v) => v >= MIN)) break;
    }
    const ok = Object.values(best).every((v) => v >= MIN);
    if (!ok) failed++;
    console.log(`${ok ? '✔' : '✘'} ${path} ${Object.entries(best).map(([k, v]) => `${k}=${v}`).join(' ')}`);
  }
} finally {
  for (const p of procs) p.kill();
}
if (failed) {
  console.error(`\n${failed} page(s) below ${MIN}.`);
  process.exit(1);
}
