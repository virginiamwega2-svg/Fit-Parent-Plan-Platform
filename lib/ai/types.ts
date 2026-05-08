export type CheckIn = {
  /** Free-form text the parent provides — typed or transcribed from voice. */
  text: string;
  /** Optional structured signals the UI may pass. */
  minutesAvailable?: number;
};

export type Equipment = "none" | "dumbbells" | "bands" | "full-gym";

export type WorkoutInput = {
  minutesAvailable: number;
  equipment: Equipment;
  /** 1 (wiped) – 5 (fresh). Drives intensity. */
  energy: number;
  /** Optional free-text constraint, e.g. "back is tight". */
  notes?: string;
};

export type AiPlan = {
  /** One-sentence headline the parent reads first. */
  headline: string;
  /** 2–4 short bullets describing today's plan. */
  steps: string[];
  /** Why the AI made this choice — surfaced behind an "Explain why" toggle. */
  reasoning: string;
  /** Confidence 0–1. Drives "I'm 70% sure — confirm?" UI. */
  confidence: number;
};

export type PlanResult = {
  plan: AiPlan;
  /** Source: "live" (real Claude call) or "mock" (no API key fallback). */
  source: "live" | "mock";
  /** Tokens consumed — 0 for mock. */
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  latencyMs: number;
};
