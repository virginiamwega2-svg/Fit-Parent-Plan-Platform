import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Pricing",
  "One coaching plan for busy parents — $199/month, everything included.",
  "/pricing",
);

const INCLUDES = [
  {
    title: "Training",
    body: "3 home workouts per week, 20 minutes each. No gym, no equipment beyond a mat.",
  },
  {
    title: "Nutrition",
    body: "A meal framework built around real family food — not meal-prep marathons.",
  },
  {
    title: "Accountability",
    body: "Weekly check-ins so you stay on track even when the week goes sideways.",
  },
];

export default function PricingPage() {
  return (
    <div className="pb-14 pt-8 sm:pb-16 sm:pt-10">
      <Reveal>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-(--color-brand)">Pricing</p>
          <h1 className="mt-2 text-3xl tracking-tight sm:text-4xl">
            <span className="font-light italic text-(--color-muted)">One plan, </span>
            <span className="font-black text-foreground">everything included.</span>
          </h1>
          <p className="mt-3 text-(--color-muted)">No tiers, no upsells. Just 12 weeks of focused coaching.</p>
        </div>
      </Reveal>

      <Reveal className="mt-8" delayMs={60}>
        <Card className="mx-auto max-w-lg text-center">
          <p className="text-5xl tracking-tight">
            <span className="font-light italic text-(--color-muted)">just </span>
            <span className="font-black text-foreground">$199</span>
          </p>
          <p className="mt-1 text-sm text-(--color-muted)">per month · 3-month programme</p>
          <p className="mt-4 text-sm font-medium text-foreground">What&apos;s included</p>
          <ul className="mt-3 grid gap-2 text-sm text-(--color-muted)">
            {INCLUDES.map((item) => (
              <li key={item.title} className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) p-3 text-left">
                <span className="font-semibold text-foreground">{item.title}</span>
                <span className="ml-2">{item.body}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/#apply"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-(--color-brand) px-8 text-sm font-semibold text-(--color-on-brand) transition hover:bg-(--color-brand-strong) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand)"
          >
            Apply now →
          </Link>
          <p className="mt-3 text-xs text-(--color-muted)">14-day money-back guarantee · No spam · Cancel anytime</p>
        </Card>
      </Reveal>
    </div>
  );
}
