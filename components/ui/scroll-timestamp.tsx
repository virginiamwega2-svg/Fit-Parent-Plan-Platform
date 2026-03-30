"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "section-hero",     time: "06:22", label: "The alarm" },
  { id: "section-morning",  time: "07:45", label: "School run" },
  { id: "section-session",  time: "12:22", label: "Already done" },
  { id: "section-message",  time: "13:08", label: "Check-in" },
  { id: "section-dinner",   time: "17:58", label: "Dinner" },
  { id: "section-team",     time: "19:30", label: "Your team" },
  { id: "section-outcomes", time: "20:14", label: "Results" },
  { id: "section-offer",    time: "21:41", label: "The plan" },
  { id: "section-faq",      time: "22:00", label: "Questions" },
  { id: "apply",            time: "Now",   label: "Apply" },
];

export function ScrollTimestamp() {
  const [active, setActive] = useState(SECTIONS[0]);

  useEffect(() => {
    const targets = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const match = SECTIONS.find((s) => s.id === visible[0].target.id);
          if (match) setActive(match);
        }
      },
      { threshold: 0.25 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    // Hidden on mobile — only shows from xl (1280px) so it never overlaps content
    <div
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:flex xl:flex-col xl:items-center xl:gap-1.5"
      aria-hidden="true"
    >
      <span
        key={active.time}
        className="animate-rise font-mono text-[11px] font-semibold tabular-nums tracking-widest text-(--color-muted)/50"
      >
        {active.time}
      </span>
      <div className="h-3 w-px bg-(--color-border)" />
      <span
        key={active.label}
        className="animate-rise max-w-[52px] text-center text-[9px] uppercase tracking-[0.15em] text-(--color-muted)/40"
      >
        {active.label}
      </span>
    </div>
  );
}
