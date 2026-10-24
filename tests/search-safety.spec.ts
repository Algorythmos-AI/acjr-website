import { test, expect, type Page } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { languages, pagePath } from '../src/i18n/routes';
import { ui } from '../src/i18n/ui';

const queries = { fr: 'Istanbul', en: 'Istanbul', ar: 'إسطنبول' } as const;

const results = (page: Page) => page.locator('.search-results li');

test.describe('search', () => {
  for (const lang of languages) {
    test(`${lang}: finds pages in this language only, with highlighted excerpts`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(pagePath(lang, 'search'));
      await page.fill('#search-q', queries[lang]);
      await expect(results(page).first()).toBeVisible();
      const hrefs = await results(page).locator('a').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
      expect(hrefs.every((h) => h.startsWith(`/${lang}/`)), hrefs.join(' ')).toBe(true);
      expect(hrefs).toContain(pagePath(lang, 'work'));
      // Excerpts keep only text and <mark>: nothing from the index is inserted as HTML.
      const tags = await results(page).locator('p *').evaluateAll((els) => [...new Set(els.map((e) => e.tagName))]);
      expect(tags).toEqual(['MARK']);
      // What someone types is not written into the address bar or history.
      expect(new URL(page.url()).search).toBe('');
      // WebAssembly runs under the CSP, so nothing is blocked.
      expect(errors).toEqual([]);
    });
  }

  test('excerpts keep words apart and leave out hidden labels', async ({ page }) => {
    await page.goto('/en/search/?q=defenders');
    const text = (await results(page).locator('p').allTextContents()).join(' ');
    expect(text).not.toContain('(external site)');
    expect(text).not.toMatch(/[a-z][A-Z][a-z]/);
  });

  test('a shared search link shows its results', async ({ page }) => {
    await page.goto('/en/search/?q=Minnesota');
    await expect(page.locator('#search-q')).toHaveValue('Minnesota');
    await expect(results(page).first()).toBeVisible();
    await expect(page.locator('.search-status')).toHaveText(/^Results: \d+$/);
  });

  test('no results: a helpful message, with French spacing', async ({ page }) => {
    await page.goto('/fr/recherche/?q=zzqxv');
    await expect(page.locator('.search-status')).toHaveText('Aucun résultat pour « zzqxv ». Essayez un autre mot, ou parcourez les pages ci-dessous.');
    await expect(results(page)).toHaveCount(0);
  });

  test('navigation, badges and related links are not in the index', async () => {
    // Read the index itself: every fragment holds the indexed text of one page.
    const dir = 'dist/pagefind/fragment';
    const texts = readdirSync(dir).map((f) => gunzipSync(readFileSync(join(dir, f))).toString('utf8'));
    expect(texts.length).toBe(39);
    for (const lang of languages) {
      const t = ui[lang];
      // Phrases used only by these blocks. (In Arabic, "on this page" also occurs in real copy.)
      const phrases = [t.continueExploring, t.statutesArticle, ...(lang === 'ar' ? [] : [t.onThisPage])];
      for (const phrase of phrases) {
        // The index uses straight apostrophes (scripts/build-search-index.mjs).
        const needle = phrase.replaceAll('’', "'");
        expect(texts.filter((x) => x.includes(needle)), `${lang}: "${phrase}"`).toEqual([]);
      }
    }
  });

  test('without JavaScript the page explains and lists every page', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/ar/search/');
    await expect(page.locator('noscript')).toHaveCount(1);
    await expect(page.locator('.all-pages a')).toHaveCount(13);
    await context.close();
  });

  for (const lang of languages) {
    test(`${lang}: every page links to search from the header`, async ({ page }) => {
      await page.goto(pagePath(lang, 'governance'));
      await expect(page.locator('.utility-search')).toHaveAttribute('href', pagePath(lang, 'search'));
    });
  }
});

test.describe('quick exit', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('https://www.google.com/**', (route) => route.fulfill({ contentType: 'text/html', body: '<title>neutral</title>' }));
  });

  for (const lang of languages) {
    test(`${lang}: the contact page has a working exit that Back does not undo`, async ({ page }) => {
      await page.goto(pagePath(lang, 'home'));
      await page.goto(pagePath(lang, 'contact'));
      const exit = page.locator('.quick-exit-link');
      await expect(exit).toBeVisible();
      await expect(exit).toHaveAttribute('rel', 'noreferrer');
      await exit.click();
      await expect(page).toHaveURL('https://www.google.com/');
      // The contact page was replaced in history, so Back skips it.
      await page.goBack();
      await expect(page).toHaveURL(new RegExp(`${pagePath(lang, 'home')}$`));
    });
  }

  test('the exit is the second Tab stop, and leaves no referrer', async ({ page }) => {
    await page.goto('/fr/contact/');
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('.quick-exit-link')).toBeFocused();
    await expect(page.locator('meta[name="referrer"]')).toHaveAttribute('content', 'no-referrer');
    let referer: string | undefined = 'unset';
    await page.route('https://www.google.com/**', (route) => {
      referer = route.request().headers()['referer'];
      return route.fulfill({ contentType: 'text/html', body: '' });
    });
    await page.locator('.quick-exit-link').click();
    await expect(page).toHaveURL('https://www.google.com/');
    expect(referer).toBeUndefined();
  });

  test('the victim card does not suggest a contact channel that does not exist yet', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('.path').first()).not.toContainText('send us');
  });

  test('Esc twice leaves; once does not', async ({ page }) => {
    await page.goto('/en/contact/');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1200);
    await page.keyboard.press('Escape');
    await expect(page).toHaveURL(/\/en\/contact\/$/);
    await page.keyboard.press('Escape');
    await expect(page).toHaveURL('https://www.google.com/');
  });

  test('Esc that closes the menu does not count', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'desktop', 'the menu button only exists below 1024px');
    await page.goto('/en/contact/');
    await page.locator('.nav-toggle').click();
    await page.keyboard.press('Escape');
    await expect(page.locator('#site-nav')).toBeHidden();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await expect(page).toHaveURL(/\/en\/contact\/$/);
  });

  test('Esc while typing in the form does not leave', async ({ page }) => {
    // The drafts build enables the form, so its fields can take focus.
    await page.goto('http://localhost:4412/en/contact/');
    await page.locator('#cf-name').focus();
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await expect(page).toHaveURL(/\/en\/contact\/$/);
  });

  test('without JavaScript the exit is still a plain link', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/fr/contact/');
    await expect(page.locator('.quick-exit-link')).toHaveAttribute('href', 'https://www.google.com/');
    await expect(page.locator('.quick-exit-hint')).toBeHidden();
    await context.close();
  });

  test('the button never covers the end of the page', async ({ page }) => {
    await page.goto('/en/contact/');
    await page.keyboard.press('End');
    await page.waitForTimeout(400);
    const button = (await page.locator('.quick-exit').boundingBox())!;
    const lastLine = (await page.locator('.footer-copy').boundingBox())!;
    expect(lastLine.y + lastLine.height <= button.y || lastLine.x + lastLine.width <= button.x || button.x + button.width <= lastLine.x).toBe(true);
  });
});
