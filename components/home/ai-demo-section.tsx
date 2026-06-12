"use client";

import dynamic from "next/dynamic";
import { Sparkles, Mic, Calendar, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const AiCheckIn = dynamic(
  () => import("@/components/home/ai-check-in").then((m) => m.AiCheckIn),
  {
    loading: () => (
      <div className="rounded-3xl border border-(--color-brand)/20 bg-white p-6 shadow-(--shadow-card) sm:p-7">
        <div className="space-y-3">
          <div className="h-3 w-1/3 animate-pulse rounded bg-(--color-cream)" />
          <div className="h-20 w-full animate-pulse rounded-2xl bg-(--color-cream)" />
          <div className="h-10 w-full animate-pulse rounded-full bg-(--color-cream)" />
        </div>
      </div>
    ),
  },
);

export function AiDemoSection() {
  return (
    <div className="bg-(--color-cream)">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
        <Reveal>
          <section id="section-ai" className="scroll-mt-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
              <div>
                <p className="eyebrow mb-3 inline-flex items-center gap-1.5 text-(--color-brand)">
                  <Sparkles size={13} aria-hidden="true" /> Your fitness coach
                </p>
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  <span className="font-light italic text-(--color-muted)">See it </span>
                  <span className="font-black text-foreground">in action.</span>
                </h2>
                <p className="mt-4 max-w-md text-base leading-7 text-(--color-muted)">
                  Speak for 30 seconds — sleep, schedule, soreness, the kid who&apos;s up at 5am again.
                  Your assistant returns one realistic thing for today, in the time you actually have.
                </p>
                <ul className="mt-6 grid gap-4">
                  {[
                    { icon: Mic, label: "Speak it in 30 seconds — no forms" },
                    { icon: Calendar, label: "Tunes itself when your week shifts" },
                    { icon: Clock, label: "Finds the 18-minute window you didn't see" },
                  ].map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-start gap-3 text-sm text-(--color-muted)">
                      <Icon size={16} className="mt-0.5 shrink-0 text-(--color-brand)" aria-hidden="true" />
                      {label}
                    </li>
                  ))}
                </ul>
                <a
                  href="#section-ai-try"
                  className="cta-button mt-8 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
                >
                  Try it — no signup
                </a>
              </div>

              <AiCheckIn />
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
