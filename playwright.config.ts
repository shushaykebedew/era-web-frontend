import { defineConfig, devices } from "@playwright/test";

/**
 * Web Frontend E2E Configuration
 *
 * Tests run against the web frontend at http://localhost:3000
 * which in turn communicates with the backend at http://localhost:3000.
 *
 * Run: npm run test:e2e
 * Requires: backend server and web frontend dev server to be running.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false, // Run sequentially to avoid state conflicts
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  timeout: 30_000,
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "on-first-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
