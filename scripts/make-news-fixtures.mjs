// Writes a throwaway news set for the fixtures test build (npm run build:fixtures).
// 11 FR, 10 EN and 9 AR articles, so only FR and EN reach a second listing page,
// plus one FR-only article that has no translation. Never used in production.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';

const out = new URL('../.fixtures/news/', import.meta.url);
rmSync(out, { recursive: true, force: true });
const counts = { fr: 11, en: 10, ar: 9 };
for (const [lang, n] of Object.entries(counts)) {
  mkdirSync(new URL(`${lang}/`, out), { recursive: true });
  for (let i = 1; i <= n; i++) {
    const day = String(i).padStart(2, '0');
    writeFileSync(
      new URL(`${lang}/fixture-${day}.md`, out),
      `---\ntitle: Fixture ${lang} ${day}\ndescription: Test fixture article ${day}.\ndate: 2026-01-${day}\ntranslationKey: fixture-${day}\ncategory: statement\n---\n\nFixture body ${day}.\n`,
    );
  }
}
writeFileSync(
  new URL('fr/fixture-untranslated.md', out),
  '---\ntitle: Fixture fr non traduit\ndescription: Article sans traduction.\ndate: 2025-12-01\ntranslationKey: fixture-untranslated\ncategory: statement\n---\n\nCorps.\n',
);
console.log('✔ news fixtures written to .fixtures/news/');
