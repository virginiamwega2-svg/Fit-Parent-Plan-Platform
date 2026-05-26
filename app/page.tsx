"use client";

import dynamicImport from "next/dynamic";
import Image from "next/image";
import type React from "react";
import { ArrowRight, X, Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { StickyApplyCta } from "@/components/marketing/sticky-apply-cta";
import { HeroCta } from "@/components/home/hero-cta";
import { HeroSlideshow } from "@/components/home/hero-slideshow";
import { useCountUp } from "@/hooks/use-count-up";

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

          {/* Inline social proof — above the fold */}
          <div className="hero-line-4 mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/80">
            <span className="flex items-center gap-0.5 text-(--color-brand)">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" />
              ))}
            </span>
            <span className="font-semibold text-white">4.9</span>
            <span className="text-white/50" aria-hidden="true">·</span>
            <span>74 parents coached</span>
          </div>

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
                <p className="eyebrow mb-3 text-(--color-brand)">Also new · For dinner tonight</p>
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">What&apos;s in </span>
                  <span className="font-black text-foreground">your fridge?</span>
                </h2>
                <p className="mt-4 max-w-md text-base leading-7 text-(--color-muted)">
                  The same assistant that plans your 20-minute window can plan your 20-minute dinner. Type what you have, get one realistic meal — plus a 1-tap list of what&apos;s missing.
                </p>
                <ul className="mt-6 grid gap-3 text-sm text-(--color-muted)">
                  <li>· Built around what you actually have, not what a blog says you should</li>
                  <li>· Honors the time you have, including prep</li>
                  <li>· Picky-eater toggle for the kids</li>
                </ul>
              </div>
              <PantryAgent />
            </div>
          </section>
        </Reveal>
      </div>

      {/* ── 2. REAL RESULTS — proof before price ──────────────────── */}
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <section id="section-results" className="scroll-mt-24 pt-16 lg:pt-24">
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
            <p className="mt-2 text-[10px] text-(--color-muted)/60">
              * Names changed. Results representative; individual results vary.
            </p>
          </section>
        </Reveal>
      </div>

      {/* ── 3. IS THIS YOU? + NOT FOR YOU — qualifier before price ── */}
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <section id="section-fit" className="scroll-mt-24 pt-16 lg:pt-24">
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
                    <li key={item} className="flex items-start gap-3 text-sm text-(--color-muted)">
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

      {/* ── 4. PRICING — after qualifier so readers self-select first */}
      <div className="bg-(--color-cream)">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
          <Reveal>
            <section id="section-offer" className="scroll-mt-24">
              <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-12">
                <div>
                  <p className="eyebrow mb-3 text-(--color-brand)">Membership</p>
                  <h2 className="text-3xl tracking-tight sm:text-4xl">
                    <span className="font-light italic text-(--color-muted)">One price. </span>
                    <span className="font-black text-foreground">Maya included.</span>
                  </h2>
                  <p className="mt-3 max-w-md text-base leading-7 text-(--color-muted)">The AI assistant, weekly workouts, the meal plan, and Maya checking in — one monthly price. No upsells, ever.</p>
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

      {/* ── 5. HOW IT WORKS — white now (pricing owns the cream band) */}
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
            <section id="section-how" className="scroll-mt-24 pt-16 lg:pt-24">
              <p className="eyebrow mb-3 text-(--color-brand)">How it starts</p>
              <h2 className="mb-8 text-3xl tracking-tight sm:text-4xl">
                <span className="font-light italic text-(--color-muted)">Three steps. </span>
                <span className="font-black text-foreground">No waiting around.</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {([
                  { n: "1", title: "Apply in 2 minutes", body: "No card needed." },
                  { n: "2", title: "Maya replies in 24 hours", body: "Herself — not an autoresponder." },
                  { n: "3", title: "Start Monday", body: "First plan arrives the same week." },
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
              <div className="grid lg:grid-cols-2">

                <div className="p-6 sm:p-10">
                  <h2 className="text-3xl tracking-tight sm:text-4xl">
                    <span className="font-light italic text-(--color-muted)">Apply for </span>
                    <span className="font-black text-foreground">a spot.</span>
                  </h2>
                  <p className="mt-1 text-sm text-(--color-muted)">Maya replies personally within 24 hours.</p>
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-(--color-brand)/20 bg-(--color-cream) px-3 py-2">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-(--color-brand) animate-badge-pulse" aria-hidden="true" />
                    <p className="text-xs font-medium text-(--color-muted)">
                      We take <span className="font-semibold text-foreground">a few new parents each month</span> so coaching stays personal.
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
