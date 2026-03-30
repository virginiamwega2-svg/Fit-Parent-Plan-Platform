"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CARDS = [
  {
    week: "Week 1",
    title: "Foundation",
    body: "Learn the 3 compound movements. 20 min. No equipment beyond what you already own.",
    color: "--color-sky-soft",
    border: "--color-brand",
    emoji: "🏗️",
  },
  {
    week: "Week 2",
    title: "Momentum",
    body: "Add load where you can. Your body adapts faster than you think — especially after a break.",
    color: "--color-mint-soft",
    border: "--color-brand",
    emoji: "⚡",
  },
  {
    week: "Week 3",
    title: "Consistency",
    body: "You'll miss a day. The plan accounts for it. Skip the guilt, keep the streak.",
    color: "--color-melon-soft",
    border: "--color-secondary",
    emoji: "🔄",
  },
  {
    week: "Week 4",
    title: "Compounding",
    body: "Energy up. Sleep better. Clothes fit differently. This is what 20 minutes a day does over time.",
    color: "--color-lavender-soft",
    border: "--color-brand",
    emoji: "📈",
  },
  {
    week: "Month 2+",
    title: "The New Normal",
    body: "It stops being something you 'do' and becomes part of who you are. That's the whole point.",
    color: "--color-cream",
    border: "--color-secondary",
    emoji: "🎯",
  },
];

export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const totalWidth = track.scrollWidth - track.offsetWidth;

    const tween = gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth + window.innerWidth * 0.5}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="overflow-hidden" aria-label="Your journey week by week">
      {/* Section header sits above the pinned scroll */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">The journey</p>
        <h2 className="mt-2 font-display text-3xl font-black text-foreground sm:text-4xl">
          What your first month looks like
        </h2>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-6 px-4 pb-12 sm:px-6"
        style={{ width: `${CARDS.length * 340 + 64}px` }}
      >
        {CARDS.map((card) => (
          <div
            key={card.week}
            className="group flex w-80 shrink-0 flex-col justify-between rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            style={{
              background: `var(${card.color})`,
              borderColor: `color-mix(in srgb, var(${card.border}) 22%, var(--color-border))`,
            }}
          >
            <div>
              <div className="mb-4 text-4xl">{card.emoji}</div>
              <p
                className="mb-1 text-xs font-semibold uppercase tracking-widest"
                style={{ color: `var(${card.border})` }}
              >
                {card.week}
              </p>
              <h3 className="font-display text-2xl font-black text-foreground">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-(--color-muted)">{card.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
