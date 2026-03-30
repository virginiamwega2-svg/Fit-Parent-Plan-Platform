import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Application received — Fit Parent Plan",
  description: "Your application has been received.",
  robots: { index: false, follow: false },
};

type ThankYouPageProps = {
  searchParams: Promise<{ name?: string; payment?: string }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const leadName = params.name?.trim() || "there";
  const isPayment = params.payment === "success";

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:px-10">

      {/* Header */}
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-(--color-cream)">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M5 14l6 6L23 8" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="mt-5 text-4xl tracking-tight">
          <span className="font-light italic text-(--color-muted)">Thanks,{" "}</span>
          <span className="font-black text-foreground">{leadName}.</span>
        </h1>
        <p className="mt-3 text-base leading-7 text-(--color-muted)">
          {isPayment
            ? "Your subscription is active. Welcome to Fit Parent Plan."
            : "Your application is in. We read every one personally — no automated responses."}
        </p>
      </div>

      {/* What happens next */}
      <div className="mt-10 rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-6 sm:p-8">
        <p className="eyebrow text-(--color-brand)">What happens next</p>
        <div className="mt-5 grid gap-0">
          {(isPayment ? [
            { n: "1", title: "Check your inbox", body: `A welcome email from ${siteConfig.contactEmail} is on its way. Check spam if you don't see it within 5 minutes.` },
            { n: "2", title: "Your coach introduces themselves", body: "Within 24 hours Maya will send you a personal message — your first check-in questions and your Week 1 plan." },
            { n: "3", title: "Start Monday", body: "Your first workout and meal plan will be ready. Sessions are 20 minutes. You don't need a gym." },
          ] : [
            { n: "1", title: "Check your inbox now", body: `A confirmation just landed at the email you provided. It's from ${siteConfig.contactEmail} — check your spam folder if you don't see it.` },
            { n: "2", title: "Maya reads your application", body: "Usually within a few hours. She reads every application herself — not a VA, not a bot." },
            { n: "3", title: "Personal reply within 24 hours", body: "She'll send a short note: whether it's a fit, what your first week would look like, and a secure checkout link if you want to start." },
            { n: "4", title: "You decide — no pressure", body: "There's no countdown timer, no pushy follow-up. If it's right, you'll know. If it isn't, she'll say so honestly." },
          ] as const).map((step, i, arr) => (
            <div key={step.n} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-brand) text-xs font-bold text-white">
                  {step.n}
                </div>
                {i < arr.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-(--color-border)" aria-hidden="true" />
                )}
              </div>
              <div className={i < arr.length - 1 ? "pb-6" : ""}>
                <p className="font-semibold text-foreground">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-(--color-muted)">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reassurance block */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {([
          { icon: "🔒", label: "No payment taken yet", sub: "Checkout link comes after Maya's reply" },
          { icon: "✉️", label: "Reply within 24 hours", sub: "Usually same day on weekdays" },
          { icon: "↩️", label: "14-day guarantee", sub: "Full refund if it isn't right" },
        ] as const).map((item) => (
          <div key={item.label} className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 text-center">
            <p className="text-2xl" aria-hidden="true">{item.icon}</p>
            <p className="mt-1 text-xs font-semibold text-foreground">{item.label}</p>
            <p className="mt-0.5 text-xs text-(--color-muted)">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* While you wait */}
      <div className="mt-8 rounded-2xl border border-(--color-border) bg-(--color-cream) p-5">
        <p className="text-sm font-semibold text-foreground">While you wait</p>
        <p className="mt-1 text-sm text-(--color-muted)">
          Read{" "}
          <Link href="/sample-workout" className="font-medium text-(--color-brand) underline underline-offset-2">
            a sample 20-minute workout
          </Link>{" "}
          to see exactly what sessions look like — bodyweight, at home, done before breakfast.
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-sm text-(--color-muted) underline underline-offset-2 hover:text-foreground"
        >
          ← Back to home
        </Link>
      </div>

    </main>
  );
}
