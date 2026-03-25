import type { Metadata } from "next";
import { MealPlanLibrary } from "@/components/meal-plans/meal-plan-library";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { mealPlans } from "@/lib/data/meal-plans";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Meal Plans",
  "Weekly family-friendly meal plans with prep times, calories, and shopping list UI.",
  "/meal-plans",
);

export default function MealPlansPage() {
  return (
    <div className="pb-8 sm:pb-10">
      <Reveal>
        <SectionHeader
          eyebrow="Meal Plans"
          title="Family-friendly meals without extra stress"
          description="Each plan includes prep time, calories, daily meals, and a shopping list."
        />
      </Reveal>
      <Reveal className="mt-8" delayMs={60}>
        <MealPlanLibrary items={mealPlans} />
      </Reveal>
    </div>
  );
}
