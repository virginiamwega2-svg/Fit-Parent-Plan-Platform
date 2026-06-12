import { describe, it, expect } from "vitest";
import { generatePlan } from "@/lib/ai/adapter";
import { judgePlan } from "@/lib/ai/judge";

// LLM-as-judge eval harness. Runs representative check-ins through the live
// coach and scores the output with a judge model, asserting a quality floor.
//
// Requires ANTHROPIC_API_KEY (real model calls), so the whole suite is SKIPPED
// when no key is present — local/CI runs without the secret stay green. Run it
// with the key set to get a scorecard:  ANTHROPIC_API_KEY=… npm test
const hasKey = Boolean(process.env.ANTHROPIC_API_KEY);

const SCENARIOS: { label: string; text: string; minutes: number }[] = [
  { label: "exhausted, tiny window", text: "Slept 4 hours, baby up all night. 12 minutes before the school run.", minutes: 12 },
  { label: "fresh, decent time", text: "Feeling strong, coffee in hand, kids still asleep. 25 minutes free.", minutes: 25 },
  { label: "no-jumping constraint", text: "Toddler napping. 20 min, no jumping or it's all over.", minutes: 20 },
  { label: "sore back", text: "Back is tight after carrying the toddler all day. 15 min, gentle please.", minutes: 15 },
  { label: "evening wind-down", text: "Just put them down. 15 min before I crash.", minutes: 15 },
];

describe.skipIf(!hasKey)("eval: LLM-judge scores live coach plans", () => {
  const overalls: number[] = [];

  for (const s of SCENARIOS) {
    it(
      `produces a quality plan — ${s.label}`,
      async () => {
        const result = await generatePlan({ text: s.text, minutesAvailable: s.minutes });
        const scores = await judgePlan({ checkinText: s.text, minutes: s.minutes }, result.plan);

        expect(scores, "judge returned a score").not.toBeNull();
        if (!scores) return;

        overalls.push(scores.overall);
        console.log(
          `[eval] ${s.label.padEnd(24)} overall ${scores.overall}/5  ` +
            `(time ${scores.fitsTime}, state ${scores.honorsState}, ` +
            `specific ${scores.specificity}, safe ${scores.safety}) — ${scores.verdict}`,
        );

        // Quality floor — lenient, since the judge is itself a model. Tune up
        // as the prompts improve.
        expect(scores.fitsTime, "plan should fit the time").toBeGreaterThanOrEqual(3);
        expect(scores.overall, "overall quality floor").toBeGreaterThanOrEqual(3);
      },
      45_000,
    );
  }

  it("averages a healthy overall across scenarios", () => {
    if (overalls.length === 0) return;
    const avg = overalls.reduce((a, b) => a + b, 0) / overalls.length;
    console.log(`[eval] mean overall: ${avg.toFixed(2)}/5 across ${overalls.length} scenarios`);
    expect(avg).toBeGreaterThanOrEqual(3.2);
  });
});
