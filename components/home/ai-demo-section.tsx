"use client";

import { Sparkles, Mic, Calendar, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { AiCheckIn } from "@/components/home/ai-check-in";

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

              <AiCheckIn />
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
