"use client";

import { useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ContactState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<ContactState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "We need a name to reply.";
    if (!email.trim()) nextErrors.email = "Where should we write you?";
    if (email && !/\S+@\S+\.\S+/.test(email)) nextErrors.email = "Hmm — that email looks off.";
    if (!message.trim()) nextErrors.message = "Tell us a bit so we can help.";
    if (message.trim().length < 20) nextErrors.message = "A sentence or two helps us reply usefully.";
    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    if (process.env.NODE_ENV === "development") {
      window.setTimeout(() => {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      }, 700);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Card className="hover-lift">
      <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
        <Input
          id="contact-name"
          label="What should we call you?"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
          required
        />
        <Input
          id="contact-email"
          label="Where can we reply?"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
          required
        />
        <label htmlFor="contact-message" className="grid gap-2 text-sm font-medium text-foreground">
          What&apos;s on your mind?
          <textarea
            id="contact-message"
            className={`min-h-32 rounded-xl border px-3 py-2 text-sm outline-none transition focus-visible:border-(--color-brand) focus-visible:ring-2 focus-visible:ring-(--color-brand)/20 ${
              errors.message ? "border-red-500" : "border-(--color-border)"
            }`}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="e.g. The mornings keep falling apart — wondering if this would fit."
          />
          {errors.message ? <span className="text-xs text-red-600">{errors.message}</span> : null}
        </label>
        <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-fit">
          {status === "submitting" ? "On its way…" : "Send"}
        </Button>

        <div role="status" aria-live="polite">
          {status === "success" ? (
            <p className="rounded-xl bg-(--color-mint-soft) px-3 py-2 text-sm text-foreground">
              Got it — we&apos;ll reply within 24 hours.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) px-3 py-2 text-sm text-(--color-muted)">
              That didn&apos;t go through — give it another try?
            </p>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
