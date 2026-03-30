"use client";

import { useEffect, useState } from "react";

// Seeded from a realistic number; decrements once after mount to feel live
const INITIAL = 8;
const LIVE = 6;

const LAST_CLAIMED = [
  "James claimed one 3h ago",
  "Sarah claimed one yesterday",
  "Linda claimed one 6h ago",
];

export function SpotsCounter() {
  const [spots, setSpots] = useState(INITIAL);
  const [label, setLabel] = useState(LAST_CLAIMED[0]);
  const [ticked, setTicked] = useState(false);

  useEffect(() => {
    // Randomly pick a "last claimed" line
    setLabel(LAST_CLAIMED[Math.floor(Math.random() * LAST_CLAIMED.length)]);

    // After 2.4s decrement to the "live" number — adds perceived real-time feel
    const t = setTimeout(() => {
      setSpots(LIVE);
      setTicked(true);
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <span className="flex flex-col items-start gap-0.5">
      <span
        className={`animate-badge-pulse rounded-full border border-(--color-border) bg-(--color-bg) px-3 py-1.5 text-xs font-medium text-(--color-muted) transition-all duration-500 ${ticked ? "border-(--color-brand)/30 bg-(--color-brand)/5" : ""}`}
      >
        <span className="tabular-nums font-semibold text-(--color-ink)">{spots}</span>
        &nbsp;spots open this month
      </span>
      <span className="text-[10px] text-(--color-muted)/60">{label}</span>
    </span>
  );
}
