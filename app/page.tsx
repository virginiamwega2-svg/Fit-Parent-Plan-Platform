import dynamicImport from "next/dynamic";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

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
      <div className="animate-pulse rounded-2xl border border-(--color-border) bg-white p-6 space-y-4">
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
    question: "Is there a refund?",
    answer:
      "Yes. If you show up for the first 14 days and it isn't a fit, email us for a full refund — no hoops.",
  },
];

const REVEAL_DELAYS_MS = [80, 120, 160, 200, 240, 280, 300, 320] as const;

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
      className={`rounded-2xl border border-(--color-border) bg-white p-5 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.35)]${className ? ` ${className}` : ""}`}
    >
      <p className="text-sm text-amber-400" aria-label="5 out of 5 stars">★★★★★</p>
      <p className="mt-2 leading-7 text-foreground/80">&ldquo;{quote}&rdquo;</p>
      <footer className="mt-4 flex items-center gap-3">
        {photo ? (
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-(--color-border)">
            <Image src={photo} alt={name} width={36} height={36} quality={75} loading="lazy" className="object-cover" />
          </div>
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-(--color-border) bg-(--color-mint-soft)">
            <span className="text-xs font-semibold text-(--color-brand-strong)">{name.charAt(0)}</span>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs font-medium text-teal-700">{result}</p>
        </div>
      </footer>
    </blockquote>
  );
}

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-6 sm:gap-10 sm:px-6 sm:pb-10 lg:pb-12">
        <Reveal>
          <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden py-20 sm:py-28 lg:py-36">
            <Image
              src="/images/hero.jpg"
              alt="Parent doing a home workout"
              fill
              sizes="100vw"
              quality={85}
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
                <div className="mt-6">
                  <a
                    href="#apply"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-(--color-brand-strong) shadow-[0_18px_35px_-20px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_22px_45px_-22px_rgba(0,0,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    Apply now
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </a>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {["14-day guarantee", "No contract", "Cancel anytime"].map((item) => (
                    <span key={item} className="flex items-center gap-1.5 text-sm text-white/60">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 6.5l2.5 2.5 5.5-5.5"/></svg>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[0]}>
          <section className="grid gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">Why it works</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Three things that make this stick</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {PILLARS.map((item) => (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-3xl border border-(--color-border) bg-white/85 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-0.5"
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
                  <div className="p-5">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="mt-2 leading-7 text-(--color-muted)">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[1]}>
          <section className="rounded-3xl border border-(--color-border) bg-white/80 p-5 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-(--color-border)">
                <Image src="/images/coach.jpg" alt="Vee, your coach" width={80} height={80} quality={75} loading="lazy" placeholder="blur" blurDataURL={BLUR.coach} className="object-cover" />
              </div>
              <div>
                <Badge>Your coach</Badge>
                <h2 className="mt-1 text-xl font-semibold sm:text-2xl">Hi, I&apos;m Vee</h2>
                <p className="mt-1 text-xs font-semibold text-(--color-muted)">NASM-CPT · Parent of 2</p>
                <p className="mt-2 leading-7 text-(--color-muted)">
                  Certified trainer and parent of two. I built this because every program I tried assumed I had an hour free and a quiet house. Every session, meal idea, and check-in here is designed around real family life — not an ideal one.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[2]}>
          <section
            id="outcomes"
            className="scroll-mt-24 rounded-3xl border border-(--color-border) bg-white/80 p-6 sm:p-10"
          >
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What the first 12 weeks look like
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              <li className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
                <p className="text-xs font-semibold text-(--color-brand)">Week 2</p>
                <p className="mt-1 text-foreground">More energy and fewer afternoon crashes</p>
              </li>
              <li className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
                <p className="text-xs font-semibold text-(--color-brand)">Weeks 4–8</p>
                <p className="mt-1 text-foreground">Clothes start fitting differently</p>
              </li>
              <li className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
                <p className="text-xs font-semibold text-(--color-brand)">Week 12</p>
                <p className="mt-1 text-foreground">You stop dreading workouts — and start missing them when you skip</p>
              </li>
            </ul>

          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[3]}>
          <section className="scroll-mt-24 rounded-3xl border border-(--color-border) bg-white/80 p-5 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What parents say</h2>

            <div className="relative mt-4 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 px-4 sm:mx-0 sm:hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white/80 to-transparent" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white/80 to-transparent" aria-hidden="true" />
              {TESTIMONIALS.map((item) => (
                <TestimonialCard key={item.name} {...item} className="snap-center shrink-0 basis-[90%]" />
              ))}
            </div>

            <div className="mt-4 hidden gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3">
              {TESTIMONIALS.map((item) => (
                <TestimonialCard key={item.name} {...item} />
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[4]}>
          <section
            id="offer"
            className="scroll-mt-24 rounded-3xl border border-(--color-border) bg-white/80 p-5 sm:p-8"
          >
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What&apos;s included
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-mint-soft) text-(--color-brand)">
                  {/* dumbbell */}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="1.5" y="8.5" width="2.5" height="3" rx="1"/>
                    <rect x="4" y="6.5" width="3" height="7" rx="1.5"/>
                    <line x1="7" y1="10" x2="13" y2="10"/>
                    <rect x="13" y="6.5" width="3" height="7" rx="1.5"/>
                    <rect x="16" y="8.5" width="2.5" height="3" rx="1"/>
                  </svg>
                </div>
                <p className="mt-3 font-semibold text-foreground">Training</p>
                <p className="mt-1 text-sm text-(--color-muted)">3 home workouts a week, 20 minutes each. No gym.</p>
              </div>
              <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-mint-soft) text-(--color-brand)">
                  {/* leaf / nutrition */}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 16c0 0 1-6 6-9 3-1.5 6-1 6-1s0 3-2 5.5C12 14 9 14.5 7 14.5"/>
                    <path d="M4 16l3-4"/>
                  </svg>
                </div>
                <p className="mt-3 font-semibold text-foreground">Nutrition</p>
                <p className="mt-1 text-sm text-(--color-muted)">One meal for the whole family. Simple grocery list included.</p>
              </div>
              <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-mint-soft) text-(--color-brand)">
                  {/* calendar check */}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="4" width="14" height="13" rx="2"/>
                    <path d="M3 8.5h14"/>
                    <path d="M7 2.5v3M13 2.5v3"/>
                    <path d="M7 12.5l2 2 4-4"/>
                  </svg>
                </div>
                <p className="mt-3 font-semibold text-foreground">Check-ins</p>
                <p className="mt-1 text-sm text-(--color-muted)">Weekly adjustments when life gets in the way.</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-(--color-muted)">$199/month · 3 months · 14-day money-back guarantee</p>
              <a
                href="#apply"
                className="inline-flex items-center justify-center rounded-full bg-(--color-brand) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-(--color-brand-strong)"
              >
                Apply now →
              </a>
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[5]}>
          <section
            id="faq"
            className="scroll-mt-24 rounded-3xl border border-(--color-border) bg-white/80 p-4 sm:p-6"
          >
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Common questions
            </h2>
            <div className="mt-6 space-y-2">
              {FAQ.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-(--color-border) bg-white px-4 py-3 transition-[border-color,box-shadow] duration-200 hover:border-(--color-brand)/30 hover:shadow-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 text-left font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2 focus-visible:rounded-sm">
                    <span>{item.question}</span>
                    <svg className="shrink-0 text-(--color-muted) transition-transform group-open:rotate-180" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>
                  </summary>
                  <p className="mt-2 pb-1 text-sm leading-7 text-(--color-muted)">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[6]}>
          <section
            id="apply"
            className="scroll-mt-24 rounded-3xl border border-(--color-border) bg-white/90 p-5 shadow-[0_18px_35px_-28px_rgba(0,0,0,0.5)] backdrop-blur"
          >
            <h2 className="text-xl font-semibold tracking-tight">Apply for a spot</h2>
            <p className="mt-1 text-sm text-(--color-muted)">Takes 2 minutes. We reply within 24 hours.</p>
            <div className="mt-4">
              <LeadCaptureForm />
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
