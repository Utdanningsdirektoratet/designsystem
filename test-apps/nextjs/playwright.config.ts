import { defineConfig } from 'playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      // Each browser engine enforces a CSP with its own code, so check the CSP in a second one
      name: 'firefox',
      use: { browserName: 'firefox' },
      testMatch: 'csp.spec.ts',
    },
  ],
  webServer: {
    command: 'next start',
    port: 3000,
    reuseExistingServer: false,
  },
});
