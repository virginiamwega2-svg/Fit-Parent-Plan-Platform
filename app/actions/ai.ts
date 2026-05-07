"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { generatePlan } from "@/lib/ai/adapter";
import { rateLimit } from "@/lib/ai/rate-limit";
import type { PlanResult } from "@/lib/ai/types";

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
    console.error("generatePlanAction failed:", err);
    return { ok: false, error: "The assistant hit a snag. Try again in a moment." };
  }
}
