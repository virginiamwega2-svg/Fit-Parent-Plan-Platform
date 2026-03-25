"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type QuickState = {
  name: string;
  email: string;
};

export default function QuickIntakeForm() {
  const [form, setForm] = useState<QuickState>({ name: "", email: "" });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent("prefillLeadForm", {
        detail: { name: form.name.trim(), email: form.email.trim() },
      }),
    );

    trackEvent("lead_quick_continue", {
      category: "conversion",
      label: "hero_quick_form",
    });

    document
      .getElementById("lead-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 surface-soft bg-[var(--color-bg-soft)]/80 sm:mt-7"
      aria-label="Quick start form"
    >
      <p className="text-sm font-semibold text-[var(--color-ink)]">Quick start in 10 seconds</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <input
          required
          type="text"
          name="quickName"
          placeholder="Your name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className="h-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-3 text-sm outline-none ring-[var(--color-brand)] transition focus-visible:ring-2"
        />
        <input
          required
          type="email"
          name="quickEmail"
          placeholder="Email address"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          className="h-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-3 text-sm outline-none ring-[var(--color-brand)] transition focus-visible:ring-2"
        />
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--color-brand)] px-4 text-sm font-semibold text-[var(--color-on-brand)] transition hover:bg-[var(--color-brand-strong)]"
        >
          Continue
        </button>
      </div>
    </form>
  );
}

