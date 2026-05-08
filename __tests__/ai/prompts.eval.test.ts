/**
 * Prompt evals — pinned shape contracts + named case behaviors for every
 * AI output path. These run in CI against the mock fallback (no API key
 * present in tests), but the mock is hand-shaped to mirror what we expect
 * the live model to produce. When we change a prompt or the mock, this
 * suite is the regression net.
 *
 * What an eval guards that a unit test doesn't:
 *  1. Invariants applied to the *whole population* of canonical inputs,
 *     not just one cherry-picked case ("every output, regardless of input,
 *     must have a non-empty headline, 2–5 steps, and confidence ∈ [0,1]").
 *  2. Named case expectations ("the sleep-deprived input prescribes
 *     recovery, never strength").
 *  3. A summary printout so a human can spot-check qualitative drift.
 */

import { describe, it, expect } from "vitest";
import { adaptPlan, generatePlan, generateWorkout } from "@/lib/ai/adapter";
import type { AiPlan } from "@/lib/ai/types";

/* ────────────────────────────────────────────────────────────────────
 * Shared invariants — every plan, regardless of which path, must satisfy
 * ──────────────────────────────────────────────────────────────────── */

function assertPlanContract(plan: AiPlan, label: string) {
  expect(plan.headline, `${label}: headline`).toBeTypeOf("string");
  expect(plan.headline.length, `${label}: headline non-empty`).toBeGreaterThan(8);
  expect(plan.headline.length, `${label}: headline not bloated`).toBeLessThan(140);

  expect(Array.isArray(plan.steps), `${label}: steps array`).toBe(true);
  expect(plan.steps.length, `${label}: steps min`).toBeGreaterThanOrEqual(2);
  expect(plan.steps.length, `${label}: steps max`).toBeLessThanOrEqual(5);
  for (const step of plan.steps) {
    expect(typeof step, `${label}: step is string`).toBe("string");
    expect(step.trim().length, `${label}: step non-empty`).toBeGreaterThan(4);
  }

  expect(typeof plan.reasoning, `${label}: reasoning string`).toBe("string");
  expect(plan.reasoning.length, `${label}: reasoning non-empty`).toBeGreaterThan(20);

  expect(plan.confidence, `${label}: confidence range`).toBeGreaterThanOrEqual(0);
  expect(plan.confidence, `${label}: confidence range`).toBeLessThanOrEqual(1);

  // Smart nudge — the brand-defining "if today folds" fallback.
  // Optional in the type but should always be present in our outputs.
  expect(plan.nudge, `${label}: nudge present`).toBeTruthy();
  expect(plan.nudge!.trim().length, `${label}: nudge non-empty`).toBeGreaterThan(8);
}

/* ────────────────────────────────────────────────────────────────────
 * Plan eval — the home check-in flow
 * ──────────────────────────────────────────────────────────────────── */

const PLAN_CASES = [
  {
    name: "sleep-deprived",
    input: "Slept 4 hours, baby up all night, completely wiped",
    minutes: 20,
    expect: {
      mustMatch: /mobility|recovery|breathing|gentle|stretch/i,
      mustNotMatch: /HIIT|sprint|intense/i,
      reason: "Poor sleep → recovery, never intensity",
    },
  },
  {
    name: "fresh-and-ready",
    input: "Feeling great, kids at school, want to move",
    minutes: 25,
    expect: {
      mustMatch: /strength|squat|push|round/i,
      reason: "No fatigue flagged → moderate strength",
    },
  },
  {
    name: "tight-time-window",
    input: "12 minutes before pickup, no equipment",
    minutes: 12,
    expect: {
      mustContain: "12",
      reason: "Headline must respect the minutes constraint",
    },
  },
  {
    name: "long-window",
    input: "Have a real 45 minutes, feeling decent",
    minutes: 45,
    expect: {
      mustContain: "45",
      reason: "Headline must respect the minutes constraint",
    },
  },
] as const;

describe("eval: generatePlan", () => {
  for (const c of PLAN_CASES) {
    it(`[${c.name}] satisfies contract + case expectations`, async () => {
      const r = await generatePlan({ text: c.input, minutesAvailable: c.minutes });
      expect(r.source).toBe("mock");
      assertPlanContract(r.plan, c.name);

      const haystack = `${r.plan.headline} ${r.plan.steps.join(" ")} ${r.plan.reasoning}`;

      if ("mustMatch" in c.expect) {
        expect(haystack, `${c.name}: ${c.expect.reason}`).toMatch(c.expect.mustMatch);
      }
      if ("mustNotMatch" in c.expect) {
        expect(haystack, `${c.name}: ${c.expect.reason}`).not.toMatch(c.expect.mustNotMatch);
      }
      if ("mustContain" in c.expect) {
        expect(r.plan.headline, `${c.name}: ${c.expect.reason}`).toContain(c.expect.mustContain);
      }
    });
  }

  it("[population] every plan returns honest cost + telemetry", async () => {
    for (const c of PLAN_CASES) {
      const r = await generatePlan({ text: c.input, minutesAvailable: c.minutes });
      expect(r.costUsd, `${c.name}: mock cost`).toBe(0);
      expect(r.latencyMs, `${c.name}: latency reported`).toBeGreaterThanOrEqual(0);
      expect(r.inputTokens, `${c.name}: token count`).toBe(0);
    }
  });
});

/* ────────────────────────────────────────────────────────────────────
 * Workout eval — energy + equipment matrix
 * ──────────────────────────────────────────────────────────────────── */

const WORKOUT_CASES = [
  {
    name: "low-energy",
    input: { minutesAvailable: 20, equipment: "none", energy: 1 },
    expect: { mustMatch: /recovery|mobility|breathing/i, reason: "energy 1 → recovery only" },
  },
  {
    name: "low-energy-with-notes",
    input: { minutesAvailable: 15, equipment: "none", energy: 2, notes: "back is sore" },
    expect: { mustMatch: /back|sore|tight|gentle|recovery/i, reason: "respects soreness note" },
  },
  {
    name: "moderate-bodyweight",
    input: { minutesAvailable: 22, equipment: "none", energy: 3 },
    expect: { mustMatch: /squat|push|lunge|plank/i, reason: "bodyweight strength block" },
  },
  {
    name: "dumbbells-fresh",
    input: { minutesAvailable: 30, equipment: "dumbbells", energy: 4 },
    expect: { mustMatch: /goblet|DB|dumbbell|row/i, reason: "uses the equipment they have" },
  },
] as const;

describe("eval: generateWorkout", () => {
  for (const c of WORKOUT_CASES) {
    it(`[${c.name}] satisfies contract + case expectations`, async () => {
      const r = await generateWorkout(c.input as Parameters<typeof generateWorkout>[0]);
      expect(r.source).toBe("mock");
      assertPlanContract(r.plan, c.name);

      const haystack = `${r.plan.headline} ${r.plan.steps.join(" ")} ${r.plan.reasoning}`;
      expect(haystack, `${c.name}: ${c.expect.reason}`).toMatch(c.expect.mustMatch);
    });
  }
});

/* ────────────────────────────────────────────────────────────────────
 * Adapt eval — failure-aware progression
 * ──────────────────────────────────────────────────────────────────── */

const PREVIOUS_PLAN = {
  headline: "20-minute strength block — short, simple, done.",
  steps: [
    "3 min warm-up: arm circles, leg swings, 10 squats",
    "14 min: 4 rounds of 10 squats / 8 push-ups / 12 lunges",
    "3 min cooldown: child's pose + hamstring stretch",
  ],
};

const ADAPT_CASES = [
  {
    name: "skipped-week",
    input: {
      ...PREVIOUS_PLAN,
      previousHeadline: PREVIOUS_PLAN.headline,
      previousSteps: PREVIOUS_PLAN.steps,
      update: "Skipped most of last week, kids were sick the whole time",
      minutesAvailable: 20,
    },
    expect: {
      mustMatch: /reset|easier|smaller|paus/i,
      mustNotMatch: /increase|progress|push harder/i,
      reason: "Skipped → reset lower, never stack the missed work",
    },
  },
  {
    name: "crushed-it",
    input: {
      ...PREVIOUS_PLAN,
      previousHeadline: PREVIOUS_PLAN.headline,
      previousSteps: PREVIOUS_PLAN.steps,
      update: "Felt strong, did all 4 rounds with energy left over",
      minutesAvailable: 22,
    },
    expect: {
      mustMatch: /progress|step up|nudge|volume|increase|small step/i,
      reason: "Strong week → small progression",
    },
  },
] as const;

describe("eval: adaptPlan", () => {
  for (const c of ADAPT_CASES) {
    it(`[${c.name}] satisfies contract + case expectations`, async () => {
      const r = await adaptPlan(c.input);
      expect(r.source).toBe("mock");
      assertPlanContract(r.plan, c.name);

      const haystack = `${r.plan.headline} ${r.plan.steps.join(" ")} ${r.plan.reasoning}`;
      if ("mustMatch" in c.expect) {
        expect(haystack, `${c.name}: ${c.expect.reason}`).toMatch(c.expect.mustMatch);
      }
      if ("mustNotMatch" in c.expect) {
        expect(haystack, `${c.name}: ${c.expect.reason}`).not.toMatch(c.expect.mustNotMatch);
      }
    });
  }
});
