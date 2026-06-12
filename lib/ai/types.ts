export type CheckIn = {
  /** Free-form text the parent provides — typed or transcribed from voice. */
  text: string;
  /** Optional structured signals the UI may pass. */
  minutesAvailable?: number;
};

export type Equipment = "none" | "dumbbells" | "bands" | "full-gym";

export type AdaptInput = {
  previousHeadline: string;
  previousSteps: string[];
  update: string;
  minutesAvailable: number;
};

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
  /** One-sentence "if today goes sideways, do X" fallback. Always actionable. */
  nudge?: string;
};

export type PantryInput = {
  /** Comma/newline separated pantry items the parent has on hand. */
  pantry: string;
  /** Total minutes the parent has including prep + cook. */
  minutesAvailable: number;
  /** Picky-eater mode — bias toward mild, familiar flavors. */
  pickyEater: boolean;
};

export type PantryMeal = {
  /** One-sentence name of the meal. */
  meal: string;
  /** 2–5 short, ordered cooking steps. */
  steps: string[];
  /** Items the parent likely needs but didn't list — the shopping snippet. */
  gapList: string[];
  /** Estimated total time in minutes. */
  timeMinutes: number;
  /** Why this meal fits the constraints — surfaced behind a toggle. */
  reasoning: string;
  /** Confidence 0–1. */
  confidence: number;
};

export type PantryResult = {
  meal: PantryMeal;
  source: "live" | "mock";
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  latencyMs: number;
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
  /**
   * Names of tools the coach agent called while building this plan (e.g.
   * "lookup_exercises"). Only set by the tool-calling path; undefined for the
   * single-shot and mock paths.
   */
  toolsUsed?: string[];
};

// ── Multi-agent weekly plan ──────────────────────────────────────────
// An orchestrator fans out to specialist sub-agents (strength, recovery,
// nutrition) and a synthesizer composes their output into a 7-day week.

export type WeekInput = {
  /** Training days the parent can realistically commit to (2–6). */
  daysPerWeek: number;
  /** Minutes per session. */
  minutesPerSession: number;
  equipment: Equipment;
  /** Free-text goal, e.g. "more energy", "get stronger", "lose a bit". */
  goal: string;
};

export type WeekDay = {
  /** "Monday" … "Sunday". */
  day: string;
  /** Category, e.g. "Strength", "Recovery", "Cardio", "Rest". */
  focus: string;
  /** Short session name. */
  title: string;
  /** One-line description of the day. */
  detail: string;
  /** Minutes for the day — 0 on a rest day. */
  minutes: number;
};

export type WeekPlan = {
  headline: string;
  /** Exactly 7 entries, Monday → Sunday. */
  days: WeekDay[];
  /** 2–5 simple nutrition pointers for the week. */
  nutrition: string[];
  reasoning: string;
  confidence: number;
};

export type WeekResult = {
  plan: WeekPlan;
  source: "live" | "mock";
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  latencyMs: number;
  /** Which sub-agents contributed — surfaced in the UI to show the fan-out. */
  agents?: string[];
};
