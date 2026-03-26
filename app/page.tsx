import dynamicImport from "next/dynamic";
import Image from "next/image";
import type React from "react";
import { CountUp } from "@/components/ui/count-up";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { FitQuiz } from "@/components/ui/fit-quiz";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { StickyApplyCta } from "@/components/marketing/sticky-apply-cta";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";

export const dynamic = "force-static";

/* ─── blur placeholders ─────────────────────────────────────────── */
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
      <div className="animate-pulse space-y-4 rounded-2xl border border-(--color-border) bg-white p-6">
        <div className="h-3 w-2/5 rounded bg-zinc-200" />
        <div className="h-10 w-full rounded-xl bg-zinc-100" />
        <div className="h-10 w-full rounded-xl bg-zinc-100" />
        <div className="h-10 w-full rounded-xl bg-zinc-100" />
        <div className="h-24 w-full rounded-xl bg-zinc-100" />
        <div className="h-12 w-full rounded-full bg-zinc-200" />
      </div>
    ),
  },
);

/* ─── data ───────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "By week 5, I stopped skipping school pickup to 'save energy.' I had energy. That sounds small but for me it wasn't.",
    name: "Sarah \u2014 mom of two",
    result: "Consistent for the first time in years",
    photo: "/images/sarah.jpg",
  },
  {
    quote: "Every other program assumed I had a free hour and no kids. This one assumed I had neither. That made all the difference.",
    name: "James \u2014 dad of three",
    result: "Down 14 lbs, still going",
  },
  {
    quote: "I told Maya I could do Tuesday evenings and Saturday mornings \u2014 and that was my whole plan. Nothing felt like a compromise.",
    name: "Linda \u2014 working mom",
    result: "Clothes fit differently by week 6",
  },
];

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
    question: "How quickly will I see results?",
    answer: "Most parents feel more energy by week 2–3. Visible changes around weeks 4–8.",
  },
  {
    question: "What if I have injuries or low fitness?",
    answer: "We start from where you actually are. Every movement has modifications for sore joints, old injuries, or low starting fitness.",
  },
  {
    question: "Is there a refund?",
    answer: "Yes. If you show up for the first 14 days and it isn't a fit, email us for a full refund — no hoops.",
  },
];

/* ─── helpers ────────────────────────────────────────────────────── */
function TimeMarker({ time, note }: { time: string; note: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-5">
        <span className="shrink-0 font-mono text-[clamp(2.2rem,5vw,4rem)] leading-none tabular-nums tracking-tighter text-(--color-muted)/35">
          {time}
        </span>
        <div className="h-px flex-1 bg-(--color-border)" />
      </div>
      <p className="mt-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-(--color-muted)">{note}</p>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="bg-background text-foreground">

      {/* ── 06:22 · HERO ─────────────────────────────────────────── */}
      <Reveal>
        <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden py-24 sm:py-32 lg:py-40">
          <Image
            src="/images/hero.jpg"
            alt="Parent doing a home workout before the kids wake up"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
            priority
            placeholder="blur"
            blurDataURL={BLUR.hero}
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,18,20,0.92)_0%,rgba(10,18,20,0.70)_55%,rgba(10,18,20,0.25)_100%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              {/* timestamp */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-[clamp(3rem,8vw,7rem)] leading-none tabular-nums tracking-tighter text-white/30">
                  06:22
                </span>
                <div className="mb-1 h-px flex-1 bg-white/15" />
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Tuesday · Every week
              </p>

              {/* heading */}
              <h1 className="mt-5 leading-[1.05]">
                <span className="block text-[clamp(2.4rem,4.5vw+0.5rem,4.5rem)] font-light italic text-white/75">Before the kids wake up.</span>
                <span className="block text-[clamp(2.4rem,4.5vw+0.5rem,4.5rem)] font-black text-white"><span className="wave decoration-white/40">Twenty minutes.</span> That&apos;s all it takes.</span>
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                A plan built around the week you actually have — not the one you planned.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#apply"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-(--color-brand-strong) shadow-[0_18px_35px_-20px_rgba(0,0,0,0.55)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Apply now
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </a>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/75">
                  6 spots open this month
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                {["14-day guarantee", "No contract", "Cancel anytime"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-sm text-white/50">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 6.5l2.5 2.5 5.5-5.5"/></svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── main content ─────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">

        {/* ── 07:45 · THE MORNING ──────────────────────────────── */}
        <Reveal>
          <section className="pt-20 sm:pt-28">
            <TimeMarker time="07:45" note="School run. Packed lunches. The usual." />
            <div className="grid gap-6 sm:grid-cols-2">
              <p className="text-lg leading-8 text-(--color-muted)">
                By the time you&apos;re back from drop-off, the workout is already done. That&apos;s the whole idea — a plan that fits inside the gaps that already exist.
              </p>
              <p className="text-lg leading-8 text-(--color-muted)">
                Three sessions a week. Twenty minutes each. No commute, no waiting for equipment, no babysitter required. The hard part isn&apos;t the fitness — it&apos;s finding a system that survives a Tuesday.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal className="mt-10">
          <Marquee />
        </Reveal>

        {/* ── 12:22 · THE SESSION ──────────────────────────────── */}
        <Reveal>
          <section className="pt-20 sm:pt-28">
            <TimeMarker time="12:22" note="The workout was done by now." />
            <h2 className="mb-8 text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">Three things </span>
              <span className="font-black text-foreground">that made it happen.</span>
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {([
                {
                  image: "/images/strength.jpg",
                  blur: "strength",
                  label: "Training",
                  heading: "20-Minute Strength Blocks",
                  body: "Three sessions at home, three times a week. Short enough to actually happen.",
                },
                {
                  image: "/images/nutrition.jpg",
                  blur: "nutrition",
                  label: "Nutrition",
                  heading: "Simple Family Nutrition",
                  body: "No separate meals. No food scales. Just simple food the whole table will eat.",
                },
                {
                  image: "/images/accountability.jpg",
                  blur: "accountability",
                  label: "Accountability",
                  heading: "Flexible Check-ins",
                  body: "Life gets messy. We check in each week and adjust — so you never have to start over.",
                },
              ] as const).map((item, i) => (
                <Reveal key={item.label} delayMs={i * 90}>
                  <article className="group overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-bg-soft) shadow-[0_18px_36px_-28px_rgba(0,0,0,0.3)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-26px_rgba(0,0,0,0.4)]">
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.heading}
                        fill
                        sizes="(max-width: 639px) 100vw, 33vw"
                        quality={80}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={
                          item.blur === "strength" ? BLUR.strength :
                          item.blur === "nutrition" ? BLUR.nutrition :
                          BLUR.accountability
                        }
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">{item.label}</p>
                      <h3 className="mt-1.5 text-lg font-bold text-foreground">{item.heading}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-(--color-muted)">{item.body}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── 13:08 · THE MESSAGE ──────────────────────────────── */}
        <Reveal>
          <section className="pt-20 sm:pt-28">
            <TimeMarker time="13:08" note="A message from Maya." />
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* 3-step how it works */}
              <div>
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">How it </span>
                  <span className="font-black text-foreground">actually starts.</span>
                </h2>
                <div className="mt-7 flex flex-col gap-5">
                  {([
                    { n: "1", title: "Apply in 2 minutes", body: "Tell us about your schedule and goals. No payment needed." },
                    { n: "2", title: "A coach replies within 24 hours", body: "You'll get a personal reply — not an automated sequence." },
                    { n: "3", title: "Start Monday", body: "Your first workout and meal plan land the same week." },
                  ] as const).map(({ n, title, body }) => (
                    <div key={n} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-brand) text-xs font-bold text-white ring-4 ring-(--color-bg)">{n}</div>
                      <div>
                        <p className="font-semibold text-foreground">{title}</p>
                        <p className="mt-0.5 text-sm text-(--color-muted)">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Check-in example */}
              <div className="flex flex-col justify-center">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-(--color-muted)">What &ldquo;a coach replies&rdquo; actually looks like</p>
                <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-5">
                  <div className="flex gap-3">
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-(--color-border)">
                      <img src="/images/team-maya.jpg" alt="Maya" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold text-foreground">Maya</span>
                        <span className="text-xs text-(--color-muted)">Tuesday, 1:08 pm</span>
                      </div>
                      <div className="mt-2 rounded-xl rounded-tl-none bg-white p-3.5 shadow-sm">
                        <p className="text-sm leading-relaxed text-foreground">
                          Hey — saw you logged Monday&apos;s session. Quick question: how are your knees feeling after the squat sets? I want to swap something out for Wednesday if they&apos;re bugging you at all.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <div className="max-w-[80%] rounded-xl rounded-br-none bg-(--color-brand)/10 p-3">
                      <p className="text-sm text-foreground">They&apos;re fine actually. A little tight but nothing bad.</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-3">
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-(--color-border)">
                      <img src="/images/team-maya.jpg" alt="Maya" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="mt-0.5 rounded-xl rounded-tl-none bg-white p-3.5 shadow-sm">
                        <p className="text-sm leading-relaxed text-foreground">
                          Good to know. I&apos;ll keep the plan as is then. See you Wednesday 💪
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── 17:58 · DINNER ───────────────────────────────────── */}
        <Reveal>
          <section className="pt-20 sm:pt-28">
            <TimeMarker time="17:58" note="Dinner. One pan. Everyone ate it." />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">Your first week, </span>
                  <span className="font-black text-foreground">mapped out.</span>
                </h2>
                <p className="mt-3 text-sm leading-6 text-(--color-muted)">Not a best-case scenario. An actual week — the kind where Wednesday gets complicated.</p>
              </div>

              {([
                { day: "Monday", session: "Lower Body Strength", duration: "20 min", note: "Squats, hinges, single-leg work. No equipment." },
                { day: "Wednesday", session: "Core & Shoulders", duration: "18 min", note: "Swapped after you mentioned knee soreness on Monday." },
                { day: "Friday", session: "Full Body Circuit", duration: "20 min", note: "Higher pace. End the week feeling strong." },
              ] as const).map((item) => (
                <div key={item.day} className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">{item.day}</p>
                  <p className="mt-1.5 font-bold text-foreground">{item.session}</p>
                  <span className="mt-1 inline-block rounded-full border border-(--color-border) px-2.5 py-0.5 text-xs text-(--color-muted)">{item.duration}</span>
                  <p className="mt-2 text-xs leading-5 text-(--color-muted)">{item.note}</p>
                </div>
              ))}

              <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 sm:col-span-2 lg:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">This week&apos;s dinner</p>
                <p className="mt-1.5 font-bold text-foreground">Sheet-pan chicken with roasted veg</p>
                <p className="mt-1 text-xs leading-5 text-(--color-muted)">One tray. 40 minutes total. Kids will eat it. No separate meals, no food scales.</p>
              </div>

              <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 sm:col-span-2 lg:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">Friday check-in</p>
                <p className="mt-1.5 font-bold text-foreground">A short note from your coach</p>
                <p className="mt-1 text-xs leading-5 text-(--color-muted)">Not a form, not a questionnaire. A message asking how the week actually landed — and what to adjust.</p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── 19:30 · THE TEAM ─────────────────────────────────── */}
        <Reveal>
          <section className="pt-20 sm:pt-28">
            <TimeMarker time="19:30" note="The team behind your Tuesday." />
            <h2 className="mb-8 text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">Three coaches, </span>
              <span className="font-black text-foreground">all parents.</span>
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {([
                { name: "Maya Grant", role: "Head Coach", cred: "NASM-CPT · Mom of 2", note: "Sets her alarm 22 minutes early to train before the school run. She builds plans the way she lives them.", quirk: "Her rule: if she wouldn't do it on a Tuesday night after work, it doesn't go in the plan.", photo: "/images/team-maya.jpg" },
                { name: "Chris Dalton", role: "Nutrition Lead", cred: "Precision Nutrition L2 · Dad of 3", note: "Rotates 4 dinners every week and has convinced himself they're different meals. His nutrition advice is exactly that practical.", quirk: "One meal for the whole table, done in under 45 minutes. Non-negotiable.", photo: "/images/team-chris.jpg" },
                { name: "Leah Shaw", role: "Accountability", cred: "Behavior Change Coach", note: "Replies to check-ins at 10pm from the couch. That's not a flex — it's just when she has time. She gets it.", quirk: "Specialises in the recovery after a rough week — without the guilt spiral.", photo: "/images/team-leah.jpg" },
              ] as const).map((coach, i) => (
                <Reveal key={coach.name} delayMs={i * 80}>
                  <div className="flex flex-col gap-3 rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-5">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-(--color-border)">
                        <Image src={coach.photo} alt={coach.name} width={48} height={48} quality={75} loading="lazy" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold leading-tight text-foreground">{coach.name}</p>
                        <p className="text-xs font-semibold text-(--color-brand)">{coach.role}</p>
                        <p className="text-xs text-(--color-muted)">{coach.cred}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-(--color-muted)">{coach.note}</p>
                    <p className="border-t border-(--color-border) pt-3 text-xs italic leading-5 text-(--color-muted)">{coach.quirk}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── 20:14 · WHAT PARENTS SAY ─────────────────────────── */}
        <Reveal>
          <section id="outcomes" className="scroll-mt-24 pt-20 sm:pt-28">
            <TimeMarker time="20:14" note="What other parents said about their Tuesday." />
            <div className="mb-6 flex items-baseline gap-3">
              <h2 className="text-3xl tracking-tight sm:text-4xl">
                <span className="font-light italic text-(--color-muted)">What </span>
                <span className="font-black text-foreground">parents say.</span>
              </h2>
              <span className="text-sm text-(--color-muted)"><CountUp target={50} suffix="+" /> parents · 12 weeks</span>
            </div>
            <TestimonialsSection items={TESTIMONIALS} />
          </section>
        </Reveal>

        {/* ── 21:41 · WHAT'S IN IT ─────────────────────────────── */}
        <Reveal>
          <section id="offer" className="scroll-mt-24 pt-20 sm:pt-28">
            <TimeMarker time="21:41" note="What's in it." />
            <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">What&apos;s </span>
                  <span className="font-black text-foreground">included.</span>
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {([
                    { icon: "training", label: "Training", body: "3 home workouts a week, 20 minutes each. No gym." },
                    { icon: "nutrition", label: "Nutrition", body: "One meal for the whole family. Simple grocery list included." },
                    { icon: "checkin", label: "Check-ins", body: "Weekly adjustments when life gets in the way." },
                  ] as const).map((item) => (
                    <div key={item.label} className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">{item.label}</p>
                      <p className="mt-2 text-sm leading-6 text-(--color-muted)">{item.body}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm text-(--color-muted)">
                  $199/month · 3 months · <span className="wave">email us in the first 14 days</span> if it&apos;s not working — we send the money back, full stop.
                </p>
              </div>
              <div className="flex items-end">
                <a href="#apply" className="cta-button inline-flex items-center justify-center whitespace-nowrap px-6 py-3 text-sm font-semibold">
                  Apply now →
                </a>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── 22:00 · HONEST ABOUT THE FIT ────────────────────── */}
        <Reveal>
          <section className="pt-20 sm:pt-28">
            <TimeMarker time="22:00" note="Honest about the fit." />
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">This probably isn&apos;t </span>
                  <span className="font-black text-foreground">right for you if…</span>
                </h2>
                <ul className="mt-6 grid gap-3">
                  {([
                    "You want live group classes or in-person gym sessions",
                    "You're looking for strict calorie-counting or macro tracking",
                    "You need clinical support for a medical condition",
                    "You want an 8-week transformation — this is 12 weeks of steady work",
                    "You'd rather have an app than a real person checking in",
                  ] as const).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-(--color-muted)">
                      <span className="mt-0.5 shrink-0 text-base leading-none text-(--color-border)">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-(--color-muted)">
                  If none of those apply — keep reading.
                </p>
              </div>
              <div>
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">Questions from </span>
                  <span className="font-black text-foreground">the couch.</span>
                </h2>
                <div className="mt-6">
                  <FaqAccordion items={FAQ} />
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── APPLY · YOUR FIRST TUESDAY STARTS MONDAY ─────────── */}
        <Reveal>
          <section
            id="apply"
            className="scroll-mt-24 mt-20 rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-6 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.3)] sm:mt-28 sm:p-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-muted)">Your first Tuesday starts Monday</p>
            <h2 className="mt-2 text-3xl tracking-tight sm:text-4xl">
              <span className="font-light italic text-(--color-muted)">Apply for </span>
              <span className="font-black text-foreground">a spot.</span>
            </h2>
            <p className="mt-1 text-sm text-(--color-muted)">Two-minute form. We reply personally — not an automated email.</p>

            <div className="mt-5 rounded-2xl border border-(--color-border) bg-(--color-bg) p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-(--color-muted)">Quick check — three questions</p>
              <FitQuiz />
            </div>

            <div className="mt-5">
              <LeadCaptureForm />
            </div>
          </section>
        </Reveal>

        <div className="h-10 sm:h-16" />
      </div>

      <StickyApplyCta />
    </div>
  );
}
