import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { TrackedLink } from "@/components/ui/tracked-link";
import { parentCaseStudies } from "@/lib/data/case-studies";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Parent Case Studies",
  "Real timelines showing how parents fit fitness into full schedules.",
  "/case-studies",
);

export default function CaseStudiesPage() {
  if (parentCaseStudies.length === 0) {
    return (
      <div className="pb-8 sm:pb-10">
        <Card>
          <p className="font-semibold text-[var(--color-ink)]">Case studies are being prepared.</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Please check back shortly.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-8 sm:pb-10">
      <Reveal>
        <SectionHeader
          eyebrow="Social Proof"
          title="Parent case studies with real schedules"
          description="Outcome claims include timestamped check-ins and documented schedule changes."
        />
      </Reveal>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {parentCaseStudies.map((caseStudy, index) => (
          <Reveal key={caseStudy.id} delayMs={index * 60}>
            <Card className="hover-lift h-full">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">{caseStudy.name}</h2>
              <p className="mt-1 text-sm text-[var(--color-brand-strong)]">{caseStudy.timelineWeeks}-week timeline</p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{caseStudy.result}</p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{caseStudy.scheduleFit}</p>
              <ul className="mt-3 grid gap-1 text-sm text-[var(--color-muted)]">
                {caseStudy.milestones.map((milestone) => (
                  <li key={milestone}>• {milestone}</li>
                ))}
              </ul>
              <div className="surface-soft border-dashed mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-strong)]">
                  Evidence
                </p>
                <ul className="mt-2 grid gap-1 text-sm text-[var(--color-muted)]">
                  {caseStudy.evidence.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <TrackedLink
                href="/signup"
                eventName="signup_from_case_study"
                label={caseStudy.id}
                className="mt-4 inline-flex rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-[var(--color-on-brand)]"
              >
                Start your plan
              </TrackedLink>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
