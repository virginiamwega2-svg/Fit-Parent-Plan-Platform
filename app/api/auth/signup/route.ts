import { NextResponse } from "next/server";
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE_NAME, hashPassword } from "@/lib/auth";
import { createUser, sanitizeUser } from "@/lib/user-store";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { signupSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit({
    key: `auth:signup:${ip}`,
    max: 5,
    windowMs: 60_000,
  });
  if (rateLimit.limited) {
    return NextResponse.json(
      { error: "Too many signup attempts. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid signup payload." },
        { status: 400 },
      );
    }
    const { name, email, password } = parsed.data;

    const user = await createUser({
      name,
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
    });

    if (!user) {
      return NextResponse.json({ error: "Email is already registered." }, { status: 409 });
    }

    const token = createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json({ user: sanitizeUser(user) }, { status: 201 });
    response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions);
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
