import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { TrackedLink } from "@/components/ui/tracked-link";
import { buildMetadata } from "@/lib/metadata";

const GroceryOptimizer = dynamic(
  () =>
    import("@/components/tools/grocery-optimizer").then(
      (mod) => mod.GroceryOptimizer,
    ),
  {
    loading: () => (
      <Card className="h-44 animate-pulse">
        <p className="text-sm text-(--color-muted)">
          Loading grocery optimizer...
        </p>
      </Card>
    ),
  },
);

const AccountabilityLab = dynamic(
  () =>
    import("@/components/tools/accountability-lab").then(
      (mod) => mod.AccountabilityLab,
    ),
  {
    loading: () => (
      <Card className="h-44 animate-pulse">
        <p className="text-sm text-(--color-muted)">
          Loading accountability lab...
        </p>
      </Card>
    ),
  },
);

export const metadata: Metadata = buildMetadata(
  "Parent Tools",
  "Budget-friendly grocery optimization and accountability tools.",
  "/tools",
);

export default function ToolsPage() {
  return (
    <div className="pb-8 pt-8 sm:pb-10 sm:pt-10">
      <Reveal>
        <SectionHeader
          eyebrow="Premium Utility"
          title="Practical tools for busy week execution"
          titleLight="Practical tools"
          titleBold="for busy weeks."
          description="Use grocery optimization and streak rescue workflows to stay consistent."
        />
      </Reveal>
      <Reveal className="mt-8" delayMs={60}>
        <GroceryOptimizer />
      </Reveal>
      <Reveal className="mt-6" delayMs={120}>
        <AccountabilityLab />
      </Reveal>
      <Reveal className="mt-6" delayMs={180}>
        <Card className="hover-lift">
          <h2 className="text-xl font-semibold text-foreground">Ready to automate your weekly plan?</h2>
          <p className="mt-2 text-sm text-(--color-muted)">
            Create a free account to save drafts and preferences across devices.
          </p>
          <TrackedLink
            href="/signup"
            eventName="signup_from_tools"
            label="tools"
            className="mt-4 inline-flex rounded-full bg-(--color-brand) px-4 py-2 text-sm font-semibold text-(--color-on-brand)"
          >
            Start free
          </TrackedLink>
        </Card>
      </Reveal>
    </div>
  );
}
