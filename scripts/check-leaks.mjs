// Fails the build if anything that must never be published reaches dist/.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
// Draft articles must never reach production: their badge class and labels are forbidden too.
const forbidden = [/statuts-ACJR/i, /Adresse retirée/, /onu-info-(header|footer)/, /draft-badge/, /Brouillon — exemple/, /Draft — sample/, /recepisse/i, /récépissé/i, /PV_AGE/i, /\bLoeb\b/i, /nations unies/i, /united nations emblem/i, /\bONU\b/];

const problems = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.pdf$/i.test(name)) problems.push(`PDF file published: ${path}`);
    else if (/\.(html|xml|txt|js|json|svg)$/.test(name)) {
      // The preamble cites the UN Charter by its official French title; that is a reference, not a wordmark.
      const text = readFileSync(path, 'utf8').replaceAll('Charte des Nations Unies', '');
      for (const re of forbidden) if (re.test(text)) problems.push(`${re} found in ${path.replace(root, 'dist/')}`);
    }
  }
}
walk(root);
if (problems.length) {
  console.error(problems.map((p) => `✘ ${p}`).join('\n'));
  process.exit(1);
}
console.log('✔ no forbidden content in dist/');
