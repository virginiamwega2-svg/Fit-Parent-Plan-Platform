"use client";

import { useEffect, useState, useTransition } from "react";
import { Send, Info, Check, ChefHat, Copy } from "lucide-react";
import {
  generatePantryAction,
  type GeneratePantryResponse,
} from "@/app/actions/ai";
import { logSession } from "@/lib/anon-user";

const EXAMPLES = [
  "pasta, garlic, parmesan, olive oil, frozen spinach",
  "eggs, onion, peppers, cheese, tortillas",
  "rice, canned beans, salsa, lime",
];

export function PantryAgent() {
  const [pantry, setPantry] = useState(EXAMPLES[0]);
  const [minutes, setMinutes] = useState(20);
  const [pickyEater, setPickyEater] = useState(false);
  const [response, setResponse] = useState<GeneratePantryResponse | null>(null);
  const [showReasoning, setShowReasoning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [thinkingIdx, setThinkingIdx] = useState(0);
  useEffect(() => {
    if (!isPending) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset rotating index when a new request starts
    setThinkingIdx(0);
    const id = setInterval(() => setThinkingIdx((i) => i + 1), 900);
    return () => clearInterval(id);
  }, [isPending]);
  const thinkingLabels = [
    "Looking at what you have…",
    "Honoring your time…",
    "Picking one realistic meal…",
  ];
  const thinkingLabel = thinkingLabels[Math.min(thinkingIdx, thinkingLabels.length - 1)];

  const submit = () => {
    if (pantry.trim().length < 2) return;
    setResponse(null);
    setShowReasoning(false);
    startTransition(async () => {
      const res = await generatePantryAction({
        pantry: pantry.trim(),
        minutesAvailable: minutes,
        pickyEater,
      });
      setResponse(res);
      if (res.ok) {
        logSession({
          planHeadline: res.result.meal.meal,
          planSource: res.result.source,
          mode: "pantry",
        });
      }
    });
  };

  const copyGapList = async () => {
    if (!response?.ok) return;
    const text = response.result.meal.gapList.join("\n");
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard blocked — silently skip
    }
  };

  return (
    <div
      id="section-pantry"
      className="rounded-3xl border border-(--color-brand)/20 bg-white p-6 shadow-(--shadow-card) sm:p-7"
    >
      <div className="flex items-center justify-between">
        <p className="eyebrow inline-flex items-center gap-1.5 text-(--color-brand)">
          <ChefHat size={13} aria-hidden="true" /> Pantry-to-Plate
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-mint-soft) px-2.5 py-0.5 text-xs font-medium text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-(--color-brand)" aria-hidden="true" />
          {response?.ok && response.result.source === "live" ? "Claude live" : "Practice mode"}
        </span>
      </div>

      <p className="mt-2 text-sm leading-6 text-(--color-muted)">
        Type what&apos;s in your fridge. Get tonight&apos;s dinner in the time you actually have.
      </p>

      <div className="mt-4">
        <label className="block text-xs font-semibold text-(--color-muted)" htmlFor="pantry-items">
          What&apos;s on hand?
        </label>
        <textarea
          id="pantry-items"
          value={pantry}
          onChange={(e) => setPantry(e.target.value)}
          rows={3}
          maxLength={600}
          placeholder="e.g. pasta, eggs, spinach, parmesan…"
          className="mt-2 w-full resize-none rounded-2xl border border-(--color-border) bg-(--color-bg-soft) px-4 py-3 text-sm text-foreground placeholder:text-(--color-muted)/60 focus:border-(--color-brand) focus:outline-none focus:ring-2 focus:ring-(--color-brand)/15"
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setPantry(ex)}
              className="rounded-full border border-(--color-border) bg-white px-3 py-1 text-xs text-(--color-muted) hover:border-(--color-brand)/40 hover:text-foreground"
            >
              {ex.split(",").slice(0, 2).join(",")}…
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
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
        <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-(--color-muted)">
          <input
            type="checkbox"
            checked={pickyEater}
            onChange={(e) => setPickyEater(e.target.checked)}
            className="h-4 w-4 accent-(--color-brand)"
          />
          <span className="font-semibold">Picky eater mode</span>
        </label>
        <button
          type="button"
          onClick={submit}
          disabled={isPending || pantry.trim().length < 2}
          className="inline-flex items-center gap-1.5 rounded-full bg-(--color-brand) px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
        >
          {isPending ? thinkingLabel : (<>Plan dinner <Send size={13} aria-hidden="true" /></>)}
        </button>
      </div>

      <div className="mt-5">
        {isPending && <MealSkeleton label={thinkingLabel} />}
        {response && !isPending && (
          response.ok ? (
            <MealCard
              response={response}
              showReasoning={showReasoning}
              onToggleReasoning={() => setShowReasoning((v) => !v)}
              onCopyGapList={copyGapList}
              copied={copied}
            />
          ) : (
            <div className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) px-4 py-3 text-sm">
              <p className="font-medium text-foreground">That didn&apos;t go through.</p>
              <p className="mt-1 text-(--color-muted)">{response.error}</p>
              <button
                type="button"
                onClick={submit}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-(--color-brand-strong) underline underline-offset-2"
              >
                Try again
              </button>
            </div>
          )
        )}
      </div>

    </div>
  );
}

function MealSkeleton({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-(--color-brand)/15 bg-white p-4"
    >
      <div className="flex items-center gap-2.5">
        <span className="relative inline-flex h-2 w-2 shrink-0">
          <span className="absolute inset-0 animate-ping rounded-full bg-(--color-brand) opacity-70" aria-hidden="true" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-brand)" />
        </span>
        <span className="text-sm font-medium text-foreground/80">{label}</span>
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-3 w-2/3 animate-pulse rounded bg-(--color-cream)" />
        <div className="h-3 w-full animate-pulse rounded bg-(--color-cream)" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-(--color-cream)" />
      </div>
    </div>
  );
}

function MealCard({
  response,
  showReasoning,
  onToggleReasoning,
  onCopyGapList,
  copied,
}: {
  response: Extract<GeneratePantryResponse, { ok: true }>;
  showReasoning: boolean;
  onToggleReasoning: () => void;
  onCopyGapList: () => void;
  copied: boolean;
}) {
  const { meal } = response.result;
  const confidencePct = Math.round(meal.confidence * 100);
  return (
    <div className="animate-result-arrive rounded-2xl border border-(--color-brand)/15 bg-white p-4 text-sm leading-6">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold text-foreground">{meal.meal}</p>
        <span className="shrink-0 rounded-full bg-(--color-mint-soft) px-2 py-0.5 text-[10px] font-semibold text-foreground">
          ~{meal.timeMinutes} min
        </span>
      </div>

      <ol className="mt-2 space-y-1.5 text-(--color-muted)">
        {meal.steps.map((step, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--color-cream) text-[10px] font-bold text-foreground">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      {meal.gapList.length > 0 && (
        <div className="mt-3 rounded-xl border border-(--color-clay)/35 bg-(--color-clay)/10 px-3 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-foreground">Pick up next time:</p>
            <button
              type="button"
              onClick={onCopyGapList}
              className="inline-flex items-center gap-1 text-xs font-semibold text-(--color-brand-strong) underline underline-offset-2"
            >
              {copied ? (<><Check size={11} aria-hidden="true" /> Copied</>) : (<><Copy size={11} aria-hidden="true" /> Copy list</>)}
            </button>
          </div>
          <ul className="mt-1.5 space-y-0.5 text-xs text-(--color-muted)">
            {meal.gapList.map((item, i) => (
              <li key={i}>· {item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs text-(--color-muted)/80">
          {confidencePct >= 80 ? "Confident" : `${confidencePct}% sure — adjust if needed`}
        </span>
        <button
          type="button"
          onClick={onToggleReasoning}
          className="inline-flex items-center gap-1 text-xs font-semibold text-(--color-brand-strong) underline underline-offset-2"
        >
          <Info size={11} aria-hidden="true" />
          {showReasoning ? "Hide reasoning" : "Why this meal?"}
        </button>
      </div>
      {showReasoning && meal.reasoning && (
        <p className="mt-3 rounded-xl bg-(--color-bg-soft) px-3 py-2 text-xs italic leading-5 text-(--color-muted)">
          {meal.reasoning}
        </p>
      )}
    </div>
  );
}
