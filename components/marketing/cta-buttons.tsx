"use client";

import { trackEvent } from "@/lib/analytics";

export default function CtaButtons() {
  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
      <a
        href="#lead-form"
        className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-brand)] px-6 text-sm font-semibold text-[var(--color-on-brand)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
        onClick={() =>
          trackEvent("cta_click", {
            category: "conversion",
            label: "hero_enroll_now",
          })
        }
      >
        Start your 12-week plan
      </a>
      <a
        href="#offer"
        className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--color-secondary)] bg-[var(--color-bg-soft)] px-6 text-sm font-semibold text-[var(--color-secondary)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-secondary)]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
        onClick={() =>
          trackEvent("cta_click", {
            category: "engagement",
            label: "hero_view_offer",
          })
        }
      >
        See program details
      </a>
    </div>
  );
}

