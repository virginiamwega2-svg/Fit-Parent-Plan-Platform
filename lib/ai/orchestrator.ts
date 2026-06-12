import "server-only";

import Anthropic from "@anthropic-ai/sdk";
import { aiConfig, estimateCostUsd, hasApiKey } from "./config";
import {
  NUTRITION_AGENT_SYSTEM_PROMPT,
  RECOVERY_AGENT_SYSTEM_PROMPT,
  STRENGTH_AGENT_SYSTEM_PROMPT,
  WEEK_SYNTH_SYSTEM_PROMPT,
  buildWeekSpecialistPrompt,
  buildWeekSynthPrompt,
} from "./prompts";
import type { WeekDay, WeekInput, WeekPlan, WeekResult } from "./types";

// Multi-agent weekly planner. An orchestrator fans out to three specialist
// sub-agents (strength, recovery, nutrition) IN PARALLEL, then a synthesizer
// composes their menus into a coherent 7-day week. Degrades to a deterministic
// mock week on any failure, so the demo never breaks.

let cachedClient: Anthropic | null = null;
function getClient() {
  if (!cachedClient) {
    cachedClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return cachedClient;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function sliceJson(raw: string): string {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  return start >= 0 && end > start ? raw.slice(start, end + 1) : raw;
}

type Usage = { input: number; output: number };

/** One specialist call. Returns parsed JSON + usage, or throws. */
async function callSpecialist(
  system: string,
  userPrompt: string,
): Promise<{ data: unknown; usage: Usage }> {
  const client = getClient();
  const response = await client.messages.create({
    model: aiConfig.model,
    max_tokens: aiConfig.maxTokens,
    system,
    messages: [{ role: "user", content: userPrompt }],
  });
  const textBlock = response.content.find((b) => b.type === "text");
  const raw = textBlock && "text" in textBlock ? textBlock.text : "";
  return {
    data: JSON.parse(sliceJson(raw)),
    usage: { input: response.usage.input_tokens, output: response.usage.output_tokens },
  };
}

function clampConfidence(n: unknown): number {
  const v = typeof n === "number" ? n : 0.5;
  return Math.max(0, Math.min(1, v));
}

function parseWeek(raw: string): WeekPlan {
  const parsed = JSON.parse(sliceJson(raw)) as Partial<WeekPlan>;
  const days = Array.isArray(parsed.days) ? parsed.days : [];
  // Normalise to exactly 7 days, Monday→Sunday, coercing every field.
  const normalised: WeekDay[] = DAYS.map((dayName, i) => {
    const d = (days[i] ?? {}) as Partial<WeekDay>;
    return {
      day: typeof d.day === "string" && d.day ? d.day : dayName,
      focus: typeof d.focus === "string" && d.focus ? d.focus : "Rest",
      title: typeof d.title === "string" && d.title ? d.title : "Rest",
      detail: typeof d.detail === "string" ? d.detail : "A walk if you can.",
      minutes: typeof d.minutes === "number" ? Math.max(0, Math.round(d.minutes)) : 0,
    };
  });
  return {
    headline: String(parsed.headline ?? "Your week, built around real life."),
    days: normalised,
    nutrition: Array.isArray(parsed.nutrition) ? parsed.nutrition.slice(0, 5).map(String) : [],
    reasoning: String(parsed.reasoning ?? ""),
    confidence: clampConfidence(parsed.confidence),
  };
}

function mockWeek(input: WeekInput): WeekPlan {
  const m = input.minutesPerSession;
  const equip = input.equipment === "none" ? "bodyweight" : input.equipment;
  const strengthDetail =
    input.equipment === "dumbbells"
      ? `4 rounds: 10 goblet squats, 8 DB rows/side, 10 push-ups.`
      : input.equipment === "bands"
        ? `4 rounds: 12 band squats, 12 band rows, 10 push-ups.`
        : `4 rounds: 12 squats, 10 push-ups, 12 lunges, 30s plank.`;

  // Spread the training days across the week, alternating strength/recovery,
  // never two hard days in a row.
  const trainCount = Math.max(2, Math.min(6, input.daysPerWeek));
  const trainingIdx = new Set<number>();
  const spacing = 7 / trainCount;
  for (let i = 0; i < trainCount; i++) trainingIdx.add(Math.min(6, Math.round(i * spacing)));

  let strengthTurn = true;
  const days: WeekDay[] = DAYS.map((day, i) => {
    if (!trainingIdx.has(i)) {
      return { day, focus: "Rest", title: "Rest", detail: "A gentle walk if the day allows.", minutes: 0 };
    }
    const isStrength = strengthTurn;
    strengthTurn = !strengthTurn;
    return isStrength
      ? { day, focus: "Strength", title: `${m}-min ${equip} strength`, detail: strengthDetail, minutes: m }
      : { day, focus: "Recovery", title: `${m}-min mobility reset`, detail: "Cat-cow, hip 90/90, hamstring sweeps, box breathing.", minutes: m };
  });

  return {
    headline: `${trainCount} days that fit your week — strength, recovery, and room to breathe.`,
    days,
    nutrition: [
      "Aim for a protein + a vegetable at every dinner.",
      "Keep a fast breakfast on hand for the chaotic mornings.",
      "Water before coffee — it helps the 3pm slump more than you'd think.",
    ],
    reasoning: `Built ${trainCount} sessions around your ${m}-minute window with ${equip}, alternating strength and recovery so nothing stacks up. Rest days keep it sustainable.`,
    confidence: 0.6,
  };
}

export async function generateWeekPlan(input: WeekInput): Promise<WeekResult> {
  const start = Date.now();

  const zeroLive = (plan: WeekPlan): WeekResult => ({
    plan,
    source: "mock",
    inputTokens: 0,
    outputTokens: 0,
    costUsd: 0,
    latencyMs: Date.now() - start,
  });

  if (!hasApiKey()) {
    return zeroLive(mockWeek(input));
  }

  try {
    const userPrompt = buildWeekSpecialistPrompt(input);

    // Fan out to the three specialists in parallel. allSettled so one
    // specialist failing doesn't sink the whole week.
    const [strength, recovery, nutrition] = await Promise.allSettled([
      callSpecialist(STRENGTH_AGENT_SYSTEM_PROMPT, userPrompt),
      callSpecialist(RECOVERY_AGENT_SYSTEM_PROMPT, userPrompt),
      callSpecialist(NUTRITION_AGENT_SYSTEM_PROMPT, userPrompt),
    ]);

    const agents: string[] = [];
    let inputTokens = 0;
    let outputTokens = 0;
    const collect = (r: PromiseSettledResult<{ data: unknown; usage: Usage }>, name: string) => {
      if (r.status === "fulfilled") {
        agents.push(name);
        inputTokens += r.value.usage.input;
        outputTokens += r.value.usage.output;
        return r.value.data;
      }
      return null;
    };
    const strengthMenu = collect(strength, "strength");
    const recoveryMenu = collect(recovery, "recovery");
    const nutritionTips = collect(nutrition, "nutrition");

    // Every specialist failed — no point synthesizing from nothing.
    if (agents.length === 0) {
      console.warn("All week specialists failed; falling back to mock week.");
      return zeroLive(mockWeek(input));
    }

    // Synthesizer composes the week from whatever the specialists returned.
    const client = getClient();
    const synthResponse = await client.messages.create({
      model: aiConfig.model,
      max_tokens: aiConfig.weekSynthMaxTokens,
      system: WEEK_SYNTH_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildWeekSynthPrompt({
            daysPerWeek: input.daysPerWeek,
            minutesPerSession: input.minutesPerSession,
            equipment: input.equipment,
            goal: input.goal,
            strengthMenu,
            recoveryMenu,
            nutritionTips,
          }),
        },
      ],
    });
    inputTokens += synthResponse.usage.input_tokens;
    outputTokens += synthResponse.usage.output_tokens;
    agents.push("synthesis");

    const textBlock = synthResponse.content.find((b) => b.type === "text");
    const raw = textBlock && "text" in textBlock ? textBlock.text : "";
    const plan = parseWeek(raw);

    return {
      plan,
      source: "live",
      inputTokens,
      outputTokens,
      costUsd: estimateCostUsd(inputTokens, outputTokens),
      latencyMs: Date.now() - start,
      agents,
    };
  } catch (err) {
    console.warn("Week orchestrator failed, falling back to mock week:", err);
    return zeroLive(mockWeek(input));
  }
}
