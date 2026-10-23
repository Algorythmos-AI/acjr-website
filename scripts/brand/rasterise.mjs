// Rasterises the brand SVGs with Playwright's Chromium.
//   node scripts/brand/rasterise.mjs          -> favicon.ico, apple-touch-icon.png, og-image-*.png
//   node scripts/brand/rasterise.mjs --check  -> also writes QA PNGs (16/32/400px) to $LOGO_CHECK_DIR (default /tmp/logo-check)
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BRAND = join(ROOT, 'public', 'brand');
const PUB = join(ROOT, 'public');
const CHECK = process.env.LOGO_CHECK_DIR || '/tmp/logo-check';
const check = process.argv.includes('--check');

const dataUri = (file) =>
  'data:image/svg+xml;base64,' + readFileSync(file).toString('base64');

// Use whichever Chromium build is installed (version may differ from @playwright/test's pin).
import { readdirSync, existsSync } from 'node:fs';
function findChrome() {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  if (!existsSync(base)) return undefined;
  for (const d of readdirSync(base).filter((n) => n.startsWith('chromium_headless_shell-')).sort().reverse()) {
    const p = join(base, d, 'chrome-headless-shell-linux64', 'chrome-headless-shell');
    if (existsSync(p)) return p;
  }
  return undefined;
}
// PW_CHROMIUM (as in playwright.config.ts) lets a locally installed Chrome be used instead.
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || findChrome() });
const page = await browser.newPage();

async function render(html, w, h, out, transparent = true) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(
    `<!doctype html><html><head><style>html,body{margin:0;padding:0;width:${w}px;height:${h}px;overflow:hidden;background:transparent}</style></head><body>${html}</body></html>`,
  );
  await page.waitForLoadState('load');
  const buf = await page.screenshot({ omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } });
  if (out) writeFileSync(out, buf);
  return buf;
}

const img = (file, style) => `<img src="${dataUri(file)}" style="display:block;${style}">`;

// --- favicon.ico (32px PNG-in-ICO, plus 16px) ---------------------------------
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
  const dir = Buffer.alloc(16 * pngs.length);
  let offset = 6 + dir.length;
  pngs.forEach(({ size, buf }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o); dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2); dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4); dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(buf.length, o + 8); dir.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, dir, ...pngs.map((p) => p.buf)]);
}
const fav = join(PUB, 'favicon.svg');
const f32 = await render(img(fav, 'width:32px;height:32px'), 32, 32);
const f16 = await render(img(fav, 'width:16px;height:16px'), 16, 16);
writeFileSync(join(PUB, 'favicon.ico'), ico([{ size: 32, buf: f32 }, { size: 16, buf: f16 }]));

// --- apple-touch-icon (180, white, padded) ------------------------------------
await render(
  `<div style="width:180px;height:180px;background:#fff;display:flex;align-items:center;justify-content:center">${img(join(BRAND, 'mark.svg'), 'width:144px;height:144px')}</div>`,
  180, 180, join(PUB, 'apple-touch-icon.png'), false,
);

// --- OG images ------------------------------------------------------------------
for (const lang of ['fr', 'en', 'ar']) {
  const lock = join(BRAND, `lockup-${lang}-white.svg`);
  const rtl = lang === 'ar';
  await render(
    `<div style="position:relative;width:1200px;height:630px;background:#0B2545">
       <div style="position:absolute;left:0;top:0;width:1200px;height:4px;background:#009EDB"></div>
       <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:44px">
         ${img(lock, 'height:240px;width:auto;max-width:1040px')}
         <div style="width:96px;height:6px;background:#C8963E;${rtl ? '' : ''}"></div>
       </div>
     </div>`,
    1200, 630, join(BRAND, `og-image-${lang}.png`), false,
  );
}

// --- QA renders ---------------------------------------------------------------------
if (check) {
  mkdirSync(CHECK, { recursive: true });
  const marks = ['mark', 'mark-white', 'mark-navy', 'mark-black'];
  for (const m of marks) {
    const bg = m === 'mark-white' ? '#0B2545' : '#ffffff';
    for (const s of [16, 32, 400]) {
      await render(`<div style="background:${bg};width:${s}px;height:${s}px">${img(join(BRAND, m + '.svg'), `width:${s}px;height:${s}px`)}</div>`,
        s, s, join(CHECK, `${m}-${s}.png`), false);
    }
  }
  for (const s of [16, 32, 400]) {
    await render(`<div style="background:#fff">${img(fav, `width:${s}px;height:${s}px`)}</div>`, s, s, join(CHECK, `favicon-${s}.png`), false);
  }
  // contact sheet of small sizes, zoomed 8x with pixelated scaling for inspection
  const smalls = ['mark', 'mark-navy', 'favicon'];
  await render(
    `<div style="background:#ddd;display:flex;gap:16px;padding:16px;flex-wrap:wrap;width:1168px">` +
      smalls.flatMap((m) => [16, 24, 32].map((s) => {
        const f = m === 'favicon' ? fav : join(BRAND, m + '.svg');
        return `<div style="background:#fff;padding:4px"><div style="width:${s}px;height:${s}px;transform:scale(6);transform-origin:0 0;margin:0 ${s * 5}px ${s * 5}px 0;image-rendering:pixelated">${img(f, `width:${s}px;height:${s}px`)}</div></div>`;
      })).join('') + `</div>`,
    1200, 700, join(CHECK, 'small-sheet.png'), false,
  );
  for (const l of ['en', 'fr', 'ar']) {
    for (const suf of ['', '-white']) {
      const bg = suf ? '#0B2545' : '#ffffff';
      for (const h of [16, 32, 400]) {
        const f = join(BRAND, `lockup-${l}${suf}.svg`);
        const m = readFileSync(f, 'utf8').match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
        const w = Math.ceil((h * +m[1]) / +m[2]);
        await render(`<div style="background:${bg};width:${w}px;height:${h}px">${img(f, `height:${h}px;width:${w}px`)}</div>`,
          w, h, join(CHECK, `lockup-${l}${suf}-${h}.png`), false);
      }
    }
  }
}
await browser.close();
console.log('rasterised');
