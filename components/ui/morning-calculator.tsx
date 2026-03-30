"use client";

import { useState } from "react";

function formatTime(h: number, m: number) {
  const period = h < 12 ? "am" : "pm";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, "0")}${period}`;
}

export function MorningCalculator() {
  const [wakeTime, setWakeTime] = useState("06:30");

  const [wakeH, wakeM] = wakeTime.split(":").map(Number);
  const totalMins = wakeH * 60 + wakeM;

  // Window = 20 mins ending 10 mins before kids wake
  const endMins  = totalMins - 10;
  const startMins = endMins - 20;

  const startH = Math.floor(startMins / 60);
  const startM = startMins % 60;
  const endH   = Math.floor(endMins / 60);
  const endM   = endMins % 60;

  const validWindow = startMins >= 4 * 60; // no earlier than 4am

  // 3 sessions/week × 12 weeks × 20 min = 720 min = 12 hours
  const totalHours = ((3 * 12 * 20) / 60).toFixed(0);

  return (
    <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">
        Your 20 minutes
      </p>
      <p className="mt-1 text-sm text-(--color-muted)">
        What time do the kids usually wake up?
      </p>

      <div className="mt-3 flex items-center gap-3">
        <input
          type="time"
          value={wakeTime}
          onChange={(e) => setWakeTime(e.target.value)}
          className="rounded-lg border border-(--color-border) bg-(--color-bg) px-3 py-2 font-mono text-sm text-foreground focus:border-(--color-brand) focus:outline-none focus:ring-2 focus:ring-(--color-brand)/20"
          aria-label="Kids wake-up time"
        />
        <span className="text-sm text-(--color-muted)">kids wake up</span>
      </div>

      {validWindow ? (
        <div className="mt-4 rounded-xl border border-(--color-brand)/20 bg-(--color-brand)/5 p-4">
          <p className="font-display text-2xl font-black tracking-tight text-foreground">
            {formatTime(startH, startM)}
            <span className="font-light italic text-(--color-muted)"> to </span>
            {formatTime(endH, endM)}
          </p>
          <p className="mt-1 text-sm text-(--color-muted)">
            Your window. That&apos;s{" "}
            <span className="font-semibold text-foreground">{totalHours} hours</span>
            {" "}of training across 12 weeks — enough to change everything.
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-(--color-muted)">
          Adjust the time — we need at least 30 minutes before the wake-up.
        </p>
      )}
    </div>
  );
}
