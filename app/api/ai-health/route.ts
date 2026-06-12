import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const keyPresent = Boolean(process.env.ANTHROPIC_API_KEY);

  if (!keyPresent) {
    return NextResponse.json({ keyPresent: false, live: false });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 10,
      messages: [{ role: "user", content: "hi" }],
    });
    return NextResponse.json({ keyPresent: true, live: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ keyPresent: true, live: false, error: message });
  }
}
