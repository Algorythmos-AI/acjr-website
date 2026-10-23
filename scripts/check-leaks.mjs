// Fails the build if anything that must never be published reaches dist/.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;

const forbidden = [
  // Source documents, design references and internal notes.
  /statuts-ACJR/i, /Adresse retirée/, /onu-info-(header|footer)/, /recepisse/i, /récépissé/i, /PV_AGE/i,
  // The president's home address must never be published.
  /\bLoeb\b/i, /\b75013\b/,
  // Draft articles: their badge class and labels in every language.
  /class="[^"]*\bdraft-badge\b/, /Brouillon — exemple/, /Draft — sample/, /مسودة — مثال/,
  // No UN wordmark or emblem, and no "United Nations" outside the treaty and mechanism names below.
  /nations unies/i, /united nations/i, /الأمم المتحدة/, /\bONU\b/, /\bUN emblem\b/i,
];

// Official titles the copy cites. Removing them first leaves any other UN wording to be caught.
const allowedNames = [
  'Charte des Nations Unies',
  'Déclaration des Nations Unies sur les défenseurs',
  'Charter of the United Nations',
  'ميثاق الأمم المتحدة',
  'إعلان الأمم المتحدة بشأن المدافعين',
  'منظومة الأمم المتحدة',
];

const problems = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const where = path.replace(root, 'dist/');
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(pdf|docx?|md)$/i.test(name)) problems.push(`document published: ${where}`);
    else if (/\.(html|xml|txt|js|json|svg|css|webmanifest)$/.test(name)) {
      let text = readFileSync(path, 'utf8');
      for (const allowed of allowedNames) text = text.replaceAll(allowed, '');
      for (const re of forbidden) if (re.test(text)) problems.push(`${re} found in ${where}`);
    }
  }
}
walk(root);
if (problems.length) {
  console.error(problems.map((p) => `✘ ${p}`).join('\n'));
  process.exit(1);
}
console.log('✔ no forbidden content in dist/');
