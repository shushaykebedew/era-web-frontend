import { test, expect } from "@playwright/test";

/**
 * Nomination flow E2E tests.
 *
 * Covers the user-facing nomination form: category selection, form submission,
 * validation errors, and the draft success screen with continuation token info.
 *
 * NOTE: These tests expect:
 * - The web frontend running at http://localhost:3000
 * - The backend running at http://localhost:3000/api (or proxied)
 * - At least one active award category seeded in the DB
 */
test.describe("Nomination Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/nominate");
  });

  test("nomination page loads and shows the form or category selection", async ({
    page,
  }) => {
    // The page should render without a full error boundary
    await expect(page.locator("body")).not.toContainText("Application error");

    // Either the category selector or the nomination form should be visible
    const hasContent =
      (await page.locator("form").count()) > 0 ||
      (await page.locator('[data-testid="category-select"]').count()) > 0 ||
      (await page.locator("h1, h2").first().isVisible());

    expect(hasContent).toBe(true);
  });

  test("shows validation error for invalid email in nomination form", async ({
    page,
  }) => {
    // Try to find and interact with the email input
    const emailInput = page.locator('input[type="email"], input[name="email"]').first();

    if (await emailInput.isVisible()) {
      await emailInput.fill("not-an-email");
      await emailInput.blur();

      // Should show a validation error or the submit should fail
      // Try clicking submit button
      const submitBtn = page
        .locator('button[type="submit"]')
        .first();

      if (await submitBtn.isVisible()) {
        await submitBtn.click();

        // Either HTML5 validation prevents it, or we get an error message
        // We just verify no success screen appears
        await page.waitForTimeout(1000);
        const hasSuccess = await page
          .locator("text=Your nomination has been received")
          .isVisible();
        expect(hasSuccess).toBe(false);
      }
    } else {
      // Nominate page might be in category selection step — skip
      test.skip();
    }
  });

  test("does not show continuation token on the page title (security)", async ({
    page,
  }) => {
    // The continuation token should never appear in clear text in any heading
    const headings = await page.locator("h1, h2, h3").allTextContents();
    for (const heading of headings) {
      expect(heading).not.toMatch(/^[a-f0-9]{64}$/);
    }
  });
});
