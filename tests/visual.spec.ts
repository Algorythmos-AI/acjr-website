import { test, expect } from '@playwright/test';

/**
 * Visual regression (@visual): full-page screenshots of each template in French and Arabic, at the
 * three widths of playwright.config.ts. Baselines are Linux screenshots made in CI (fonts render
 * differently on other systems), so these tests run only when VISUAL=1, which CI sets.
 * To refresh the baselines after an intended change: open or update the pull request, let the
 * "Visual baselines" workflow run, download its artifact and commit it into
 * tests/visual.spec.ts-snapshots/ (see README.md).
 */
const DRAFTS = 'http://localhost:4412';
const pages: [name: string, fr: string, ar: string][] = [
  ['home', '/fr/', '/ar/'],
  ['work', '/fr/nos-actions/', '/ar/what-we-do/'],
  ['governance', '/fr/gouvernance/', '/ar/governance/'],
  ['contact', '/fr/contact/', '/ar/contact/'],
  ['search', '/fr/recherche/?q=Istanbul', '/ar/search/?q=%D8%A5%D8%B3%D8%B7%D9%86%D8%A8%D9%88%D9%84'],
  ['article', `${DRAFTS}/fr/actualites/nouveaux-statuts/`, `${DRAFTS}/ar/news/new-statutes/`],
];

test.use({ reducedMotion: 'reduce' });

for (const [name, fr, ar] of pages) {
  for (const [lang, path] of [['fr', fr], ['ar', ar]] as const) {
    test(`@visual ${name} (${lang})`, async ({ page }) => {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      if (name === 'search') await expect(page.locator('.search-results li').first()).toBeVisible();
      await expect(page).toHaveScreenshot(`${name}-${lang}.png`, {
        fullPage: true,
        animations: 'disabled',
        // The copyright year changes every January; it is not a design change.
        mask: [page.locator('.footer-copy')],
        maxDiffPixelRatio: 0.002,
      });
    });
  }
}
