import "server-only";

import Anthropic from "@anthropic-ai/sdk";
import { aiConfig, estimateCostUsd, hasApiKey } from "./config";
import {
  ADAPT_SYSTEM_PROMPT,
  COACH_SYSTEM_PROMPT,
  WORKOUT_SYSTEM_PROMPT,
  buildAdaptUserPrompt,
  buildUserPrompt,
  buildWorkoutUserPrompt,
} from "./prompts";
import type { AdaptInput, AiPlan, CheckIn, PlanResult, WorkoutInput } from "./types";

let cachedClient: Anthropic | null = null;
function getClient() {
  if (!cachedClient) {
    cachedClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return cachedClient;
}

function clampConfidence(n: unknown): number {
  const v = typeof n === "number" ? n : 0.5;
  return Math.max(0, Math.min(1, v));
}

function parsePlan(raw: string): AiPlan {
  // Be defensive — Claude is good but JSON-around-text happens occasionally.
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  const slice = start >= 0 && end > start ? raw.slice(start, end + 1) : raw;
  const parsed = JSON.parse(slice) as Partial<AiPlan>;
  return {
    headline: String(parsed.headline ?? "Here's a plan for today."),
    steps: Array.isArray(parsed.steps) ? parsed.steps.slice(0, 5).map(String) : [],
    reasoning: String(parsed.reasoning ?? ""),
    confidence: clampConfidence(parsed.confidence),
    nudge: parsed.nudge ? String(parsed.nudge) : undefined,
  };
}

function mockPlan(checkin: CheckIn): AiPlan {
  const minutes = checkin.minutesAvailable ?? 20;
  const tired = /tired|bad sleep|exhaust|up.*night|cough/i.test(checkin.text);
  if (tired) {
    return {
      headline: `${minutes}-minute mobility flow — recovery over intensity today.`,
      steps: [
        "5 min: slow walk + neck rolls + cat-cow",
        "8 min: hip openers, hamstring sweep, thoracic rotations",
        `${Math.max(2, minutes - 13)} min: box breathing 4-4-4-4 to reset`,
      ],
      reasoning:
        "You flagged poor sleep, so I prescribed recovery instead of strength. Mobility lowers cortisol and you'll get more from tomorrow's session for it.",
      confidence: 0.78,
      nudge: "If even this is too much, two minutes of slow nasal breathing in a quiet spot still counts.",
    };
  }
  return {
    headline: `${minutes}-minute strength block — short, simple, done.`,
    steps: [
      "3 min warm-up: arm circles, leg swings, 10 squats",
      `${Math.max(8, minutes - 6)} min: 4 rounds of 10 squats / 8 push-ups / 12 lunges`,
      "3 min cooldown: child's pose + hamstring stretch",
    ],
    reasoning:
      "Your check-in didn't flag fatigue, so I went with a compact strength session. Bodyweight only — fits your window with no setup.",
    confidence: 0.82,
    nudge: "If the window collapses, 20 squats + a 30-second plank in the kitchen is the fallback — that still counts.",
  };
}

function mockWorkout(input: WorkoutInput): AiPlan {
  const { minutesAvailable: m, equipment, energy, notes } = input;
  if (energy <= 2) {
    return {
      headline: `${m}-minute recovery session — low energy, gentle reset.`,
      steps: [
        "4 min: slow walk in place + arm circles + cat-cow",
        `${Math.max(6, m - 8)} min: hip openers, hamstring sweep, thoracic rotations`,
        "4 min: box breathing 4-4-4-4 + child's pose",
      ],
      reasoning: `Energy ${energy}/5 means recovery beats intensity today${notes ? `, plus you noted: ${notes}` : ""}. Mobility lowers tension and primes tomorrow.`,
      confidence: 0.8,
      nudge: "If you only get 3 minutes, do slow box breathing 4-4-4-4 — that alone resets your nervous system.",
    };
  }
  const equipmentLine =
    equipment === "dumbbells"
      ? `${Math.max(10, m - 6)} min: 4 rounds — 10 goblet squats, 8 DB rows/side, 10 push-ups`
      : equipment === "bands"
        ? `${Math.max(10, m - 6)} min: 4 rounds — 12 band squats, 12 band rows, 10 push-ups`
        : equipment === "full-gym"
          ? `${Math.max(10, m - 6)} min: 4 rounds — 8 goblet squats, 8 DB press, 10 ring rows`
          : `${Math.max(10, m - 6)} min: 4 rounds — 12 squats, 10 push-ups, 12 lunges, 30s plank`;
  return {
    headline: `${m}-minute strength block — ${equipment === "none" ? "bodyweight" : equipment}, energy ${energy}/5.`,
    steps: ["3 min warm-up: arm circles, leg swings, 10 squats", equipmentLine, "3 min cooldown: hamstring stretch + child's pose"],
    reasoning: `Energy ${energy}/5 supports a moderate strength session${notes ? `; adapted around: ${notes}` : ""}. Picked ${equipment === "none" ? "bodyweight" : equipment} per your setup.`,
    confidence: 0.82,
    nudge: "If the day folds, 1 round of the main block in 4 minutes still earns the day.",
  };
}

export async function generateWorkout(input: WorkoutInput): Promise<PlanResult> {
  const start = Date.now();

  if (!hasApiKey()) {
    return {
      plan: mockWorkout(input),
      source: "mock",
      inputTokens: 0,
      outputTokens: 0,
      costUsd: 0,
      latencyMs: Date.now() - start,
    };
  }

  try {
    const client = getClient();
    const response = await client.messages.create({
      model: aiConfig.model,
      max_tokens: aiConfig.maxTokens,
      system: WORKOUT_SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildWorkoutUserPrompt(input) }],
    });
    const textBlock = response.content.find((b) => b.type === "text");
    const raw = textBlock && "text" in textBlock ? textBlock.text : "";
    const plan = parsePlan(raw);
    const inputTokens = response.usage.input_tokens;
    const outputTokens = response.usage.output_tokens;
    return {
      plan,
      source: "live",
      inputTokens,
      outputTokens,
      costUsd: estimateCostUsd(inputTokens, outputTokens),
      latencyMs: Date.now() - start,
    };
  } catch (err) {
    console.warn("Anthropic workout call failed, falling back to mock:", err);
    return {
      plan: mockWorkout(input),
      source: "mock",
      inputTokens: 0,
      outputTokens: 0,
      costUsd: 0,
      latencyMs: Date.now() - start,
    };
  }
}

function mockAdapt(input: AdaptInput): AiPlan {
  const skipped = /skip|missed|didn'?t|couldn'?t|busy|sick|tired/i.test(input.update);
  const m = input.minutesAvailable;
  if (skipped) {
    return {
      headline: `${m}-minute reset — easier than last time, no make-ups.`,
      steps: [
        "3 min easy walk + arm circles",
        `${Math.max(6, m - 6)} min: 3 rounds — 10 squats, 6 push-ups (knees ok), 30s plank`,
        "3 min stretch: hamstrings + hips",
      ],
      reasoning: `You flagged a missed/hard session, so today resets at a lower bar instead of stacking. ${input.previousHeadline.replace(/\.$/, "")} is paused — get one easy win first.`,
      confidence: 0.78,
      nudge: "If even this is too much, do 5 minutes of slow walking — momentum beats perfection.",
    };
  }
  return {
    headline: `${m}-minute progression — small step up from last time.`,
    steps: [
      "3 min warm-up: dynamic stretches, 10 squats",
      `${Math.max(8, m - 6)} min: 4 rounds — 12 squats, 10 push-ups, 14 lunges, 35s plank`,
      "3 min cooldown: child's pose + thoracic rotations",
    ],
    reasoning: `Last session ("${input.previousHeadline.replace(/\.$/, "")}") went well, so today nudges volume up by ~10–15% — gradual progression keeps you injury-free.`,
    confidence: 0.82,
    nudge: "If today folds, repeat last week's session as-is — staying consistent beats progressing.",
  };
}

export async function adaptPlan(input: AdaptInput): Promise<PlanResult> {
  const start = Date.now();

  if (!hasApiKey()) {
    return {
      plan: mockAdapt(input),
      source: "mock",
      inputTokens: 0,
      outputTokens: 0,
      costUsd: 0,
      latencyMs: Date.now() - start,
    };
  }

  try {
    const client = getClient();
    const response = await client.messages.create({
      model: aiConfig.model,
      max_tokens: aiConfig.maxTokens,
      system: ADAPT_SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildAdaptUserPrompt(input) }],
    });
    const textBlock = response.content.find((b) => b.type === "text");
    const raw = textBlock && "text" in textBlock ? textBlock.text : "";
    const plan = parsePlan(raw);
    const inputTokens = response.usage.input_tokens;
    const outputTokens = response.usage.output_tokens;
    return {
      plan,
      source: "live",
      inputTokens,
      outputTokens,
      costUsd: estimateCostUsd(inputTokens, outputTokens),
      latencyMs: Date.now() - start,
    };
  } catch (err) {
    console.warn("Anthropic adapt call failed, falling back to mock:", err);
    return {
      plan: mockAdapt(input),
      source: "mock",
      inputTokens: 0,
      outputTokens: 0,
      costUsd: 0,
      latencyMs: Date.now() - start,
    };
  }
}

export async function generatePlan(checkin: CheckIn): Promise<PlanResult> {
  const start = Date.now();

  if (!hasApiKey()) {
    return {
      plan: mockPlan(checkin),
      source: "mock",
      inputTokens: 0,
      outputTokens: 0,
      costUsd: 0,
      latencyMs: Date.now() - start,
    };
  }

  try {
    const client = getClient();
    const response = await client.messages.create({
      model: aiConfig.model,
      max_tokens: aiConfig.maxTokens,
      system: COACH_SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserPrompt(checkin.text, checkin.minutesAvailable) }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const raw = textBlock && "text" in textBlock ? textBlock.text : "";
    const plan = parsePlan(raw);

    const inputTokens = response.usage.input_tokens;
    const outputTokens = response.usage.output_tokens;

    return {
      plan,
      source: "live",
      inputTokens,
      outputTokens,
      costUsd: estimateCostUsd(inputTokens, outputTokens),
      latencyMs: Date.now() - start,
    };
  } catch (err) {
    // Live call failed (bad key, parse error, network) — degrade to mock
    // instead of breaking the user-facing flow. Log the real cause server-side.
    console.warn("Anthropic call failed, falling back to mock:", err);
    return {
      plan: mockPlan(checkin),
      source: "mock",
      inputTokens: 0,
      outputTokens: 0,
      costUsd: 0,
      latencyMs: Date.now() - start,
    };
  }
}
