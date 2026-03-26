import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroMark } from "@/components/brand/hero-mark";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { TrackedLink } from "@/components/ui/tracked-link";
import { buildMetadata } from "@/lib/metadata";

const TimeWindowPlanner = dynamic(
  () =>
    import("@/components/planner/time-window-planner").then(
      (mod) => mod.TimeWindowPlanner,
    ),
  {
    loading: () => (
      <Card className="h-56 animate-pulse">
        <p className="text-sm text-(--color-muted)">
          Loading planner tools...
        </p>
      </Card>
    ),
  },
);

export const metadata: Metadata = buildMetadata(
  "Time-Window Planner",
  "Generate a personalized 2-week plan from your real parent schedule.",
  "/planner",
);

export default function PlannerPage() {
  return (
    <div className="pb-8 pt-8 sm:pb-10 sm:pt-10">
      <Reveal>
        <SectionHeader
          eyebrow="Signature Feature"
          title="Time-Window Planner"
          titleLight="Time-Window"
          titleBold="Planner."
          description="Map your real schedule, then get an adaptive plan designed for family life."
        />
      </Reveal>
      <Reveal className="mt-6" delayMs={60}>
        <div className="section-shell bg-(--color-bg-soft)">
          <HeroMark />
        </div>
      </Reveal>
      <Reveal className="mt-4" delayMs={90}>
        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="hover-lift bg-(--color-cream)/55 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-(--color-muted)">Build time</p>
            <p className="mt-1 text-xl font-semibold text-foreground">&lt; 15 minutes</p>
          </Card>
          <Card className="hover-lift bg-(--color-mint-soft)/55 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-(--color-muted)">Plan horizon</p>
            <p className="mt-1 text-xl font-semibold text-foreground">2 weeks</p>
          </Card>
          <Card className="hover-lift bg-(--color-sky-soft)/55 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-(--color-muted)">Adaptation model</p>
            <p className="mt-1 text-xl font-semibold text-foreground">Stress + sleep aware</p>
          </Card>
        </div>
      </Reveal>
      <Reveal className="mt-8" delayMs={120}>
        <TimeWindowPlanner />
      </Reveal>
      <Reveal className="mt-6" delayMs={180}>
        <Card className="hover-lift">
          <h2 className="text-xl font-semibold text-foreground">Unlock cross-device plan syncing</h2>
          <p className="mt-2 text-sm text-(--color-muted)">
            Save your onboarding inputs, adaptive plan, and tool settings in one parent dashboard.
          </p>
          <TrackedLink
            href="/signup"
            eventName="signup_from_planner"
            label="planner"
            className="mt-4 inline-flex rounded-full bg-(--color-brand) px-4 py-2 text-sm font-semibold text-(--color-on-brand)"
          >
            Create free account
          </TrackedLink>
        </Card>
      </Reveal>
    </div>
  );
}
