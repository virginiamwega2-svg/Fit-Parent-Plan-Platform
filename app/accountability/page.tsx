import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { buildMetadata } from "@/lib/metadata";

const AccountabilityLab = dynamic(
  () =>
    import("@/components/tools/accountability-lab").then(
      (mod) => mod.AccountabilityLab,
    ),
  {
    loading: () => (
      <Card className="h-44 animate-pulse">
        <p className="text-sm text-(--color-muted)">
          Loading accountability module...
        </p>
      </Card>
    ),
  },
);

export const metadata: Metadata = buildMetadata(
  "Accountability",
  "Streak recovery and micro check-ins to maintain consistency.",
  "/accountability",
);

export default function AccountabilityPage() {
  return (
    <div className="pb-8 sm:pb-10">
      <Reveal>
        <SectionHeader
          eyebrow="Accountability"
          title="Streak recovery for real parent life"
          titleLight="Streak recovery"
          titleBold="for real parent life."
          description="Use missed-day rescue and micro check-ins to prevent restart cycles."
        />
      </Reveal>
      <Reveal className="mt-8" delayMs={60}>
        <AccountabilityLab />
      </Reveal>
    </div>
  );
}
