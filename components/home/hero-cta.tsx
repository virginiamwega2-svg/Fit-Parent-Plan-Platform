"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Pause } from "lucide-react";
import { readPausedUntil, formatPauseEnd, clearPaused } from "@/lib/pause";

const LAST_PLAN_KEY = "fpp:lastPlan";
const GAP_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

type State =
  | { kind: "default" }
  | { kind: "returning"; gapDays: number }
  | { kind: "paused"; until: Date };

export function HeroCta() {
  const [state, setState] = useState<State>({ kind: "default" });

  useEffect(() => {
    try {
      const paused = readPausedUntil();
      if (paused) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage post-mount to avoid SSR/client mismatch
        setState({ kind: "paused", until: paused });
        return;
      }
      const raw = window.localStorage.getItem(LAST_PLAN_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { savedAt?: number };
      if (typeof parsed.savedAt !== "number") return;
      const gap = Math.floor((Date.now() - parsed.savedAt) / DAY_MS);
      setState({ kind: "returning", gapDays: gap >= GAP_DAYS ? gap : 0 });
    } catch {
      // localStorage unavailable — stay default
    }
  }, []);

  if (state.kind === "paused") {
    return (
      <div className="flex flex-col items-center gap-2.5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur">
          <Pause size={13} aria-hidden="true" />
          Paused — comes back {formatPauseEnd(state.until)}
        </div>
        <button
          type="button"
          onClick={() => {
            clearPaused();
            setState({ kind: "default" });
          }}
          className="text-xs text-white/60 underline underline-offset-2 transition-colors hover:text-white"
        >
          Resume now
        </button>
      </div>
    );
  }

  const isLongAbsent = state.kind === "returning" && state.gapDays >= GAP_DAYS;
  const label = isLongAbsent
    ? "Welcome back — restart smaller"
    : state.kind === "returning"
      ? "Welcome back — adapt last week"
      : "Try it — 30 seconds";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <a
        href="#section-ai"
        className="group cta-button inline-flex max-w-full items-center justify-center gap-2 text-balance px-6 py-3.5 text-sm font-semibold sm:px-7"
      >
        <span>{label}</span>
        <ArrowRight size={13} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </a>
      {isLongAbsent && (
        <p className="text-[11px] text-white/55">It&apos;s been {state.gapDays} days — no pressure.</p>
      )}
    </div>
  );
}
