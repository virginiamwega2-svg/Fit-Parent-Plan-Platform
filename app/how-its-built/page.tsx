import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mic, Cpu, FileJson, Layers, Database, CreditCard, Sparkles, ShieldCheck, Gauge, Eye, Wrench } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "How it's built · Fit Parent Plan",
  description:
    "The engineering behind the AI assistant for busy parents — Claude, server actions, voice input, honest cost UX, and what's next.",
};

const STACK = [
  { icon: Layers, label: "Next.js 16" },
  { icon: Cpu, label: "React 19" },
  { icon: Sparkles, label: "Claude Haiku 4.5" },
  { icon: Mic, label: "Web Speech API" },
  { icon: Database, label: "SQLite → Postgres" },
  { icon: CreditCard, label: "Stripe" },
  { icon: ShieldCheck, label: "Custom auth (HMAC + PBKDF2)" },
  { icon: Wrench, label: "Tailwind v4 · Vitest · Playwright" },
];

const FLOW_STEPS = [
  {
    n: "1",
    title: "Voice or text check-in",
    body: "Web Speech API transcribes locally in the browser — no audio leaves the device. If unsupported, the textarea takes over silently.",
  },
  {
    n: "2",
    title: "Server action with Zod + rate limit",
    body: "The check-in hits a typed server action. Zod validates shape; an in-memory token bucket caps requests per IP per day. No REST layer.",
  },
  {
    n: "3",
    title: "Claude Haiku 4.5",
    body: "A short system prompt encodes the rules — honor sleep, match the time, no equipment unless mentioned. Haiku because it's fast, cheap, and accurate enough for one-shot plans.",
  },
  {
    n: "4",
    title: "Structured JSON + defensive parse",
    body: "The model is forced to return a strict JSON shape (headline, steps, reasoning, confidence). The parser slices the first { … } block so stray prose can't break the UI.",
  },
  {
    n: "5",
    title: "Render + cost + reasoning",
    body: "The plan streams back with a confidence pill, an honest per-call cost, and a 'Why this plan?' toggle that exposes the model's reasoning — trust, not magic.",
  },
];

const DECISIONS = [
  {
    icon: ShieldCheck,
    title: "Mock fallback is a feature, not a hack",
    body:
      "If the live Claude call fails — bad key, no credits, network blip — the UI degrades to a realistic mock plan instead of erroring. Users always get a plan; engineers see the real cause in logs. Demos never embarrass you.",
  },
  {
    icon: Eye,
    title: "Show the cost — every call",
    body:
      "The card footer prints the exact USD spent on the request. Most AI products hide this. Showing it builds trust with parents and signals product-engineering hygiene to anyone looking under the hood.",
  },
  {
    icon: Gauge,
    title: "Calibrated confidence",
    body:
      "The model returns a 0–1 confidence score. When it dips below 80%, the UI says 'I'm 70% sure — confirm if it fits' instead of pretending. Honesty about uncertainty is rare in consumer AI.",
  },
  {
    icon: FileJson,
    title: "Server actions over REST",
    body:
      "No /api/ai endpoint. The check-in invokes a typed server action directly from the client. Less plumbing, fewer types to keep in sync, native Next 16 idiom.",
  },
];

const ROADMAP = [
  { label: "n8n Sunday digest", detail: "Cron → Claude reviews next week → email/SMS plan with reply-to-edit loop." },
  { label: "Postgres + pgvector", detail: "Move off SQLite; add per-family memory so plans get smarter week over week." },
  { label: "Calendar-aware planning", detail: "Read Google Calendar to find real workout windows, not invented ones." },
  { label: "Eval harness", detail: "Golden set of 20 parent scenarios run on every prompt change." },
  { label: "Reply-by-email agent", detail: "Parents reply 'swap Wed and Thu' → webhook → Claude → updated plan." },
];

export default function HowItsBuiltPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">

        {/* Hero */}
        <Reveal>
          <header>
            <p className="eyebrow inline-flex items-center gap-1.5 text-(--color-brand)">
              <Wrench size={13} aria-hidden="true" /> Built in public
            </p>
            <h1 className="mt-3 text-4xl tracking-tight sm:text-5xl">
              <span className="font-light italic text-(--color-muted)">How this site </span>
              <span className="font-black text-foreground">actually works.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-(--color-muted)">
              The AI assistant on the home page is a real production system, not a demo.
              Here&apos;s the stack, the flow, the decisions behind it, and what&apos;s coming next —
              for the curious parent and the curious engineer.
            </p>
          </header>
        </Reveal>

        {/* Stack */}
        <Reveal delayMs={80}>
          <section className="mt-14 sm:mt-20">
            <SectionHeader eyebrow="Stack" title="What it's made of" description="Lean by default. No framework soup." />
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {STACK.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-(--color-border) bg-(--color-bg-soft) px-4 py-3">
                  <Icon size={16} className="shrink-0 text-(--color-brand)" aria-hidden="true" />
                  <p className="text-sm font-medium text-foreground">{label}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* The AI flow */}
        <Reveal delayMs={120}>
          <section className="mt-14 sm:mt-20">
            <SectionHeader
              eyebrow="The AI flow"
              title="From voice to plan in five steps"
              description="What happens between hitting the mic and seeing today's plan."
            />
            <ol className="mt-6 grid gap-3">
              {FLOW_STEPS.map(({ n, title, body }) => (
                <li key={n} className="flex gap-4 rounded-2xl border border-(--color-border) bg-white p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-brand) text-sm font-bold text-white">
                    {n}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-(--color-muted)">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        {/* Design decisions */}
        <Reveal delayMs={160}>
          <section className="mt-14 sm:mt-20">
            <SectionHeader
              eyebrow="Design decisions"
              title="The opinionated bits"
              description="Why a few small things are different from the typical AI demo."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {DECISIONS.map(({ icon: Icon, title, body }) => (
                <article key={title} className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-5">
                  <Icon size={18} className="text-(--color-brand)" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-(--color-muted)">{body}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Privacy */}
        <Reveal delayMs={200}>
          <section className="mt-14 rounded-3xl border border-(--color-border) bg-(--color-cream) p-6 sm:mt-20 sm:p-8">
            <p className="eyebrow text-(--color-brand)">Privacy</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              What we send, what we don&apos;t.
            </h2>
            <ul className="mt-4 grid gap-2.5 text-sm leading-6 text-(--color-muted)">
              <li>· Voice transcription happens in your browser. Audio never leaves your device.</li>
              <li>· Only the typed/transcribed text + minutes available are sent to the model.</li>
              <li>· Anonymous IP is used to rate-limit the public demo. Nothing else.</li>
              <li>· Per-call cost is shown to you, not hidden.</li>
            </ul>
          </section>
        </Reveal>

        {/* Roadmap */}
        <Reveal delayMs={240}>
          <section className="mt-14 sm:mt-20">
            <SectionHeader
              eyebrow="What's next"
              title="Roadmap, in the open"
              description="Shipping in public — these are the next pieces."
            />
            <ul className="mt-6 grid gap-2.5">
              {ROADMAP.map(({ label, detail }) => (
                <li key={label} className="flex flex-col gap-1 rounded-2xl border border-(--color-border) bg-white px-5 py-3 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="font-semibold text-foreground">{label}</span>
                  <span className="text-sm text-(--color-muted)">{detail}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* CTA */}
        <Reveal delayMs={280}>
          <section className="mt-14 flex flex-col items-start gap-4 rounded-3xl border border-(--color-brand)/20 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.18)] sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-display text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                Try the assistant.
              </p>
              <p className="mt-1 text-sm text-(--color-muted)">No signup. Voice or text. ~1 second.</p>
            </div>
            <Link
              href="/#section-ai"
              className="cta-button inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
            >
              Open the demo <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </section>
        </Reveal>

      </div>
    </div>
  );
}
