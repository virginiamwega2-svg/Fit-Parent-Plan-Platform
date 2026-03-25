type WeeklyProgressItem = {
  day: string;
  percent: number;
};

type MealSummary = {
  completedMeals: number;
  plannedMeals: number;
  bestMealType: string;
  prepSessions: number;
  shoppingCompletionPercent: number;
  kidApprovedMeals: number;
};

export type DashboardSnapshot = {
  weeklyProgress: WeeklyProgressItem[];
  mealSummary: MealSummary | null;
  lastWorkoutSlug: string | null;
  lastWorkoutTitle: string | null;
  lastWorkoutDescription: string | null;
  lastWorkoutAgeDays: number | null;
};

function getSeed(value: string | null | undefined): number {
  if (!value) return 42;
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    // Simple string hash for deterministic but fake data.
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) || 42;
}

function seededRandom(seed: number) {
  // Small LCG for stable pseudo-randomness.
  const a = 1664525;
  const c = 1013904223;
  const m = 2 ** 32;
  let state = seed >>> 0;

  return () => {
    state = (a * state + c) % m;
    return state / m;
  };
}

export async function getDashboardSnapshot(opts: {
  userId?: string | null;
} = {}): Promise<DashboardSnapshot> {
  const seed = getSeed(opts.userId ?? null);
  const rand = seededRandom(seed);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hasAnyActivity = rand() > 0.2;

  const weeklyProgress: WeeklyProgressItem[] = hasAnyActivity
    ? days.map((day) => {
        const base = 40 + rand() * 60;
        const percent = Math.round(Math.min(100, Math.max(0, base)));
        return { day, percent };
      })
    : days.map((day) => ({ day, percent: 0 }));

  const hasMealData = rand() > 0.15;

  const mealSummary: MealSummary | null = hasMealData
    ? {
        completedMeals: 8 + Math.floor(rand() * 8),
        plannedMeals: 14,
        bestMealType: rand() > 0.5 ? "lunches" : "dinners",
        prepSessions: rand() > 0.5 ? 2 : 1,
        shoppingCompletionPercent: 75 + Math.round(rand() * 20),
        kidApprovedMeals: 3 + Math.floor(rand() * 4),
      }
    : null;

  const hasLastWorkout = rand() > 0.25;

  const lastWorkoutAgeDays = hasLastWorkout
    ? 1 + Math.floor(rand() * 4)
    : null;

  const lastWorkoutSlug = hasLastWorkout ? "family-strength-foundation" : null;
  const lastWorkoutTitle = hasLastWorkout
    ? "Family Strength Foundation"
    : null;
  const lastWorkoutDescription = hasLastWorkout
    ? "Simple strength blocks you can do while kids play nearby."
    : null;

  return {
    weeklyProgress,
    mealSummary,
    lastWorkoutSlug,
    lastWorkoutTitle,
    lastWorkoutDescription,
    lastWorkoutAgeDays,
  };
}

