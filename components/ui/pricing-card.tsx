import type { PricingTier } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  tier: PricingTier;
  billing: "monthly" | "yearly";
};

export function PricingCard({ tier, billing }: Props) {
  const price = billing === "monthly" ? tier.monthly : tier.yearly;
  return (
    <Card
      className={cn(
        "hover-lift flex h-full flex-col",
        tier.isPopular && "border-(--color-brand) ring-2 ring-(--color-brand)/30",
      )}
    >
      {tier.isPopular ? (
        <p className="mb-3 inline-flex w-fit rounded-full bg-(--color-brand) px-3 py-1 text-xs font-semibold text-(--color-on-brand)">
          Most Popular
        </p>
      ) : null}
      <h3 className="text-2xl font-semibold text-foreground">{tier.name}</h3>
      <p className="mt-2 text-sm text-(--color-muted)">{tier.description}</p>
      <p className="mt-5 text-4xl font-bold text-foreground">
        ${price}
        <span className="text-sm font-medium text-(--color-muted)">/month</span>
      </p>
      <ul className="mt-5 grid gap-2 text-sm text-(--color-muted)">
        {tier.features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <Button href="/signup" className="w-full">
          {tier.id === "free" ? "Start Free" : "Choose Plan"}
        </Button>
      </div>
    </Card>
  );
}
