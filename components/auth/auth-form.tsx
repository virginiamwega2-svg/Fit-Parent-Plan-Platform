"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Mode = "login" | "signup" | "forgot";

type Props = {
  mode: Mode;
};

export function AuthForm({ mode }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!email.trim()) {
      nextErrors.email = "Email, please.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = "Hmm — that email looks off.";
    }

    if (mode !== "forgot" && password.length < 8) {
      nextErrors.password = "8 characters or more.";
    }
    if (mode === "signup" && !name.trim()) {
      nextErrors.name = "Just your first name is fine.";
    }
    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    setMessage("");

    if (mode === "forgot") {
      window.setTimeout(() => {
        setStatus("success");
        setMessage("If we have that email, reset instructions are on the way.");
      }, 500);
      return;
    }

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Couldn't sign you in — try again?");
        return;
      }

      setStatus("success");
      setMessage("You're in. One moment…");
      const nextPath = new URLSearchParams(window.location.search).get("next");
      router.push(nextPath && nextPath.startsWith("/") ? nextPath : "/dashboard");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Lost the connection — try once more?");
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
        {mode === "signup" ? (
          <Input
            id="name"
            label="Your first name"
            placeholder="e.g. Alex"
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={errors.name}
            required
          />
        ) : null}

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
          required
        />

        {mode !== "forgot" ? (
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
            required
          />
        ) : null}

        <Button type="submit" disabled={status === "submitting"} className="w-full">
          {status === "submitting"
            ? "Just a sec…"
            : mode === "forgot"
              ? "Send reset link"
              : mode === "login"
                ? "Log in"
                : "Create account"}
        </Button>

        {status === "success" ? (
          <p className="rounded-xl bg-(--color-mint-soft) px-3 py-2 text-sm text-foreground">
            {message}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) px-3 py-2 text-sm text-(--color-muted)">
            {message}
          </p>
        ) : null}

      </form>
    </Card>
  );
}
