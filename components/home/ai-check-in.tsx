"use client";

import { useEffect, useState, useTransition } from "react";
import { Mic, MicOff, Send, Sparkles, Info, Mail, Check, Dumbbell, MessageCircle, Zap, RefreshCw, Pause } from "lucide-react";
import { readPausedUntil, setPaused, clearPaused, formatPauseEnd } from "@/lib/pause";
import {
  adaptPlanAction,
  generatePlanAction,
  generateWorkoutAction,
  savePlanEmailAction,
  type GeneratePlanResponse,
} from "@/app/actions/ai";
import { useVoiceInput } from "@/hooks/use-voice-input";
import type { Equipment } from "@/lib/ai/types";

type Mode = "plan" | "workout" | "adapt";

type SavedPlan = {
  headline: string;
  steps: string[];
  savedAt: number;
};

const LAST_PLAN_KEY = "fpp:lastPlan";

function loadLastPlan(): SavedPlan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LAST_PLAN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedPlan;
    if (!parsed.headline || !Array.isArray(parsed.steps)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveLastPlan(plan: SavedPlan) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LAST_PLAN_KEY, JSON.stringify(plan));
  } catch {
    // localStorage unavailable / quota — silently skip
  }
}

const EXAMPLES_EARLY = [
  "Up since 5, kid woke up early. 12 minutes before they're hungry again.",
  "Slept badly. 15 min before the school run.",
  "Coffee in hand, kids still asleep. 20 min and counting.",
];
const EXAMPLES_MIDDAY = [
  "Feeling decent, no equipment, 25 min before work calls.",
  "Lunch break, 15 min before pickup.",
  "Toddler napping. 20 min, no jumping or it's all over.",
];
const EXAMPLES_EVENING = [
  "Just put them down. 15 min before I crash.",
  "Back is tight after carrying the toddler all day. 15 min, gentle please.",
  "Kids in bed, I have 20 min before I want to sleep too.",
];

function pickExamples(): string[] {
  const h = new Date().getHours();
  if (h < 11) return EXAMPLES_EARLY;
  if (h < 17) return EXAMPLES_MIDDAY;
  return EXAMPLES_EVENING;
}

export function AiCheckIn() {
  const [mode, setMode] = useState<Mode>("plan");
  // Pre-fill so visitors don't face a blank box — lowers friction massively.
  // Examples vary by time of day so the demo feels alive on first paint.
  const [examples] = useState(pickExamples);
  const [text, setText] = useState(examples[0]);
  const [minutes, setMinutes] = useState<number>(20);
  const [equipment, setEquipment] = useState<Equipment>("none");
  const [energy, setEnergy] = useState<number>(3);
  const [workoutNotes, setWorkoutNotes] = useState("");
  const [adaptUpdate, setAdaptUpdate] = useState("");
  const [lastPlan, setLastPlan] = useState<SavedPlan | null>(null);
  const [response, setResponse] = useState<GeneratePlanResponse | null>(null);
  const [showReasoning, setShowReasoning] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const stored = loadLastPlan();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from localStorage post-mount to avoid SSR/client mismatch
      setLastPlan(stored);
    }
  }, []);

  // Rotating "thinking" labels — keeps the wait feeling intelligent, not slow.
  const [thinkingIdx, setThinkingIdx] = useState(0);
  useEffect(() => {
    if (!isPending) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset rotating index when a new request starts; the interval below drives the rest
    setThinkingIdx(0);
    const id = setInterval(() => setThinkingIdx((i) => i + 1), 900);
    return () => clearInterval(id);
  }, [isPending]);
  const thinkingLabels = [
    "Reading your week…",
    "Matching to your time…",
    "Picking the lowest-friction win…",
  ];
  const thinkingLabel = thinkingLabels[Math.min(thinkingIdx, thinkingLabels.length - 1)];

  const voice = useVoiceInput(setText);

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    setMode(next);
    setResponse(null);
    setShowReasoning(false);
  };

  const handleResult = (result: GeneratePlanResponse) => {
    setResponse(result);
    if (result.ok) {
      const saved: SavedPlan = {
        headline: result.result.plan.headline,
        steps: result.result.plan.steps,
        savedAt: Date.now(),
      };
      saveLastPlan(saved);
      setLastPlan(saved);
    }
  };

  const submit = () => {
    setResponse(null);
    setShowReasoning(false);
    if (mode === "plan") {
      if (text.trim().length < 4) return;
      startTransition(async () => {
        const result = await generatePlanAction({ text: text.trim(), minutesAvailable: minutes });
        handleResult(result);
      });
    } else if (mode === "workout") {
      startTransition(async () => {
        const result = await generateWorkoutAction({
          minutesAvailable: minutes,
          equipment,
          energy,
          notes: workoutNotes.trim() || undefined,
        });
        handleResult(result);
      });
    } else {
      if (!lastPlan || adaptUpdate.trim().length < 4) return;
      startTransition(async () => {
        const result = await adaptPlanAction({
          previousHeadline: lastPlan.headline,
          previousSteps: lastPlan.steps,
          update: adaptUpdate.trim(),
          minutesAvailable: minutes,
        });
        handleResult(result);
      });
    }
  };

  return (
    <div
      id="section-ai-try"
      className="rounded-3xl border border-(--color-brand)/20 bg-white p-6 shadow-(--shadow-card) sm:p-7"
    >
      <div className="flex items-center justify-between">
        <p className="eyebrow text-(--color-muted)">
          Live preview
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-mint-soft) px-2.5 py-0.5 text-xs font-medium text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-(--color-brand)" aria-hidden="true" />
          {response?.ok && response.result.source === "live" ? "Claude live" : "Demo mode"}
        </span>
      </div>

      <ModeTabs mode={mode} hasLastPlan={!!lastPlan} onSwitch={switchMode} />

      {mode === "plan" && (
      <>
      <div className="mt-4">
        <label className="block text-xs font-semibold text-(--color-muted)" htmlFor="ai-checkin">
          Tell me about today
        </label>
        <div className="relative mt-2">
          <textarea
            id="ai-checkin"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            maxLength={800}
            placeholder="e.g. Slept 5 hours, kids up at 6, I have 18 min before the school run…"
            className="w-full resize-none rounded-2xl border border-(--color-border) bg-(--color-bg-soft) px-4 py-3 pr-14 text-sm text-foreground placeholder:text-(--color-muted)/60 focus:border-(--color-brand) focus:outline-none focus:ring-2 focus:ring-(--color-brand)/15"
          />
          {voice.supported && (
            <div className="absolute bottom-3 right-3">
              {voice.listening && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-ping rounded-full bg-(--color-brand) opacity-60"
                />
              )}
              <button
                type="button"
                onClick={voice.listening ? voice.stop : voice.start}
                aria-label={voice.listening ? "Stop recording" : "Start voice input"}
                className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                  voice.listening
                    ? "border-(--color-brand) bg-(--color-brand) text-white"
                    : "border-(--color-border) bg-white text-(--color-muted) hover:text-foreground"
                }`}
              >
                {voice.listening ? <MicOff size={15} /> : <Mic size={15} />}
              </button>
            </div>
          )}
        </div>
        {voice.error && <p className="mt-1.5 text-xs text-red-600">{voice.error}</p>}
        {!voice.error && text.trim().length >= 40 && (
          <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-(--color-brand)">
            <Check size={11} aria-hidden="true" /> Got what I need.
          </p>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {examples.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => setText(ex)}
            className="rounded-full border border-(--color-border) bg-white px-3 py-1 text-xs text-(--color-muted) hover:border-(--color-brand)/40 hover:text-foreground"
          >
            {ex.split(",")[0]}…
          </button>
        ))}
      </div>
      </>
      )}
      {mode === "workout" && (
      <div className="mt-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-(--color-muted)" htmlFor="wo-equipment">
            Equipment
          </label>
          <div role="radiogroup" aria-labelledby="wo-equipment" className="mt-2 flex flex-wrap gap-1.5">
            {([
              ["none", "Bodyweight"],
              ["dumbbells", "Dumbbells"],
              ["bands", "Bands"],
              ["full-gym", "Full gym"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={equipment === value}
                onClick={() => setEquipment(value)}
                className={`rounded-full border px-3 py-1 text-xs ${
                  equipment === value
                    ? "border-(--color-brand) bg-(--color-mint-soft) text-foreground"
                    : "border-(--color-border) bg-white text-(--color-muted) hover:border-(--color-brand)/40"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="wo-energy" className="flex items-center justify-between text-xs font-semibold text-(--color-muted)">
            <span>Energy today</span>
            <span className="text-foreground">
              {energy}/5 {energy <= 2 ? "· wiped" : energy >= 4 ? "· fresh" : "· steady"}
            </span>
          </label>
          <input
            id="wo-energy"
            type="range"
            min={1}
            max={5}
            step={1}
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="mt-2 w-full accent-(--color-brand)"
          />
        </div>
        <div>
          <label htmlFor="wo-notes" className="block text-xs font-semibold text-(--color-muted)">
            Anything to work around? <span className="font-normal text-(--color-muted)/70">(optional)</span>
          </label>
          <input
            id="wo-notes"
            type="text"
            value={workoutNotes}
            onChange={(e) => setWorkoutNotes(e.target.value)}
            maxLength={300}
            placeholder="e.g. tight back, sore knees, no jumping"
            className="mt-2 w-full rounded-2xl border border-(--color-border) bg-(--color-bg-soft) px-4 py-2.5 text-sm text-foreground placeholder:text-(--color-muted)/60 focus:border-(--color-brand) focus:outline-none focus:ring-2 focus:ring-(--color-brand)/15"
          />
        </div>
      </div>
      )}
      {mode === "adapt" && lastPlan && (
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) px-4 py-3">
            <p className="eyebrow text-(--color-muted)">
              Last plan ({new Date(lastPlan.savedAt).toLocaleDateString()})
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">{lastPlan.headline}</p>
            <ul className="mt-1.5 space-y-1 text-xs text-(--color-muted)">
              {lastPlan.steps.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-(--color-brand)" aria-hidden="true" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label htmlFor="adapt-update" className="block text-xs font-semibold text-(--color-muted)">
              How did it go? What&apos;s different now?
            </label>
            <textarea
              id="adapt-update"
              value={adaptUpdate}
              onChange={(e) => setAdaptUpdate(e.target.value)}
              rows={3}
              maxLength={800}
              placeholder="e.g. Crushed it, felt strong. Slightly more time today."
              className="mt-2 w-full resize-none rounded-2xl border border-(--color-border) bg-(--color-bg-soft) px-4 py-3 text-sm text-foreground placeholder:text-(--color-muted)/60 focus:border-(--color-brand) focus:outline-none focus:ring-2 focus:ring-(--color-brand)/15"
            />
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-xs text-(--color-muted)">
          <span className="font-semibold">Minutes</span>
          <input
            type="number"
            min={5}
            max={120}
            value={minutes}
            onChange={(e) => setMinutes(Math.max(5, Math.min(120, Number(e.target.value) || 20)))}
            className="w-16 rounded-xl border border-(--color-border) bg-white px-2.5 py-1.5 text-sm text-foreground focus:border-(--color-brand) focus:outline-none focus:ring-2 focus:ring-(--color-brand)/15"
          />
        </label>
        <button
          type="button"
          onClick={submit}
          disabled={
            isPending ||
            (mode === "plan" && text.trim().length < 4) ||
            (mode === "adapt" && (!lastPlan || adaptUpdate.trim().length < 4))
          }
          className="inline-flex items-center gap-1.5 rounded-full bg-(--color-brand) px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
        >
          {isPending ? (
            thinkingLabel
          ) : mode === "plan" ? (
            <>Get my plan <Send size={13} aria-hidden="true" /></>
          ) : mode === "workout" ? (
            <>Generate workout <Send size={13} aria-hidden="true" /></>
          ) : (
            <>Adapt my plan <Send size={13} aria-hidden="true" /></>
          )}
        </button>
      </div>

      {/* Result area */}
      <div className="mt-5">
        {isPending && <PlanSkeleton />}
        {response && !isPending && (
          response.ok ? (
            <PlanCard
              response={response}
              showReasoning={showReasoning}
              onToggleReasoning={() => setShowReasoning((v) => !v)}
            />
          ) : (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {response.error}
            </p>
          )
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-(--color-border) pt-4 text-xs text-(--color-muted)/70">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles size={11} aria-hidden="true" /> Powered by Claude
        </span>
        {response?.ok && (
          <span title="Honest cost — most calls are a fraction of a cent.">
            This call: ${response.result.costUsd.toFixed(4)} · {response.result.latencyMs}ms
          </span>
        )}
      </div>
    </div>
  );
}

function PlanSkeleton() {
  return (
    <div className="space-y-2 rounded-2xl border border-(--color-brand)/15 bg-white p-4">
      <div className="h-3 w-2/3 animate-pulse rounded bg-(--color-cream)" />
      <div className="h-3 w-full animate-pulse rounded bg-(--color-cream)" />
      <div className="h-3 w-5/6 animate-pulse rounded bg-(--color-cream)" />
    </div>
  );
}

function PlanCard({
  response,
  showReasoning,
  onToggleReasoning,
}: {
  response: Extract<GeneratePlanResponse, { ok: true }>;
  showReasoning: boolean;
  onToggleReasoning: () => void;
}) {
  const { plan } = response.result;
  const confidencePct = Math.round(plan.confidence * 100);
  return (
    <div className="animate-result-arrive rounded-2xl border border-(--color-brand)/15 bg-white p-4 text-sm leading-6">
      <p className="font-semibold text-foreground">{plan.headline}</p>
      <ul className="mt-2 space-y-1.5 text-(--color-muted)">
        {plan.steps.map((step, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-(--color-brand)" aria-hidden="true" />
            <span>{step}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs text-(--color-muted)/80">
          {confidencePct >= 80 ? "Confident" : `${confidencePct}% sure — confirm if it fits`}
        </span>
        <button
          type="button"
          onClick={onToggleReasoning}
          className="inline-flex items-center gap-1 text-xs font-semibold text-(--color-brand-strong) underline underline-offset-2"
        >
          <Info size={11} aria-hidden="true" />
          {showReasoning ? "Hide reasoning" : "Why this plan?"}
        </button>
      </div>
      {showReasoning && plan.reasoning && (
        <p className="mt-3 rounded-xl bg-(--color-bg-soft) px-3 py-2 text-xs italic leading-5 text-(--color-muted)">
          {plan.reasoning}
        </p>
      )}

      {plan.nudge && (
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-(--color-clay)/35 bg-(--color-clay)/10 px-3 py-2">
          <Zap size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-(--color-clay)" />
          <p className="text-xs leading-5 text-foreground">
            <span className="font-semibold">If the day folds:</span>{" "}
            <span className="text-(--color-muted)">{plan.nudge}</span>
          </p>
        </div>
      )}

      {/* Post-plan CTA — the highest-conversion moment */}
      <div className="mt-4 flex flex-col gap-2 rounded-xl bg-(--color-mint-soft) px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-foreground">
          <span className="font-semibold">Like this?</span>{" "}
          <span className="text-(--color-muted)">
            Get one every Monday from a real coach — and the AI adjusts mid-week when life happens.
          </span>
        </p>
        <a
          href="#apply"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-(--color-brand) px-4 py-1.5 text-xs font-semibold text-white"
        >
          Apply — 2 min
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 7h8M7 3l4 4-4 4" />
          </svg>
        </a>
      </div>

      {/* Soft email capture — converts non-buyers into leads */}
      <EmailCaptureRow />

      {/* Pause-the-week — the brand-defining "no guilt" feature */}
      <PauseLink />
    </div>
  );
}

function ModeTabs({
  mode,
  hasLastPlan,
  onSwitch,
}: {
  mode: Mode;
  hasLastPlan: boolean;
  onSwitch: (m: Mode) => void;
}) {
  const tabs: { id: Mode; label: string; Icon: typeof MessageCircle }[] = [
    { id: "plan",    label: "Plan my window",    Icon: MessageCircle },
    { id: "workout", label: "Generate workout",  Icon: Dumbbell      },
  ];
  if (hasLastPlan) tabs.push({ id: "adapt", label: "Adapt last", Icon: RefreshCw });

  const activeIndex = tabs.findIndex((t) => t.id === mode);
  const widthPct = 100 / tabs.length;

  return (
    <div
      role="tablist"
      aria-label="AI mode"
      className="relative mt-3 inline-flex rounded-full border border-(--color-border) bg-(--color-bg-soft) p-0.5 text-xs font-semibold"
    >
      {/* Sliding indicator pill — animates between tabs */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0.5 rounded-full bg-white shadow-sm transition-[left,width] duration-300 ease-out"
        style={{ width: `calc(${widthPct}% - 4px)`, left: `calc(${activeIndex * widthPct}% + 2px)` }}
      />
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={mode === id}
          onClick={() => onSwitch(id)}
          className={`relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors duration-200 ${
            mode === id ? "text-foreground" : "text-(--color-muted) hover:text-foreground"
          }`}
        >
          <Icon size={12} aria-hidden="true" /> {label}
        </button>
      ))}
    </div>
  );
}

function PauseLink() {
  const [until, setUntil] = useState<Date | null>(null);

  useEffect(() => {
    const stored = readPausedUntil();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- post-mount hydration from localStorage
      setUntil(stored);
    }
  }, []);

  if (until) {
    return (
      <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-(--color-muted)">
        <Pause size={11} aria-hidden="true" /> Paused until {formatPauseEnd(until)}.{" "}
        <button
          type="button"
          onClick={() => {
            clearPaused();
            setUntil(null);
          }}
          className="underline underline-offset-2 hover:text-foreground"
        >
          Resume
        </button>
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setUntil(setPaused(7))}
      className="mt-3 inline-flex items-center gap-1.5 text-xs text-(--color-muted) underline underline-offset-2 hover:text-foreground"
    >
      <Pause size={11} aria-hidden="true" /> Need a real break? Pause for 7 days — no guilt.
    </button>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function EmailCaptureRow() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const submit = () => {
    if (!email.trim()) return;
    setError(null);
    startTransition(async () => {
      const res = await savePlanEmailAction({ email: email.trim() });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setError(res.error);
      }
    });
  };

  // Lead recovery: if the visitor types a valid-looking email but bounces
  // before clicking Send, fire-and-forget the save on pagehide so the
  // lead isn't lost. Safe to run multiple times — server logs by IP+email.
  useEffect(() => {
    const handler = () => {
      const trimmed = email.trim();
      if (status === "sent" || isPending || !EMAIL_RE.test(trimmed)) return;
      void savePlanEmailAction({ email: trimmed });
    };
    window.addEventListener("pagehide", handler);
    return () => window.removeEventListener("pagehide", handler);
  }, [email, status, isPending]);

  if (status === "sent") {
    return (
      <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-(--color-muted)">
        <Check size={12} className="text-(--color-brand)" aria-hidden="true" />
        On its way to <span className="font-semibold text-foreground">{email}</span>.
      </p>
    );
  }

  return (
    <div className="mt-4">
      <label htmlFor="plan-email" className="flex items-center gap-1.5 text-xs text-(--color-muted)">
        <Mail size={11} aria-hidden="true" />
        Or email me this plan to do later:
      </label>
      <div className="mt-1.5 flex gap-2">
        <input
          id="plan-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="you@example.com"
          className="flex-1 rounded-xl border border-(--color-border) bg-white px-3 py-2 text-xs text-foreground placeholder:text-(--color-muted)/50 focus:border-(--color-brand) focus:outline-none focus:ring-2 focus:ring-(--color-brand)/15"
        />
        <button
          type="button"
          onClick={submit}
          disabled={isPending || !email.trim()}
          className="inline-flex shrink-0 items-center rounded-xl border border-(--color-border) bg-white px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-(--color-brand)/40 disabled:opacity-50"
        >
          {isPending ? "Sending…" : "Send"}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
