import { test, expect } from '@playwright/test';
import { languages, pagePath, type PageKey } from '../src/i18n/routes';
import { content } from '../src/content';
import { ui } from '../src/i18n/ui';

const tocPages: PageKey[] = ['work', 'governance', 'transparency', 'advocacy', 'framework', 'legal', 'privacy'];

test.describe('"On this page" list', () => {
  for (const lang of languages) {
    for (const key of tocPages) {
      test(`${lang}/${key}: every entry leads to its section, which becomes current on desktop`, async ({ page }, testInfo) => {
        const desktop = testInfo.project.name === 'desktop';
        await page.goto(pagePath(lang, key));
        const links = page.locator('.page-toc-list a');
        const count = await links.count();
        expect(count).toBeGreaterThanOrEqual(3);
        for (const i of [0, Math.floor(count / 2), count - 1]) {
          const link = links.nth(i);
          const id = decodeURIComponent((await link.getAttribute('href'))!.slice(1));
          await link.click();
          const target = page.locator(`[id="${id}"]`);
          // Smooth scrolling takes a moment: wait for the heading to settle below the sticky header.
          await expect
            .poll(() =>
              target.evaluate((el) => el.getBoundingClientRect().top - Math.max(0, document.querySelector('.site-header')!.getBoundingClientRect().bottom)),
            )
            .toBeGreaterThanOrEqual(-1);
          await expect(target).toBeInViewport();
          // On smaller screens the list sits above the content, so no entry is marked.
          if (desktop) {
            await expect(link).toHaveAttribute('aria-current', 'location');
            await expect(page.locator('.page-toc-list a[aria-current]')).toHaveCount(1);
          } else {
            await expect(page.locator('.page-toc-list a[aria-current]')).toHaveCount(0);
          }
        }
      });
    }
  }

  test('the desktop list stays in view while reading', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'the list is a sticky sidebar from 1024px');
    await page.goto('/en/what-we-do/');
    await page.mouse.wheel(0, 2500);
    await expect(page.locator('.page-toc')).toBeInViewport();
  });
});

test.describe('statute references', () => {
  const cases: [PageKey, string[]][] = [
    ['work', ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6']],
    ['principles', ['4.1', '4.2', '4.3', '4.4', '4.5']],
    ['advocacy', ['7', '8.1–8.2', '8.3']],
    ['transparency', ['16', '17', '11, 18', '21', '20']],
    ['governance', ['14', '11–14', '11', '13', '14', '15']],
    ['involved', ['9–10']],
  ];
  for (const [key, articles] of cases) {
    test(`${key}: ${articles.join(', ')}`, async ({ page }) => {
      await page.goto(pagePath('fr', key));
      await expect(page.locator('main .art-ref bdi')).toHaveText(articles);
    });
  }
});

test.describe('governance', () => {
  for (const lang of languages) {
    test(`${lang}: the org chart reads in order and the Bureau has initials`, async ({ page }) => {
      await page.goto(pagePath(lang, 'governance'));
      const steps = page.locator('.org-flow > li');
      await expect(steps).toHaveCount(3);
      await expect(steps.nth(2).locator('.org-roles li')).toHaveCount(3);
      await expect(page.locator('.person-avatar')).toHaveText(['SA', 'HM', 'IT']);
      // Only the ordinary assembly elects the Board (Art. 11); the extraordinary one is not in the chain.
      const g = content[lang].governance;
      await expect(steps.nth(0)).toContainText(g.bodies[0].title);
      await expect(steps.nth(0)).not.toContainText(g.bodies[1].title);
    });
  }
});

test.describe('related pages and header art', () => {
  test('governance suggests transparency, about and get involved', async ({ page }) => {
    await page.goto('/en/governance/');
    const hrefs = await page.locator('.related-card h3 a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs).toEqual(['/en/transparency/', '/en/about/', '/en/get-involved/']);
  });

  for (const key of ['home', 'about', 'legal', 'privacy'] as const) {
    test(`${key}: no related block`, async ({ page }) => {
      await page.goto(pagePath('en', key));
      await expect(page.locator('.related')).toHaveCount(0);
    });
  }

  test('header illustration only on wide screens, and never on legal pages', async ({ page }, testInfo) => {
    await page.goto('/en/governance/');
    const art = page.locator('.page-header-art');
    if (testInfo.project.name === 'desktop') await expect(art).toBeVisible();
    else await expect(art).toBeHidden();
    await page.goto('/en/legal-notice/');
    await expect(page.locator('.page-header-art')).toHaveCount(0);
  });
});

// Article tests use the drafts build (port 4412), which has two sample articles per language.
test.describe('news article', () => {
  const base = 'http://localhost:4412';

  test('shows reading time, and newer/older links that point at each other', async ({ page }) => {
    // The two samples share a date, so their order comes from the id; check the links both ways.
    const start = '/fr/actualites/nouveaux-statuts/';
    await page.goto(`${base}${start}`);
    await expect(page.locator('.article-meta')).toContainText('min de lecture');
    const links = page.locator('.pager-link');
    await expect(links).toHaveCount(1);
    const wasNewer = (await page.locator('.pager-newer').count()) === 1;
    await links.click();
    await expect(page.locator(wasNewer ? '.pager-older' : '.pager-newer')).toHaveAttribute('href', start);
  });

  test('the newer/older links have their own label', async ({ page }) => {
    await page.goto(`${base}/fr/actualites/nouveaux-statuts/`);
    await expect(page.locator('.pager')).toHaveAttribute('aria-label', ui.fr.moreArticles);
  });

  test('Arabic reading time agrees with the number', async ({ page }) => {
    await page.goto(`${base}/ar/news/new-statutes/`);
    await expect(page.locator('.article-meta')).toContainText(/مدة القراءة: (دقيقة واحدة|دقيقتان|\d+ دقائق|\d+ دقيقة)/);
  });

  test('share copies the link where the browser has no share sheet', async ({ browser }) => {
    const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
    await context.addInitScript(() => Object.defineProperty(navigator, 'share', { value: undefined }));
    const page = await context.newPage();
    await page.goto(`${base}/en/news/new-statutes/`);
    await page.getByRole('button', { name: 'Share' }).click();
    await expect(page.locator('.share-status')).toHaveText('Link copied');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(`${base}/en/news/new-statutes/`);
    await context.close();
  });

  test('without JavaScript the share button is not shown', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`${base}/en/news/new-statutes/`);
    await expect(page.locator('.share')).toBeHidden();
    await context.close();
  });
});

// Reveal moves things, never fades them, so nothing is ever half-transparent, even at the end of
// a short page that cannot scroll far enough to finish the animation.
test.describe('reveal never hides content', () => {
  for (const lang of languages) {
    test(`${lang}: every revealed element is fully opaque`, async ({ page }) => {
      for (const key of ['home', 'news', 'governance', 'transparency', 'contact'] as const) {
        await page.goto(pagePath(lang, key));
        const opacities = await page.locator('.reveal').evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
        expect(opacities.every((o) => o === '1'), `${key}: ${opacities.join(',')}`).toBe(true);
      }
    });
  }
});
