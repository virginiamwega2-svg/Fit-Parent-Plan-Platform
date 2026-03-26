"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Workout, WorkoutDuration, WorkoutEquipment, WorkoutGoal } from "@/lib/types";
import { workoutDurations, workoutEquipment, workoutGoals } from "@/lib/data/workouts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

type Props = {
  items: Workout[];
};

const ALL = "all";

export function WorkoutLibrary({ items }: Props) {
  const [duration, setDuration] = useState<WorkoutDuration | typeof ALL>(ALL);
  const [goal, setGoal] = useState<WorkoutGoal | typeof ALL>(ALL);
  const [equipment, setEquipment] = useState<WorkoutEquipment | typeof ALL>(ALL);
  const [saved, setSaved] = useState<string[]>([]);
  const [simulateError, setSimulateError] = useState(false);

  const filtered = useMemo(() => {
    if (simulateError) {
      return null;
    }

    return items.filter((workout) => {
      const matchesDuration = duration === ALL || workout.duration === duration;
      const matchesGoal = goal === ALL || workout.goal === goal;
      const matchesEquipment = equipment === ALL || workout.equipment === equipment;
      return matchesDuration && matchesGoal && matchesEquipment;
    });
  }, [duration, equipment, goal, items, simulateError]);

  return (
    <section className="grid gap-6">
      <Card className="grid gap-4 bg-(--color-cream)/55">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Filters</Badge>
          <button
            type="button"
            className="text-xs font-semibold text-(--color-muted) underline underline-offset-4"
            onClick={() => {
              setDuration(ALL);
              setGoal(ALL);
              setEquipment(ALL);
              setSimulateError(false);
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="text-xs font-semibold text-red-600 underline underline-offset-4"
            onClick={() => setSimulateError((prev) => !prev)}
          >
            {simulateError ? "Turn off error state" : "Simulate error state"}
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value === ALL ? ALL : Number(e.target.value) as WorkoutDuration)}
            className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) px-3 py-2 text-sm"
            aria-label="Filter by duration"
          >
            <option value={ALL}>All durations</option>
            {workoutDurations.map((value) => (
              <option key={value} value={value}>
                {value} minutes
              </option>
            ))}
          </select>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as WorkoutGoal | typeof ALL)}
            className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) px-3 py-2 text-sm"
            aria-label="Filter by goal"
          >
            <option value={ALL}>All goals</option>
            {workoutGoals.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          <select
            value={equipment}
            onChange={(e) => setEquipment(e.target.value as WorkoutEquipment | typeof ALL)}
            className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) px-3 py-2 text-sm"
            aria-label="Filter by equipment"
          >
            <option value={ALL}>All equipment</option>
            {workoutEquipment.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {filtered === null ? (
        <Card className="border-red-300 bg-red-50">
          <p className="font-semibold text-red-700">Unable to load workouts right now.</p>
          <p className="mt-2 text-sm text-red-700">
            This is a demo error state. Use the toggle above, then retry.
          </p>
          <Button variant="secondary" className="mt-4 w-fit" onClick={() => setSimulateError(false)}>
            Retry
          </Button>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <p className="font-semibold text-foreground">No workouts match those filters.</p>
          <p className="mt-2 text-sm text-(--color-muted)">
            Try a different duration, goal, or equipment combo.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((workout, index) => (
            <Reveal key={workout.id} delayMs={(index % 6) * 60}>
              <Card className="hover-lift flex h-full flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>{workout.duration} min</Badge>
                  <Badge className="bg-(--color-melon-soft)">{workout.goal}</Badge>
                  <Badge className="bg-(--color-sky-soft)">{workout.equipment}</Badge>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{workout.title}</h3>
                  <p className="mt-2 text-sm text-(--color-muted)">{workout.description}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.14em] text-(--color-muted)">
                  Difficulty: {workout.difficulty}
                </p>
                <div className="mt-auto flex flex-col gap-2 sm:flex-row">
                  <Button
                    href={`/workouts/${workout.slug}`}
                    variant="secondary"
                    className="w-full flex-1"
                  >
                    View details
                  </Button>
                  <Button
                    variant={saved.includes(workout.id) ? "secondary" : "primary"}
                    className="w-full flex-1"
                    onClick={() =>
                      setSaved((prev) =>
                        prev.includes(workout.id)
                          ? prev.filter((id) => id !== workout.id)
                          : [...prev, workout.id],
                      )
                    }
                  >
                    {saved.includes(workout.id) ? "Saved" : "Save workout"}
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      )}

      <p className="text-sm text-(--color-muted)">
        Saved workouts: {saved.length}
        {saved.length > 0 ? (
          <>
            {" "}
            (
            {saved
              .map((id) => items.find((workout) => workout.id === id)?.title)
              .filter(Boolean)
              .join(", ")}
            )
          </>
        ) : null}
      </p>

      <p className="text-xs text-(--color-muted)">
        Tip: this page uses local state only. Later, you can replace it with API persistence.
      </p>
      <Link href="/dashboard" className="text-sm font-semibold text-(--color-brand-strong) underline">
        Go to Dashboard
      </Link>
    </section>
  );
}
