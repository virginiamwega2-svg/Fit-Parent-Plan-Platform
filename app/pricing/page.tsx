import type { Metadata } from "next";
import { PricingPlans } from "@/components/pricing/pricing-plans";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Pricing",
  "Free, Starter, and Family Pro pricing for busy-parent planning.",
  "/pricing",
);

export default function PricingPage() {
  return (
    <div className="pb-14 sm:pb-16">
      <Reveal>
        <SectionHeader
          eyebrow="Pricing"
          title="Start simple, upgrade when you need more"
          description="Clear plans built for real family schedules."
        />
      </Reveal>
      <Reveal className="mt-8" delayMs={60}>
        <PricingPlans />
      </Reveal>
    </div>
  );
}
