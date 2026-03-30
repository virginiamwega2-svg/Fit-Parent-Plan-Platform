import { NextResponse } from "next/server";
import { leadCaptureSchema } from "@/lib/validation";
import { getDb } from "@/lib/db";

type LeadPayload = {
  name?: string;
  email?: string;
  challenge?: string;
  goal?: string;
  timePerDay?: string;
  company?: string;
  formStartedAt?: string;
  turnstileToken?: string;
};
const WEBHOOK_TIMEOUT_MS = 8_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FORM_FILL_TIME_MS = 3_000;
const ipRequestLog = new Map<string, number[]>();

function getClientIp(request: Request) {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const [ip] = xForwardedFor.split(",");
    return ip.trim();
  }

  return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (ipRequestLog.get(ip) ?? []).filter((time) => time > windowStart);

  recent.push(now);
  ipRequestLog.set(ip, recent);

  if (recent.length > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  // Light cleanup to prevent unbounded map growth.
  if (ipRequestLog.size > 10_000) {
    for (const [trackedIp, timestamps] of ipRequestLog.entries()) {
      if (!timestamps.some((time) => time > windowStart)) {
        ipRequestLog.delete(trackedIp);
      }
    }
  }

  return false;
}

async function verifyTurnstileToken(token: string, ip: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secretKey) {
    return true;
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
    remoteip: ip,
  });

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );

  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as { success?: boolean };
  return data.success === true;
}

function saveLead(lead: {
  name: string;
  email: string;
  challenge: string;
  goal: string;
  timePerDay: string;
  ip: string;
  createdAt: string;
}) {
  try {
    const db = getDb();
    db.prepare(
      `INSERT INTO leads (name, email, challenge, goal, time_per_day, ip, created_at)
       VALUES (@name, @email, @challenge, @goal, @timePerDay, @ip, @createdAt)`,
    ).run(lead);
  } catch (error) {
    // Log but don't fail the request — lead data should not block the response.
    if (process.env.NODE_ENV !== "production") {
      console.error("Failed to save lead to database", error);
    }
  }
}

async function sendAdminNotification(lead: {
  name: string;
  email: string;
  challenge: string;
  goal: string;
  timePerDay: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const adminEmail = process.env.ADMIN_EMAIL?.trim() ?? "support@fitparentplan.com";
  if (!resendApiKey) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: "Fit Parent Plan <notifications@fitparentplan.com>",
      to: adminEmail,
      subject: `New application from ${lead.name}`,
      html: `
        <h2>New coaching application</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Goal:</strong> ${lead.goal}</p>
        <p><strong>Time per day:</strong> ${lead.timePerDay} min</p>
        <p><strong>Challenge:</strong><br>${lead.challenge}</p>
      `,
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Failed to send admin notification email", error);
    }
  }
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as LeadPayload;
    const parsed = leadCaptureSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? "Invalid request payload." },
        { status: 400 },
      );
    }

    const name = parsed.data.name;
    const email = parsed.data.email.toLowerCase();
    const challenge = parsed.data.challenge;
    const goal = parsed.data.goal;
    const timePerDay = parsed.data.timePerDay;
    const company = parsed.data.company;
    const formStartedAt = Number(parsed.data.formStartedAt);
    const turnstileToken = parsed.data.turnstileToken;
    const submittedAt = Date.now();

    if (company.length > 0) {
      return NextResponse.json(
        { message: "Unable to process request." },
        { status: 400 },
      );
    }

    if (
      !Number.isFinite(formStartedAt) ||
      formStartedAt <= 0 ||
      submittedAt - formStartedAt < MIN_FORM_FILL_TIME_MS
    ) {
      return NextResponse.json(
        { message: "Please take a moment to complete the form and retry." },
        { status: 400 },
      );
    }

    const requiresTurnstile = Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
    if (requiresTurnstile && !turnstileToken) {
      return NextResponse.json(
        { message: "Security check is required. Please try again." },
        { status: 400 },
      );
    }

    if (requiresTurnstile) {
      const turnstileValid = await verifyTurnstileToken(turnstileToken, clientIp);
      if (!turnstileValid) {
        return NextResponse.json(
          { message: "Security check failed. Please retry." },
          { status: 400 },
        );
      }
    }

    const lead = {
      name,
      email,
      challenge,
      goal,
      timePerDay,
      ip: clientIp,
      createdAt: new Date().toISOString(),
    };

    // Persist to database.
    saveLead(lead);

    // Notify admin via email.
    await sendAdminNotification(lead);

    const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();
    if (webhookUrl) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
          signal: controller.signal,
        });

        if (!webhookResponse.ok && process.env.NODE_ENV !== "production") {
          console.error("Lead webhook failed", {
            status: webhookResponse.status,
            statusText: webhookResponse.statusText,
          });
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Lead webhook request failed", error);
        }
      } finally {
        clearTimeout(timeoutId);
      }
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.info("New lead captured", lead);
      }
    }

    return NextResponse.json({
      message: "Thanks. We received your request and will reach out soon.",
    });
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }
}
