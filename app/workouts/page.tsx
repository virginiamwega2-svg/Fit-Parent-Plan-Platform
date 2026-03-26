import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { WorkoutLibrary } from "@/components/workouts/workout-library";
import { workouts } from "@/lib/data/workouts";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Workouts",
  "Filter 10, 15, and 20-minute workouts by goal and equipment.",
  "/workouts",
);

export default function WorkoutsPage() {
  return (
    <div className="pb-8 sm:pb-10">
      <Reveal>
        <SectionHeader
          eyebrow="Workout Library"
          title="Find the right session for your schedule"
          titleLight="Find the right session"
          titleBold="for your schedule."
          description="Filter by duration, goal, and equipment. Save your favorites for later."
        />
      </Reveal>
      <Reveal className="mt-8" delayMs={60}>
        <WorkoutLibrary items={workouts} />
      </Reveal>
    </div>
  );
}
