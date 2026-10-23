import { defineConfig, devices } from '@playwright/test';

// In the cloud container the bundled browser build can differ from the one Playwright expects;
// PW_CHROMIUM lets CI or a sandbox point at an installed binary instead of downloading one.
const executablePath = process.env['PW_CHROMIUM'];

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:4321', launchOptions: executablePath ? { executablePath } : {} },
  webServer: { command: 'npx astro preview --port 4321', url: 'http://localhost:4321/fr/', reuseExistingServer: true },
  projects: [
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 800 } } },
    { name: 'tablet', use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1000 } } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
  ],
});
