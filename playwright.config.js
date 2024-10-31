import { defineConfig, devices } from '@playwright/test'

const port = 3000

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'test/e2e',

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: Boolean(process.env.CI),

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'list',

  globalSetup: './test/e2e/globalSetup.js',
  // globalTeardown: './test/e2e/globalTeardown.js',

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: `http://localhost:${port}`,

    // Collect trace when retrying the failed test.
    // trace: 'on-first-retry',
    trace: 'on-first-retry'
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  // Run your local dev server before starting the tests.
  webServer: {
    command: `npx vite --port ${port}`,
    timeout: 10 * 1000,
    port,
    reuseExistingServer: !process.env.CI
  }
})
