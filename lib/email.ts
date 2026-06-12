import "server-only";

// All transactional email goes through here. Sends are best-effort: when
// RESEND_API_KEY is unset (local/dev/preview without the secret) every helper
// no-ops cleanly so the calling flow — lead capture, plan email — never blocks
// or errors on email. Returns { sent } so callers can log if they want to.
//
// The `from` domain (fitparentplan.com) must be verified in Resend for live
// sends; until then Resend rejects and we degrade silently.
const FROM = "Fit Parent Plan <notifications@fitparentplan.com>";

// Brand tokens mirrored from app/globals.css — inlined because email clients
// don't honour CSS custom properties.
const INK = "#2a1a22";
const MUTED = "#6b5560";
const BRAND = "#b5586a";
const BG = "#f4ece1";
const CARD = "#fdf8ee";

export type SendResult = { sent: boolean };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function send(message: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { sent: false };

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: FROM,
      to: message.to,
      subject: message.subject,
      html: message.html,
      ...(message.replyTo ? { replyTo: message.replyTo } : {}),
    });
    return { sent: true };
  } catch (error) {
    // Best-effort — never throw into the request path.
    if (process.env.NODE_ENV !== "production") {
      console.error("Resend send failed", error);
    }
    return { sent: false };
  }
}

// Shared shell so every email reads as one brand. `body` is trusted HTML the
// caller has already assembled (and escaped any dynamic parts of).
function layout(body: string): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:${BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${INK};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:${CARD};border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND};">Fit Parent Plan</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px;">${body}</td>
            </tr>
          </table>
          <p style="max-width:520px;margin:18px auto 0;font-size:12px;line-height:1.6;color:${MUTED};text-align:center;">
            You're getting this because you used Fit Parent Plan.<br>
            Fitness built around busy-parent life — 20 minutes at a time.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function ctaButton(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:11px 22px;border-radius:999px;">${escapeHtml(label)}</a>`;
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://fitparentplan.com").replace(/\/$/, "");

/**
 * Emails a freshly generated plan to a visitor who asked for it from the demo.
 * No-ops when the plan has no steps (e.g. a bare email-recovery capture).
 */
export async function sendPlanEmail(params: {
  to: string;
  headline: string;
  steps: string[];
  nudge?: string;
}): Promise<SendResult> {
  const { to, headline, steps, nudge } = params;
  if (steps.length === 0) return { sent: false };

  const stepsHtml = steps
    .map(
      (step) =>
        `<li style="margin:0 0 8px;padding-left:6px;line-height:1.55;">${escapeHtml(step)}</li>`,
    )
    .join("");

  const nudgeHtml = nudge
    ? `<div style="margin:20px 0 4px;padding:14px 16px;background:${BG};border-radius:12px;">
         <p style="margin:0;font-size:13px;line-height:1.55;color:${INK};"><strong>If the day folds:</strong> <span style="color:${MUTED};">${escapeHtml(nudge)}</span></p>
       </div>`
    : "";

  const body = `
    <h1 style="margin:0 0 14px;font-size:20px;line-height:1.3;color:${INK};">${escapeHtml(headline)}</h1>
    <ol style="margin:0;padding-left:18px;font-size:14px;color:${INK};">${stepsHtml}</ol>
    ${nudgeHtml}
    <div style="margin:26px 0 6px;padding-top:22px;border-top:1px solid ${BG};">
      <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:${MUTED};">
        Want one of these every Monday — adjusted mid-week when life happens?
      </p>
      ${ctaButton(`${siteUrl}/#section-offer`, "Start — $10/mo")}
    </div>`;

  return send({ to, subject: `Your plan: ${headline}`, html: layout(body) });
}

/**
 * Welcome / confirmation email to someone who just applied (talk-first path).
 * Separate from the admin notification below.
 */
export async function sendLeadWelcomeEmail(params: {
  to: string;
  name: string;
}): Promise<SendResult> {
  const firstName = params.name.trim().split(/\s+/)[0] || "there";

  const body = `
    <h1 style="margin:0 0 14px;font-size:20px;line-height:1.3;color:${INK};">Hi ${escapeHtml(firstName)} — got it.</h1>
    <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:${MUTED};">
      Thanks for reaching out. I read every note personally and I'll get back to you soon to talk through what would actually fit your week.
    </p>
    <p style="margin:0 0 22px;font-size:14px;line-height:1.6;color:${MUTED};">
      In the meantime, you can tell the assistant about today and get a plan in seconds — no waiting on me.
    </p>
    ${ctaButton(`${siteUrl}/#section-ai-try`, "Try the assistant")}`;

  return send({ to: params.to, subject: "Welcome to Fit Parent Plan", html: layout(body) });
}

/**
 * Internal notification when a new application comes in. Moved here from the
 * leads route so all Resend usage shares one client and one `from`.
 */
export async function sendLeadAdminNotification(lead: {
  name: string;
  email: string;
  challenge: string;
  goal: string;
  timePerDay: string;
}): Promise<SendResult> {
  const adminEmail = process.env.ADMIN_EMAIL?.trim() ?? "support@fitparentplan.com";

  const body = `
    <h1 style="margin:0 0 14px;font-size:20px;line-height:1.3;color:${INK};">New coaching application</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;color:${INK};line-height:1.7;">
      <tr><td style="color:${MUTED};padding-right:10px;">Name</td><td>${escapeHtml(lead.name)}</td></tr>
      <tr><td style="color:${MUTED};padding-right:10px;">Email</td><td>${escapeHtml(lead.email)}</td></tr>
      <tr><td style="color:${MUTED};padding-right:10px;">Goal</td><td>${escapeHtml(lead.goal)}</td></tr>
      <tr><td style="color:${MUTED};padding-right:10px;">Time/day</td><td>${escapeHtml(lead.timePerDay)} min</td></tr>
    </table>
    <p style="margin:16px 0 4px;font-size:13px;color:${MUTED};">Challenge</p>
    <p style="margin:0;font-size:14px;line-height:1.6;color:${INK};">${escapeHtml(lead.challenge)}</p>`;

  // Reply-to the applicant so a reply from the inbox reaches them directly.
  return send({
    to: adminEmail,
    subject: `New application from ${lead.name}`,
    html: layout(body),
    replyTo: lead.email,
  });
}
