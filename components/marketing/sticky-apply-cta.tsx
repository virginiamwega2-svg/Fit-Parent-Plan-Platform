"use client";

import { useEffect, useState } from "react";

type Phase = "try" | "apply";

export function StickyApplyCta() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("try");
  // Once the user is already looking at a real Apply CTA on screen
  // (the pricing card or the apply form), hide the sticky bar so we
  // don't show two identical buttons at once on mobile.
  const [suppressed, setSuppressed] = useState(false);

  // Throttle scroll updates with rAF so the listener doesn't fire on every
  // pixel — this was a source of jank on mid-range Android.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setVisible(window.scrollY > 480);
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Once the pricing section enters the viewport, switch the CTA from
  // "Try it" (push to AI demo) to "Apply" (push to the form). Same
  // sticky bar, copy adapts to scroll position.
  useEffect(() => {
    const target = document.getElementById("section-offer");
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            setPhase("apply");
          }
        }
      },
      { rootMargin: "0px 0px -60% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Suppress the sticky CTA whenever the pricing card or the apply form
  // is actually visible — the user is already looking at the same action.
  useEffect(() => {
    const sections = ["section-offer", "apply"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const visibleSet = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visibleSet.add(e.target);
          else visibleSet.delete(e.target);
        }
        setSuppressed(visibleSet.size > 0);
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.15 },
    );
    for (const s of sections) observer.observe(s);
    return () => observer.disconnect();
  }, []);

  const isApply = phase === "apply";
  const href = isApply ? "#apply" : "#section-ai";
  const primary = isApply ? "Apply — 2 min" : "Try it — 30 seconds";
  const secondary = isApply ? "No card" : "No signup";
  const shown = visible && !suppressed;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-(--color-border) bg-(--color-bg-soft)/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] shadow-[0_-12px_32px_-18px_rgba(0,0,0,0.18)] backdrop-blur transition-transform duration-300 sm:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!shown}
    >
      <a
        href={href}
        tabIndex={shown ? 0 : -1}
        className="flex h-12 w-full items-center justify-center gap-3 rounded-full bg-(--color-brand) text-sm font-semibold text-white transition hover:bg-(--color-brand-strong)"
      >
        <span>{primary}</span>
        <span className="text-white/50">·</span>
        <span className="text-white/70 text-xs font-normal">{secondary}</span>
      </a>
    </div>
  );
}
