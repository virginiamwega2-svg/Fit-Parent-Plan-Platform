import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // ── Hero ────────────────────────────────────────────────────────────
  test("hero loads with headline and CTA", async ({ page }) => {
    await expect(page.getByText("Twenty minutes.")).toBeVisible();
    await expect(page.getByText("Built for parents.")).toBeVisible();
    await expect(page.getByRole("link", { name: /apply now/i })).toBeVisible();
  });

  test("hero trust line is visible", async ({ page }) => {
    await expect(
      page.locator("#section-hero").getByText(/14-day guarantee/i)
    ).toBeVisible();
  });

  // ── Navigation (desktop only — mobile nav requires hamburger) ───────
  test("nav CTA links to apply section", async ({ page }) => {
    const cta = page.locator("header a", { hasText: /apply/i }).first();
    await expect(cta).toHaveAttribute("href", "#apply");
  });

  test("Price nav link scrolls to pricing section", async ({ page, viewport }) => {
    // On mobile viewports the desktop nav is hidden — open hamburger first
    if (viewport && viewport.width < 1024) {
      await page.getByRole("button", { name: /toggle navigation/i }).click();
      await page.locator("nav").last().getByRole("link", { name: "Price" }).click();
    } else {
      await page.locator("header").getByRole("link", { name: "Price" }).click();
    }
    await expect(page.locator("#section-offer")).toBeInViewport({ timeout: 5000 });
  });

  test("FAQ nav link scrolls to FAQ section", async ({ page, viewport }) => {
    if (viewport && viewport.width < 1024) {
      await page.getByRole("button", { name: /toggle navigation/i }).click();
      await page.locator("nav").last().getByRole("link", { name: "FAQ" }).click();
    } else {
      await page.locator("header").getByRole("link", { name: "FAQ" }).click();
    }
    await expect(page.locator("#section-faq")).toBeInViewport({ timeout: 5000 });
  });

  // ── Sections present ────────────────────────────────────────────────
  test("all 8 sections render", async ({ page }) => {
    for (const id of [
      "#section-fit",
      "#section-what",
      "#section-results",
      "#section-how",
      "#section-team",
      "#section-offer",
      "#section-faq",
      "#apply",
    ]) {
      await expect(page.locator(id)).toBeAttached();
    }
  });

  test("pricing shows $199", async ({ page }) => {
    await expect(page.getByText("$199")).toBeVisible();
  });

  test("coaches section shows 3 coaches", async ({ page }) => {
    await expect(page.getByText("Maya Grant")).toBeVisible();
    await expect(page.getByText("Chris Dalton")).toBeVisible();
    await expect(page.getByText("Leah Shaw")).toBeVisible();
  });

  // ── FitQuiz ─────────────────────────────────────────────────────────
  test("fit quiz completes and shows result", async ({ page }) => {
    await page.locator("#apply").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "3 days" }).click();
    await page.getByRole("button", { name: "Lose fat" }).click();
    await page.getByRole("button", { name: "Not enough time" }).click();
    await expect(page.getByText(/sounds like a strong fit/i)).toBeVisible();
  });

  // ── FAQ accordion ───────────────────────────────────────────────────
  test("FAQ accordion opens and shows answer", async ({ page }) => {
    await page.locator("#section-faq").scrollIntoViewIfNeeded();
    await page.getByText("What if I miss a week?").click();
    await expect(page.getByText(/built for messy weeks/i)).toBeVisible();
  });

  // ── Footer ──────────────────────────────────────────────────────────
  test("footer quick links are present", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.getByRole("link", { name: "Pricing" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "How it works" })).toBeVisible();
  });

  test("footer copyright is present", async ({ page }) => {
    await page.locator("footer").scrollIntoViewIfNeeded();
    // Match the copyright line specifically (contains ©)
    await expect(page.getByText(/fit parent plan © 2026/i)).toBeVisible();
  });
});

test.describe("Homepage — Mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("mobile nav opens and shows links", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /toggle navigation/i }).click();
    const mobileNav = page.locator("nav").last();
    await expect(mobileNav.getByRole("link", { name: "How it works" })).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Results" })).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Price" })).toBeVisible();
  });

  test("mobile nav closes after tapping a link", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /toggle navigation/i }).click();
    const mobileNav = page.locator("nav").last();
    await mobileNav.getByRole("link", { name: "FAQ" }).click();
    // Nav wrapper collapses via max-h-0 — check the wrapper is no longer expanded
    await expect(mobileNav).toHaveCSS("max-height", "0px", { timeout: 3000 });
  });

  test("sticky apply CTA is visible on mobile", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Apply now").last()).toBeVisible();
  });
});
