import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Decisions",
  "Notes on the product calls behind Fit Parent Plan — what we said no to, and why.",
  "/decisions",
);

const DECISIONS = [
  {
    title: "We don't show streaks.",
    body: "Every fitness app rewards 'don't break the streak.' That design assumes a clean week, which busy parents rarely get. The streak counter becomes an accusation the moment life happens — and the user closes the tab. We built the product for the comeback instead: no day counters, no badges, no perfect-week celebrations. The only number that matters is whether you came back.",
  },
  {
    title: "We deleted the workout library.",
    body: "The site used to have /workouts, /planner, /tools, /meal-plans — content libraries with curated sessions. They competed with the AI demo's pitch ('your plan is generated for you, not pre-baked'). Two answers to one question is confusion. Killed all four pages (~1,500 line deletions). The AI demo is the wow moment; nothing else gets to compete with it.",
  },
  {
    title: "Pause-week is localStorage, not auth.",
    body: "The brand-defining feature stores 'paused until' in the browser, not a database. That's a deliberate trade — most marketing-site visitors aren't logged in, and gating the brand promise behind signup would defeat the purpose. The pause persists per-device until we ship Postgres + auth, then the same key syncs to the user profile. Ship the brand statement first, scale the persistence later.",
  },
  {
    title: "One card with tabs, not three cards.",
    body: "Plan / Workout / Adapt could each have been a separate hero feature. Three cards = more 'features' to brag about, but it stretches the home page and dilutes the wow. One card with a sliding tab indicator tells a tighter story: one assistant, three things it does. Less surface, less to break, one shared loading state and rate limit.",
  },
  {
    title: "The AI runs with a mock fallback.",
    body: "Every Claude call is wrapped in a try/catch that falls back to a hand-shaped mock plan with the same JSON contract. Cost meter, latency, source ('live' vs 'mock') all surface to the UI. When credits run out or the API hiccups, the demo still works — the visitor never sees an error. Graceful degradation is a product call as much as an engineering one.",
  },
  {
    title: "Teal, not green.",
    body: "Fitness brands default to forest green or aggressive red. We rebranded mid-build to deep teal #0E5C5C with butter cream and warm slate. Teal reads as 'thoughtful adult product' (Headspace-tier), not 'gym brand.' The clay accent #D08566 carries the warm fallback notes (the 'if today folds' nudge strip) so the page has two emotional notes instead of one.",
  },
  {
    title: "Prompt evals, not just unit tests.",
    body: "The AI adapter is tested two ways: unit tests for code paths (does the parser handle JSON-around-text?) and evals for prompt behavior (does sleep-deprived input never prescribe HIIT? does skipped-week adapt always reset lower?). Evals catch prompt regressions the same way unit tests catch code bugs. Most candidates have never seen evals in a portfolio repo.",
  },
  {
    title: "We have an /i-missed-a-week page.",
    body: "It's a single landing page targeting search terms no fitness brand will go near: 'I gave up on fitness,' 'restart fitness after burnout.' Off-brand for every competitor; on-brand for us. The whole product wedge is failure-aware design, and the SEO play makes that wedge searchable.",
  },
] as const;

export default function DecisionsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-16 pt-12 lg:px-8 lg:pt-16">

      <Reveal>
        <p className="eyebrow text-(--color-brand)">Working notes</p>
        <h1 className="mt-3 text-4xl tracking-tight sm:text-5xl">
          <span className="font-light italic text-(--color-muted)">The calls </span>
          <span className="font-black text-foreground">we made.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-(--color-muted)">
          A short, honest record of the product decisions behind this site — what we said no to and why. Anything you can&apos;t derive by clicking around.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8">
        {DECISIONS.map((d, i) => (
          <Reveal key={d.title} delayMs={i * 50}>
            <article className="border-l-2 border-(--color-brand)/40 pl-5">
              <h2 className="text-xl font-bold tracking-tight text-foreground">{d.title}</h2>
              <p className="mt-2 text-sm leading-7 text-(--color-muted)">{d.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14" delayMs={DECISIONS.length * 50}>
        <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-6 text-sm leading-6 text-(--color-muted) sm:p-7">
          <p className="font-semibold text-foreground">A note on what&apos;s deferred.</p>
          <p className="mt-2">
            Resend wiring, Postgres + auth migration, streaming AI responses, co-parent sync, calendar OAuth — all known, all queued.
            Each is intentionally not yet shipped. Choosing what <em>not</em> to build is the work.
          </p>
          <p className="mt-4 text-xs text-(--color-muted)/80">
            Want the full picture?{" "}
            <Link href="/" className="underline hover:text-foreground">
              Try the assistant
            </Link>{" "}
            or{" "}
            <Link href="/i-missed-a-week" className="underline hover:text-foreground">
              read the manifesto
            </Link>
            .
          </p>
        </div>
      </Reveal>
    </div>
  );
}
