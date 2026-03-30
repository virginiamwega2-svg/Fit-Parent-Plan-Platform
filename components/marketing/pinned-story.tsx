"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  {
    number: "01",
    title: "Tell us your reality",
    body: "Two kids, a job, zero energy by 8pm. We start there — not from an ideal schedule.",
    accent: "--color-brand",
  },
  {
    number: "02",
    title: "Get a plan that bends",
    body: "Your week changes. Your plan changes with it. Missed Tuesday? The system adjusts, not you.",
    accent: "--color-secondary",
  },
  {
    number: "03",
    title: "Build the habit loop",
    body: "20 minutes is short enough to always start. Starting consistently is the entire strategy.",
    accent: "--color-brand",
  },
  {
    number: "04",
    title: "See it compound",
    body: "Week 4 feels different than week 1. Not because of willpower — because the system worked.",
    accent: "--color-secondary",
  },
];

export function PinnedStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const steps = stepsRef.current;

    // Pin the right panel while left scrolls
    const pin = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: sticky,
      pinSpacing: false,
    });

    // Fade each step card in/out as user scrolls
    steps.forEach((step, i) => {
      if (!step) return;

      if (i === 0) {
        gsap.set(step, { opacity: 1, y: 0 });
      } else {
        gsap.set(step, { opacity: 0, y: 32 });
      }

      if (i > 0) {
        gsap.to(step, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step.closest(".step-trigger"),
            start: "top 60%",
            end: "top 30%",
            scrub: false,
            toggleActions: "play none none reverse",
          },
        });
      }

      if (i < steps.length - 1) {
        gsap.to(step, {
          opacity: 0,
          y: -24,
          ease: "power2.in",
          scrollTrigger: {
            trigger: step.closest(".step-trigger"),
            start: "bottom 40%",
            end: "bottom 10%",
            scrub: false,
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger && (t.vars.trigger as Element).closest?.(".pinned-story")) t.kill();
      });
    };
  }, []);

  return (
    <section className="pinned-story relative hidden md:block" ref={containerRef} aria-label="How it works">
      {/* Left: scroll steps */}
      <div className="w-1/2">
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            className="step-trigger flex min-h-screen items-center px-8 lg:px-16"
          >
            <div>
              <span
                className="mb-4 block font-mono text-xs font-semibold tracking-widest"
                style={{ color: `var(${step.accent})` }}
              >
                {step.number}
              </span>
              <h3 className="font-display text-3xl font-black text-foreground lg:text-4xl">
                {step.title}
              </h3>
              <p className="mt-4 max-w-sm text-base leading-7 text-(--color-muted) lg:text-lg">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right: sticky visual panel */}
      <div
        ref={stickyRef}
        className="absolute right-0 top-0 flex h-screen w-1/2 items-center justify-center bg-(--color-cream) px-8 lg:px-16"
        aria-hidden="true"
      >
        <div className="relative h-64 w-64">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { if (el) stepsRef.current[i] = el; }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div
                className="flex h-32 w-32 items-center justify-center rounded-full text-5xl font-black"
                style={{
                  background: `color-mix(in srgb, var(${step.accent}) 12%, transparent)`,
                  color: `var(${step.accent})`,
                }}
              >
                {step.number}
              </div>
              <p className="mt-6 text-center text-sm font-medium text-(--color-muted)">
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
