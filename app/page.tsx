"use client";

import dynamicImport from "next/dynamic";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { StickyApplyCta } from "@/components/marketing/sticky-apply-cta";
import { SubscribeButton } from "@/components/marketing/subscribe-button";
import { HeroCta } from "@/components/home/hero-cta";
import { HeroSlideshow } from "@/components/home/hero-slideshow";

export const dynamic = "force-static";

const LeadCaptureForm = dynamicImport(
  () => import("@/components/marketing/lead-capture-form"),
  {
    loading: () => (
      <div className="animate-pulse space-y-4 rounded-2xl border border-(--color-border) bg-white p-6">
        <div className="h-3 w-2/5 rounded bg-(--color-border)" />
        <div className="h-10 w-full rounded-xl bg-(--color-cream)" />
        <div className="h-10 w-full rounded-xl bg-(--color-cream)" />
        <div className="h-10 w-full rounded-xl bg-(--color-cream)" />
        <div className="h-24 w-full rounded-xl bg-(--color-cream)" />
        <div className="h-12 w-full rounded-full bg-(--color-border)" />
      </div>
    ),
  },
);

// Below-fold UI — lazy-load to keep the initial JS bundle lean.
const FaqAccordion = dynamicImport(
  () => import("@/components/ui/faq-accordion").then((m) => m.FaqAccordion),
  {
    loading: () => (
      <div className="animate-pulse space-y-2 rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
        <div className="h-4 w-3/4 rounded bg-(--color-cream)" />
        <div className="h-4 w-2/3 rounded bg-(--color-cream)" />
        <div className="h-4 w-3/5 rounded bg-(--color-cream)" />
        <div className="h-4 w-3/4 rounded bg-(--color-cream)" />
      </div>
    ),
  },
);

const AiDemoSection = dynamicImport(
  () => import("@/components/home/ai-demo-section").then((m) => m.AiDemoSection),
  {
    loading: () => (
      <div className="bg-(--color-cream)">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
            <div className="space-y-4">
              <div className="h-3 w-1/3 animate-pulse rounded bg-(--color-bg-soft)" />
              <div className="h-9 w-2/3 animate-pulse rounded bg-(--color-bg-soft)" />
              <div className="h-20 w-full animate-pulse rounded-2xl bg-(--color-bg-soft)" />
              <div className="h-12 w-44 animate-pulse rounded-full bg-(--color-bg-soft)" />
            </div>
            <div className="h-72 w-full animate-pulse rounded-3xl bg-(--color-bg-soft)" />
          </div>
        </div>
      </div>
    ),
  },
);

const PantryAgent = dynamicImport(
  () => import("@/components/home/pantry-agent").then((m) => m.PantryAgent),
  {
    loading: () => (
      <div className="rounded-3xl border border-(--color-brand)/20 bg-white p-6 shadow-(--shadow-card) sm:p-7">
        <div className="space-y-3">
          <div className="h-3 w-1/3 animate-pulse rounded bg-(--color-cream)" />
          <div className="h-20 w-full animate-pulse rounded-2xl bg-(--color-cream)" />
          <div className="h-10 w-full animate-pulse rounded-full bg-(--color-cream)" />
        </div>
      </div>
    ),
  },
);

const FitQuiz = dynamicImport(
  () => import("@/components/ui/fit-quiz").then((m) => m.FitQuiz),
  {
    loading: () => (
      <div className="animate-pulse space-y-3">
        <div className="h-3 w-1/3 rounded bg-(--color-cream)" />
        <div className="h-10 w-full rounded-xl bg-(--color-cream)" />
        <div className="h-10 w-full rounded-xl bg-(--color-cream)" />
      </div>
    ),
  },
);

/* ─── data ───────────────────────────────────────────────────────── */
// Trimmed from 8 to 4 — top objections only.
const FAQ = [
  {
    question: "What if I miss a week?",
    answer: "The plan is built for messy weeks. We adjust next week instead of restarting — no guilt, no penalties.",
  },
  {
    question: "Do I need equipment?",
    answer: "Nope. Most sessions are bodyweight only. If you want to add resistance, a set of dumbbells or bands works fine — and they fit under a bed.",
  },
  {
    question: "Is there a refund?",
    answer: "Yes. If you show up for the first 14 days and it isn't a fit, email us for a full refund — no hoops.",
  },
  {
    question: "How is this different from another fitness app?",
    answer: "Most programs assume you'll have a clean week. This one assumes you won't. The AI assistant adjusts your plan around real-life chaos — bad sleep, sick kids, a packed week — instead of marking you as failed when life happens.",
  },
];

/* ─── page ───────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="bg-background text-foreground">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        id="section-hero"
        aria-label="Hero"
        className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden
                   flex min-h-[100svh] items-center justify-center
                   sm:min-h-[92svh] lg:min-h-[96svh]"
      >
        <HeroSlideshow />
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-sm px-6 py-16 text-center sm:max-w-2xl sm:px-10 sm:py-28">
          <p className="hero-line-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-[10px]">
            20-minute window · No equipment
          </p>
          <h1 className="mt-4 leading-[1.05]">
            <span className="hero-line-2 block text-[clamp(1rem,1.6vw+0.4rem,2rem)] font-thin italic text-white/75">
              For parents who never finish what they start.
            </span>
            <span className="hero-line-3 mt-1 block text-[clamp(2rem,3vw+0.5rem,3.8rem)] font-black text-white">
              Tell it your week.{" "}
              <span className="underline decoration-(--color-brand) decoration-[3px] underline-offset-4">
                Get a plan that fits.
              </span>
            </span>
          </h1>

          <div className="hero-line-4 mt-6 flex flex-col items-center">
            <HeroCta />
            <p className="mt-2.5 text-[13px] text-white/65 sm:text-xs">
              No signup · 14-day refund
            </p>
          </div>
        </div>

      </section>

      {/* Soft fade between hero and AI section — invisible glue, no hard stitch */}
      <div className="h-20 bg-gradient-to-b from-transparent to-(--color-cream)" aria-hidden="true" />

      {/* ── 1. AI ASSISTANT — the wow ──────────────────────────────── */}
      <AiDemoSection />

      {/* ── 1b. PANTRY-TO-PLATE — second AI agent ─────────────────── */}
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <section id="section-pantry-card" className="scroll-mt-24 pt-16 lg:pt-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
              <div>
                <p className="eyebrow mb-3 text-(--color-brand)">Dinner, sorted</p>
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">What&apos;s in </span>
                  <span className="font-black text-foreground">your fridge?</span>
                </h2>
                <p className="mt-4 max-w-md text-base leading-7 text-(--color-muted)">
                  Type what you have. Get one realistic meal in the time you actually have — plus a copy-able list of what to grab next time.
                </p>
                <ul className="mt-6 grid gap-3 text-sm text-(--color-muted)">
                  {[
                    "Works with what's already in your kitchen",
                    "Fits your time, prep included",
                    "Picky-eater mode for the hard-to-please",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-brand)" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <PantryAgent />
            </div>
          </section>
        </Reveal>
      </div>

      {/* ── 2. PRICING ───────────────────────────────────────────── */}
      <div className="bg-(--color-cream)">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
          <Reveal>
            <section id="section-offer" className="scroll-mt-24">
              <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-12">
                <div>
                  <p className="eyebrow mb-3 text-(--color-brand)">Membership</p>
                  <h2 className="text-3xl tracking-tight sm:text-4xl">
                    <span className="font-light italic text-(--color-muted)">One price. </span>
                    <span className="font-black text-foreground">No fine print.</span>
                  </h2>
                  <p className="mt-3 max-w-md text-base leading-7 text-(--color-muted)">The AI assistant, weekly workouts, and the meal plan — one monthly price. No upsells, ever.</p>
                  <ul className="mt-6 grid gap-3">
                    {([
                      "Not right? Email in the first 14 days — full refund, no hoops.",
                      "Cancel anytime after your first 3 months.",
                      "Your plan adjusts every week — not a static PDF.",
                    ] as const).map((line) => (
                      <li key={line} className="flex items-start gap-3 text-sm text-(--color-muted)">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-(--color-brand)" aria-hidden="true"><path d="M2 7.5l2.5 2.5 7.5-7.5"/></svg>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-(--color-brand)/20 bg-gradient-to-b from-white to-(--color-cream)/40 p-6 shadow-(--shadow-card)">
                  <p className="eyebrow text-(--color-muted)">Monthly</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="tabular-price text-[4.5rem] font-black leading-none tracking-tighter text-foreground">$10</span>
                    <span className="text-sm text-(--color-muted)">/mo</span>
                  </div>
                  <p className="mt-1 text-sm text-(--color-muted)">Cancel anytime · 14-day refund</p>
                  <ul className="mt-5 grid gap-2.5">
                    {(["AI assistant — adjusts your plan weekly", "3× weekly workouts", "Weekly meal plan", "14-day free trial", "Cancel anytime"] as const).map((line) => (
                      <li key={line} className="flex items-center gap-2 text-sm text-(--color-muted)">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-(--color-brand)" aria-hidden="true"><path d="M2 7.5l2.5 2.5 7.5-7.5"/></svg>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <SubscribeButton className="cta-button mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold" />
                  <p className="mt-3 text-center text-xs text-(--color-muted)/70">14-day refund · No card needed for trial</p>
                  <p className="mt-1 text-center text-xs text-(--color-muted)/70">
                    Prefer to talk first?{" "}
                    <a href="#apply" className="underline underline-offset-2 hover:text-foreground">
                      Send Maya a note
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">

        {/* ── 6. FAQ — top 4 only ──────────────────────────────────── */}
        <Reveal>
          <section id="section-faq" className="scroll-mt-24 pt-16 lg:pt-24">
            <p className="eyebrow mb-3 text-(--color-brand)">Quick answers</p>
            <h2 className="text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">Before </span>
              <span className="font-black text-foreground">you apply.</span>
            </h2>
            <div className="mt-6 max-w-3xl">
              <FaqAccordion items={FAQ} />
            </div>
          </section>
        </Reveal>

        {/* ── 7. APPLY — final form ────────────────────────────────── */}
        <Reveal>
          <section id="apply" className="scroll-mt-24 mt-16 lg:mt-24">
            <div className="overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-bg-soft) shadow-(--shadow-card-strong)">
              <div className="p-6 sm:p-10">
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">Prefer to </span>
                  <span className="font-black text-foreground">talk first?</span>
                </h2>
                <div className="mt-5 rounded-2xl border border-(--color-border) bg-(--color-bg) p-4">
                  <p className="eyebrow mb-3 text-(--color-muted)">Quick check — three questions</p>
                  <FitQuiz />
                </div>
                <div className="mt-5">
                  <LeadCaptureForm />
                </div>
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-(--color-brand)/20">
                    <Image
                      src="/images/team-maya.webp"
                      alt="Maya Grant"
                      width={28}
                      height={28}
                      quality={80}
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-(--color-muted)">Maya reads every application personally — replies within 24 hours.</p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <div className="h-24 sm:h-16" />
      </div>

      <StickyApplyCta />
    </div>
  );
}
