// Builds the self-hosted Pagefind search index for a built site: node scripts/build-search-index.mjs dist
//
// Pagefind splits words at a straight apostrophe but not at the typographic one the site uses, so
// « d’Istanbul » would be one unfindable word. Each page is therefore indexed from a copy where ’ is
// replaced with ', and the search page turns it back into ’ when it shows results. The published
// pages are not changed. Run after `astro build`, so the French typography pass has already run.
import { readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import * as pagefind from 'pagefind';

const site = process.argv[2];
if (!site) {
  console.error('✘ usage: node scripts/build-search-index.mjs <built site directory>');
  process.exit(1);
}

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name !== 'pagefind') yield* htmlFiles(path);
    } else if (name.endsWith('.html')) yield path;
  }
}

const { index, errors: createErrors } = await pagefind.createIndex({});
if (!index) throw new Error(`Pagefind could not start: ${createErrors.join('; ')}`);
for (const file of htmlFiles(site)) {
  const content = readFileSync(file, 'utf8').replaceAll('’', "'");
  // Pages without data-pagefind-body (drafts, the 404, the search page) are skipped by Pagefind.
  const { errors } = await index.addHTMLFile({ sourcePath: relative(site, file), content });
  if (errors.length) throw new Error(`${file}: ${errors.join('; ')}`);
}
const output = join(site, 'pagefind');
rmSync(output, { recursive: true, force: true });
const { errors } = await index.writeFiles({ outputPath: output });
if (errors.length) throw new Error(errors.join('; '));
await pagefind.close();
const { languages } = JSON.parse(readFileSync(join(output, 'pagefind-entry.json'), 'utf8'));
const counts = Object.entries(languages).map(([lang, l]) => `${lang} ${l.page_count}`).join(', ');
console.log(`✔ search index written to ${output} (${counts} pages)`);
