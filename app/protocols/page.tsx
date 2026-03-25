import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { TrackedLink } from "@/components/ui/tracked-link";
import { busyWeekProtocols } from "@/lib/data/protocols";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Busy Week Protocols",
  "Situation-specific fitness playbooks for chaotic parent weeks.",
  "/protocols",
);

export default function ProtocolsPage() {
  if (busyWeekProtocols.length === 0) {
    return (
      <div className="pb-8 sm:pb-10">
        <Card>
          <p className="font-semibold text-[var(--color-ink)]">Protocols are loading.</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Check back in a moment.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-8 sm:pb-10">
      <Reveal>
        <SectionHeader
          eyebrow="Content Engine"
          title="Busy Week Protocols"
          description="When life gets messy, switch playbooks fast instead of restarting from zero."
        />
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {busyWeekProtocols.map((protocol, index) => (
          <Reveal key={protocol.id} delayMs={index * 60}>
            <Card className="hover-lift h-full">
              <h2 className="text-xl font-semibold text-[var(--color-ink)]">{protocol.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{protocol.summary}</p>
              <ul className="mt-4 grid gap-2 text-sm text-[var(--color-muted)]">
                {protocol.playbook.map((step) => (
                  <li key={step}>• {step}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <TrackedLink
                  href="/planner"
                  eventName="protocol_opened"
                  label={protocol.id}
                  className="inline-flex rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-[var(--color-on-brand)]"
                >
                  Use this protocol
                </TrackedLink>
                <TrackedLink
                  href="/signup"
                  eventName="signup_from_protocols"
                  label={protocol.id}
                  className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)]"
                >
                  Start free
                </TrackedLink>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8" delayMs={180}>
        <Card className="hover-lift">
          <h2 className="text-xl font-semibold text-[var(--color-ink)]">Need a custom crisis-week plan?</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Use the planner to generate a fallback week in under 2 minutes.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button href="/planner">Open planner</Button>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
