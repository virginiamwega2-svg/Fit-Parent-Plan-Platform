"use client";

import { Sparkles, Mic, Calendar, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function AiDemoSection() {
  return (
    <div className="mt-14 bg-(--color-cream) sm:mt-20 lg:mt-28">
      <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <Reveal>
          <section id="section-ai" className="scroll-mt-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
              <div>
                <p className="eyebrow mb-3 inline-flex items-center gap-1.5 text-(--color-brand)">
                  <Sparkles size={13} aria-hidden="true" /> New · AI assistant
                </p>
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">Tell it your week. </span>
                  <span className="font-black text-foreground">Get a plan that fits.</span>
                </h2>
                <p className="mt-4 max-w-md text-base leading-7 text-(--color-muted)">
                  Speak for 30 seconds — sleep, schedule, soreness, the kid who&apos;s up at 5am again.
                  Your assistant returns one realistic thing for today, in the time you actually have.
                </p>
                <ul className="mt-6 grid gap-3">
                  {[
                    { icon: Mic, label: "Voice-first — no forms, no typing required" },
                    { icon: Calendar, label: "Looks at your week, not yesterday's plan" },
                    { icon: Clock, label: "Finds the 18-minute window you didn't see" },
                  ].map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-start gap-2.5 text-sm text-(--color-muted)">
                      <Icon size={16} className="mt-0.5 shrink-0 text-(--color-brand)" aria-hidden="true" />
                      {label}
                    </li>
                  ))}
                </ul>
                <a
                  href="#section-ai-try"
                  className="cta-button mt-7 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
                >
                  Try it — no signup
                </a>
                <p className="mt-3 text-xs text-(--color-muted)/70">
                  Free preview · Limited to a few minutes a day
                </p>
              </div>

              {/* Demo card placeholder — replaced by live component in next task */}
              <div
                id="section-ai-try"
                className="rounded-3xl border border-(--color-brand)/20 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.18)] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
                    Live preview
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-mint-soft) px-2.5 py-0.5 text-xs font-medium text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-(--color-brand)" aria-hidden="true" />
                    Coming online
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl bg-(--color-bg-soft) px-4 py-3 text-sm text-(--color-muted)">
                    &ldquo;Slept badly. Kids up early. I&apos;ve got 20 min before the school run.&rdquo;
                  </div>
                  <div className="rounded-2xl border border-(--color-brand)/15 bg-white px-4 py-3 text-sm leading-6 text-foreground">
                    <p className="font-semibold">Today: a low-impact mobility flow.</p>
                    <p className="mt-1 text-(--color-muted)">
                      18 minutes, kitchen-friendly, no equipment. Skipping HIIT — your sleep score
                      says recovery, not stress.
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-(--color-border) pt-4 text-xs text-(--color-muted)/70">
                  <span>Powered by Claude</span>
                  <button
                    type="button"
                    className="underline underline-offset-2 hover:text-(--color-muted)"
                  >
                    Why this plan?
                  </button>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
