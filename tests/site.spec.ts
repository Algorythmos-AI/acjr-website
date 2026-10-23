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

test('Arabic pages are right-to-left', async ({ page }) => {
  await page.goto('/ar/');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  const brand = await page.locator('.brand').boundingBox();
  const width = page.viewportSize()!.width;
  expect(brand!.x + brand!.width / 2).toBeGreaterThan(width / 2);
});

test('language switcher keeps the same page', async ({ page }) => {
  await page.goto('/fr/gouvernance/');
  await page.locator('.lang-switch a[lang="en"]').click();
  await expect(page).toHaveURL(/\/en\/governance\/$/);
  await page.locator('.lang-switch a[lang="ar"]').click();
  await expect(page).toHaveURL(/\/ar\/governance\/$/);
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
