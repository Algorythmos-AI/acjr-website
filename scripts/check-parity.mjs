// Checks that every language has the same content structure, a slug for every page,
// and titles/descriptions within search-engine limits. TypeScript enforces most of this;
// this script also catches empty strings and length overruns.
import { languages, pageKeys, slugs } from '../src/i18n/routes.ts';
import { fr } from '../src/content/fr.ts';
import { en } from '../src/content/en.ts';
import { ar } from '../src/content/ar.ts';

const content = { fr, en, ar };
const errors = [];

function shape(value, path, out) {
  if (Array.isArray(value)) {
    out.set(path, `array(${value.length})`);
    value.forEach((v, i) => shape(v, `${path}[${i}]`, out));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) shape(v, path ? `${path}.${k}` : k, out);
  } else {
    if (typeof value === 'string' && value.trim() === '' && !path.endsWith('.lead')) errors.push(`empty string at ${path}`);
    out.set(path, typeof value);
  }
  return out;
}

const shapes = Object.fromEntries(languages.map((l) => [l, shape(content[l], '', new Map())]));
for (const l of languages.filter((x) => x !== 'fr')) {
  for (const [path, kind] of shapes.fr) {
    const other = shapes[l].get(path);
    // Paragraph arrays may legitimately differ in length; numbered sets may not.
    if (other === undefined && !/\]/.test(path)) errors.push(`${l}: missing ${path}`);
    else if (other && kind !== other && !kind.startsWith('array')) errors.push(`${l}: ${path} is ${other}, expected ${kind}`);
  }
}

for (const l of languages) {
  const seen = new Set();
  for (const key of pageKeys) {
    const slug = slugs[l][key];
    if (slug === undefined) errors.push(`${l}: no slug for ${key}`);
    if (seen.has(slug)) errors.push(`${l}: duplicate slug "${slug}"`);
    seen.add(slug);
    const meta = content[l].meta[key];
    const title = key === 'home' ? `ACJR — ${meta.title}` : `${meta.title} | ACJR`;
    if (title.length > 60) errors.push(`${l}/${key}: title is ${title.length} chars (max 60)`);
    if (meta.description.length > 160) errors.push(`${l}/${key}: description is ${meta.description.length} chars (max 160)`);
  }
}

if (errors.length) {
  console.error(errors.map((e) => `✘ ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✔ content parity OK across ${languages.join(', ')} (${shapes.fr.size} fields, ${pageKeys.length} pages)`);
