import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Sample 20-Minute Workout",
  "A real session from the Fit Parent Plan — bodyweight, at home, done before breakfast. See exactly what 20 minutes looks like.",
  "/sample-workout",
);

const EXERCISES = [
  {
    order: 1,
    name: "Squat to reach",
    duration: "40 sec",
    rest: "20 sec",
    cue: "Feet shoulder-width. Lower until thighs are parallel, reach arms overhead at the bottom. Drive through your heels to stand.",
    why: "Wakes up hips and thoracic spine — exactly what a parent who's been carrying kids and sitting at a desk needs first.",
  },
  {
    order: 2,
    name: "Push-up (knee or full)",
    duration: "40 sec",
    rest: "20 sec",
    cue: "Hands just outside shoulder width. Lower chest to within an inch of the floor. Keep your core tight — don't let your lower back sag.",
    why: "Builds pressing strength without equipment. Knee variation is equally effective — it's not easier, just shorter range.",
  },
  {
    order: 3,
    name: "Reverse lunge",
    duration: "40 sec each leg",
    rest: "20 sec",
    cue: "Step one foot back until your back knee hovers an inch off the floor. Front shin stays vertical. Push through your front heel to return.",
    why: "Single-leg strength is more functional than bilateral squats for parents — you're constantly shifting weight, picking things up, climbing stairs.",
  },
  {
    order: 4,
    name: "Dead bug",
    duration: "40 sec",
    rest: "20 sec",
    cue: "Lie on your back, arms pointing to ceiling, knees bent at 90°. Slowly lower opposite arm and leg toward the floor. Keep your lower back pressed flat.",
    why: "Core stability, not crunches. This is what protects your lower back during the rest of your day.",
  },
  {
    order: 5,
    name: "Glute bridge hold",
    duration: "45 sec",
    rest: "15 sec",
    cue: "Feet flat on the floor, hip-width apart. Drive hips up until your body forms a straight line from knees to shoulders. Squeeze at the top.",
    why: "Glutes are the most underused muscle in parents who sit for work. This restores them in under a minute.",
  },
];

const ROUNDS = 3;
const ROUND_DURATION_MINS = 6;

export default function SampleWorkoutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 sm:px-10">

      {/* Header */}
      <p className="eyebrow text-(--color-brand)">Sample session · Week 1 · Monday</p>
      <h1 className="mt-3 text-4xl tracking-tight">
        <span className="font-light italic text-(--color-muted)">Living room </span>
        <span className="font-black text-foreground">strength circuit.</span>
      </h1>
      <p className="mt-3 text-base leading-7 text-(--color-muted)">
        This is a real session from Week 1 of the programme — the kind Maya sends on Sunday night so you know exactly what Monday morning looks like.
        No equipment. No gym. Done before the kids are up.
      </p>

      {/* Session stats */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {([
          { label: "Total time", value: "20 min" },
          { label: "Equipment", value: "None" },
          { label: "Rounds", value: `${ROUNDS} rounds` },
        ] as const).map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 text-center">
            <p className="font-display text-2xl font-black text-foreground">{stat.value}</p>
            <p className="mt-0.5 text-xs text-(--color-muted)">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Warm-up note */}
      <div className="mt-8 rounded-2xl border border-(--color-brand)/20 bg-(--color-cream) p-5">
        <p className="text-sm font-semibold text-foreground">Before you start — 2 min warm-up</p>
        <p className="mt-1 text-sm leading-6 text-(--color-muted)">
          30 sec arm circles · 30 sec leg swings (each side) · 30 sec hip circles · 30 sec slow bodyweight squats.
          That&apos;s it. You&apos;re warm.
        </p>
      </div>

      {/* How it works */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-foreground">How it works</h2>
        <p className="mt-1 text-sm text-(--color-muted)">
          Do all 5 exercises back to back, rest 90 seconds, then repeat. {ROUNDS} rounds total = ~{ROUNDS * ROUND_DURATION_MINS} minutes of work.
          Set a timer on your phone and put it face-down.
        </p>
      </div>

      {/* Exercise list */}
      <div className="mt-6 space-y-4">
        {EXERCISES.map((ex) => (
          <div key={ex.order} className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-brand) text-sm font-bold text-white">
                  {ex.order}
                </div>
                <h3 className="text-base font-bold text-foreground">{ex.name}</h3>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-(--color-brand)">{ex.duration}</p>
                <p className="text-xs text-(--color-muted)">rest {ex.rest}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-(--color-muted)">{ex.cue}</p>
            <p className="mt-2 border-t border-(--color-border) pt-2 text-xs italic text-(--color-muted)">
              Why: {ex.why}
            </p>
          </div>
        ))}
      </div>

      {/* Rest between rounds */}
      <div className="mt-4 rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-4 text-center">
        <p className="text-sm font-semibold text-foreground">Rest between rounds: 90 seconds</p>
        <p className="text-xs text-(--color-muted)">Walk around, shake out your hands. Don&apos;t sit down.</p>
      </div>

      {/* Cool-down */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-foreground">Cool-down — 2 min</h2>
        <p className="mt-1 text-sm leading-6 text-(--color-muted)">
          60 sec standing quad stretch (30 each side) · 60 sec standing forward fold, knees soft.
          Then make your coffee.
        </p>
      </div>

      {/* Week progression note */}
      <div className="mt-8 rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-6">
        <p className="eyebrow text-(--color-brand)">How this builds week to week</p>
        <div className="mt-4 space-y-3">
          {([
            { week: "Week 1", note: "This session. 3 rounds, learn the movements, track how it feels." },
            { week: "Week 2", note: "Same exercises. 4 rounds. Rest periods drop to 60 sec." },
            { week: "Week 4", note: "Progression added — split squats instead of reverse lunges, archer push-ups." },
            { week: "Week 8", note: "You've built a base. Maya introduces a second session type focused on your specific goal." },
          ] as const).map((item) => (
            <div key={item.week} className="flex gap-3 text-sm">
              <span className="shrink-0 font-semibold text-(--color-brand) w-16">{item.week}</span>
              <span className="text-(--color-muted)">{item.note}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-(--color-muted)/70">
          Your actual plan is personalised to your schedule and goal. This is the template — what Maya sends is built around the week you actually have.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-3xl bg-foreground p-8 text-center">
        <h2 className="text-2xl font-black text-white">
          Want your week built around sessions like this?
        </h2>
        <p className="mt-2 text-sm text-white/60">
          Tell us your schedule. Maya replies within 24 hours with a personalised plan.
        </p>
        <Link
          href="/#apply"
          className="cta-button mt-5 inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
        >
          Apply now <ArrowRight size={13} aria-hidden="true" />
        </Link>
        <p className="mt-3 text-xs text-white/40">14-day guarantee · No payment until after Maya&apos;s reply</p>
      </div>

      <div className="mt-10 flex items-center justify-between text-sm">
        <Link href="/" className="text-(--color-muted) underline underline-offset-2 hover:text-foreground">
          ← Back to home
        </Link>
        <Link href="/#apply" className="font-semibold text-(--color-brand) hover:text-(--color-brand-strong)">
          Apply for a spot →
        </Link>
      </div>

    </main>
  );
}
