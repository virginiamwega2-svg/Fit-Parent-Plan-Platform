"use client";

import { useState, useTransition } from "react";
import { Mic, MicOff, Send, Sparkles, Info } from "lucide-react";
import { generatePlanAction, type GeneratePlanResponse } from "@/app/actions/ai";
import { useVoiceInput } from "@/hooks/use-voice-input";

const EXAMPLES = [
  "Slept badly, kids up early. 18 minutes before school run.",
  "Feeling decent, no equipment, 25 min before work calls.",
  "Back is tight after carrying the toddler all day. 15 min, gentle please.",
];

export function AiCheckIn() {
  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState<number>(20);
  const [response, setResponse] = useState<GeneratePlanResponse | null>(null);
  const [showReasoning, setShowReasoning] = useState(false);
  const [isPending, startTransition] = useTransition();

  const voice = useVoiceInput(setText);

  const submit = () => {
    if (text.trim().length < 4) return;
    setResponse(null);
    setShowReasoning(false);
    startTransition(async () => {
      const result = await generatePlanAction({ text: text.trim(), minutesAvailable: minutes });
      setResponse(result);
    });
  };

  return (
    <div
      id="section-ai-try"
      className="rounded-3xl border border-(--color-brand)/20 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.18)] sm:p-7"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
          Live preview
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-mint-soft) px-2.5 py-0.5 text-xs font-medium text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-(--color-brand)" aria-hidden="true" />
          {response?.ok && response.result.source === "live" ? "Claude live" : "Demo mode"}
        </span>
      </div>

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
            <button
              type="button"
              onClick={voice.listening ? voice.stop : voice.start}
              aria-label={voice.listening ? "Stop recording" : "Start voice input"}
              className={`absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                voice.listening
                  ? "border-(--color-brand) bg-(--color-brand) text-white"
                  : "border-(--color-border) bg-white text-(--color-muted) hover:text-foreground"
              }`}
            >
              {voice.listening ? <MicOff size={15} /> : <Mic size={15} />}
            </button>
          )}
        </div>
        {voice.error && <p className="mt-1.5 text-xs text-red-600">{voice.error}</p>}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {EXAMPLES.map((ex) => (
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

      <div className="mt-4 flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-xs text-(--color-muted)">
          <span className="font-semibold">Minutes</span>
          <input
            type="number"
            min={5}
            max={120}
            value={minutes}
            onChange={(e) => setMinutes(Math.max(5, Math.min(120, Number(e.target.value) || 20)))}
            className="w-16 rounded-lg border border-(--color-border) bg-white px-2 py-1 text-sm text-foreground focus:border-(--color-brand) focus:outline-none"
          />
        </label>
        <button
          type="button"
          onClick={submit}
          disabled={isPending || text.trim().length < 4}
          className="inline-flex items-center gap-1.5 rounded-full bg-(--color-brand) px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
        >
          {isPending ? "Thinking…" : (<>Get my plan <Send size={13} aria-hidden="true" /></>)}
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
    <div className="rounded-2xl border border-(--color-brand)/15 bg-white p-4 text-sm leading-6">
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
    </div>
  );
}
