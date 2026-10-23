import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { languages, pageKeys, pagePath } from '../src/i18n/routes';

const allPages = languages.flatMap((lang) => pageKeys.map((key) => ({ lang, key, path: pagePath(lang, key) })));

test.describe('every page', () => {
  for (const { lang, key, path } of allPages) {
    test(`${lang}/${key} loads cleanly`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(e.message));
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('h1')).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, 'no horizontal scroll').toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });

    test(`${lang}/${key} has no serious accessibility violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    });
  }
});

test.describe('Arabic pages are right-to-left', () => {
  for (const key of pageKeys) {
    test(`ar/${key}`, async ({ page }) => {
      await page.goto(pagePath('ar', key));
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      const brand = await page.locator('.brand').boundingBox();
      const width = page.viewportSize()!.width;
      expect(brand!.x + brand!.width / 2, 'logo sits on the right').toBeGreaterThan(width / 2);
    });
  }
});

test('language switcher keeps the same page', async ({ page }) => {
  await page.goto('/fr/gouvernance/');
  await page.locator('.lang-switch a[lang="en"]').click();
  await expect(page).toHaveURL(/\/en\/governance\/$/);
  await page.locator('.lang-switch a[lang="ar"]').click();
  await expect(page).toHaveURL(/\/ar\/governance\/$/);
});

test('every page links each language to the same page', async ({ page }) => {
  for (const { lang, key, path } of allPages) {
    await page.goto(path);
    for (const other of languages) {
      if (other === lang) continue;
      await expect(page.locator(`.lang-switch a[lang="${other}"]`), `${path} → ${other}`).toHaveAttribute('href', pagePath(other, key));
    }
  }
});

test.describe('404 page', () => {
  for (const path of ['/fr/introuvable/', '/en/missing-page/', '/ar/missing-page/']) {
    test(`${path} returns 404 with links in every language`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(404);
      await expect(page.locator('h1')).toHaveCount(1);
      for (const l of languages) {
        const home = page.locator(`section[lang="${l}"] a[href="${pagePath(l, 'home')}"]`);
        await expect(home).toBeVisible();
      }
    });
  }
});

test.describe('root redirect follows the browser language', () => {
  const cases: [string, string][] = [['fr-FR', '/fr/'], ['en-GB', '/en/'], ['ar-EG', '/ar/'], ['de-DE', '/fr/']];
  for (const [locale, target] of cases) {
    test(`${locale} → ${target}`, async ({ browser }) => {
      const context = await browser.newContext({ locale });
      const page = await context.newPage();
      await page.goto('/');
      await expect(page).toHaveURL(new RegExp(`${target}$`));
      await context.close();
    });
  }
});

test('the skip link is the first Tab stop and moves focus to the content', async ({ page }) => {
  await page.goto('/en/about/');
  await page.keyboard.press('Tab');
  const skip = page.locator('.skip-link');
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
});

test('mobile menu: closed links are unreachable, opened links come next in Tab order', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'desktop', 'the menu button only exists below 1024px');
  await page.goto('/en/');
  const menu = page.locator('.nav-toggle');
  // On small screens each section heading is an accordion button, so look for any visible control.
  const nav = page.locator('#site-nav');
  await expect(nav).toBeHidden();
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(nav.locator('a:visible, button:visible').first()).toBeVisible();
  // The open menu follows the button in the DOM, so the next Tab stops inside it.
  await page.keyboard.press('Tab');
  const focusedInNav = await page.evaluate(() => !!document.activeElement?.closest('#site-nav'));
  expect(focusedInNav).toBe(true);
});

test('navigation works by keyboard', async ({ page }, testInfo) => {
  await page.goto('/en/');
  if (testInfo.project.name === 'desktop') {
    const toggle = page.locator('.nav-sub-toggle').first();
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#nav-sub-0')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  } else {
    const menu = page.locator('.nav-toggle');
    await expect(page.locator('#site-nav')).toBeHidden();
    await menu.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#site-nav')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#site-nav')).toBeHidden();
    await expect(menu).toBeFocused();
  }
});

test('contact form is disabled while no endpoint is configured', async ({ page }) => {
  for (const lang of ['fr', 'en', 'ar']) {
    await page.goto(`/${lang}/contact/`);
    await expect(page.locator('.contact-form fieldset')).toHaveAttribute('disabled', '');
    await expect(page.locator('.contact-form [type=submit]')).toBeDisabled();
    await expect(page.locator('.contact-form')).not.toHaveAttribute('action');
    await expect(page.locator('.form-section .notice')).toBeVisible();
  }
});

// The drafts build sets a test Formspree endpoint; the request is intercepted, never sent.
test('contact form validates and reports a successful send', async ({ page }) => {
  let posted = 0;
  await page.route('https://formspree.io/**', (route) => {
    posted++;
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await page.goto('http://localhost:4322/en/contact/');
  const send = page.getByRole('button', { name: 'Send message' });
  await send.click();
  const summary = page.locator('.error-summary');
  await expect(summary).toBeVisible();
  await expect(summary.locator('li')).toHaveCount(4);
  await expect(summary).toBeFocused();
  await expect(page.locator('#cf-email')).toHaveAttribute('aria-invalid', 'true');
  expect(posted).toBe(0);
  await page.fill('#cf-name', 'Test');
  await page.fill('#cf-email', 'test@example.org');
  await page.fill('#cf-message', 'Hello');
  await page.check('#cf-consent');
  await send.click();
  await expect(summary).toBeHidden();
  await expect(page.locator('.form-status')).toHaveText('Thank you, your message has been sent. We will reply as soon as possible.');
  expect(posted).toBe(1);
});

test('root redirects to a language', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/(fr|en|ar)\/$/);
});

test('French pages use non-breaking spaces before double punctuation', async ({ page }) => {
  for (const path of ['/fr/gouvernance/', '/fr/contact/', '/fr/mentions-legales/']) {
    await page.goto(path);
    const text = await page.locator('main').innerText();
    expect(text, path).not.toMatch(/\S [:;!?](\s|$)/);
    expect(text, path).not.toMatch(/« | »/);
    expect(text, path).not.toMatch(/\w'\w/);
  }
});

test('every language uses an ACJR lockup whose name is legible in the header', async ({ page }) => {
  for (const lang of languages) {
    await page.goto(`/${lang}/`);
    const logo = page.locator('.brand img');
    await expect(logo).toHaveAttribute('src', `/brand/lockup-${lang}.svg`);
    const svg = await (await page.request.get(`/brand/lockup-${lang}.svg`)).text();
    if (lang !== 'ar') expect(svg).toMatch(/<title[^>]*>ACJR – /);
    // The name occupies about a fifth of the lockup height, so ≥ 48 px keeps it at ≥ 9.6 px.
    expect((await logo.boundingBox())!.height).toBeGreaterThanOrEqual(48);
  }
});
