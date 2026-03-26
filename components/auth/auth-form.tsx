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
      nextErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = "Use a valid email address";
    }

    if (mode !== "forgot" && password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    }
    if (mode === "signup" && !name.trim()) {
      nextErrors.name = "Name is required";
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
        setMessage("If this email exists, you’ll receive reset instructions.");
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
        setMessage(data.error ?? "Unable to authenticate right now.");
        return;
      }

      setStatus("success");
      setMessage("Success. Redirecting to dashboard...");
      const nextPath = new URLSearchParams(window.location.search).get("next");
      router.push(nextPath && nextPath.startsWith("/") ? nextPath : "/dashboard");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
        {mode === "signup" ? (
          <Input
            id="name"
            label="Full name"
            placeholder="Alex Rivera"
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
            ? "Please wait..."
            : mode === "forgot"
              ? "Send reset link"
              : mode === "login"
                ? "Login"
                : "Create account"}
        </Button>

        {status === "success" ? (
          <p className="rounded-xl bg-(--color-mint-soft) px-3 py-2 text-sm text-foreground">
            {message}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{message}</p>
        ) : null}

      </form>
    </Card>
  );
}
