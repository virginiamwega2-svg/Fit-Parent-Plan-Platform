import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { TrackedLink } from "@/components/ui/tracked-link";
import { buildMetadata } from "@/lib/metadata";
import { coachCredentials, principles, safetyBoundaries } from "@/lib/data/methodology";

export const metadata: Metadata = buildMetadata(
  "Methodology",
  "Evidence-backed coaching methodology, credentials, and safety boundaries.",
  "/methodology",
);

export default function MethodologyPage() {
  if (coachCredentials.length === 0 || principles.length === 0 || safetyBoundaries.length === 0) {
    return (
      <div className="pb-8 sm:pb-10">
        <Card>
          <p className="font-semibold text-foreground">Methodology content is updating.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-8 sm:pb-10">
      <Reveal>
        <SectionHeader
          eyebrow="Trust Moat"
          title="Methodology and clinical boundaries"
          titleLight="Methodology and"
          titleBold="clinical boundaries."
          description="Transparent principles, expert backing, and clear safety guidance."
        />
      </Reveal>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Reveal delayMs={60}>
          <Card className="hover-lift h-full">
            <h2 className="text-xl font-semibold text-foreground">Coach credentials</h2>
            <ul className="mt-3 grid gap-2 text-sm text-(--color-muted)">
              {coachCredentials.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal delayMs={120}>
          <Card className="hover-lift h-full">
            <h2 className="text-xl font-semibold text-foreground">Core principles</h2>
            <ul className="mt-3 grid gap-2 text-sm text-(--color-muted)">
              {principles.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal delayMs={180}>
          <Card className="hover-lift h-full">
            <h2 className="text-xl font-semibold text-foreground">Safety boundaries</h2>
            <ul className="mt-3 grid gap-2 text-sm text-(--color-muted)">
              {safetyBoundaries.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>

      <Reveal className="mt-6" delayMs={240}>
        <Card className="hover-lift">
          <h2 className="text-xl font-semibold text-foreground">Want this framework applied to your week?</h2>
          <p className="mt-2 text-sm text-(--color-muted)">
            Start free and get your first adaptive plan in minutes.
          </p>
          <TrackedLink
            href="/signup"
            eventName="signup_from_methodology"
            label="methodology"
            className="mt-4 inline-flex rounded-full bg-(--color-brand) px-4 py-2 text-sm font-semibold text-(--color-on-brand)"
          >
            Start free
          </TrackedLink>
        </Card>
      </Reveal>
    </div>
  );
}
