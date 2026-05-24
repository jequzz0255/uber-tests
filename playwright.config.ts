import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://www.uber.com/pl/pl/',
    headless: false,
  },
  reporter: [['html', { open: 'always' }]],
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          slowMo: 500,
        },
      },
    },
  ],
});