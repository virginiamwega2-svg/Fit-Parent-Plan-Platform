import "server-only";

// Pricing in USD per million tokens — Claude Haiku 4.5 (Jan 2026).
// Update if you switch models. Used for the cost-per-call widget.
const HAIKU_INPUT_PER_MTOK = 1.0;
const HAIKU_OUTPUT_PER_MTOK = 5.0;

export const aiConfig = {
  model: "claude-haiku-4-5-20251001",
  maxTokens: 600,
  // Hard daily ceiling per IP/user. Graceful degradation when hit.
  dailyRequestCeiling: 30,
  // ~0.10 USD per call ceiling — guards against runaway prompts.
  perCallCostCeilingUsd: 0.1,
} as const;

export function hasApiKey() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export function estimateCostUsd(inputTokens: number, outputTokens: number) {
  const input = (inputTokens / 1_000_000) * HAIKU_INPUT_PER_MTOK;
  const output = (outputTokens / 1_000_000) * HAIKU_OUTPUT_PER_MTOK;
  return Number((input + output).toFixed(6));
}
