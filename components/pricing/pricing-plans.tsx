"use client";

import { useState } from "react";
import { PricingCard } from "@/components/ui/pricing-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { pricingComparison, pricingTiers } from "@/lib/data/pricing";

export function PricingPlans() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="grid gap-8">
      <div className="inline-flex w-full max-w-xs rounded-full border border-(--color-border) bg-(--color-bg-soft) p-1 sm:w-fit">
        <button
          type="button"
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold sm:flex-none ${
            billing === "monthly" ? "bg-(--color-brand) text-(--color-on-brand)" : "text-(--color-muted)"
          }`}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </button>
        <button
          type="button"
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold sm:flex-none ${
            billing === "yearly" ? "bg-(--color-brand) text-(--color-on-brand)" : "text-(--color-muted)"
          }`}
          onClick={() => setBilling("yearly")}
        >
          Yearly
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          <Reveal key={tier.id} delayMs={index * 60}>
            <PricingCard tier={tier} billing={billing} />
          </Reveal>
        ))}
      </div>

      <Reveal delayMs={120}>
        <div className="overflow-x-auto surface-card p-4 hover-lift">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-(--color-border) text-foreground">
              <th className="px-3 py-3">Feature</th>
              <th className="px-3 py-3">Free</th>
              <th className="px-3 py-3">Starter</th>
              <th className="px-3 py-3">Family Pro</th>
            </tr>
          </thead>
          <tbody>
            {pricingComparison.map((row) => (
              <tr key={row.feature} className="border-b border-(--color-border)/60">
                <td className="px-3 py-3 font-medium text-foreground">{row.feature}</td>
                <td className="px-3 py-3 text-(--color-muted)">{row.free}</td>
                <td className="px-3 py-3 text-(--color-muted)">{row.starter}</td>
                <td className="px-3 py-3 text-(--color-muted)">{row.familyPro}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Reveal>

      <Reveal delayMs={180}>
        <div className="surface-soft bg-(--color-mint-soft) hover-lift">
          <p className="font-semibold text-foreground">Trust signals</p>
          <ul className="mt-2 grid gap-1 text-sm text-(--color-muted)">
            <li>• 14-day money-back guarantee</li>
            <li>• Secure checkout (payment integration ready)</li>
            <li>• Cancel anytime in account settings</li>
          </ul>
        </div>
      </Reveal>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-(--color-border) bg-(--color-bg-soft) p-3 shadow-lg sm:hidden">
        <Button href="/signup" className="w-full">
          Start Free Today
        </Button>
      </div>
    </section>
  );
}
