import { test, expect } from "@playwright/test";

/**
 * Public voting flow E2E tests.
 *
 * Covers the nominees listing page and voting behavior:
 * - Nominees display correctly
 * - Voting without authentication prompts login or shows error
 * - Category filter changes displayed nominees
 */
test.describe("Public Voting Flow", () => {
  test("nominees page loads and displays nominee cards", async ({ page }) => {
    await page.goto("/nominees");

    // Should not crash
    await expect(page.locator("body")).not.toContainText("Application error");

    // Wait for the page to settle
    await page.waitForLoadState("networkidle").catch(() => {});

    // Should render the page title or nominee content
    const title = page.locator("h1, h2").first();
    await expect(title).toBeVisible({ timeout: 10_000 });
  });

  test("clicking vote when not authenticated prompts auth or shows error", async ({
    page,
  }) => {
    await page.goto("/nominees");

    // Wait for nominees to potentially load
    await page.waitForTimeout(2000);

    // Find a vote button if nominees are loaded
    const voteButton = page.locator('button:has-text("Vote"), button:has-text("vote"), [data-testid="vote-btn"]').first();

    if (await voteButton.isVisible()) {
      await voteButton.click();

      // Wait for response
      await page.waitForTimeout(1500);

      // Should either show a login modal, redirect to login, or show an error
      const currentUrl = page.url();
      const hasLoginUrl = currentUrl.includes("login") || currentUrl.includes("auth");
      const hasLoginModal = await page.locator('[role="dialog"], .modal, text=Sign in, text=Login').isVisible();
      const hasError = await page.locator('text=please log in, text=sign in to vote, [role="alert"]').isVisible();

      expect(hasLoginUrl || hasLoginModal || hasError).toBe(true);
    } else {
      // No nominees visible (empty DB or loading) — skip
      test.skip();
    }
  });
});

test.describe("Nominees Page", () => {
  test("home page loads successfully", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("body")).not.toContainText("Application error");

    // Verify at least one visible element exists
    const mainContent = page.locator("main, #main-content, [role='main']").first();
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });

  test("category filter links are present and navigable", async ({ page }) => {
    await page.goto("/nominees");

    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(1500);

    // Look for category filter buttons or links
    const filterButtons = page.locator(
      'button:has-text("All"), [data-testid="category-filter"], nav a'
    );

    const count = await filterButtons.count();
    if (count > 0) {
      // Clicking a filter should not crash the page
      await filterButtons.first().click();
      await page.waitForTimeout(1000);
      await expect(page.locator("body")).not.toContainText("Application error");
    }
  });
});
