import { NextResponse } from "next/server";
import { z } from "zod";

const logSchema = z.object({
  userKey: z.string().trim().min(8).max(64),
  email: z.string().trim().email().optional(),
  planHeadline: z.string().trim().min(1).max(300),
  planSource: z.enum(["live", "mock"]),
  mode: z.enum(["plan", "workout", "adapt", "pantry"]),
  completedAt: z.string().datetime(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = logSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const url = process.env.N8N_WEBHOOK_URL;
  const secret = process.env.N8N_WEBHOOK_SECRET;
  if (!url || !secret) {
    // No-op cleanly when not configured — we still ack so the client
    // never blocks on automation that isn't wired up yet.
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-pulse-secret": secret,
      },
      body: JSON.stringify(parsed.data),
      // n8n webhooks should be fast; bail at 5s rather than holding the user.
      signal: AbortSignal.timeout(5000),
    });
    return NextResponse.json({ ok: true, forwarded: true });
  } catch (err) {
    console.warn("n8n webhook forward failed:", err);
    // Don't surface the failure — the log is best-effort, the user got their plan.
    return NextResponse.json({ ok: true, forwarded: false });
  }
}
