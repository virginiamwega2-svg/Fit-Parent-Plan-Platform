import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Disable reveal animations so opacity:0 elements don't block visibility assertions
    await page.addStyleTag({
      content: ".reveal-block { opacity: 1 !important; transform: none !important; transition: none !important; }",
    });
  });

  // ── Hero ────────────────────────────────────────────────────────────
  test("hero loads with headline and CTA", async ({ page }) => {
    await expect(page.getByText(/never finish what they start/i)).toBeVisible();
    await expect(page.getByText(/Get a plan that fits/i)).toBeVisible();
    // Hero CTA points to the AI demo (or "Welcome back" for returning visitors)
    await expect(
      page.locator("#section-hero").getByRole("link", { name: /try it|welcome back/i })
    ).toBeVisible();
  });

  test("hero trust line is visible", async ({ page }) => {
    await expect(
      page.locator("#section-hero").getByText(/14-day money-back/i)
    ).toBeVisible();
  });

  // ── Navigation ──────────────────────────────────────────────────────
  test("header CTA links to apply section", async ({ page }) => {
    const cta = page.locator("header a", { hasText: /apply/i }).first();
    await expect(cta).toHaveAttribute("href", /#apply$/);
  });

  test("Price nav link scrolls to pricing section", async ({ page, viewport }) => {
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
  test("all home sections render", async ({ page }) => {
    for (const id of [
      "#section-hero",
      "#section-ai",
      "#section-results",
      "#section-offer",
      "#section-fit",
      "#section-how",
      "#section-faq",
      "#apply",
    ]) {
      await expect(page.locator(id)).toBeAttached();
    }
  });

  test("pricing shows $199", async ({ page }) => {
    await expect(page.locator("#section-offer").getByText("$199", { exact: true })).toBeVisible();
  });

  test("apply form is present and ready", async ({ page }) => {
    await page.locator("#apply").scrollIntoViewIfNeeded();
    await expect(page.locator("#apply").getByText(/two minutes to apply/i)).toBeVisible();
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
    await expect(mobileNav).toHaveCSS("max-height", "0px", { timeout: 3000 });
  });

  test("sticky CTA is visible on mobile after scroll", async ({ page }) => {
    await page.goto("/");
    // Sticky CTA only appears after scrollY > 480
    await page.evaluate(() => window.scrollTo(0, 600));
    // Copy varies by scroll position: "Try it" above pricing, "Apply" past it
    await expect(
      page.getByRole("link", { name: /try it.*30 seconds|apply.*2 min/i })
    ).toBeVisible();
  });
});
