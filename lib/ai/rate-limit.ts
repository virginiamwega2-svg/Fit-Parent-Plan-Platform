import "server-only";

import { aiConfig } from "./config";

type Bucket = { count: number; resetAt: number };

// In-memory rate limit. Good enough for a single-region Vercel deployment;
// swap for Upstash Redis when traffic grows. Keyed by IP.
const buckets = new Map<string, Bucket>();
const DAY_MS = 24 * 60 * 60 * 1000;

export function rateLimit(ip: string): { allowed: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const existing = buckets.get(ip);
  if (!existing || existing.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + DAY_MS });
    return { allowed: true, remaining: aiConfig.dailyRequestCeiling - 1, resetInMs: DAY_MS };
  }
  if (existing.count >= aiConfig.dailyRequestCeiling) {
    return { allowed: false, remaining: 0, resetInMs: existing.resetAt - now };
  }
  existing.count += 1;
  return {
    allowed: true,
    remaining: aiConfig.dailyRequestCeiling - existing.count,
    resetInMs: existing.resetAt - now,
  };
}
