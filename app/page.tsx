import dynamicImport from "next/dynamic";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/ui/count-up";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { FitQuiz } from "@/components/ui/fit-quiz";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { StickyApplyCta } from "@/components/marketing/sticky-apply-cta";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";

export const dynamic = "force-static";

const BLUR = {
  hero:           "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAcEAEAAgIDAQAAAAAAAAAAAAABAAIDEQQhodH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAC/9oADAMBAAIRAxEAPwCxfn4q53CopUCod72/PIiILpJDJf/Z",
  strength:       "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAcEAACAQQDAAAAAAAAAAAAAAAAAQMCBBESITFB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARMf/aAAwDAQACEQMRAD8AkwtQW+kEiVVTfa3x5jhAAELX/9k=",
  nutrition:      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAfEAABAwMFAAAAAAAAAAAAAAADAAECBBESEyIyUdH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABgRAAMBAQAAAAAAAAAAAAAAAAECEQAD/9oADAMBAAIRAxEAPwCZSIRz04W1Cw3xd+Ht+kRFB0coYMoWi7//2Q==",
  accountability: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAYEAADAQEAAAAAAAAAAAAAAAAAAQIRQf/EABQBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwChpPFTp4+OMAAB/9k=",
  sarah:          "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAdEAACAQQDAAAAAAAAAAAAAAABAgADBBESMUGB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAv/aAAwDAQACEQMRAD8ApUboNeFChDa4Y7dgZ49iIlJCn//Z",
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
      "By week 5, I stopped skipping school pickup to 'save energy.' I had energy. That sounds small but for me it wasn't.",
    name: "Sarah \u2014 mom of two",
    result: "Consistent for the first time in years",
    photo: "/images/sarah.jpg",
  },
  {
    quote:
      "Every other program assumed I had a free hour and no kids. This one assumed I had neither. That made all the difference.",
    name: "James \u2014 dad of three",
    result: "Down 14 lbs, still going",
  },
  {
    quote:
      "I told Maya I could do Tuesday evenings and Saturday mornings \u2014 and that was my whole plan. Nothing felt like a compromise.",
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


export default function Home() {
  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-6 sm:gap-16 sm:px-6 sm:pb-10 lg:pb-12">
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
                <h1 className="mt-5 leading-[1.05]">
                  <span className="block text-[clamp(2.6rem,5vw+0.5rem,5rem)] font-light italic text-white/75">Lose fat.</span>
                  <span className="block text-[clamp(2.6rem,5vw+0.5rem,5rem)] font-black text-white">Build strength.</span>
                  <span className="block text-[clamp(2.6rem,5vw+0.5rem,5rem)] font-light text-white/75"><span className="wave decoration-white/50">20 minutes</span> a day.</span>
                </h1>
                <p className="mt-4 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                  Three home workouts a week. Simple meals your family will eat. A coach who <span className="wave decoration-white/40">adjusts when real life gets in the way</span>.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#apply"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-(--color-brand-strong) shadow-[0_18px_35px_-20px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_22px_45px_-22px_rgba(0,0,0,0.55)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    Apply now
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </a>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80">
                    6 spots open this month
                  </span>
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

        <Marquee />

        <Reveal delayMs={REVEAL_DELAYS_MS[0]}>
          <section className="rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">How it works</p>
            <div className="relative mt-4 grid gap-6 sm:grid-cols-3">
              {/* Connecting line between circles — desktop only */}
              <div className="absolute left-4 right-4 top-4 hidden h-px bg-gradient-to-r from-(--color-border)/0 via-(--color-border) to-(--color-border)/0 sm:block" aria-hidden="true" />
              {([
                { n: "1", title: "Apply in 2 minutes", body: "Tell us about your schedule and goals. No payment needed." },
                { n: "2", title: "A coach replies within 24 hours", body: "You'll get a personal reply — not an automated sequence." },
                { n: "3", title: "Start Monday", body: "Your first workout and meal plan land the same week." },
              ] as const).map(({ n, title, body }, i) => (
                <Reveal key={n} delayMs={i * 100}>
                  <div className="flex gap-4">
                    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-brand) text-xs font-bold text-white ring-4 ring-white">{n}</div>
                    <div>
                      <p className="font-semibold text-foreground">{title}</p>
                      <p className="mt-1 text-sm text-(--color-muted)">{body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              {/* Check-in example */}
              <div className="mt-6 rounded-2xl border border-(--color-border) bg-(--color-bg) p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">What "a coach replies" actually looks like</p>
                <div className="flex gap-3">
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-(--color-border)">
                    <img src="/images/team-maya.jpg" alt="Maya" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-foreground">Maya</span>
                      <span className="text-xs text-(--color-muted)">Tuesday, 6:48 pm</span>
                    </div>
                    <div className="mt-1.5 rounded-xl rounded-tl-none bg-white p-3 shadow-sm">
                      <p className="text-sm leading-relaxed text-foreground">
                        Hey — saw you logged Monday&apos;s session. Quick question: how are your knees feeling after the squat sets? I want to swap something out for Wednesday if they&apos;re bugging you at all.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <section className="grid gap-6">
          <Reveal delayMs={REVEAL_DELAYS_MS[0]}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">Why it works</p>
              <h2 className="mt-2 text-3xl tracking-tight sm:text-4xl">
                <span className="font-light italic text-(--color-muted)">Three things </span>
                <span className="font-black text-foreground">that make this stick.</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {PILLARS.map((item, i) => (
              <Reveal key={item.title} delayMs={REVEAL_DELAYS_MS[0] + i * 90}>
                <article className="group h-full overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-bg-soft) shadow-[0_20px_40px_-30px_rgba(0,0,0,0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.45)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
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
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="mt-2 leading-7 text-(--color-muted)">{item.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal delayMs={REVEAL_DELAYS_MS[1]}>
          <section className="rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-5 sm:p-8">
            <Badge>Your coaching team</Badge>
            <h2 className="mt-2 text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">Three coaches, </span>
              <span className="font-black text-foreground">all parents.</span>
            </h2>
            <p className="mt-1 text-sm text-(--color-muted)">Every session, meal idea, and check-in is designed around what parents can actually do — not ideal conditions.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {([
                { name: "Maya Grant", role: "Head Coach", note: "Sets her alarm 22 minutes early to train before the school run. She builds plans the way she lives them.", photo: "/images/team-maya.jpg", cred: "NASM-CPT · Mom of 2" },
                { name: "Chris Dalton", role: "Nutrition Lead", note: "Rotates 4 dinners every week and has convinced himself they're different meals. His nutrition advice is exactly that practical.", photo: "/images/team-chris.jpg", cred: "Precision Nutrition L2 · Dad of 3" },
                { name: "Leah Shaw", role: "Accountability", note: "Replies to check-ins at 10pm from the couch. That's not a flex — it's just when she has time. She gets it.", photo: "/images/team-leah.jpg", cred: "Behavior Change Coach" },
              ] as const).map((coach) => (
                <div key={coach.name} className="flex items-start gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-(--color-border)">
                    <Image src={coach.photo} alt={coach.name} width={40} height={40} quality={75} loading="lazy" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold leading-tight text-foreground">{coach.name}</p>
                    <p className="text-xs font-semibold text-(--color-brand)">{coach.role}</p>
                    <p className="mt-0.5 text-xs text-(--color-muted)">{coach.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[2]}>
          <section className="grid gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">A real week</p>
              <h2 className="mt-2 text-3xl tracking-tight sm:text-4xl">
                <span className="font-light italic text-(--color-muted)">What your </span>
                <span className="font-black text-foreground">first week looks like.</span>
              </h2>
              <p className="mt-1 text-sm text-(--color-muted)">Not a best-case scenario. An actual week.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {([
                { day: "Monday", session: "Lower Body Strength", duration: "20 min", note: "Squats, hinges, single-leg work. No equipment needed." },
                { day: "Wednesday", session: "Core & Shoulders", duration: "18 min", note: "Swapped from the original plan because you mentioned knee soreness." },
                { day: "Friday", session: "Full Body Circuit", duration: "20 min", note: "Higher pace. Designed to wrap up the week feeling strong." },
              ] as const).map((item) => (
                <div key={item.day} className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">{item.day}</p>
                  <p className="mt-1 font-semibold text-foreground">{item.session}</p>
                  <span className="mt-1 inline-block rounded-full border border-(--color-border) px-2 py-0.5 text-xs text-(--color-muted)">{item.duration}</span>
                  <p className="mt-2 text-xs leading-5 text-(--color-muted)">{item.note}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">This week&apos;s dinner</p>
                <p className="mt-1 font-semibold text-foreground">Sheet-pan chicken with roasted veg</p>
                <p className="mt-1 text-xs text-(--color-muted)">One tray. 40 minutes total. Kids will eat it. No separate meals.</p>
              </div>
              <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">Friday check-in</p>
                <p className="mt-1 font-semibold text-foreground">A short note from your coach</p>
                <p className="mt-1 text-xs text-(--color-muted)">Not a form. Not a questionnaire. Just a message asking how the week landed.</p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[2]}>
          <section
            id="outcomes"
            className="scroll-mt-24 rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-6 sm:p-10"
          >
            <h2 className="text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">What the first 12 weeks </span>
              <span className="font-black text-foreground">look like.</span>
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
          <section className="scroll-mt-24 rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-5 sm:p-8">
            <h2 className="text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">What </span>
              <span className="font-black text-foreground">parents say.</span>
            </h2>
            <p className="mt-1 text-sm text-(--color-muted)"><CountUp target={50} suffix="+" /> parents have completed the 12 weeks.</p>
            <TestimonialsSection items={TESTIMONIALS} />
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[4]}>
          <section
            id="offer"
            className="scroll-mt-24 rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-5 sm:p-8"
          >
            <h2 className="text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">What&apos;s </span>
              <span className="font-black text-foreground">included.</span>
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Reveal delayMs={0}>
                <div className="h-full rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-(--color-brand)/20 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-mint-soft) text-(--color-brand)">
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
              </Reveal>
              <Reveal delayMs={80}>
                <div className="h-full rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-(--color-brand)/20 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-mint-soft) text-(--color-brand)">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 16c0 0 1-6 6-9 3-1.5 6-1 6-1s0 3-2 5.5C12 14 9 14.5 7 14.5"/>
                      <path d="M4 16l3-4"/>
                    </svg>
                  </div>
                  <p className="mt-3 font-semibold text-foreground">Nutrition</p>
                  <p className="mt-1 text-sm text-(--color-muted)">One meal for the whole family. Simple grocery list included.</p>
                </div>
              </Reveal>
              <Reveal delayMs={160}>
                <div className="h-full rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-(--color-brand)/20 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-mint-soft) text-(--color-brand)">
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
              </Reveal>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-(--color-muted)">$199/month · 3 months · <span className="wave">email us in the first 14 days</span> if it&apos;s not working — we send the money back, full stop.</p>
              <a href="#apply" className="cta-button inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold">
                Apply now →
              </a>
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[5]}>
          <section
            id="faq"
            className="scroll-mt-24 rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-4 sm:p-6"
          >
            <h2 className="text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">Common </span>
              <span className="font-black text-foreground">questions.</span>
            </h2>
            <FaqAccordion items={FAQ} />
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[6]}>
          <section className="rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-(--color-muted)">Honest about the fit</p>
            <h2 className="mt-2 text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">This probably isn&apos;t </span>
              <span className="font-black text-foreground">right for you if…</span>
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {([
                "You want live group classes or in-person gym sessions",
                "You're looking for a strict calorie-counting or macro-tracking plan",
                "You need clinical support for a medical condition or injury rehab",
                "You want an 8-week transformation — this is 12 weeks of steady, sustainable work",
                "You're not willing to do 3 sessions a week most weeks",
                "You'd rather have an app than a real person checking in",
              ] as const).map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-(--color-muted)">
                  <span className="mt-0.5 shrink-0 text-base leading-none text-(--color-border)">✕</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-(--color-muted)">
              If none of those apply — and you&apos;re a busy parent who just needs something that works around real life — then keep reading.
            </p>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[6]}>
          <section
            id="apply"
            className="scroll-mt-24 rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-5 shadow-[0_18px_35px_-28px_rgba(0,0,0,0.35)]"
          >
            <h2 className="text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">Apply for </span>
              <span className="font-black text-foreground">a spot.</span>
            </h2>
            <p className="mt-1 text-sm text-(--color-muted)">Two-minute form. We reply personally — not an automated email.</p>
            <div className="mt-4 rounded-2xl border border-(--color-border) bg-(--color-bg) p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">Quick check — three questions</p>
              <FitQuiz />
            </div>
            <div className="mt-4">
              <LeadCaptureForm />
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={REVEAL_DELAYS_MS[7]}>
          <div className="h-2" />
        </Reveal>
      </div>
      <StickyApplyCta />
    </div>
  );
}
