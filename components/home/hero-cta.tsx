"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const LAST_PLAN_KEY = "fpp:lastPlan";

export function HeroCta() {
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(LAST_PLAN_KEY)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage post-mount to avoid SSR/client mismatch
        setReturning(true);
      }
    } catch {
      // localStorage unavailable — fall through to default copy
    }
  }, []);

  return (
    <a
      href="#section-ai"
      className="group cta-button inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
    >
      {returning ? "Welcome back — adapt last week" : "Try it — 30 seconds"}
      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </a>
  );
}
