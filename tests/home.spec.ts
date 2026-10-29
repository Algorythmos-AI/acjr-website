import { test, expect } from '@playwright/test';
import { languages, pagePath } from '../src/i18n/routes';
import { content } from '../src/content';

test.describe('home page', () => {
  for (const lang of languages) {
    const c = content[lang];

    test(`${lang}: the headline is visible at once, even with motion allowed`, async ({ browser }) => {
      const context = await browser.newContext({ reducedMotion: 'no-preference' });
      const page = await context.newPage();
      await page.goto(pagePath(lang, 'home'));
      // The hero only slides in; it never starts transparent, so it is the first thing painted.
      const opacity = await page.locator('#hero-title').evaluate((el) => getComputedStyle(el).opacity);
      expect(opacity).toBe('1');
      await context.close();
    });

    test(`${lang}: "where to start" cards lead to existing sections`, async ({ page }) => {
      await page.goto(pagePath(lang, 'home'));
      const cards = page.locator('.path');
      await expect(cards).toHaveCount(3);
      const targets = [pagePath(lang, 'contact', 'safety-title'), pagePath(lang, 'advocacy', 'networks-title'), pagePath(lang, 'involved', 'membership-title')];
      for (const [i, href] of targets.entries()) {
        await expect(cards.nth(i).locator('h3 a')).toHaveAttribute('href', href);
        await expect(cards.nth(i).locator('h3 a')).toHaveAccessibleName(c.home.paths[i]!.title);
      }
      // The whole card is clickable, and the click lands on the section heading.
      await cards.first().click();
      await expect(page).toHaveURL(new RegExp(`${targets[0]!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`));
      await expect(page.locator('#safety-title')).toBeInViewport();
    });

    test(`${lang}: statute references match the statutes`, async ({ page }) => {
      await page.goto(pagePath(lang, 'home'));
      const tiles = page.locator('.tile .art-ref bdi');
      await expect(tiles).toHaveText(['6.1', '6.2', '6.3', '6.4', '6.5', '6.6']);
      await expect(page.locator('.vision .art-ref bdi')).toHaveText('5');
      // Principles in Art. 4 order, with the statute wording used on the principles page.
      await expect(page.locator('.principles h3')).toHaveText(c.principles.items.map((p) => p.title));
      await expect(page.locator('.mechanisms li')).toHaveCount(5);
      await expect(page.locator('.advocacy-note')).toHaveText(c.advocacy.note);
    });

    test(`${lang}: the seal is decorative and spells the legal name`, async ({ page }) => {
      await page.goto(pagePath(lang, 'home'));
      const seal = page.locator('svg.seal');
      await expect(seal).toHaveAttribute('aria-hidden', 'true');
      const ring = seal.locator('textPath');
      await expect(ring).toHaveText('AFRICAN CENTER FOR JUSTICE RIGHTS · ACJR · '.repeat(2), { useInnerText: false });
      // At the client's request the ring carries only the name: no legal form or seat.
      await expect(ring).not.toContainText(/1901|PARIS/i);
      await expect(seal.locator('text')).toHaveAttribute('direction', 'ltr');
    });
  }

  test('cards are fully visible once scrolled into view, and at once with reduced motion', async ({ browser }) => {
    for (const reducedMotion of ['no-preference', 'reduce'] as const) {
      const context = await browser.newContext({ reducedMotion });
      const page = await context.newPage();
      await page.goto('/en/');
      const tile = page.locator('.tile').last();
      if (reducedMotion === 'reduce') expect(await tile.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
      await tile.scrollIntoViewIfNeeded();
      await page.mouse.wheel(0, 300);
      await expect.poll(() => tile.evaluate((el) => Number(getComputedStyle(el).opacity)), { message: reducedMotion }).toBe(1);
      await context.close();
    }
  });
});
