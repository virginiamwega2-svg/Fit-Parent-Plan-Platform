import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { DumbbellSketch, PlateSketch, PlaySketch, ProgressSketch } from "@/components/ui/illustrations";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { workouts } from "@/lib/data/workouts";
import { getDashboardSnapshot } from "@/lib/data/dashboard";
import { buildMetadata } from "@/lib/metadata";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = buildMetadata("Dashboard", "Track workouts, progress, and meal plan adherence.", "/dashboard");

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const snapshot = await getDashboardSnapshot({ userId: user?.id ?? null });
  const todayWorkout = workouts.find((workout) => workout.duration === 20) ?? workouts[0];

  return (
    <div className="pb-8 sm:pb-10">
      <Reveal>
        <SectionHeader
          eyebrow="Dashboard"
          title={`Your week at a glance${user ? `, ${user.name.split(" ")[0]}` : ""}`}
          description="Stay on track with today’s workout, progress trends, and your current meal plan."
        />
      </Reveal>
      <Reveal className="mt-8" delayMs={60}>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="hover-lift">
            <div className="flex items-center gap-3">
              <IconWrapper>
                <DumbbellSketch />
              </IconWrapper>
              <div>
                <Badge>Today&apos;s 20-minute workout</Badge>
                <h2 className="mt-3 text-xl font-semibold text-foreground">
                  {todayWorkout.title}
                </h2>
              </div>
            </div>
            <p className="mt-3 text-sm text-(--color-muted)">{todayWorkout.description}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href={`/workouts/${todayWorkout.slug}`} className="w-full sm:w-auto">
                Start now
              </Button>
              <Button href="/workouts" variant="secondary" className="w-full sm:w-auto">
                Switch workout
              </Button>
            </div>
          </Card>

          <Card className="hover-lift">
            <div className="flex items-center gap-3">
              <IconWrapper>
                <ProgressSketch />
              </IconWrapper>
              <Badge className="bg-(--color-sky-soft)">Weekly progress tracker</Badge>
            </div>
            {snapshot.weeklyProgress.every((item) => item.percent === 0) ? (
              <div className="mt-4">
                <p className="text-sm text-(--color-muted)">
                  No workouts logged yet this week. Start today&apos;s 20-minute session to see your progress here.
                </p>
                <Button href={`/workouts/${todayWorkout.slug}`} className="mt-4 w-full sm:w-auto">
                  Start today&apos;s session
                </Button>
              </div>
            ) : (
              <div className="mt-4 grid gap-3" aria-label="Weekly workout completion" role="group">
                {snapshot.weeklyProgress.map((item) => (
                  <div key={item.day} className="grid grid-cols-[40px_1fr_44px] items-center gap-3 text-sm">
                    <span className="font-semibold text-foreground">{item.day}</span>
                    <div className="h-2 rounded-full bg-(--color-border)" role="progressbar" aria-valuenow={item.percent} aria-valuemin={0} aria-valuemax={100} aria-label={`${item.day} progress`}>
                      <div
                        className="h-2 rounded-full bg-(--color-brand)"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <span className="text-(--color-muted)">{item.percent}%</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </Reveal>

      <Reveal className="mt-4" delayMs={180}>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="hover-lift">
            <div className="flex items-center gap-3">
              <IconWrapper>
                <PlateSketch />
              </IconWrapper>
              <Badge className="bg-(--color-melon-soft)">Meal plan summary</Badge>
            </div>
            {snapshot.mealSummary ? (
              <>
                <p className="mt-3 text-sm text-(--color-muted)">
                  You completed {snapshot.mealSummary.completedMeals} of {snapshot.mealSummary.plannedMeals} planned meals this week. Best adherence:{" "}
                  {snapshot.mealSummary.bestMealType}.
                </p>
                <ul className="mt-3 grid gap-1 text-sm text-(--color-muted)">
                  <li>Prep sessions done: {snapshot.mealSummary.prepSessions}</li>
                  <li>Shopping list completion: {snapshot.mealSummary.shoppingCompletionPercent}%</li>
                  <li>Kid-approved meals this week: {snapshot.mealSummary.kidApprovedMeals}</li>
                </ul>
              </>
            ) : (
              <p className="mt-3 text-sm text-(--color-muted)">
                You haven&apos;t started a meal plan yet. When you follow a plan, your weekly adherence and prep stats will appear here.
              </p>
            )}
            <Button href="/meal-plans" variant="secondary" className="mt-5 w-full sm:w-fit">
              Open meal plans
            </Button>
          </Card>

          <Card className="hover-lift">
            <div className="flex items-center gap-3">
              <IconWrapper>
                <PlaySketch />
              </IconWrapper>
              <Badge>Resume where you left off</Badge>
            </div>
            {snapshot.lastWorkoutSlug ? (
              <>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {snapshot.lastWorkoutTitle}
                </h3>
                <p className="mt-2 text-sm text-(--color-muted)">
                  {snapshot.lastWorkoutDescription}{" "}
                  {snapshot.lastWorkoutAgeDays != null
                    ? `• Last completed ${snapshot.lastWorkoutAgeDays} day${snapshot.lastWorkoutAgeDays === 1 ? "" : "s"} ago`
                    : null}
                </p>
                <Button href={`/workouts/${snapshot.lastWorkoutSlug}`} className="mt-5 w-full sm:w-fit">
                  Resume workout
                </Button>
              </>
            ) : (
              <>
                <h3 className="mt-3 text-lg font-semibold text-foreground">No recent workouts yet</h3>
                <p className="mt-2 text-sm text-(--color-muted)">
                  Once you complete a workout, we&apos;ll surface it here so you can pick up where you left off in one click.
                </p>
                <Button href={`/workouts/${todayWorkout.slug}`} className="mt-5 w-full sm:w-fit">
                  Start your first session
                </Button>
              </>
            )}
          </Card>
        </div>
      </Reveal>
    </div>
  );
}
