"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { adaptPlan, generatePlan, generateWorkout } from "@/lib/ai/adapter";
import { rateLimit } from "@/lib/ai/rate-limit";
import type { PlanResult } from "@/lib/ai/types";

const emailSchema = z.object({
  email: z.string().trim().email("Use a valid email address."),
});

export type SavePlanEmailResponse = { ok: true } | { ok: false; error: string };

const checkInSchema = z.object({
  text: z.string().trim().min(4, "Tell me a little more.").max(800, "Keep it under 800 characters."),
  minutesAvailable: z.number().int().min(5).max(120).optional(),
});

export type GeneratePlanResponse =
  | { ok: true; result: PlanResult; remaining: number }
  | { ok: false; error: string; retryInMinutes?: number };

async function getClientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "anonymous"
  );
}

export async function generatePlanAction(input: unknown): Promise<GeneratePlanResponse> {
  const parsed = checkInSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const ip = await getClientIp();
  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return {
      ok: false,
      error: "Daily limit reached. Come back tomorrow or sign up for unlimited.",
      retryInMinutes: Math.ceil(limit.resetInMs / 60_000),
    };
  }

  try {
    const result = await generatePlan(parsed.data);
    return { ok: true, result, remaining: limit.remaining };
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("generatePlanAction failed:", err);
    // Surface the real cause in dev/preview so the user can see what's wrong.
    // In production we still log to the server.
    return {
      ok: false,
      error:
        process.env.NODE_ENV === "production"
          ? "The assistant hit a snag. Try again in a moment."
          : `Assistant error: ${detail}`,
    };
  }
}

const workoutSchema = z.object({
  minutesAvailable: z.number().int().min(5).max(120),
  equipment: z.enum(["none", "dumbbells", "bands", "full-gym"]),
  energy: z.number().int().min(1).max(5),
  notes: z.string().trim().max(300).optional(),
});

export async function generateWorkoutAction(input: unknown): Promise<GeneratePlanResponse> {
  const parsed = workoutSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const ip = await getClientIp();
  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return {
      ok: false,
      error: "Daily limit reached. Come back tomorrow or sign up for unlimited.",
      retryInMinutes: Math.ceil(limit.resetInMs / 60_000),
    };
  }

  try {
    const result = await generateWorkout(parsed.data);
    return { ok: true, result, remaining: limit.remaining };
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("generateWorkoutAction failed:", err);
    return {
      ok: false,
      error:
        process.env.NODE_ENV === "production"
          ? "The assistant hit a snag. Try again in a moment."
          : `Assistant error: ${detail}`,
    };
  }
}

const adaptSchema = z.object({
  previousHeadline: z.string().trim().min(1).max(300),
  previousSteps: z.array(z.string().trim().min(1).max(300)).min(1).max(8),
  update: z.string().trim().min(4, "Tell me a little more.").max(800),
  minutesAvailable: z.number().int().min(5).max(120),
});

export async function adaptPlanAction(input: unknown): Promise<GeneratePlanResponse> {
  const parsed = adaptSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const ip = await getClientIp();
  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return {
      ok: false,
      error: "Daily limit reached. Come back tomorrow or sign up for unlimited.",
      retryInMinutes: Math.ceil(limit.resetInMs / 60_000),
    };
  }

  try {
    const result = await adaptPlan(parsed.data);
    return { ok: true, result, remaining: limit.remaining };
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("adaptPlanAction failed:", err);
    return {
      ok: false,
      error:
        process.env.NODE_ENV === "production"
          ? "The assistant hit a snag. Try again in a moment."
          : `Assistant error: ${detail}`,
    };
  }
}

/**
 * Captures an email to send the generated plan to. Always responds optimistically
 * after validation — the actual send/queue is best-effort and shouldn't block
 * the conversion moment. Lead is logged server-side; wire to Resend later.
 */
export async function savePlanEmailAction(input: unknown): Promise<SavePlanEmailResponse> {
  const parsed = emailSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid email." };
  }
  const ip = await getClientIp();
  console.info(`[plan-email-capture] ${parsed.data.email} (ip=${ip})`);
  return { ok: true };
}
