import "server-only";

import Anthropic from "@anthropic-ai/sdk";
import { aiConfig, estimateCostUsd, hasApiKey } from "./config";
import { COACH_SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import type { AiPlan, CheckIn, PlanResult } from "./types";

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
  };
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
}
