import type { PricingTier } from "@/lib/types";
import { Button } from "@/components/ui/button";

type PricingCardProps = {
  tier: PricingTier;
  billing: "monthly" | "yearly";
};

export function PricingCard({ tier, billing }: PricingCardProps) {
  const price = billing === "yearly" ? tier.yearly : tier.monthly;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 ${
        tier.isPopular
          ? "border-(--color-brand) bg-(--color-cream)"
          : "border-(--color-border) bg-(--color-bg-soft)"
      }`}
    >
      {tier.isPopular ? (
        <span className="mb-3 w-fit rounded-full bg-(--color-brand) px-3 py-0.5 text-xs font-semibold text-white">
          Most popular
        </span>
      ) : null}
      <p className="text-lg font-bold text-foreground">{tier.name}</p>
      <p className="mt-1 text-sm text-(--color-muted)">{tier.description}</p>
      <p className="mt-4 text-3xl font-black text-foreground">
        ${price}
        <span className="text-sm font-normal text-(--color-muted)">/mo</span>
      </p>
      <ul className="mt-4 flex-1 space-y-2">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
            <span className="text-(--color-brand)">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <Button href="#apply" className="mt-6 w-full">
        Get started
      </Button>
    </div>
  );
}
