"use client";

import { useEffect, useMemo, useState } from "react";
import { adaptiveRules, starterSlots, type PlannerInput, type TimeSlot } from "@/lib/data/planner";
import { trackEvent } from "@/lib/analytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type GeneratedDay = {
  day: string;
  focus: "strength" | "fat loss" | "mobility";
  duration: number;
};

type PlannerDraft = {
  name: string;
  sleepWindow: PlannerInput["sleepWindow"];
  kidAgeGroup: PlannerInput["kidAgeGroup"];
  equipment: PlannerInput["equipment"];
  stressLevel: PlannerInput["stressLevel"];
  slots: TimeSlot[];
  completionRate: number;
  step: 1 | 2 | 3;
};

const LOCAL_KEY = "fit15_planner_draft";

const draftDefaults: PlannerDraft = {
  name: "",
  sleepWindow: "6-7",
  kidAgeGroup: "3-7",
  equipment: "mixed",
  stressLevel: "moderate",
  slots: starterSlots,
  completionRate: 72,
  step: 1,
};

const stepMeta = [
  { id: 1, title: "Profile", hint: "Define baseline context" },
  { id: 2, title: "Schedule", hint: "Map real time windows" },
  { id: 3, title: "Adaptive Plan", hint: "Review weekly rhythm" },
] as const;

function pickFocus(slot: TimeSlot, stress: PlannerInput["stressLevel"]): GeneratedDay["focus"] {
  if (slot.energy === "low" || stress === "high") return "mobility";
  if (slot.minutes >= 18) return "strength";
  return "fat loss";
}

function nextStepLabel(step: 1 | 2 | 3) {
  if (step === 1) return "Next: Schedule";
  if (step === 2) return "Next: Adaptive Plan";
  return "Finish";
}

export function TimeWindowPlanner() {
  const [draft, setDraft] = useState<PlannerDraft>(draftDefaults);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [validationError, setValidationError] = useState("");

  const generatedPlan = useMemo(() => {
    return draft.slots.map((slot): GeneratedDay => {
      const focus = pickFocus(slot, draft.stressLevel);
      const adjustedDuration =
        draft.sleepWindow === "under-6" ? Math.max(10, slot.minutes - 5) : slot.minutes;
      return { day: slot.day, focus, duration: adjustedDuration };
    });
  }, [draft.slots, draft.sleepWindow, draft.stressLevel]);

  const adaptiveSuggestion = useMemo(() => {
    if (draft.completionRate < 60) return adaptiveRules[0].suggestion;
    if (draft.sleepWindow === "under-6" || draft.stressLevel === "high") return adaptiveRules[1].suggestion;
    return adaptiveRules[2].suggestion;
  }, [draft.completionRate, draft.sleepWindow, draft.stressLevel]);

  const weeklyMinutes = useMemo(
    () => draft.slots.reduce((total, slot) => total + slot.minutes, 0),
    [draft.slots],
  );
  const rhythmScore = useMemo(() => {
    const adherence = Math.max(0, Math.min(100, draft.completionRate));
    const timeLoadScore = Math.max(0, Math.min(100, Math.round((weeklyMinutes / 120) * 100)));
    const stressAdjustment = draft.stressLevel === "high" ? -8 : draft.stressLevel === "low" ? 6 : 0;
    return Math.max(0, Math.min(100, Math.round(adherence * 0.55 + timeLoadScore * 0.45 + stressAdjustment)));
  }, [draft.completionRate, weeklyMinutes, draft.stressLevel]);
  const rhythmStatus =
    rhythmScore >= 80 ? "Strong rhythm" : rhythmScore >= 60 ? "Stable rhythm" : "Rhythm at risk";
  const nextBestTarget = weeklyMinutes < 75 ? "Add 1 short session this week" : "Hold plan and improve consistency";

  useEffect(() => {
    const localRaw = window.localStorage.getItem(LOCAL_KEY);
    if (localRaw) {
      try {
        const localDraft = JSON.parse(localRaw) as PlannerDraft;
        setDraft((prev) => ({ ...prev, ...localDraft }));
      } catch {
        // no-op
      }
    }

    const fetchState = async () => {
      try {
        const response = await fetch("/api/user/state", { cache: "no-store" });
        if (!response.ok) {
          setIsLoading(false);
          return;
        }
        const data = (await response.json()) as { state?: { plannerDraft?: PlannerDraft } };
        if (data.state?.plannerDraft) {
          setDraft((prev) => ({ ...prev, ...data.state!.plannerDraft }));
        }
      } catch {
        setLoadError("Unable to sync cloud draft. Local draft is still available.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchState();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(draft));
  }, [draft, isLoading]);

  function updateDraft(patch: Partial<PlannerDraft>) {
    setDraft((prev) => ({ ...prev, ...patch }));
  }

  function updateSlot(index: number, patch: Partial<TimeSlot>) {
    updateDraft({
      slots: draft.slots.map((slot, i) =>
        i === index
          ? {
              ...slot,
              ...patch,
              minutes:
                patch.minutes !== undefined
                  ? Math.max(10, Math.min(30, patch.minutes))
                  : slot.minutes,
            }
          : slot,
      ),
    });
  }

  function validateCurrentStep() {
    if (draft.step === 1) {
      if (!draft.name.trim()) {
        return "Please enter your name to personalize the plan.";
      }
      if (draft.completionRate < 0 || draft.completionRate > 100 || Number.isNaN(draft.completionRate)) {
        return "Completion rate should be between 0 and 100.";
      }
    }
    if (draft.step === 2) {
      if (draft.slots.some((slot) => slot.minutes < 10 || slot.minutes > 30)) {
        return "Each time window must be between 10 and 30 minutes.";
      }
    }
    return "";
  }

  async function persistDraft(source: "manual_save" | "step_change" | "resume_later") {
    setSaveStatus("saving");
    try {
      const response = await fetch("/api/user/state", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plannerDraft: draft }),
      });
      if (!response.ok) {
        setSaveStatus("error");
        return;
      }
      setSaveStatus("saved");
      trackEvent("planner_saved", { category: "planner", label: source });
      window.setTimeout(() => setSaveStatus("idle"), 1200);
    } catch {
      setSaveStatus("error");
    }
  }

  async function nextStep() {
    const nextValidationError = validateCurrentStep();
    setValidationError(nextValidationError);
    if (nextValidationError) {
      return;
    }

    if (draft.step === 3) {
      trackEvent("planner_completed", { category: "planner", value: draft.completionRate });
      return;
    }
    const next = (draft.step + 1) as 1 | 2 | 3;
    updateDraft({ step: next });
    await persistDraft("step_change");
  }

  function prevStep() {
    if (draft.step === 1) return;
    setValidationError("");
    updateDraft({ step: (draft.step - 1) as 1 | 2 | 3 });
  }

  if (isLoading) {
    return (
      <Card className="h-48 animate-pulse">
        <p className="text-sm text-(--color-muted)">Loading planner draft...</p>
      </Card>
    );
  }

  return (
    <section className="grid gap-6">
      {loadError ? (
        <Card className="border-amber-300 bg-amber-50">
          <p className="text-sm text-amber-800">{loadError}</p>
        </Card>
      ) : null}

      <Card className="brand-grid-bg hover-lift">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-2xl font-semibold text-foreground">Personalized Time-Window Planner</h2>
          <Badge>
            Step {draft.step}/3
          </Badge>
        </div>
        <div className="mt-3 h-2 rounded-full bg-(--color-bg-soft)/70">
          <div className="h-2 rounded-full bg-(--color-brand)" style={{ width: `${(draft.step / 3) * 100}%` }} />
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {stepMeta.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border p-3 ${
                draft.step === item.id
                  ? "border-(--color-brand) bg-(--color-bg-soft)"
                  : "border-(--color-border) bg-(--color-bg-soft)/70"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--color-brand-strong)">
                Step {item.id}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-xs text-(--color-muted)">{item.hint}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-(--color-muted)">
          Step 1: Profile. Step 2: Schedule. Step 3: Adaptive plan and recommendations.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) p-3">
            <p className="text-xs uppercase tracking-[0.14em] text-(--color-muted)">Rhythm score</p>
            <p className="mt-1 text-xl font-semibold text-foreground">{rhythmScore}/100</p>
            <p className="text-xs text-(--color-brand-strong)">{rhythmStatus}</p>
          </div>
          <div className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) p-3">
            <p className="text-xs uppercase tracking-[0.14em] text-(--color-muted)">Weekly minutes</p>
            <p className="mt-1 text-xl font-semibold text-foreground">{weeklyMinutes}</p>
            <p className="text-xs text-(--color-muted)">Target range: 75-140</p>
          </div>
          <div className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) p-3">
            <p className="text-xs uppercase tracking-[0.14em] text-(--color-muted)">Next best action</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{nextBestTarget}</p>
          </div>
        </div>

        {draft.step === 1 ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Input
              id="planner-name"
              label="Your name"
              placeholder="Jordan"
              value={draft.name}
              onChange={(event) => updateDraft({ name: event.target.value })}
            />
            <label className="grid gap-2 text-sm font-medium text-foreground" htmlFor="planner-completion">
              Last-week completion rate (%)
              <input
                id="planner-completion"
                type="number"
                min={0}
                max={100}
                value={draft.completionRate}
                onChange={(event) => updateDraft({ completionRate: Number(event.target.value) })}
                className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-foreground" htmlFor="planner-sleep">
              Typical sleep
              <select
                id="planner-sleep"
                className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) px-3 py-2 text-sm"
                value={draft.sleepWindow}
                onChange={(event) => updateDraft({ sleepWindow: event.target.value as PlannerInput["sleepWindow"] })}
              >
                <option value="under-6">Under 6 hours</option>
                <option value="6-7">6-7 hours</option>
                <option value="7-plus">7+ hours</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-foreground" htmlFor="planner-kids">
              Kid age range
              <select
                id="planner-kids"
                className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) px-3 py-2 text-sm"
                value={draft.kidAgeGroup}
                onChange={(event) => updateDraft({ kidAgeGroup: event.target.value as PlannerInput["kidAgeGroup"] })}
              >
                <option value="0-2">0-2</option>
                <option value="3-7">3-7</option>
                <option value="8-12">8-12</option>
                <option value="13-plus">13+</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-foreground" htmlFor="planner-equipment">
              Equipment access
              <select
                id="planner-equipment"
                className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) px-3 py-2 text-sm"
                value={draft.equipment}
                onChange={(event) => updateDraft({ equipment: event.target.value as PlannerInput["equipment"] })}
              >
                <option value="none">None</option>
                <option value="dumbbells">Dumbbells</option>
                <option value="bands">Bands</option>
                <option value="mixed">Mixed</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-foreground" htmlFor="planner-stress">
              Current stress level
              <select
                id="planner-stress"
                className="rounded-xl border border-(--color-border) bg-(--color-bg-soft) px-3 py-2 text-sm"
                value={draft.stressLevel}
                onChange={(event) => updateDraft({ stressLevel: event.target.value as PlannerInput["stressLevel"] })}
              >
                <option value="high">High</option>
                <option value="moderate">Moderate</option>
                <option value="low">Low</option>
              </select>
            </label>
          </div>
        ) : null}

        {draft.step === 2 ? (
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="md:col-span-3 surface-soft bg-(--color-cream)/50">
              <p className="text-sm text-foreground">
                Plan your lowest-friction windows first. If a day is usually chaotic, keep it at 10-12 minutes with
                low energy.
              </p>
            </div>
            {draft.slots.map((slot, index) => (
              <div key={slot.day} className="surface-soft">
                <p className="font-semibold text-foreground">{slot.day}</p>
                <label className="mt-2 grid gap-1 text-xs uppercase tracking-[0.14em] text-(--color-muted)">
                  Minutes
                  <input
                    type="number"
                    min={10}
                    max={30}
                    value={slot.minutes}
                    onChange={(event) => updateSlot(index, { minutes: Number(event.target.value) })}
                    className="rounded-lg border border-(--color-border) px-2 py-1 text-sm text-foreground"
                  />
                </label>
                <label className="mt-2 grid gap-1 text-xs uppercase tracking-[0.14em] text-(--color-muted)">
                  Energy
                  <select
                    value={slot.energy}
                    onChange={(event) => updateSlot(index, { energy: event.target.value as TimeSlot["energy"] })}
                    className="rounded-lg border border-(--color-border) px-2 py-1 text-sm text-foreground"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
              </div>
            ))}
            <div className="md:col-span-3">
              <div className="flex flex-wrap items-center justify-between gap-2 surface-soft border-dashed">
                <p className="text-sm text-(--color-muted)">
                  Weekly total: <span className="font-semibold text-foreground">{weeklyMinutes} minutes</span>
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => updateDraft({ slots: starterSlots })}
                >
                  Reset starter windows
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {draft.step === 3 ? (
          <div className="mt-5 grid gap-4">
            <div className="surface-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-(--color-brand-strong)">
                Adaptive recommendation
              </p>
              <p className="mt-2 text-sm text-(--color-muted)">{adaptiveSuggestion}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {[1, 2].map((week) => (
                <div key={week} className="surface-soft">
                  <p className="text-sm font-semibold text-foreground">Week {week}</p>
                  <ul className="mt-2 grid gap-2 text-sm text-(--color-muted)">
                    {generatedPlan.map((entry) => (
                      <li key={`${week}-${entry.day}`}>
                        <span className="font-semibold text-foreground">{entry.day}:</span>{" "}
                        {entry.duration} min {entry.focus}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="surface-soft">
              <p className="text-sm font-semibold text-foreground">Plan-ready summary</p>
              <p className="mt-2 text-sm text-(--color-muted)">
                You have {weeklyMinutes} planned minutes across {draft.slots.length} sessions. Keep this cadence for two
                weeks, then reassess completion trend.
              </p>
              <div className="mt-3 rounded-xl border border-(--color-border) bg-(--color-sky-soft)/45 p-3">
                <p className="text-xs uppercase tracking-[0.14em] text-(--color-muted)">Why this plan works</p>
                <p className="mt-1 text-sm text-foreground">
                  Focus is matched to your energy windows and stress level, so adherence stays high even on busy days.
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button href="/dashboard" className="w-full sm:w-auto">
                  Go to Dashboard
                </Button>
                <Button href="/workouts" variant="secondary" className="w-full sm:w-auto">
                  Open workouts
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {validationError ? <p className="mt-3 text-sm text-red-600">{validationError}</p> : null}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button
            type="button"
            variant="secondary"
            onClick={prevStep}
            disabled={draft.step === 1}
            className="w-full sm:w-auto"
          >
            Back
          </Button>
          <Button type="button" onClick={nextStep} className="w-full sm:w-auto">
            {nextStepLabel(draft.step)}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => void persistDraft("manual_save")}
            className="w-full sm:w-auto"
          >
            Save plan
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => void persistDraft("resume_later")}
            className="w-full sm:w-auto"
          >
            Resume later
          </Button>
        </div>
        <p aria-live="polite" className="mt-2 min-h-4 text-xs text-(--color-muted)">
          {saveStatus === "saved" ? "Saved." : null}
          {saveStatus === "saving" ? "Saving..." : null}
          {saveStatus === "error" ? "Could not save online. Local draft still updated." : null}
        </p>
      </Card>
    </section>
  );
}
