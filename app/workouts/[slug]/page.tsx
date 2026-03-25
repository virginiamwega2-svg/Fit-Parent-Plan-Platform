import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { workouts } from "@/lib/data/workouts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const workout = workouts.find((item) => item.slug === slug);
  if (!workout) {
    return { title: "Workout not found" };
  }

  return {
    title: workout.title,
    description: workout.description,
    alternates: { canonical: `/workouts/${workout.slug}` },
  };
}

export async function generateStaticParams() {
  return workouts.map((workout) => ({ slug: workout.slug }));
}

export default async function WorkoutDetailPage({ params }: Props) {
  const { slug } = await params;
  const workout = workouts.find((item) => item.slug === slug);

  if (!workout) {
    notFound();
  }

  return (
    <div className="pb-6">
      <Link href="/workouts" className="text-sm font-semibold text-[var(--color-brand-strong)] underline">
        Back to workouts
      </Link>
      <Card className="mt-5">
        <div className="flex flex-wrap gap-2">
          <Badge>{workout.duration} minutes</Badge>
          <Badge className="bg-[var(--color-melon-soft)]">{workout.goal}</Badge>
          <Badge className="bg-[var(--color-sky-soft)]">{workout.equipment}</Badge>
        </div>
        <h1 className="mt-4 text-4xl font-semibold text-[var(--color-ink)]">{workout.title}</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{workout.description}</p>

        <div className="surface-soft mt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-strong)]">
            Session steps
          </p>
          <ol className="mt-3 grid gap-2 text-sm text-[var(--color-muted)]">
            {workout.steps.map((step) => (
              <li key={step}>• {step}</li>
            ))}
          </ol>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/signup">Start Free</Button>
          <Button href="/dashboard" variant="secondary">
            Track this workout
          </Button>
        </div>
      </Card>
    </div>
  );
}
