import type { PricingTier } from "@/lib/types";

export const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    yearly: 0,
    description: "Get started with simple workouts and one weekly meal framework.",
    features: [
      "3 starter 20-minute workouts",
      "1 sample meal plan",
      "Progress basics",
      "Email support (48h)",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    monthly: 19,
    yearly: 15,
    description: "For parents who want full weekly plans and consistency tools.",
    isPopular: true,
    features: [
      "Full workout library (24+ sessions)",
      "3 rotating weekly meal plans",
      "Shopping list generator UI",
      "Habit tracker and reminders",
      "Priority support",
    ],
  },
  {
    id: "family-pro",
    name: "Family Pro",
    monthly: 39,
    yearly: 32,
    description: "Built for families who want coaching-style support and shared planning.",
    features: [
      "Everything in Starter",
      "Family profile support",
      "Advanced progress dashboard",
      "Monthly coaching check-in",
      "Early access to new programs",
    ],
  },
];

export const pricingComparison = [
  { feature: "Workout library", free: "Limited", starter: "Full access", familyPro: "Full access" },
  { feature: "Meal plans", free: "1 sample", starter: "Weekly rotating", familyPro: "Weekly rotating" },
  { feature: "Shopping list", free: "Basic", starter: "Export UI", familyPro: "Export + family mode" },
  { feature: "Progress tracking", free: "Basic", starter: "Advanced", familyPro: "Advanced + coaching notes" },
  { feature: "Support", free: "48h email", starter: "Priority", familyPro: "Priority + monthly check-in" },
];
