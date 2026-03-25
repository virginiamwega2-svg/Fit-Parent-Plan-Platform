"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { faqs, testimonials } from "@/lib/data/testimonials";

export function HomeProofSections() {
  return (
    <>
      <Reveal className="mt-12 sm:mt-14" delayMs={120}>
        <section>
          <SectionHeader
            eyebrow="Parent stories"
            title="What busy parents are saying"
            align="center"
            description="Quick, practical, and consistent beats perfect."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.id} className="hover-lift">
                <TestimonialCard testimonial={item} />
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal className="mt-12 sm:mt-14" delayMs={180}>
        <section>
          <SectionHeader eyebrow="FAQ" title="Questions parents ask most" />
          <div className="mt-6 grid gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="surface-soft hover-lift"
              >
                <summary className="cursor-pointer font-semibold text-[var(--color-ink)]">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal className="mt-12 sm:mt-14" delayMs={240}>
        <section className="fade-in-delayed rounded-[1.75rem] bg-[var(--color-ink)] px-5 py-8 text-[var(--color-on-brand)] sm:rounded-[2rem] sm:px-10 sm:py-10">
          <h2 className="font-display text-[clamp(1.7rem,5vw,2.3rem)]">
            Ready for progress you can sustain?
          </h2>
          <p className="mt-3 max-w-xl text-sm text-[var(--color-on-brand)]/80">
            Start with the free plan today. Upgrade only when you need more structure.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/signup"
              className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-brand)] px-5 py-3 text-base font-semibold text-[var(--color-on-brand)] sm:w-auto"
            >
              Start Free
            </Link>
            <Link
              href="/workouts"
              className="inline-flex w-full items-center justify-center rounded-full border border-[var(--color-bg-soft)]/30 bg-[var(--color-bg-soft)]/80 px-5 py-3 text-base font-semibold text-[var(--color-on-brand)] sm:w-auto"
            >
              Explore Workouts
            </Link>
          </div>
          <p className="mt-6 text-xs text-[var(--color-on-brand)]/80">
            Have questions?{" "}
            <Link href="/contact" className="underline underline-offset-4">
              Contact us
            </Link>
          </p>
        </section>
      </Reveal>
    </>
  );
}

export function HomeProofSectionsSkeleton() {
  return (
    <div className="mt-12 grid gap-4">
      <Card className="h-44 animate-pulse" />
      <Card className="h-52 animate-pulse" />
      <Card className="h-56 animate-pulse" />
    </div>
  );
}
