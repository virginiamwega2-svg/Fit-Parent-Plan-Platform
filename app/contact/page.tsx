import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata(
  "Contact",
  "Contact Fit Parent Plan for support, questions, and partnership requests.",
  "/contact",
);

export default function ContactPage() {
  return (
    <div className="pb-8 sm:pb-10">
      <Reveal>
        <SectionHeader
          eyebrow="Contact"
          title="Tell us what your schedule looks like"
          description="We reply within one business day. Share your current routine and what’s getting in the way."
        />
      </Reveal>

      <Reveal className="mt-8" delayMs={60}>
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <ContactForm />
          <Card className="hover-lift">
            <h2 className="text-lg font-semibold text-foreground">Reach me directly</h2>
            <ul className="mt-3 grid gap-3 text-sm text-(--color-muted)">
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-semibold text-(--color-brand-strong) underline hover:text-foreground"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li>I read every message personally and reply within 24 hours.</li>
              <li className="pt-1 text-xs">Not sure if this is right for you? Just ask — no pressure, no pitch.</li>
            </ul>
          </Card>
        </div>
      </Reveal>
    </div>
  );
}
