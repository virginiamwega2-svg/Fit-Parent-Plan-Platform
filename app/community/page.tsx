import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { TrackedLink } from "@/components/ui/tracked-link";
import { buddyModeFeatures, cohortChallenges } from "@/lib/data/community";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Community",
  "Parent cohorts, challenge boards, and buddy mode accountability.",
  "/community",
);

export default function CommunityPage() {
  if (cohortChallenges.length === 0) {
    return (
      <div className="pb-8 sm:pb-10">
        <Card>
          <p className="font-semibold text-foreground">Community board is syncing.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-8 sm:pb-10">
      <Reveal>
        <SectionHeader
          eyebrow="Community Mechanics"
          title="Cohorts, challenges, and buddy mode"
          titleLight="Cohorts, challenges,"
          titleBold="and buddy mode."
          description="Stay consistent with lightweight social structure built for busy parents."
        />
      </Reveal>

      <Reveal className="mt-8" delayMs={60}>
        <Card className="hover-lift">
          <h2 className="text-xl font-semibold text-foreground">Challenge board</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {cohortChallenges.map((challenge) => (
              <div key={challenge.title} className="surface-soft">
                <p className="font-semibold text-foreground">{challenge.title}</p>
                <p className="mt-1 text-sm text-(--color-muted)">{challenge.detail}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-(--color-brand-strong)">
                  {challenge.members} active parents
                </p>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>

      <Reveal className="mt-4" delayMs={120}>
        <Card className="hover-lift">
          <h2 className="text-xl font-semibold text-foreground">Buddy mode</h2>
          <ul className="mt-3 grid gap-2 text-sm text-(--color-muted)">
            {buddyModeFeatures.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
          <TrackedLink
            href="/signup"
            eventName="signup_from_community"
            label="community"
            className="mt-4 inline-flex rounded-full bg-(--color-brand) px-4 py-2 text-sm font-semibold text-(--color-on-brand)"
          >
            Join a parent cohort
          </TrackedLink>
        </Card>
      </Reveal>
    </div>
  );
}
