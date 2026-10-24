import { defineConfig, devices } from '@playwright/test';

// In the cloud container the bundled browser build can differ from the one Playwright expects;
// PW_CHROMIUM lets CI or a sandbox point at an installed binary instead of downloading one.
const executablePath = process.env['PW_CHROMIUM'];

export default defineConfig({
  testDir: 'tests',
  // Visual baselines are Linux screenshots from CI, so @visual tests run only where VISUAL=1 (CI).
  ...(process.env['VISUAL'] ? {} : { grepInvert: /@visual/ }),
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:4411', launchOptions: executablePath ? { executablePath } : {} },
  // Ports 4411–4413, not 4321, so a running `astro dev` is never reused by mistake.
  webServer: [
    { command: 'node scripts/serve.mjs dist 4411', url: 'http://localhost:4411/fr/', reuseExistingServer: true },
    // Drafts build (npm run build:drafts) to exercise the news templates with sample articles.
    { command: 'node scripts/serve.mjs dist-drafts 4412', url: 'http://localhost:4412/fr/', reuseExistingServer: true },
    // Fixtures build (npm run build:fixtures): uneven article counts for pagination and hreflang.
    { command: 'node scripts/serve.mjs dist-fixtures 4413', url: 'http://localhost:4413/fr/', reuseExistingServer: true },
  ],
  projects: [
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 800 } } },
    { name: 'tablet', use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1000 } } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
  ],
});
