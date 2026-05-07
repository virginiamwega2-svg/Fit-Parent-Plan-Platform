import { describe, it, expect } from "vitest";
import { generatePlan } from "@/lib/ai/adapter";
import { estimateCostUsd } from "@/lib/ai/config";

describe("generatePlan (mock fallback)", () => {
  it("returns a recovery plan when the parent flags poor sleep", async () => {
    const result = await generatePlan({
      text: "Slept badly, kids were up all night, totally exhausted",
      minutesAvailable: 20,
    });
    expect(result.source).toBe("mock");
    expect(result.plan.headline.toLowerCase()).toMatch(/mobility|recovery/);
    expect(result.plan.steps.length).toBeGreaterThan(0);
    expect(result.plan.confidence).toBeGreaterThan(0);
    expect(result.plan.confidence).toBeLessThanOrEqual(1);
    expect(result.costUsd).toBe(0);
  });

  it("returns a strength plan when no fatigue is mentioned", async () => {
    const result = await generatePlan({
      text: "Feeling good, want to move",
      minutesAvailable: 25,
    });
    expect(result.source).toBe("mock");
    expect(result.plan.headline.toLowerCase()).toMatch(/strength|block/);
    expect(result.plan.steps.length).toBeGreaterThanOrEqual(2);
  });

  it("respects minutesAvailable in the headline", async () => {
    const result = await generatePlan({ text: "ready to go", minutesAvailable: 15 });
    expect(result.plan.headline).toContain("15");
  });
});

describe("estimateCostUsd", () => {
  it("computes cost from input and output tokens", () => {
    // 1k input + 1k output @ Haiku pricing => ~0.001 + 0.005 = 0.006 USD
    const cost = estimateCostUsd(1000, 1000);
    expect(cost).toBeCloseTo(0.006, 5);
  });

  it("returns 0 for zero tokens", () => {
    expect(estimateCostUsd(0, 0)).toBe(0);
  });
});
