"use client";

import { useEffect, useState } from "react";

type Phase = "try" | "apply";

export function StickyApplyCta() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("try");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  const isApply = phase === "apply";
  const href = isApply ? "#apply" : "#section-ai";
  const primary = isApply ? "Apply — 2 min" : "Try it — 30 seconds";
  const secondary = isApply ? "No card" : "No signup";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-(--color-border) bg-(--color-bg-soft)/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] shadow-[0_-12px_32px_-18px_rgba(0,0,0,0.18)] backdrop-blur transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <a
        href={href}
        tabIndex={visible ? 0 : -1}
        className="flex h-12 w-full items-center justify-center gap-3 rounded-full bg-(--color-brand) text-sm font-semibold text-white transition hover:bg-(--color-brand-strong)"
      >
        <span>{primary}</span>
        <span className="text-white/50">·</span>
        <span className="text-white/70 text-xs font-normal">{secondary}</span>
      </a>
    </div>
  );
}
