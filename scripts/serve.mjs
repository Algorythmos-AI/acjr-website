// Minimal static server for the e2e tests: node scripts/serve.mjs <dir> <port>.
// Serves directory index.html files and dist's 404.html, like the production host.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

const [, , dir = 'dist', port = '4321'] = process.argv;
const root = resolve(dir);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain',
};

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname);
  let file = normalize(join(root, url));
  // Compare with a trailing separator so /..%2Fdist-drafts cannot reach a sibling folder.
  if (file !== root && !file.startsWith(root + sep)) return res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    let body = await readFile(file);
    const headers = { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' };
    // Compress text like the production host does, so local audits are representative.
    if (/^(text|application\/xml|image\/svg)/.test(headers['Content-Type']) && /gzip/.test(req.headers['accept-encoding'] ?? '')) {
      body = gzipSync(body);
      headers['Content-Encoding'] = 'gzip';
    }
    res.writeHead(200, headers).end(body);
  } catch {
    const body = await readFile(join(root, '404.html')).catch(() => 'Not found');
    res.writeHead(404, { 'Content-Type': types['.html'] }).end(body);
  }
}).listen(Number(port), () => console.log(`serving ${root} on http://localhost:${port}`));
