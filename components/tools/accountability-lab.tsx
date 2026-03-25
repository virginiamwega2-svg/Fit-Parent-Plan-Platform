"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const prompts = [
  "What is your smallest win you can complete in 3 minutes right now?",
  "Which session is at risk this week and what backup slot can replace it?",
  "What one meal decision will make tomorrow easier?",
];

type AccountabilityState = {
  streak: number;
  rescues: number;
  index: number;
};

const defaults: AccountabilityState = { streak: 4, rescues: 1, index: 0 };

export function AccountabilityLab() {
  const [state, setState] = useState<AccountabilityState>(defaults);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const score = useMemo(() => state.streak * 10 + state.rescues * 4, [state.streak, state.rescues]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/user/state", { cache: "no-store" });
        if (!response.ok) {
          setLoading(false);
          return;
        }
        const data = (await response.json()) as {
          state?: { accountabilityState?: AccountabilityState };
        };
        if (data.state?.accountabilityState) {
          setState((prev) => ({ ...prev, ...data.state!.accountabilityState }));
        }
      } catch {
        setError("Cloud sync unavailable. Local tracking still works.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  async function persist(next: AccountabilityState) {
    setState(next);
    try {
      await fetch("/api/user/state", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountabilityState: next }),
      });
    } catch {
      // retain local state
    }
  }

  if (loading) {
    return (
      <Card className="h-32 animate-pulse">
        <p className="text-sm text-[var(--color-muted)]">Loading accountability stats...</p>
      </Card>
    );
  }

  return (
    <section className="grid gap-4">
      {error ? (
        <Card className="border-amber-300 bg-amber-50">
          <p className="text-sm text-amber-800">{error}</p>
        </Card>
      ) : null}

      <Card className="hover-lift">
        <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Accountability Lab</h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Use streak recovery and 30-second check-ins to avoid all-or-nothing resets.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={() => {
              const next = { ...state, streak: state.streak + 1 };
              void persist(next);
              trackEvent("accountability_win", { category: "accountability", value: next.streak });
            }}
          >
            Mark daily win
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              const next = { ...state, rescues: state.rescues + 1 };
              void persist(next);
              trackEvent("accountability_rescue", { category: "accountability", value: next.rescues });
            }}
          >
            Trigger missed-day rescue
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              const next = { ...state, index: (state.index + 1) % prompts.length };
              void persist(next);
              trackEvent("accountability_prompt_next", { category: "accountability" });
            }}
          >
            Next micro check-in
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover-lift">
          <p className="text-sm uppercase tracking-[0.14em] text-[var(--color-muted)]">Current streak</p>
          <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">{state.streak} days</p>
        </Card>
        <Card className="hover-lift">
          <p className="text-sm uppercase tracking-[0.14em] text-[var(--color-muted)]">Rescues used</p>
          <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">{state.rescues}</p>
        </Card>
        <Card className="hover-lift">
          <p className="text-sm uppercase tracking-[0.14em] text-[var(--color-muted)]">Consistency score</p>
          <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">{score}</p>
        </Card>
      </div>

      <Card className="hover-lift">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-strong)]">
          30-second check-in
        </p>
        <p className="mt-2 text-[var(--color-ink)]">{prompts[state.index]}</p>
      </Card>
    </section>
  );
}
