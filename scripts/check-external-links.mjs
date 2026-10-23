// Weekly check of the external links the site publishes (mostly official legal texts).
// Reads the list written by scripts/check-links.mjs. Sites that block automated requests
// (401/403/429) are reported for a manual check rather than failing the run.
import { readFileSync } from 'node:fs';

const urls = JSON.parse(readFileSync('test-results/external-links.json', 'utf8'));
const headers = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156 Safari/537.36', Accept: 'text/html,*/*' };
// Hosts whose firewalls block automated checks (verified by hand in a browser, Oct 2026).
const botWalled = ['www.ohchr.org', 'www.icc-cpi.int'];
const broken = [];
const manual = [];

async function probe(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, { method, headers, redirect: 'follow', signal: AbortSignal.timeout(20000) });
      if (res.ok) return res.status;
      if (method === 'GET' || ![403, 405, 501].includes(res.status)) return res.status;
    } catch (error) {
      if (method === 'GET') return `error: ${error.cause?.code ?? error.name}`;
    }
  }
}

for (const url of urls) {
  const status = await probe(url);
  const line = `${status} ${url}`;
  if (typeof status === 'number' && status < 400) console.log(`✔ ${line}`);
  else if ([401, 403, 429].includes(status) || botWalled.includes(new URL(url).host)) manual.push(line);
  else broken.push(line);
}
if (manual.length) console.log(`\n⚠ Blocked automated requests; check these in a browser:\n${manual.join('\n')}`);
if (broken.length) {
  console.error(`\n✘ Broken external links:\n${broken.join('\n')}`);
  process.exit(1);
}
console.log(`\n✔ ${urls.length - manual.length} external links OK`);
