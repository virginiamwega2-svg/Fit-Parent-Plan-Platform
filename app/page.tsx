import dynamicImport from "next/dynamic";
import Image from "next/image";
import type React from "react";
import { ArrowRight, X, Dumbbell, Apple, MessageCircle } from "lucide-react";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { FitQuiz } from "@/components/ui/fit-quiz";
import { Reveal } from "@/components/ui/reveal";
import { StickyApplyCta } from "@/components/marketing/sticky-apply-cta";

export const dynamic = "force-static";

/* ─── blur placeholders ─────────────────────────────────────────── */
const BLUR = {
  hero:           "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAED/8QAHhABAAICAQUAAAAAAAAAAAAAAQIRAAMEBSExQaH/xAAUAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AwhDdvjqNkztdhJq/Xy8j0/kKpypRHwF0YxgX/9k=",
  strength:       "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAcEAACAQQDAAAAAAAAAAAAAAAAAQMCBBESITFB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARMf/aAAwDAQACEQMRAD8AkwtQW+kEiVVTfa3x5jhAAELX/9k=",
  nutrition:      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAfEAABAwMFAAAAAAAAAAAAAAADAAECBBESEyIyUdH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABgRAAMBAQAAAAAAAAAAAAAAAAECEQAD/9oADAMBAAIRAxEAPwCZSIRz04W1Cw3xd+Ht+kRFB0coYMoWi7//2Q==",
  accountability: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAYEAADAQEAAAAAAAAAAAAAAAAAAQIRQf/EABQBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwChpPFTp4+OMAAB/9k=",
  sarah:          "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAdEAACAQQDAAAAAAAAAAAAAAABAgADBBESMUGB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAv/aAAwDAQACEQMRAD8ApUboNeFChDa4Y7dgZ49iIlJCn//Z",
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
    question: "Can I still eat with my family?",
    answer: "Yes — that's exactly the point. The nutrition guide is built around one meal for the whole table. No food scales, no separate plates.",
  },
  {
    question: "Is there a refund?",
    answer: "Yes. If you show up for the first 14 days and it isn't a fit, email us for a full refund — no hoops.",
  },
];

/* ─── page ───────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="bg-background text-foreground">

      {/* ── 06:22 · HERO ─────────────────────────────────────────── */}
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        id="section-hero"
        aria-label="Hero"
        className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden
                   flex min-h-[100svh] items-center justify-center
                   sm:min-h-[92svh]
                   lg:min-h-[96svh]"
      >

        {/* ── Background image ── */}
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

        {/* ── Scrim: light uniform overlay — image stays clear ── */}
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

        {/* ── Content — centered ── */}
        <div className="relative z-10 mx-auto w-full max-w-sm px-6 py-20 text-center sm:max-w-2xl sm:px-10 sm:py-28">

          <p className="hero-line-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
            Tuesday · Every week · 06:22
          </p>

          <h1 className="mt-4 leading-[1.05]">
            <span className="hero-line-2 block text-[clamp(1rem,1.6vw+0.4rem,2rem)] font-thin italic text-white/75">
              Before the chaos starts.
            </span>
            <span className="hero-line-3 block text-[clamp(1.9rem,3vw+0.5rem,3.8rem)] font-black text-white">
              Twenty minutes.{" "}
              <span className="underline decoration-(--color-brand) decoration-[3px] underline-offset-4">
                Built for parents.
              </span>
            </span>
          </h1>

          <div className="hero-line-4 mt-8 flex flex-col items-center">
            <a
              href="#apply"
              className="group cta-button inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
            >
              Apply now
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <p className="mt-3 text-xs text-white/50">
              14-day guarantee · No contract · Cancel anytime
            </p>
          </div>

        </div>

        {/* ── Scroll cue ── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-8" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-bounce text-white/30">
            <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      </section>

      {/* ── main content ─────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">

        {/* 1 ── IS THIS YOU? ──────────────────────────────────────── */}
        <Reveal>
          <section id="section-fit" className="pt-14 sm:pt-20">
            <p className="eyebrow mb-3 text-(--color-brand)">Sound familiar?</p>
            <h2 className="mb-8 text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">Sound like you? </span>
              <span className="font-black text-foreground">You&apos;re not alone.</span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {([
                "You're a parent with less than 30 minutes a day",
                "Every plan you've tried didn't survive a messy week",
                "No gym, no equipment, no babysitter",
                "You keep starting over and want something that actually sticks",
              ] as const).map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-(--color-brand)" aria-hidden="true"><path d="M2 8.5l3 3 9-9"/></svg>
                  <p className="text-sm leading-6 text-(--color-muted)">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-(--color-muted)">
              If any of those land — <a href="#apply" className="font-semibold text-(--color-ink) underline decoration-(--color-brand) underline-offset-2">this was built for you</a>.
            </p>
            <p className="mt-2 text-xs text-(--color-muted)/60">
              Already decided? <a href="#section-offer" className="underline underline-offset-2 hover:text-(--color-muted)">Skip to pricing →</a>
            </p>
          </section>
        </Reveal>

        {/* 2 ── WHAT YOU GET ──────────────────────────────────────── */}
        <Reveal>
          <section id="section-what" className="scroll-mt-24 pt-14 sm:pt-20 lg:pt-28">
            <p className="eyebrow mb-3 text-(--color-brand)">What&apos;s included</p>
            <h2 className="mb-8 text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">Everything you need. </span>
              <span className="font-black text-foreground">Nothing you don&apos;t.</span>
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {([
                { image: "/images/strength.webp", blur: "strength", icon: Dumbbell, label: "Training", heading: "20-Min Strength Blocks", body: "Three sessions at home per week. Short enough to actually happen." },
                { image: "/images/nutrition.webp", blur: "nutrition", icon: Apple, label: "Nutrition", heading: "Simple Family Nutrition", body: "One meal for the whole table. No food scales, no separate plates." },
                { image: "/images/accountability.webp", blur: "accountability", icon: MessageCircle, label: "Your Coach", heading: "Personal Check-ins", body: "A real message from your coach every Friday — not an app notification." },
              ] as const).map((item, i) => (
                <Reveal key={item.label} delayMs={i * 90}>
                  <article className="group overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-bg-soft) shadow-[0_18px_36px_-28px_rgba(0,0,0,0.3)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1">
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      <Image src={item.image} alt={item.heading} fill sizes="(max-width: 639px) 100vw, 33vw" quality={80} loading="lazy" placeholder="blur" blurDataURL={item.blur === "strength" ? BLUR.strength : item.blur === "nutrition" ? BLUR.nutrition : BLUR.accountability} className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <item.icon size={18} className="text-(--color-brand)" aria-hidden="true" />
                      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-(--color-brand)">{item.label}</p>
                      <h3 className="mt-1 text-lg font-bold text-foreground">{item.heading}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-(--color-muted)">{item.body}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* 3 ── REAL RESULT ───────────────────────────────────────── */}
        <Reveal>
          <section id="section-results" className="scroll-mt-24 pt-14 sm:pt-20 lg:pt-28">
            <p className="eyebrow mb-3 text-(--color-brand)">Real result · No edits</p>
            <h2 className="mb-8 text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">One parent. </span>
              <span className="font-black text-foreground">12 weeks.</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {([
                { week: "Week 1",   quote: "I did two sessions. The third didn't happen — my youngest got sick.", note: "Maya's reply: 'Two is a win. See you Monday.'" },
                { week: "Week 6",   quote: "Down 4 lbs. The bigger thing was more energy at 3pm — when I always used to crash.", note: "First week she didn't miss a session." },
                { week: "Month 3",  quote: "11 lbs down. I forgot what it felt like to not be tired all the time.", note: "Sarah — mom of two. Still going." },
              ] as const).map((entry) => (
                <div key={entry.week} className="flex flex-col gap-3 rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-5">
                  {entry.week === "Month 3" && (
                    <div className="relative h-36 w-full overflow-hidden rounded-xl">
                      <Image src="/images/sarah.webp" alt="Sarah — mom of two" fill sizes="(max-width: 639px) 100vw, 33vw" quality={75} loading="lazy" placeholder="blur" blurDataURL={BLUR.sarah} className="object-cover object-top" />
                    </div>
                  )}
                  <p className="eyebrow text-(--color-brand)">{entry.week}</p>
                  <blockquote className="flex-1 text-base font-semibold leading-snug text-foreground">&ldquo;{entry.quote}&rdquo;</blockquote>
                  <p className="text-xs italic text-(--color-muted)">{entry.note}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {([
                { quote: "Every other program assumed I had a free hour and no kids. This one assumed I had neither.", name: "James — dad of three", result: "Down 14 lbs" },
                { quote: "I told Maya I could do Tuesday evenings and Saturday mornings. Nothing felt like a compromise.", name: "Linda — working mom", result: "Clothes fit by week 6" },
              ] as const).map((t) => (
                <div key={t.name} className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-5">
                  <p className="text-sm leading-6 text-foreground">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs font-semibold text-(--color-muted)">{t.name}</p>
                    <span className="rounded-full bg-(--color-mint-soft) px-2.5 py-0.5 text-xs font-medium text-foreground">{t.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* 4 ── HOW IT WORKS ──────────────────────────────────────── */}
        <Reveal>
          <section id="section-how" className="scroll-mt-24 pt-14 sm:pt-20 lg:pt-28">
            <p className="eyebrow mb-3 text-(--color-brand)">How it starts</p>
            <h2 className="mb-8 text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">Three steps. </span>
              <span className="font-black text-foreground">No waiting around.</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {([
                { n: "1", title: "Apply in 2 minutes", body: "Tell us your schedule and goals. No payment upfront." },
                { n: "2", title: "Coach replies in 24 hours", body: "A personal message — not an automated sequence." },
                { n: "3", title: "Start Monday", body: "Your first workout and meal plan arrive the same week." },
              ] as const).map(({ n, title, body }) => (
                <div key={n} className="flex gap-4 rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-brand) text-sm font-bold text-white">{n}</div>
                  <div>
                    <p className="font-bold text-foreground">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-(--color-muted)">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* 5 ── COACHES ───────────────────────────────────────────── */}
        <Reveal>
          <section id="section-team" className="pt-14 sm:pt-20 lg:pt-28">
            <p className="eyebrow mb-3 text-(--color-brand)">Your coaches</p>
            <h2 className="mb-8 text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">Three coaches, </span>
              <span className="font-black text-foreground">all parents.</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {([
                { name: "Maya Grant",   role: "Head Coach",       cred: "NASM-CPT · Mom of 2",                note: "Sets her alarm 22 minutes early to train before the school run. She builds plans the way she lives them.", photo: "/images/team-maya.webp" },
                { name: "Chris Dalton", role: "Nutrition Lead",    cred: "Precision Nutrition L2 · Dad of 3",  note: "Rotates 4 dinners every week and has convinced himself they're different meals. His advice is exactly that practical.", photo: "/images/team-chris.webp" },
                { name: "Leah Shaw",    role: "Accountability",    cred: "Behavior Change Coach",              note: "Replies to check-ins at 10pm from the couch. That's not a flex — it's just when she has time. She gets it.", photo: "/images/team-leah.webp" },
              ] as const).map((coach, i) => (
                <Reveal key={coach.name} delayMs={i * 80}>
                  <div className="flex flex-col gap-3 rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-5">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-(--color-border)">
                        <Image src={coach.photo} alt={coach.name} width={56} height={56} quality={75} loading="lazy" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold leading-tight text-foreground">{coach.name}</p>
                        <p className="text-xs font-semibold text-(--color-brand)">{coach.role}</p>
                        <p className="text-xs text-(--color-muted)">{coach.cred}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-(--color-muted)">{coach.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-sm text-(--color-muted)">
              <span className="font-semibold text-foreground">74 parents</span> coached since 2022 · rated <span className="font-semibold text-foreground">4.9 / 5</span> across 38 check-in reviews
            </p>
          </section>
        </Reveal>

        {/* 6 ── PRICING ───────────────────────────────────────────── */}
        <Reveal>
          <section id="section-offer" className="scroll-mt-24 pt-14 sm:pt-20 lg:pt-28">
            <p className="eyebrow mb-3 text-(--color-brand)">Pricing</p>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-12">
              <div>
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">One price. </span>
                  <span className="font-black text-foreground">Everything included.</span>
                </h2>
                <p className="mt-3 max-w-md text-base leading-7 text-(--color-muted)">No upsells, no add-ons. Training, nutrition, and a real coach — one monthly price.</p>
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
              <div className="rounded-3xl border border-(--color-brand)/20 bg-(--color-bg-soft) p-6 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.18)]">
                <p className="text-xs font-semibold uppercase tracking-widest text-(--color-muted)">Monthly</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-[4.5rem] font-black leading-none tracking-tighter text-foreground">$199</span>
                  <span className="text-sm text-(--color-muted)">/mo</span>
                </div>
                <p className="mt-1 text-sm text-(--color-muted)">3-month minimum · then month-to-month</p>
                <ul className="mt-5 grid gap-2">
                  {(["3× weekly workouts", "Weekly meal plan", "Personal coach check-ins", "14-day money-back guarantee"] as const).map((line) => (
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

        {/* 7 ── FAQ ───────────────────────────────────────────────── */}
        <Reveal>
          <section id="section-faq" className="scroll-mt-24 pt-14 sm:pt-20 lg:pt-28">
            <p className="eyebrow mb-3 text-(--color-brand)">Quick answers</p>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">Not right for you </span>
                  <span className="font-black text-foreground">if…</span>
                </h2>
                <ul className="mt-6 grid gap-3">
                  {([
                    "You want live group classes or in-person gym sessions",
                    "You need strict calorie-counting or macro tracking",
                    "You want an 8-week transformation — this is 12 weeks of steady progress",
                    "You'd rather have an app than a real person checking in",
                  ] as const).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-(--color-muted)">
                      <X size={13} className="mt-0.5 shrink-0 text-(--color-border)" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">Common </span>
                  <span className="font-black text-foreground">questions.</span>
                </h2>
                <div className="mt-6">
                  <FaqAccordion items={FAQ} />
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 8 ── APPLY ─────────────────────────────────────────────── */}
        <Reveal>
          <section id="apply" className="scroll-mt-24 mt-14 rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-6 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.3)] sm:mt-20 lg:mt-28 sm:p-10">
            <p className="eyebrow text-(--color-muted)">Two minutes to apply</p>
            <h2 className="mt-2 text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">Apply for </span>
              <span className="font-black text-foreground">a spot.</span>
            </h2>
            <p className="mt-1 text-sm text-(--color-muted)">We reply personally within 24 hours — not an automated email.</p>
            <div className="mt-5 rounded-2xl border border-(--color-border) bg-(--color-bg) p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-(--color-muted)">Quick check — three questions</p>
              <FitQuiz />
            </div>
            <div className="mt-5">
              <LeadCaptureForm />
            </div>
          </section>
        </Reveal>

        <div className="h-24 sm:h-16" />
      </div>

      <StickyApplyCta />
    </div>
  );
}
