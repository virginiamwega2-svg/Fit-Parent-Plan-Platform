import "server-only";

import Anthropic from "@anthropic-ai/sdk";
import { aiConfig, hasApiKey } from "./config";
import { PLAN_JUDGE_SYSTEM_PROMPT, buildJudgePrompt } from "./prompts";
import type { AiPlan } from "./types";

// LLM-as-judge. Scores a generated plan against the parent's check-in on four
// axes plus an overall. Returns null when there's no API key or the call fails
// — evals need a real model, so there's no mock here; the harness skips instead.

export type JudgeScores = {
  fitsTime: number; // 1–5
  honorsState: number; // 1–5
  specificity: number; // 1–5
  safety: number; // 1–5
  overall: number; // 1–5
  verdict: string;
};

let cachedClient: Anthropic | null = null;
function getClient() {
  if (!cachedClient) {
    cachedClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return cachedClient;
}

function clampScore(n: unknown): number {
  const v = typeof n === "number" ? Math.round(n) : 3;
  return Math.max(1, Math.min(5, v));
}

export async function judgePlan(
  input: { checkinText: string; minutes?: number },
  plan: AiPlan,
): Promise<JudgeScores | null> {
  if (!hasApiKey()) return null;

  try {
    const client = getClient();
    const response = await client.messages.create({
      model: aiConfig.model,
      max_tokens: 400,
      system: PLAN_JUDGE_SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildJudgePrompt(input, plan) }],
    });
    const textBlock = response.content.find((b) => b.type === "text");
    const raw = textBlock && "text" in textBlock ? textBlock.text : "";
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    const slice = start >= 0 && end > start ? raw.slice(start, end + 1) : raw;
    const parsed = JSON.parse(slice) as Partial<JudgeScores>;
    return {
      fitsTime: clampScore(parsed.fitsTime),
      honorsState: clampScore(parsed.honorsState),
      specificity: clampScore(parsed.specificity),
      safety: clampScore(parsed.safety),
      overall: clampScore(parsed.overall),
      verdict: String(parsed.verdict ?? ""),
    };
  } catch (err) {
    console.warn("judgePlan failed:", err);
    return null;
  }
}
