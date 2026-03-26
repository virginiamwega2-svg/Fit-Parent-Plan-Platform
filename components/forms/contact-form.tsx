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
    if (!name.trim()) nextErrors.name = "Name is required";
    if (!email.trim()) nextErrors.email = "Email is required";
    if (email && !/\S+@\S+\.\S+/.test(email)) nextErrors.email = "Email is invalid";
    if (!message.trim()) nextErrors.message = "Message is required";
    if (message.trim().length < 20) nextErrors.message = "Please add at least 20 characters";
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
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
          required
        />
        <Input
          id="contact-email"
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
          required
        />
        <label htmlFor="contact-message" className="grid gap-2 text-sm font-medium text-foreground">
          Message
          <textarea
            id="contact-message"
            className={`min-h-32 rounded-xl border px-3 py-2 text-sm outline-none transition focus-visible:border-(--color-brand) focus-visible:ring-2 focus-visible:ring-(--color-brand)/20 ${
              errors.message ? "border-red-500" : "border-(--color-border)"
            }`}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us your routine and your biggest challenge."
          />
          {errors.message ? <span className="text-xs text-red-600">{errors.message}</span> : null}
        </label>
        <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-fit">
          {status === "submitting" ? "Sending..." : "Send message"}
        </Button>

        <div role="status" aria-live="polite">
          {status === "success" ? (
            <p className="rounded-xl bg-(--color-mint-soft) px-3 py-2 text-sm text-foreground">
              Thanks! We received your message and will reply within 24 hours.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
              Something went wrong. Please try again in a minute.
            </p>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
