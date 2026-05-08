"use client";

import dynamicImport from "next/dynamic";
import Image from "next/image";
import type React from "react";
import { ArrowRight, X, Star } from "lucide-react";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { FitQuiz } from "@/components/ui/fit-quiz";
import { Reveal } from "@/components/ui/reveal";
import { StickyApplyCta } from "@/components/marketing/sticky-apply-cta";
import { AiDemoSection } from "@/components/home/ai-demo-section";
import { useCountUp } from "@/hooks/use-count-up";

export const dynamic = "force-static";

/* ─── blur placeholders ─────────────────────────────────────────── */
const BLUR = {
  hero: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAED/8QAHhABAAICAQUAAAAAAAAAAAAAAQIRAAMEBSExQaH/xAAUAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AwhDdvjqNkztdhJq/Xy8j0/kKpypRHwF0YxgX/9k=",
} as const;

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

/* ─── social proof stat block with count-up ─────────────────────── */
function SocialProofStats() {
  const { value: parentsCount, ref: parentsRef } = useCountUp(74, 0, 1400);
  const { value: ratingVal, ref: ratingRef } = useCountUp(4.9, 1, 1200);

  return (
    <p
      ref={parentsRef as React.RefObject<HTMLParagraphElement>}
      className="mt-6 text-sm text-(--color-muted)"
    >
      <span className="font-semibold text-foreground">{parentsCount}</span>{" "}
      parents coached since 2022 · rated{" "}
      <span ref={ratingRef as React.RefObject<HTMLSpanElement>} className="font-semibold text-foreground">{ratingVal.toFixed(1)}</span> / 5 across 38 reviews
    </p>
  );
}

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
        <Image
          src="/images/about-banner.webp"
          alt="Parents building healthy habits together"
          fill
          sizes="100vw"
          quality={90}
          className="hero-img-enter object-cover object-[center_40%] sm:object-center"
          priority
          placeholder="blur"
          blurDataURL={BLUR.hero}
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-sm px-6 py-20 text-center sm:max-w-2xl sm:px-10 sm:py-28">
          <p className="hero-line-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
            AI-guided · 20 minutes · No equipment
          </p>
          <h1 className="mt-4 leading-[1.05]">
            <span className="hero-line-2 block text-[clamp(1rem,1.6vw+0.4rem,2rem)] font-thin italic text-white/75">
              For parents who never finish what they start.
            </span>
            <span className="hero-line-3 block text-[clamp(1.9rem,3vw+0.5rem,3.8rem)] font-black text-white">
              Tell it your week.{" "}
              <span className="underline decoration-(--color-brand) decoration-[3px] underline-offset-4">
                Get a plan that fits.
              </span>
            </span>
          </h1>

          {/* Inline social proof — above the fold */}
          <div className="hero-line-4 mt-5 flex items-center justify-center gap-2 text-sm text-white/80">
            <span className="flex items-center gap-0.5 text-(--color-brand)">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" />
              ))}
            </span>
            <span className="font-semibold text-white">4.9</span>
            <span className="text-white/50">·</span>
            <span>74 parents coached</span>
          </div>

          <div className="hero-line-4 mt-6 flex flex-col items-center">
            <a
              href="#section-ai"
              className="group cta-button inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
            >
              Try it — 30 seconds
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <p className="mt-2.5 text-xs text-white/60">
              No signup · 14-day money-back guarantee on paid plans
            </p>
            {/* Trust strip — credentials at a glance */}
            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
              <span>NASM-CPT coaches</span>
              <span aria-hidden="true">·</span>
              <span>Pre/postnatal specialists</span>
              <span aria-hidden="true">·</span>
              <span>Built for parents since 2022</span>
            </p>
          </div>
        </div>

        {/* Soft scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-8" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-float text-white/30">
            <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      <div className="border-t border-(--color-border)" aria-hidden="true" />

      {/* ── 1. AI ASSISTANT — the wow ──────────────────────────────── */}
      <AiDemoSection />

      {/* ── 2. REAL RESULTS — proof before price ──────────────────── */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <Reveal>
          <section id="section-results" className="scroll-mt-24 pt-14 sm:pt-20 lg:pt-24">
            <p className="eyebrow mb-3 text-(--color-brand)">Real result · No edits</p>
            <h2 className="mb-8 text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">One parent. </span>
              <span className="font-black text-foreground">12 weeks.</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {([
                { week: "Week 1", quote: "I did two sessions. The third didn't happen — my youngest got sick.", note: "Maya's reply: 'Two is a win. See you Monday.'" },
                { week: "Week 6", quote: "Down 4 lbs. The bigger thing was more energy at 3pm — when I always used to crash.", note: "First week she didn't miss a session." },
                { week: "Month 3", quote: "11 lbs down. I forgot what it felt like to not be tired all the time.", note: "Sarah — mom of two. Still going." },
              ] as const).map((entry) => (
                <div key={entry.week} className="flex flex-col gap-3 rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-5">
                  <p className="eyebrow text-(--color-brand)">{entry.week}</p>
                  <blockquote className="flex-1 text-base font-semibold leading-snug text-foreground">&ldquo;{entry.quote}&rdquo;</blockquote>
                  <p className="text-xs italic text-(--color-muted)">{entry.note}</p>
                </div>
              ))}
            </div>

            <div className="my-8 border-l-4 border-(--color-brand) pl-5">
              <p className="font-display text-[clamp(1.3rem,2.5vw,2rem)] font-black leading-tight tracking-tight text-foreground">
                11 lbs. 12 weeks.{" "}
                <span className="font-thin italic text-(--color-muted)">Two sessions a week.</span>
              </p>
            </div>

            <SocialProofStats />
            <p className="mt-2 text-xs text-(--color-muted)/70">
              * Names changed to protect privacy. Results are representative. Individual results vary.
            </p>
          </section>
        </Reveal>
      </div>

      {/* ── 3. PRICING — moved up ─────────────────────────────────── */}
      <div className="mt-14 bg-(--color-cream) sm:mt-20 lg:mt-24">
        <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
          <Reveal>
            <section id="section-offer" className="scroll-mt-24">
              <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-12">
                <div>
                  <p className="eyebrow mb-3 text-(--color-brand)">Membership</p>
                  <h2 className="text-3xl tracking-tight sm:text-4xl">
                    <span className="font-light italic text-(--color-muted)">One price. </span>
                    <span className="font-black text-foreground">Everything included.</span>
                  </h2>
                  <p className="mt-3 max-w-md text-base leading-7 text-(--color-muted)">No upsells, no add-ons. Training, nutrition, the AI assistant, and a real coach — one monthly price.</p>
                  <ul className="mt-6 grid gap-3">
                    {([
                      "Not right? Email in the first 14 days — full refund, no hoops.",
                      "Cancel anytime after your first 3 months.",
                      "Your plan adjusts every week — not a static PDF.",
                    ] as const).map((line) => (
                      <li key={line} className="flex items-start gap-2.5 text-sm text-(--color-muted)">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-(--color-brand)" aria-hidden="true"><path d="M2 7.5l2.5 2.5 7.5-7.5"/></svg>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-(--color-brand)/20 bg-white p-6 shadow-(--shadow-card)">
                  <p className="eyebrow text-(--color-muted)">Monthly</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="tabular-price text-[4.5rem] font-black leading-none tracking-tighter text-foreground">$199</span>
                    <span className="text-sm text-(--color-muted)">/mo</span>
                  </div>
                  <p className="mt-1 text-sm text-(--color-muted)">3-month minimum · then month-to-month</p>
                  <ul className="mt-5 grid gap-2.5">
                    {(["AI assistant — adjusts your plan weekly", "3× weekly workouts", "Weekly meal plan", "Personal coach check-ins", "14-day money-back guarantee"] as const).map((line) => (
                      <li key={line} className="flex items-center gap-2 text-sm text-(--color-muted)">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-(--color-brand)" aria-hidden="true"><path d="M2 7.5l2.5 2.5 7.5-7.5"/></svg>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <a href="#apply" className="cta-button mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold">
                    Apply for a spot <ArrowRight size={14} aria-hidden="true" />
                  </a>
                  <p className="mt-3 text-center text-xs text-(--color-muted)/70">14-day guarantee · No contract · Cancel anytime</p>
                </div>
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      {/* ── 4. IS THIS YOU? + NOT FOR YOU — combined qualifier ────── */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <Reveal>
          <section id="section-fit" className="scroll-mt-24 pt-14 sm:pt-20 lg:pt-24">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="eyebrow mb-3 text-(--color-brand)">Built for you if</p>
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-black text-foreground">You&apos;re not alone.</span>
                </h2>
                <ul className="mt-6 grid gap-3">
                  {([
                    "You're a parent with less than 30 minutes a day",
                    "Every plan you've tried didn't survive a messy week",
                    "No gym, no equipment, no babysitter",
                    "You keep starting over and want something that sticks",
                  ] as const).map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-(--color-brand)" aria-hidden="true"><path d="M2 8.5l3 3 9-9"/></svg>
                      <p className="text-sm leading-6 text-(--color-muted)">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-3 text-(--color-muted)">Not for you if</p>
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">This isn&apos;t </span>
                  <span className="font-black text-foreground">your fit.</span>
                </h2>
                <ul className="mt-6 grid gap-3">
                  {([
                    "You want live group classes or in-person gym sessions",
                    "You need strict calorie-counting or macro tracking",
                    "You'd rather have an app than a real person checking in",
                    "You want an 8-week transformation — this is steady progress",
                  ] as const).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-(--color-muted)">
                      <X size={14} className="mt-0.5 shrink-0 text-(--color-border)" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </Reveal>
      </div>

      {/* ── 5. HOW IT WORKS — cream band, compressed ─────────────── */}
      <div className="mt-14 bg-(--color-cream) sm:mt-20 lg:mt-24">
        <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
          <Reveal>
            <section id="section-how" className="scroll-mt-24">
              <p className="eyebrow mb-3 text-(--color-brand)">How it starts</p>
              <h2 className="mb-8 text-3xl tracking-tight sm:text-4xl">
                <span className="font-light italic text-(--color-muted)">Three steps. </span>
                <span className="font-black text-foreground">No waiting around.</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {([
                  { n: "1", title: "Apply in 2 minutes", body: "Two minutes. No card needed." },
                  { n: "2", title: "Coach replies in 24 hours", body: "Maya replies herself. Within 24 hours." },
                  { n: "3", title: "Start Monday", body: "Your first AI plan and meal plan arrive the same week." },
                ] as const).map(({ n, title, body }, i) => (
                  <div key={n} className="relative flex gap-4 rounded-2xl border border-(--color-border) bg-white p-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-brand) text-sm font-bold text-white">{n}</div>
                    <div>
                      <p className="font-bold text-foreground">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-(--color-muted)">{body}</p>
                    </div>
                    {i < 2 && (
                      <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-(--color-brand) sm:block" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">

        {/* ── 6. FAQ — top 4 only ──────────────────────────────────── */}
        <Reveal>
          <section id="section-faq" className="scroll-mt-24 pt-14 sm:pt-20 lg:pt-24">
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
          <section id="apply" className="scroll-mt-24 mt-14 sm:mt-20 lg:mt-24">
            <div className="overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-bg-soft) shadow-(--shadow-card-strong)">
              <div className="grid lg:grid-cols-2">

                <div className="p-6 sm:p-10">
                  <p className="eyebrow text-(--color-muted)">Two minutes to apply</p>
                  <h2 className="mt-2 text-3xl tracking-tight sm:text-4xl">
                    <span className="font-light italic text-(--color-muted)">Apply for </span>
                    <span className="font-black text-foreground">a spot.</span>
                  </h2>
                  <p className="mt-1 text-sm text-(--color-muted)">We reply personally within 24 hours — not an automated email.</p>
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-(--color-brand)/20 bg-(--color-cream) px-3 py-2">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-(--color-brand) animate-badge-pulse" aria-hidden="true" />
                    <p className="text-xs font-medium text-(--color-muted)">
                      We take on <span className="font-semibold text-foreground">4–6 new parents per month</span> to keep coaching quality high.
                    </p>
                  </div>
                  <div className="mt-5 rounded-2xl border border-(--color-border) bg-(--color-bg) p-4">
                    <p className="eyebrow mb-3 text-(--color-muted)">Quick check — three questions</p>
                    <FitQuiz />
                  </div>
                  <div className="mt-5">
                    <LeadCaptureForm />
                  </div>
                </div>

                <div className="hidden flex-col justify-between bg-(--color-cream) p-10 lg:flex">
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-(--color-brand)/20 ring-4 ring-white">
                        <Image
                          src="/images/team-maya.webp"
                          alt="Maya Grant — Head Coach"
                          width={80}
                          height={80}
                          quality={90}
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-(--color-brand)">NASM-CPT · Mom of 2</p>
                        <p className="text-lg font-bold text-foreground">Maya Grant</p>
                        <p className="text-sm text-(--color-muted)">Head Coach</p>
                      </div>
                    </div>
                    <div className="mt-10 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-(--color-border) bg-white p-4 text-center">
                        <p className="tabular-price text-3xl font-black text-foreground">74</p>
                        <p className="mt-0.5 text-xs text-(--color-muted)">parents coached</p>
                      </div>
                      <div className="rounded-2xl border border-(--color-border) bg-white p-4 text-center">
                        <p className="tabular-price text-3xl font-black text-foreground">4.9</p>
                        <p className="mt-0.5 text-xs text-(--color-muted)">avg. rating</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <blockquote className="text-sm leading-7 text-(--color-muted)">
                      &ldquo;I built this programme during my own 6am sessions with a toddler who kept waking up. If it survived that, it will survive your week.&rdquo;
                    </blockquote>
                    <p className="mt-3 text-xs font-semibold text-foreground">— Maya Grant, Head Coach</p>
                    <p className="mt-4 text-xs text-(--color-muted)/60">We reply to every application personally.</p>
                  </div>
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
