// Pause-the-week — the brand-defining "no guilt" feature.
// Stored client-side so it works for marketing-site visitors without
// auth. When members log in, the same key syncs to their profile.

const PAUSE_KEY = "fpp:pausedUntil";
const DAY_MS = 24 * 60 * 60 * 1000;

export function readPausedUntil(): Date | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PAUSE_KEY);
    if (!raw) return null;
    const t = Number(raw);
    if (!Number.isFinite(t) || t <= Date.now()) return null;
    return new Date(t);
  } catch {
    return null;
  }
}

export function setPaused(days = 7): Date {
  const until = new Date(Date.now() + days * DAY_MS);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(PAUSE_KEY, String(until.getTime()));
    } catch {
      // localStorage unavailable — UI will revert next render
    }
  }
  return until;
}

export function clearPaused() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PAUSE_KEY);
  } catch {
    // ignore
  }
}

export function formatPauseEnd(date: Date): string {
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}
