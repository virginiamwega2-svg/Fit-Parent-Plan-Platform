import dynamicImport from "next/dynamic";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { CalendarSketch, HomeSketch, TimerSketch } from "@/components/ui/illustrations";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export const dynamic = "force-static";

const BLUR = {
  hero:           "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAcEAEAAgIDAQAAAAAAAAAAAAABAAIDEQQhodH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAC/9oADAMBAAIRAxEAPwCxfn4q53CopUCod72/PIiILpJDJf/Z",
  strength:       "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAcEAACAQQDAAAAAAAAAAAAAAAAAQMCBBESITFB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARMf/aAAwDAQACEQMRAD8AkwtQW+kEiVVTfa3x5jhAAELX/9k=",
  nutrition:      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAfEAABAwMFAAAAAAAAAAAAAAADAAECBBESEyIyUdH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABgRAAMBAQAAAAAAAAAAAAAAAAECEQAD/9oADAMBAAIRAxEAPwCZSIRz04W1Cw3xd+Ht+kRFB0coYMoWi7//2Q==",
  accountability: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAYEAADAQEAAAAAAAAAAAAAAAAAAQIRQf/EABQBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwChpPFTp4+OMAAB/9k=",
  sarah:          "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAdEAACAQQDAAAAAAAAAAAAAAABAgADBBESMUGB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAv/aAAwDAQACEQMRAD8ApUboNeFChDa4Y7dgZ49iIlJCn//Z",
  coach:          "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAcEAACAgIDAAAAAAAAAAAAAAAAAQITBBEiMUH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALmTFXWaamuPXgAIP//Z",
  offer:          "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAcEAADAAEFAAAAAAAAAAAAAAAAAQMRAgQSIaH/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAEhAhH/2gAMAwEAAhEDEQA/ALbaUJ0o+TWe0tWfAAD012oSlIf/2Q==",
} as const;

const LeadCaptureForm = dynamicImport(
  () => import("@/components/marketing/lead-capture-form"),
  {
    loading: () => (
      <div className="animate-pulse rounded-2xl border border-[var(--color-border)] bg-white p-6 space-y-4">
        <div className="h-3 w-2/5 rounded bg-zinc-200" />
        <div className="h-10 w-full rounded-xl bg-zinc-100" />
        <div className="h-10 w-full rounded-xl bg-zinc-100" />
        <div className="h-10 w-full rounded-xl bg-zinc-100" />
        <div className="h-24 w-full rounded-xl bg-zinc-100" />
        <div className="h-10 w-full rounded-xl bg-zinc-100" />
        <div className="h-12 w-full rounded-full bg-zinc-200" />
      </div>
    ),
  },
);

const PILLARS = [
  {
    title: "20-Minute Strength Blocks",
    description:
      "Three sessions at home, three times a week. Short enough to actually happen.",
    image: "/images/strength.jpg",
  },
  {
    title: "Simple Family Nutrition",
    description:
      "No separate meals. No food scales. Just simple food the whole table will eat.",
    image: "/images/nutrition.jpg",
  },
  {
    title: "Flexible Check-ins",
    description:
      "Life gets messy. We check in each week and adjust — so you never have to start over.",
    image: "/images/accountability.jpg",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The short home workouts were the thing that finally stuck for me. Three months in and I still look forward to them.",
    name: "Sarah \u2014 mom of two",
    result: "Consistent for the first time in years",
    photo: "/images/sarah.jpg",
  },
  {
    quote:
      "I\u2019d tried every app and quit after two weeks. This felt different because someone actually adjusted the plan when things got hectic.",
    name: "James \u2014 dad of three",
    result: "Down 14 lbs, still going",
  },
  {
    quote:
      "I was skeptical \u2014 20 minutes didn\u2019t feel like enough. Turns out it\u2019s plenty when you actually do it.",
    name: "Linda \u2014 working mom",
    result: "Clothes fit differently by week 6",
  },
];

const FAQ = [
  {
    question: "What if I miss a week?",
    answer:
      "The plan is built for messy weeks. We adjust next week instead of restarting — no guilt, no penalties.",
  },
  {
    question: "Do I need equipment?",
    answer:
      "Nope. Most sessions are bodyweight only. If you want to add resistance, a set of dumbbells or bands works fine — and they fit under a bed.",
  },
  {
    question: "Can I still eat with my family?",
    answer:
      "Yes — that's exactly the point. The nutrition guide is built around one meal for the whole table. No food scales, no separate plates.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Most parents feel more energy by week 2–3. Visible changes around weeks 4–8.",
  },
  {
    question: "What if I have injuries or low fitness?",
    answer:
      "We start from where you actually are. Every movement has modifications for sore joints, old injuries, or low starting fitness.",
  },
  {
    question: "What happens after the 12 weeks?",
    answer:
      "You leave with a repeatable plan and habits that hold. Continue solo or stay on for accountability.",
  },
  {
    question: "Is there a refund?",
    answer:
      "Yes. If you show up and follow the plan for the first 14 days and feel it's not a fit, you can request a full refund—no hard feelings, no hoops.",
  },
  {
    question: "Can I pause or cancel the program?",
    answer:
      "You're billed monthly during the 12-week program. You can pause or cancel future months before your next billing date by emailing support.",
  },
  {
    question: "How do payments work?",
    answer:
      "After you apply, we send a secure Stripe checkout link. Stripe handles everything — we never see your card details.",
  },
];

const REVEAL_DELAYS_MS = [80, 120, 160, 200, 240, 280, 300, 320] as const;

const HERO_STATS = [
  {
    label: "3x/week",
    description: "workouts per week",
    icon: CalendarSketch,
  },
  {
    label: "20 min",
    description: "per session",
    icon: TimerSketch,
  },
  {
    label: "No gym",
    description: "ever",
    icon: HomeSketch,
  },
];

function TestimonialCard({
  quote,
  name,
  result,
  photo,
  className,
}: {
  quote: string;
  name: string;
  result: string;
  photo?: string;
  className?: string;
}) {
  return (
    <blockquote
      className={`rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.35)]${className ? ` ${className}` : ""}`}
    >
      <p className="text-sm text-amber-400" aria-label="5 out of 5 stars">★★★★★</p>
      <p className="mt-2 leading-7 text-[var(--color-ink)] opacity-80">&ldquo;{quote}&rdquo;</p>
      <footer className="mt-4 flex items-center gap-3">
        {photo && (
          <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border border-[var(--color-border)]">
            <Image src={photo} alt={name} width={36} height={36} quality={75} loading="lazy" className="object-cover" />
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-[var(--color-ink)]">{name}</p>
          <p className="text-xs font-medium text-teal-700">{result}</p>
        </div>
      </footer>
    </blockquote>
  );
}

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-10 lg:py-12">
        <Reveal>
          <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden py-20 sm:py-28 lg:py-36">
            <Image
              src="/images/hero.jpg"
              alt="Parent doing a home workout"
              fill
              sizes="100vw"
              quality={85}
              placeholder="blur"
              blurDataURL={BLUR.hero}
              className="object-cover object-center"
              priority
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,43,47,0.88)_0%,rgba(13,43,47,0.65)_55%,rgba(13,43,47,0.25)_100%)]"
              aria-hidden="true"
            />

            <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-10">
              <div className="max-w-xl">
                <p className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                  12-week fitness coaching for parents
                </p>
                <h1 className="mt-5 font-display text-[clamp(2.4rem,4.4vw+1rem,3.9rem)] font-bold leading-tight tracking-tight text-white">
                  Lose fat. Build strength.<br className="hidden sm:block" /> 20 minutes a day.
                </h1>
                <p className="mt-4 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                  Three home workouts a week. Simple meals your family will eat. A coach who adjusts when real life gets in the way.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#apply"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-brand-strong)] shadow-[0_18px_35px_-20px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_22px_45px_-22px_rgba(0,0,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    Get started — it&apos;s free
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </a>
                  <a
                    href="#offer"
                    className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    See what&apos;s included
                  </a>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {HERO_STATS.map((stat) => (
                    <span
                      key={stat.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm"
                    >
                      <span className="font-bold">{stat.label}</span>
                      <span className="text-white/60">{stat.description}</span>
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-white/55">
                  14-day money-back guarantee · No contract · Cancel anytime
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[0]}>
          <section className="grid gap-6">
            <SectionHeader
              eyebrow="Why it works"
              title="Three things that make this stick"
              description="Designed for parents who need real results without overhauling their lives."
            />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {PILLARS.map((item, index) => (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white/85 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 767px) calc(50vw - 2rem), 384px"
                      quality={80}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={
                        item.image.includes("strength") ? BLUR.strength :
                        item.image.includes("nutrition") ? BLUR.nutrition :
                        BLUR.accountability
                      }
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-5xl font-bold leading-none text-(--color-brand)/15">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
                    <p className="mt-3 leading-7 text-[var(--color-muted)]">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[1]}>
          <section className="rounded-3xl border border-[var(--color-border)] bg-white/80 p-5 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-(--color-border)">
                <Image src="/images/coach.jpg" alt="Vee, your coach" width={80} height={80} quality={75} loading="lazy" placeholder="blur" blurDataURL={BLUR.coach} className="object-cover" />
              </div>
              <div>
                <Badge>Your coach</Badge>
                <h2 className="mt-1 text-xl font-semibold sm:text-2xl">Hi, I&apos;m Vee</h2>
                <p className="mt-1 text-xs font-semibold text-(--color-muted)">NASM-CPT · Parent of 2</p>
                <p className="mt-2 leading-7 text-[var(--color-muted)]">
                  Certified trainer and parent of two. I built this because every program I tried assumed I had an hour free and a quiet house. Every session, meal idea, and check-in here is designed around real family life — not an ideal one.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[2]}>
          <section
            id="outcomes"
            className="scroll-mt-24 rounded-3xl border border-[var(--color-border)] bg-white/80 p-5 sm:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  What the first 12 weeks look like
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  <li className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 text-(--color-ink)">
                    More energy and fewer afternoon crashes by week 2
                  </li>
                  <li className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 text-(--color-ink)">
                    Clothes start fitting differently by weeks 4–8
                  </li>
                  <li className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 text-(--color-ink) sm:col-span-2">
                    You stop dreading workouts — and start missing them when you skip
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-zinc-900/10 bg-white/90 p-5 shadow-[0_18px_35px_-28px_rgba(0,0,0,0.35)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  Your 12 weeks
                </p>
                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 text-sm text-(--color-muted)">
                    Weeks 1–2: find your 20-minute rhythm and recover your energy.
                  </div>
                  <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 text-sm text-(--color-muted)">
                    Weeks 3–6: you start feeling it before you see it.
                  </div>
                  <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 text-sm text-(--color-muted)">
                    Weeks 7–12: it stops feeling like effort. That&apos;s when results compound.
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-4 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 px-4 sm:mx-0 sm:hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[var(--color-bg-soft)] to-transparent" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[var(--color-bg-soft)] to-transparent" aria-hidden="true" />
              {TESTIMONIALS.map((item) => (
                <TestimonialCard key={item.name} {...item} className="snap-center shrink-0 basis-[90%]" />
              ))}
            </div>

            <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3">
              {TESTIMONIALS.map((item) => (
                <TestimonialCard key={item.name} {...item} />
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[3]}>
          <section
            id="offer"
            className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-[var(--color-brand-strong)] bg-[var(--color-brand)] px-6 py-8 text-white sm:px-8"
          >
            <Image
              src="/images/offer.jpg"
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1152px"
              quality={40}
              loading="lazy"
              aria-hidden="true"
              className="object-cover opacity-10"
            />
            <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  What your 12 weeks include
                </h2>
                <p className="mt-3 max-w-3xl text-white/80">
                  Built for parents who want results without adding another thing to manage.
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="font-semibold">Training Plan</h3>
                    <p className="mt-2 text-sm text-white/80">
                      3 guided home workouts a week, around 20 minutes each. Optional 10-min add-ons for slower days.
                    </p>
                  </article>
                  <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="font-semibold">Nutrition Guide</h3>
                    <p className="mt-2 text-sm text-white/80">
                      Simple meal templates the whole family will eat. Includes a weekly grocery list and a 45-min prep workflow.
                    </p>
                  </article>
                  <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="font-semibold">Weekly Check-ins</h3>
                    <p className="mt-2 text-sm text-white/80">
                      Real adjustments each week based on your sleep, stress, and schedule. You&apos;ll always know exactly what to do next.
                    </p>
                  </article>
                </div>
              </div>
              <aside className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_35px_-28px_rgba(0,0,0,0.6)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                  Pricing
                </p>
                <p className="mt-3 text-lg font-medium">
                  $199/month for 3 months. Most parents start here.
                </p>
                <p className="mt-3 text-sm text-white/80">
                  You&apos;ll see the exact price before committing — no surprises.
                </p>
                <a
                  href="#apply"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-(--color-brand-strong) transition hover:bg-white/90"
                >
                  Apply now →
                </a>
              </aside>
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[4]}>
          <section className="grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl border border-(--color-mint-glow) bg-(--color-mint-soft) p-5 sm:p-6">
              <h2 className="text-xl font-semibold sm:text-2xl">Who this is for</h2>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3 leading-7 text-[var(--color-muted)]">
                  <span className="mt-1 flex-shrink-0 font-bold text-teal-600" aria-hidden="true">✓</span>
                  <span>You have 2–4 short windows a week — not daily hour-long gym sessions.</span>
                </li>
                <li className="flex items-start gap-3 leading-7 text-[var(--color-muted)]">
                  <span className="mt-1 flex-shrink-0 font-bold text-teal-600" aria-hidden="true">✓</span>
                  <span>You&apos;re done with all-or-nothing diets and want something you can actually sustain.</span>
                </li>
                <li className="flex items-start gap-3 leading-7 text-[var(--color-muted)]">
                  <span className="mt-1 flex-shrink-0 font-bold text-teal-600" aria-hidden="true">✓</span>
                  <span>You&apos;ve started and stopped before, and want a plan built to handle that.</span>
                </li>
              </ul>
            </article>
            <article className="rounded-3xl border border-[var(--color-border)] bg-white/80 p-5 sm:p-6">
              <h2 className="text-xl font-semibold sm:text-2xl">Who this is not for</h2>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3 leading-7 text-[var(--color-muted)]">
                  <span className="mt-1 flex-shrink-0 font-bold text-[var(--color-secondary)]" aria-hidden="true">✕</span>
                  <span>You want rapid results at any cost.</span>
                </li>
                <li className="flex items-start gap-3 leading-7 text-[var(--color-muted)]">
                  <span className="mt-1 flex-shrink-0 font-bold text-[var(--color-secondary)]" aria-hidden="true">✕</span>
                  <span>You won&apos;t track a few simple habits like sleep and meals.</span>
                </li>
              </ul>
            </article>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[5]}>
          <section
            id="faq"
            className="scroll-mt-24 rounded-3xl border border-[var(--color-border)] bg-white/80 p-5 sm:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Questions parents usually ask
                </h2>
              </div>
              <div className="space-y-4">
                {FAQ.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-[var(--color-border)] bg-white p-4 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-brand)_22%,var(--color-border))] hover:shadow-sm"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-3 text-left font-semibold text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:rounded-sm">
                      <span>{item.question}</span>
                      <span className="ml-2 text-xs text-[var(--color-muted)] transition-transform group-open:rotate-180" aria-hidden="true">
                        ▾
                      </span>
                    </summary>
                    <p className="mt-3 leading-7 text-[var(--color-muted)]">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[6]}>
          <section
            id="apply"
            className="scroll-mt-24 rounded-3xl border border-[var(--color-border)] bg-white/90 p-5 shadow-[0_18px_35px_-28px_rgba(0,0,0,0.5)] backdrop-blur sm:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="space-y-3 text-sm text-[var(--color-muted)]">
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Check if this fits your life
                </h2>
                <p className="text-xs text-[var(--color-muted)] sm:text-sm">
                  Tell us about your schedule and goals. We&apos;ll follow up with an honest recommendation — no pressure, no hard sell.
                </p>
              </div>
              <div>
                <LeadCaptureForm />
                <p className="mt-3 text-xs text-(--color-muted)">
                  Your information is used only to follow up about coaching. No spam, no sharing with third parties.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[7]}>
          <div className="h-2" />
        </Reveal>
      </div>
    </div>
  );
}
