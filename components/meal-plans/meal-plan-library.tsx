"use client";

import { useState } from "react";
import type { MealPlan } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

type Props = {
  items: MealPlan[];
};

export function MealPlanLibrary({ items }: Props) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const selected = items.find((plan) => plan.id === selectedId);

  if (!items.length) {
    return (
      <Card>
        <p className="font-semibold text-[var(--color-ink)]">No meal plans available yet.</p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">Please check back soon.</p>
      </Card>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="grid gap-4">
        {items.map((plan, index) => (
          <Reveal key={plan.id} delayMs={index * 60}>
            <Card
              className={`hover-lift cursor-pointer transition ${
                selectedId === plan.id ? "border-[var(--color-brand)] bg-[var(--color-cream)]/50" : ""
              }`}
              onClick={() => setSelectedId(plan.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setSelectedId(plan.id);
                }
              }}
            >
              <div className="flex flex-wrap items-center gap-2">
                {plan.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-[var(--color-ink)]">{plan.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Prep {plan.weeklyPrepMinutes} minutes/week • Avg {plan.avgDailyCalories} calories/day
              </p>
            </Card>
          </Reveal>
        ))}
      </div>

      {selected ? (
        <Card className="hover-lift h-fit">
          <h3 className="text-2xl font-semibold text-[var(--color-ink)]">{selected.title}</h3>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Daily meals are designed for speed, consistency, and family buy-in.
          </p>
          <div className="mt-5 grid gap-4">
            {selected.days.map((day) => (
              <div key={day.day} className="surface-soft hover-lift">
                <p className="font-semibold text-[var(--color-ink)]">{day.day}</p>
                <ul className="mt-2 grid gap-2 text-sm text-[var(--color-muted)]">
                  {day.meals.map((meal) => (
                    <li key={`${day.day}-${meal.mealType}`}>
                      {meal.mealType}: {meal.name} ({meal.prepTime} min, {meal.calories} cal)
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="surface-soft border-dashed">
            <p className="font-semibold text-[var(--color-ink)]">Shopping list</p>
            <ul className="mt-2 grid gap-1 text-sm text-[var(--color-muted)]">
              {selected.shoppingList.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <Button variant="secondary" className="mt-4 w-full sm:w-fit">
              Download shopping list (Coming soon)
            </Button>
          </div>
        </Card>
      ) : (
        <Card>
          <p className="font-semibold text-[var(--color-ink)]">Select a plan to see details.</p>
        </Card>
      )}
    </section>
  );
}
