import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getUserState, updateUserState, type UserState } from "@/lib/user-state-store";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { userStatePatchSchema } from "@/lib/validation";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit({
    key: `user-state:get:${ip}`,
    max: 60,
    windowMs: 60_000,
  });
  if (rateLimit.limited) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const state = await getUserState(user.id);
  return NextResponse.json({ state });
}

export async function PUT(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit({
    key: `user-state:put:${ip}`,
    max: 30,
    windowMs: 60_000,
  });
  if (rateLimit.limited) {
    return NextResponse.json(
      { error: "Too many update requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = userStatePatchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid payload" },
        { status: 400 },
      );
    }

    const nextState = await updateUserState(user.id, parsed.data as Partial<UserState>);
    return NextResponse.json({ state: nextState });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
