import { test, expect, type Page } from '@playwright/test';

const headerBottom = (page: Page) =>
  page.evaluate(() => {
    const header = document.querySelector('.site-header')!.getBoundingClientRect();
    return Math.max(0, header.bottom);
  });

test.describe('sticky header', () => {
  for (const path of ['/fr/gouvernance/', '/ar/governance/']) {
    test(`${path}: stays reachable after scrolling, without covering the page`, async ({ page }, testInfo) => {
      await page.goto(path);
      await page.mouse.wheel(0, 1500);
      await expect(page.locator('.site-header')).toHaveClass(/is-stuck/);
      const desktop = testInfo.project.name === 'desktop';
      // Desktop keeps the menu bar on screen; smaller screens keep the masthead with the menu button.
      const kept = page.locator(desktop ? '#site-nav' : '.nav-toggle');
      await expect(kept).toBeInViewport();
      const box = (await kept.boundingBox())!;
      expect(box.y, 'pinned to the top').toBeLessThan(80);
      // The pinned part stays small enough to leave most of the screen to the content.
      expect(await headerBottom(page)).toBeLessThan(page.viewportSize()!.height * 0.2);
    });
  }

  test('scrolling back up restores the full header', async ({ page }) => {
    await page.goto('/en/');
    await page.mouse.wheel(0, 1200);
    await expect(page.locator('.site-header')).toHaveClass(/is-stuck/);
    await page.mouse.wheel(0, -5000);
    await expect(page.locator('.site-header')).not.toHaveClass(/is-stuck/);
    await expect(page.locator('.utility-bar')).toBeInViewport();
  });

  for (const path of ['/fr/nos-actions/#documentation', '/en/what-we-do/#research', '/ar/what-we-do/#vulnerable']) {
    test(`${path}: anchor target is not hidden under the header on first load`, async ({ page }) => {
      await page.goto(path);
      const id = path.split('#')[1]!;
      await expect(page.locator(`#${id}`)).toBeInViewport();
      await page.waitForTimeout(400);
      const top = await page.locator(`#${id}`).evaluate((el) => el.getBoundingClientRect().top);
      expect(top).toBeGreaterThanOrEqual((await headerBottom(page)) - 1);
    });
  }

  test('an in-page link lands below the header', async ({ page }) => {
    await page.goto('/en/what-we-do/');
    await page.mouse.wheel(0, 600);
    await page.evaluate(() => (location.hash = '#transitional'));
    await page.waitForTimeout(800);
    const top = await page.locator('#transitional').evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual((await headerBottom(page)) - 1);
  });

  test('without JavaScript the header is not sticky and the page still works', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/en/governance/');
    await page.mouse.wheel(0, 1500);
    await expect(page.locator('.site-header')).not.toBeInViewport();
    await expect(page.locator('#site-nav a').first()).toBeAttached();
    await context.close();
  });
});

test('mobile menu opened mid-page scrolls inside itself so every link is reachable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'desktop', 'the menu button only exists below 1024px');
  await page.goto('/fr/');
  await page.mouse.wheel(0, 1500);
  await page.locator('.nav-toggle').click();
  // Expand every section so the menu is as long as it gets.
  for (const button of await page.locator('.nav-sub-toggle').all()) await button.click();
  const last = page.locator('#site-nav a').last();
  await last.scrollIntoViewIfNeeded();
  await expect(last).toBeInViewport();
});

test.describe('desktop dropdowns', () => {
  for (const lang of ['fr', 'ar'] as const) {
    test(`${lang}: panels stay on screen and descriptions do not change link names`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop', 'dropdown panels exist from 1024px');
      await page.goto(`/${lang}/`);
      const width = page.viewportSize()!.width;
      const toggles = page.locator('.nav-sub-toggle');
      for (let i = 0; i < (await toggles.count()); i++) {
        const toggle = toggles.nth(i);
        await toggle.click();
        const panel = page.locator(`#${await toggle.getAttribute('aria-controls')}`);
        await expect(panel).toBeVisible();
        const box = (await panel.boundingBox())!;
        expect(box.x, `panel ${i} left edge`).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width, `panel ${i} right edge`).toBeLessThanOrEqual(width);
        await expect(panel.locator('.nav-sub-desc').first()).toBeVisible();
        // The accessible name is the short label only; the description is a visual hint.
        const first = panel.locator('a').first();
        const label = (await first.locator('.nav-sub-label').textContent())!.trim();
        await expect(first).toHaveAccessibleName(label);
        await page.keyboard.press('Escape');
        await expect(panel).toBeHidden();
      }
    });
  }

  test('the compact header shows the mark only once stuck', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'desktop only');
    await page.goto('/en/');
    await expect(page.locator('.nav-mark')).toBeHidden();
    await page.mouse.wheel(0, 1200);
    await expect(page.locator('.nav-mark')).toBeVisible();
  });
});

test.describe('motion', () => {
  // The styleguide page exists only in the drafts build (port 4412).
  const styleguide = 'http://localhost:4412/styleguide/en/';

  test('reveal animations run only when motion is allowed', async ({ browser }) => {
    for (const reducedMotion of ['no-preference', 'reduce'] as const) {
      const context = await browser.newContext({ reducedMotion });
      const page = await context.newPage();
      await page.goto(styleguide);
      const name = await page.locator('.reveal').first().evaluate((el) => getComputedStyle(el).animationName);
      expect(name, reducedMotion).toBe(reducedMotion === 'reduce' ? 'none' : 'reveal');
      await context.close();
    }
  });

  test('revealed items end fully visible once scrolled into view', async ({ page }) => {
    await page.goto(styleguide);
    const item = page.locator('.reveal').last();
    await item.scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 400);
    await expect.poll(() => item.evaluate((el) => Number(getComputedStyle(el).opacity))).toBe(1);
  });

  test('without JavaScript nothing is hidden', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(styleguide);
    for (const item of await page.locator('.reveal').all()) expect(await item.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
    await context.close();
  });
});
