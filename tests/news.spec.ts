import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const DRAFTS = 'http://localhost:4322';

test.describe('news (production build)', () => {
  test('listing shows the empty state and the home page hides latest news', async ({ page }) => {
    await page.goto('/fr/actualites/');
    await expect(page.getByRole('heading', { name: 'Aucune actualité publiée pour le moment' })).toBeVisible();
    await page.goto('/fr/');
    await expect(page.locator('#latest-title')).toHaveCount(0);
  });
});

test.describe('news templates (drafts build)', () => {
  for (const path of ['/fr/actualites/', '/en/news/new-statutes/', '/ar/news/new-statutes/']) {
    test(`${path} has no serious accessibility violations`, async ({ page }) => {
      await page.goto(DRAFTS + path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => v.id)).toEqual([]);
    });
  }

  test('cards link to articles, which are marked as drafts and noindex', async ({ page }) => {
    await page.goto(DRAFTS + '/en/news/');
    await expect(page.locator('.news-card')).toHaveCount(2);
    await page.locator('.news-card a[href$="/en/news/new-statutes/"]').click();
    await expect(page).toHaveURL(/\/en\/news\/new-statutes\/$/);
    await expect(page.locator('h1')).toContainText('new statutes');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    await expect(page.locator('.notice--warn')).toBeVisible();
  });

  test('language switcher on an article opens its translation', async ({ page }) => {
    await page.goto(DRAFTS + '/fr/actualites/nouveaux-statuts/');
    await page.locator('.lang-switch a[lang="ar"]').click();
    await expect(page).toHaveURL(/\/ar\/news\/new-statutes\/$/);
    await expect(page.locator('link[hreflang="fr"]')).toHaveAttribute('href', /\/fr\/actualites\/nouveaux-statuts\/$/);
  });

  test('home page shows latest news when articles exist', async ({ page }) => {
    await page.goto(DRAFTS + '/fr/');
    await expect(page.locator('#latest-title')).toBeVisible();
    await expect(page.locator('section[aria-labelledby="latest-title"] .news-card')).toHaveCount(2);
  });
});
