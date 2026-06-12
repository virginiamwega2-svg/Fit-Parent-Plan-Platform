import "server-only";

import type Anthropic from "@anthropic-ai/sdk";
import {
  lookupExercises,
  type ExerciseEquipment,
  type ExerciseFocus,
} from "./exercise-library";

// Tools the coach agent can call while building a plan. Descriptions are
// prescriptive about WHEN to call each — that materially improves trigger
// behaviour on Haiku.
export const coachTools: Anthropic.Tool[] = [
  {
    name: "lookup_exercises",
    description:
      "Look up real, vetted exercises to build the plan from. Call this before writing the plan so movements are accurate and safe. Set lowImpact: true when jumping or noise is a problem (apartment, kids asleep, sore joints). Match equipment to what the parent mentions; default to 'none' (bodyweight).",
    input_schema: {
      type: "object",
      properties: {
        focus: {
          type: "string",
          enum: ["strength", "mobility", "cardio", "core"],
          description: "The kind of movement to pull.",
        },
        equipment: {
          type: "string",
          enum: ["none", "dumbbells", "bands", "full-gym"],
          description: "Available equipment. 'none' = bodyweight only.",
        },
        lowImpact: {
          type: "boolean",
          description: "true to exclude jumping/high-impact moves.",
        },
      },
      required: [],
    },
  },
  {
    name: "get_time_context",
    description:
      "Get the current time of day and day of week (server clock). Call this to tailor the session — e.g. energizing in the morning, a calmer wind-down in the evening.",
    input_schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "allocate_time",
    description:
      "Split the available minutes into warm-up / main / cooldown blocks. Call this so the timing maths is exact instead of estimated.",
    input_schema: {
      type: "object",
      properties: {
        totalMinutes: {
          type: "integer",
          description: "Total minutes the parent has for the whole session.",
        },
      },
      required: ["totalMinutes"],
    },
  },
];

function getTimeContext() {
  const now = new Date();
  const hour = now.getHours();
  const partOfDay = hour < 5 ? "night" : hour < 11 ? "morning" : hour < 17 ? "afternoon" : "evening";
  const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });
  return { partOfDay, dayOfWeek, hour };
}

function allocateTime(totalMinutes: unknown) {
  const total = typeof totalMinutes === "number" && Number.isFinite(totalMinutes)
    ? Math.max(5, Math.min(120, Math.round(totalMinutes)))
    : 20;
  // ~20% warm-up and cooldown each (min 2 min), the rest is the main block.
  const warmup = Math.max(2, Math.round(total * 0.2));
  const cooldown = Math.max(2, Math.round(total * 0.2));
  const main = Math.max(1, total - warmup - cooldown);
  return { totalMinutes: total, warmupMin: warmup, mainMin: main, cooldownMin: cooldown };
}

/** Executes a coach tool by name. Always returns a JSON-serialisable object. */
export function runCoachTool(name: string, input: unknown): unknown {
  const args = (input ?? {}) as Record<string, unknown>;
  switch (name) {
    case "lookup_exercises":
      return {
        exercises: lookupExercises({
          focus: args.focus as ExerciseFocus | undefined,
          equipment: args.equipment as ExerciseEquipment | undefined,
          lowImpact: typeof args.lowImpact === "boolean" ? args.lowImpact : undefined,
        }),
      };
    case "get_time_context":
      return getTimeContext();
    case "allocate_time":
      return allocateTime(args.totalMinutes);
    default:
      return { error: `Unknown tool: ${name}` };
  }
}
