import { test, expect } from '@playwright/test';

const FIXTURES = 'http://localhost:4413'; // 11 FR, 10 EN, 9 AR articles + 1 FR-only article

test.describe('news pagination and hreflang (fixtures build)', () => {
  test('only languages with enough articles get a second page', async ({ request }) => {
    expect((await request.get(`${FIXTURES}/fr/actualites/page/2/`)).status()).toBe(200);
    expect((await request.get(`${FIXTURES}/en/news/page/2/`)).status()).toBe(200);
    expect((await request.get(`${FIXTURES}/ar/news/page/2/`)).status()).toBe(404);
  });

  test('page 2 never points hreflang or the switcher at a missing page', async ({ page }) => {
    await page.goto(`${FIXTURES}/fr/actualites/page/2/`);
    await expect(page.locator('link[hreflang="fr"]')).toHaveAttribute('href', /\/fr\/actualites\/page\/2\/$/);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/news\/page\/2\/$/);
    await expect(page.locator('link[hreflang="ar"]')).toHaveCount(0);
    await expect(page.locator('.lang-switch a[lang="en"]')).toHaveAttribute('href', '/en/news/page/2/');
    await expect(page.locator('.lang-switch a[lang="ar"]')).toHaveAttribute('href', '/ar/news/');
    await page.locator('.lang-switch a[lang="ar"]').click();
    await expect(page).toHaveURL(/\/ar\/news\/$/);
  });

  test('an untranslated article declares no hreflang, and the switcher falls back to the listing', async ({ page }) => {
    await page.goto(`${FIXTURES}/fr/actualites/fixture-untranslated/`);
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/fr\/actualites\/fixture-untranslated\/$/);
    await expect(page.locator('.lang-switch a[lang="en"]')).toHaveAttribute('href', '/en/news/');
  });

  test('a translated article lists all three languages', async ({ page }) => {
    await page.goto(`${FIXTURES}/en/news/fixture-05/`);
    for (const l of ['fr', 'en', 'ar', 'x-default']) await expect(page.locator(`link[hreflang="${l}"]`)).toHaveCount(1);
  });
});

test.describe('sitemap, robots and 404 (production build)', () => {
  test('sitemap lists canonical pages only, without the language chooser', async ({ request }) => {
    const xml = await (await request.get('/sitemap-0.xml')).text();
    expect(xml).not.toMatch(/<loc>https?:\/\/[^/<]+\/<\/loc>/);
    expect(xml).toContain('/fr/qui-sommes-nous/</loc>');
    expect(xml).not.toContain('xhtml:link');
  });

  test('robots.txt points at the sitemap on the configured site', async ({ request }) => {
    const txt = await (await request.get('/robots.txt')).text();
    expect(txt).toMatch(/^Sitemap: https:\/\/[^\s]+\/sitemap-index\.xml$/m);
  });

  test('the 404 page has a single h1 and marks each language', async ({ page }) => {
    await page.goto('/404.html');
    await expect(page.locator('h1')).toHaveCount(1);
    for (const l of ['fr', 'en', 'ar']) await expect(page.locator(`section[lang="${l}"] h2`)).toHaveCount(1);
  });
});
