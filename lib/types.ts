export type WorkoutGoal = "fat loss" | "strength" | "mobility";
export type WorkoutEquipment = "none" | "dumbbells" | "resistance bands";
export type WorkoutDuration = 10 | 15 | 20;

export type Workout = {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: WorkoutDuration;
  goal: WorkoutGoal;
  equipment: WorkoutEquipment;
  difficulty: "beginner" | "intermediate";
  tags: string[];
  steps: string[];
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  result: string;
};

export type Meal = {
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  name: string;
  prepTime: number;
  calories: number;
};

export type DailyPlan = {
  day: string;
  meals: Meal[];
};

export type MealPlan = {
  id: string;
  title: string;
  weeklyPrepMinutes: number;
  avgDailyCalories: number;
  tags: string[];
  shoppingList: string[];
  days: DailyPlan[];
};

export type PricingTier = {
  id: "free" | "starter" | "family-pro";
  name: string;
  monthly: number;
  yearly: number;
  description: string;
  isPopular?: boolean;
  features: string[];
};
