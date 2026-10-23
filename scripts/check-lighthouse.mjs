// Lighthouse (mobile profile) on the key templates; every category must score >= 95.
// Performance is noisy under simulated throttling, so each page gets up to two runs.
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
await new Promise((r) => setTimeout(r, 1500));

const out = new URL('../test-results/lighthouse.json', import.meta.url).pathname;
let failed = 0;
try {
  for (const [dir, path, ignore] of pages) {
    let best = {};
    for (let attempt = 0; attempt < 2; attempt++) {
      await run('npx', ['lighthouse', `http://localhost:${servers[dir]}${path}`, '--quiet', '--output=json', `--output-path=${out}`,
        '--chrome-flags=--headless=new --no-sandbox'], { env: { ...process.env, CHROME_PATH: chromePath }, maxBuffer: 1 << 26 });
      const report = JSON.parse(readFileSync(out, 'utf8'));
      for (const c of Object.values(report.categories)) if (!ignore.includes(c.id)) best[c.id] = Math.max(best[c.id] ?? 0, Math.round(c.score * 100));
      if (Object.values(best).every((s) => s >= MIN)) break;
    }
    const ok = Object.values(best).every((s) => s >= MIN);
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
