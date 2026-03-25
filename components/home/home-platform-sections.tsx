"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const platformItems = [
  { title: "Time-Window Planner", href: "/planner", detail: "Auto-build plans from your actual week." },
  { title: "Busy Week Protocols", href: "/protocols", detail: "Switch playbooks when life gets chaotic." },
  { title: "Adaptive Intelligence", href: "/planner", detail: "Plans adjust based on completion and stress." },
  { title: "Parent Case Studies", href: "/case-studies", detail: "Timeline-based social proof from real parents." },
  { title: "Accountability Lab", href: "/accountability", detail: "Streak rescue and 30-second check-ins." },
  { title: "Grocery Optimizer", href: "/tools", detail: "Budget mode plus leftovers planning." },
  { title: "Community Cohorts", href: "/community", detail: "Challenges and buddy mode with other parents." },
  { title: "Methodology", href: "/methodology", detail: "Credentials, principles, and safety boundaries." },
];

export function HomePlatformSections() {
  return (
    <Reveal className="mt-12 sm:mt-14" delayMs={120}>
      <section>
        <SectionHeader
          eyebrow="What Makes This Unique"
          title="A full parent-performance platform"
          description="Not just workouts. Each layer is built for real household constraints."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {platformItems.map((item) => (
            <Card key={item.title} className="hover-lift">
              <h3 className="text-lg font-semibold text-[var(--color-ink)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{item.detail}</p>
              <Link
                href={item.href}
                className="mt-4 inline-block text-sm font-semibold text-[var(--color-brand-strong)] underline"
              >
                Explore
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

export function HomePlatformSectionsSkeleton() {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="h-36 animate-pulse" />
      ))}
    </div>
  );
}
