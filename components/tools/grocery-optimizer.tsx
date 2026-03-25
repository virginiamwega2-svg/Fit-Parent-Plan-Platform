"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Item = { name: string; category: string; estCost: number };

const pantryBase: Item[] = [
  { name: "Chicken breast", category: "Proteins", estCost: 14 },
  { name: "Eggs", category: "Proteins", estCost: 6 },
  { name: "Greek yogurt", category: "Dairy", estCost: 5 },
  { name: "Rice", category: "Grains", estCost: 4 },
  { name: "Whole-wheat wraps", category: "Grains", estCost: 5 },
  { name: "Frozen mixed veggies", category: "Produce", estCost: 6 },
  { name: "Bananas", category: "Produce", estCost: 4 },
  { name: "Olive oil", category: "Pantry", estCost: 8 },
  { name: "Beans", category: "Pantry", estCost: 5 },
];

type GroceryState = {
  budgetMode: boolean;
  leftoverMode: boolean;
};

const defaultState: GroceryState = { budgetMode: false, leftoverMode: false };

export function GroceryOptimizer() {
  const [state, setState] = useState<GroceryState>(defaultState);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/user/state", { cache: "no-store" });
        if (!response.ok) {
          setStatus("idle");
          return;
        }
        const data = (await response.json()) as {
          state?: { groceryState?: GroceryState };
        };
        if (data.state?.groceryState) {
          setState((prev) => ({ ...prev, ...data.state!.groceryState }));
        }
        setStatus("idle");
      } catch {
        setStatus("error");
      }
    };
    void load();
  }, []);

  async function persist(next: GroceryState) {
    setState(next);
    try {
      await fetch("/api/user/state", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groceryState: next }),
      });
    } catch {
      // local state still valid
    }
  }

  const grouped = useMemo(() => {
    const adjusted = pantryBase
      .filter((item) => (state.budgetMode ? item.estCost <= 6 : true))
      .map((item) =>
        state.leftoverMode && item.name === "Chicken breast"
          ? { ...item, name: "Chicken breast (cook once, use twice)" }
          : item,
      );

    const map = new Map<string, Item[]>();
    for (const item of adjusted) {
      map.set(item.category, [...(map.get(item.category) ?? []), item]);
    }
    return map;
  }, [state.budgetMode, state.leftoverMode]);

  const estimatedTotal = useMemo(() => {
    const items = [...grouped.values()].flat();
    return items.reduce((sum, item) => sum + item.estCost, 0);
  }, [grouped]);

  if (status === "loading") {
    return (
      <Card className="h-32 animate-pulse">
        <p className="text-sm text-[var(--color-muted)]">Loading saved grocery preferences...</p>
      </Card>
    );
  }

  return (
    <section className="grid gap-4">
      {status === "error" ? (
        <Card className="border-amber-300 bg-amber-50">
          <p className="text-sm text-amber-800">Cloud sync unavailable. Using local settings.</p>
        </Card>
      ) : null}

      <Card className="hover-lift">
        <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Grocery Optimizer</h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Auto-group list by store sections, enable budget mode, and activate leftovers optimization.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            variant={state.budgetMode ? "primary" : "secondary"}
            onClick={() => {
              const next = { ...state, budgetMode: !state.budgetMode };
              void persist(next);
              trackEvent("grocery_budget_toggle", {
                category: "tools",
                label: next.budgetMode ? "on" : "off",
              });
            }}
          >
            {state.budgetMode ? "Budget mode on" : "Enable budget mode"}
          </Button>
          <Button
            type="button"
            variant={state.leftoverMode ? "primary" : "secondary"}
            onClick={() => {
              const next = { ...state, leftoverMode: !state.leftoverMode };
              void persist(next);
              trackEvent("grocery_leftover_toggle", {
                category: "tools",
                label: next.leftoverMode ? "on" : "off",
              });
            }}
          >
            {state.leftoverMode ? "Leftovers mode on" : "Enable leftovers optimizer"}
          </Button>
        </div>
      </Card>

      {grouped.size === 0 ? (
        <Card>
          <p className="font-semibold text-[var(--color-ink)]">No items match the current settings.</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Disable budget mode to widen choices.</p>
        </Card>
      ) : (
        <Card className="hover-lift">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-strong)]">
            Estimated spend: ${estimatedTotal}
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[...grouped.entries()].map(([category, items]) => (
              <div key={category} className="surface-soft">
                <p className="font-semibold text-[var(--color-ink)]">{category}</p>
                <ul className="mt-2 grid gap-1 text-sm text-[var(--color-muted)]">
                  {items.map((item) => (
                    <li key={item.name}>
                      • {item.name} (${item.estCost})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      )}
    </section>
  );
}
