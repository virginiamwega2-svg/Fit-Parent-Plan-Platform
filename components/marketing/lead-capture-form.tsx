"use client";

import { FormEvent, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Script from "next/script";
import { trackEvent } from "@/lib/analytics";

type FormState = {
  name: string;
  email: string;
  challenge: string;
  goal: string;
  timePerDay: string;
  company: string;
  formStartedAt: string;
  turnstileToken: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  challenge: "",
  goal: "",
  timePerDay: "",
  company: "",
  formStartedAt: "",
  turnstileToken: "",
};

type FormErrors = Partial<Record<"name" | "email" | "challenge" | "goal" | "timePerDay", string>>;

type TurnstileRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export default function LeadCaptureForm() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(() => ({
    ...INITIAL_FORM,
    formStartedAt: String(Date.now()),
  }));
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = "Please enter at least 2 characters.";
    }
    if (!/\S+@\S+\.\S+/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (form.challenge.trim().length < 10) {
      nextErrors.challenge = "Please share at least 10 characters.";
    }
    if (!form.goal) {
      nextErrors.goal = "Select your primary goal.";
    }
    if (!form.timePerDay) {
      nextErrors.timePerDay = "Select your daily time window.";
    }
    return nextErrors;
  };

  useEffect(() => {
    const onPrefill = (event: Event) => {
      const customEvent = event as CustomEvent<{ name?: string; email?: string }>;
      setForm((prev) => ({
        ...prev,
        name: customEvent.detail?.name ?? prev.name,
        email: customEvent.detail?.email ?? prev.email,
      }));
    };

    window.addEventListener("prefillLeadForm", onPrefill as EventListener);
    return () =>
      window.removeEventListener("prefillLeadForm", onPrefill as EventListener);
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current || turnstileWidgetId) {
      return;
    }

    let tries = 0;
    const maxTries = 30;
    const timer = window.setInterval(() => {
      if (!window.turnstile || !turnstileRef.current) {
        tries += 1;
        if (tries >= maxTries) {
          window.clearInterval(timer);
        }
        return;
      }

      const widgetId = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token) =>
          setForm((prev) => ({ ...prev, turnstileToken: token })),
        "expired-callback": () =>
          setForm((prev) => ({ ...prev, turnstileToken: "" })),
        "error-callback": () =>
          setForm((prev) => ({ ...prev, turnstileToken: "" })),
      });

      setTurnstileWidgetId(widgetId);
      window.clearInterval(timer);
    }, 300);

    return () => window.clearInterval(timer);
  }, [turnstileSiteKey, turnstileWidgetId]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage("Please fix the highlighted fields and try again.");
      return;
    }

    if (turnstileSiteKey && !form.turnstileToken) {
      setStatus("error");
      setMessage("Please complete the security check and try again.");
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.message ?? "Please check your details and try again.");
        trackEvent("lead_submit_error", {
          category: "conversion",
          label: "lead_form",
        });
        if (turnstileWidgetId && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId);
          setForm((prev) => ({ ...prev, turnstileToken: "" }));
        }
        return;
      }

      setStatus("success");
      trackEvent("lead_submit_success", {
        category: "conversion",
        label: "lead_form",
      });
      const name = encodeURIComponent(form.name.trim() || "parent");
      window.location.href = `/thank-you?name=${name}`;
    } catch {
      setStatus("error");
      setMessage("Network error. Please retry in a moment.");
      trackEvent("lead_submit_error", {
        category: "conversion",
        label: "lead_form_network",
      });
    }
  };

  return (
    <form
      id="lead-form"
      onSubmit={onSubmit}
      className="surface-card"
      noValidate
    >
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
        />
      ) : null}

      <div className="grid gap-2">
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={(event) => setForm({ ...form, company: event.target.value })}
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />
        <input
          type="hidden"
          name="formStartedAt"
          value={form.formStartedAt}
          readOnly
        />
        <input
          type="hidden"
          name="turnstileToken"
          value={form.turnstileToken}
          readOnly
        />

        <label className="grid gap-1">
          <span className="text-sm font-medium text-foreground">Your Name</span>
          <input
            required
            type="text"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(event) => {
              setForm({ ...form, name: event.target.value });
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby="lead-name-error"
            className={`h-10 rounded-xl border px-3 outline-none ring-(--color-brand) transition focus-visible:ring-2 ${
              errors.name ? "border-red-400" : "border-(--color-border)"
            }`}
          />
          {errors.name ? (
            <span id="lead-name-error" className="text-xs text-red-700">
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-foreground">Email Address</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => {
              setForm({ ...form, email: event.target.value });
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby="lead-email-error"
            className={`h-10 rounded-xl border px-3 outline-none ring-(--color-brand) transition focus-visible:ring-2 ${
              errors.email ? "border-red-400" : "border-(--color-border)"
            }`}
          />
          {errors.email ? (
            <span id="lead-email-error" className="text-xs text-red-700">
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-foreground">
            Biggest challenge right now
          </span>
          <textarea
            required
            name="challenge"
            rows={2}
            value={form.challenge}
            onChange={(event) => {
              setForm({ ...form, challenge: event.target.value });
              setErrors((prev) => ({ ...prev, challenge: undefined }));
            }}
            aria-invalid={Boolean(errors.challenge)}
            aria-describedby="lead-challenge-error"
            className={`rounded-xl border px-3 py-2 outline-none ring-(--color-brand) transition focus-visible:ring-2 ${
              errors.challenge ? "border-red-400" : "border-(--color-border)"
            }`}
            placeholder="Example: I miss workouts after school pickup and struggle with late-night snacking."
          />
          {errors.challenge ? (
            <span id="lead-challenge-error" className="text-xs text-red-700">
              {errors.challenge}
            </span>
          ) : null}
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-foreground">Primary goal</span>
          <select
            required
            name="goal"
            value={form.goal}
            onChange={(event) => {
              setForm({ ...form, goal: event.target.value });
              setErrors((prev) => ({ ...prev, goal: undefined }));
            }}
            aria-invalid={Boolean(errors.goal)}
            aria-describedby="lead-goal-error"
            className={`h-10 rounded-xl border px-3 outline-none ring-(--color-brand) transition focus-visible:ring-2 ${
              errors.goal ? "border-red-400" : "border-(--color-border)"
            }`}
          >
            <option value="">Select one</option>
            <option value="fat-loss">Fat loss</option>
            <option value="strength">Strength</option>
            <option value="mobility">Mobility</option>
            <option value="energy">Energy and consistency</option>
          </select>
          {errors.goal ? (
            <span id="lead-goal-error" className="text-xs text-red-700">
              {errors.goal}
            </span>
          ) : null}
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-foreground">Time available per day</span>
          <select
            required
            name="timePerDay"
            value={form.timePerDay}
            onChange={(event) => {
              setForm({ ...form, timePerDay: event.target.value });
              setErrors((prev) => ({ ...prev, timePerDay: undefined }));
            }}
            aria-invalid={Boolean(errors.timePerDay)}
            aria-describedby="lead-time-error"
            className={`h-10 rounded-xl border px-3 outline-none ring-(--color-brand) transition focus-visible:ring-2 ${
              errors.timePerDay ? "border-red-400" : "border-(--color-border)"
            }`}
          >
            <option value="">Select one</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <option value="20">20 minutes</option>
          </select>
          {errors.timePerDay ? (
            <span id="lead-time-error" className="text-xs text-red-700">
              {errors.timePerDay}
            </span>
          ) : null}
        </label>

        {turnstileSiteKey ? (
          <div className="grid gap-2">
            <span className="text-sm font-medium text-foreground">Security check</span>
            <div
              ref={turnstileRef}
              className="min-h-[66px] rounded-xl border border-(--color-border) bg-(--color-bg) p-2"
            />
          </div>
        ) : null}

        <button
          type="submit"
          disabled={status === "loading"}
          className="cta-button inline-flex h-12 w-full items-center justify-center px-6 text-sm font-semibold"
        >
          {status === "loading" ? "Sending..." : "Send my application →"}
        </button>
      </div>

      <p
        className={`mt-3 text-sm ${
          status === "error" ? "text-red-700" : "text-(--color-muted)"
        }`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
      <p className="mt-1 text-xs text-(--color-muted)">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
