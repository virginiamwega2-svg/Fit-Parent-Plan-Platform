import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { aiConfig, hasApiKey } from "@/lib/ai/config";

// TEMPORARY diagnostic — reports whether the live Anthropic path works in this
// environment, without leaking the key. Returns the error TYPE/message on
// failure (e.g. credit_balance_too_low, authentication_error) so we can tell
// why the demo is in "Practice mode". Remove once diagnosed.
export const dynamic = "force-dynamic";

export async function GET() {
  const keyPresent = hasApiKey();
  if (!keyPresent) {
    return NextResponse.json({
      keyPresent: false,
      model: aiConfig.model,
      live: false,
      reason: "ANTHROPIC_API_KEY is not set in this environment.",
    });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const r = await client.messages.create({
      model: aiConfig.model,
      max_tokens: 8,
      messages: [{ role: "user", content: "ping" }],
    });
    return NextResponse.json({
      keyPresent: true,
      model: aiConfig.model,
      live: true,
      stopReason: r.stop_reason,
    });
  } catch (err) {
    const e = err as { name?: string; status?: number; error?: { type?: string }; message?: string };
    return NextResponse.json({
      keyPresent: true,
      model: aiConfig.model,
      live: false,
      errorName: e?.name,
      status: e?.status,
      type: e?.error?.type,
      message: e?.message?.slice(0, 300),
    });
  }
}
