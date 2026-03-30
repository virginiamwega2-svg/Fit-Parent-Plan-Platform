"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const QUESTIONS = [
  {
    id: "days",
    text: "How many days a week can you realistically commit to?",
    options: ["1–2 days", "3 days", "4–5 days"],
  },
  {
    id: "goal",
    text: "What matters most right now?",
    options: ["Lose fat", "Build strength", "More energy"],
  },
  {
    id: "block",
    text: "What's stopped you before?",
    options: ["Not enough time", "Starting over after a bad week", "No plan that fit my life"],
  },
] as const;

type Answers = Partial<Record<(typeof QUESTIONS)[number]["id"], string>>;

function buildResult(answers: Answers): string {
  const parts: string[] = [];

  if (answers.days === "1–2 days") {
    parts.push("We can work with 2 days — the plan is built to flex around real schedules.");
  } else {
    parts.push("3 sessions a week is exactly the sweet spot this is designed for.");
  }

  if (answers.goal === "Lose fat") {
    parts.push("Fat loss through short sessions is what most parents here came for.");
  } else if (answers.goal === "Build strength") {
    parts.push("Strength is the foundation — the other stuff tends to follow.");
  } else {
    parts.push("Energy usually comes back in the first two weeks. It's the thing people notice first.");
  }

  if (answers.block === "Not enough time") {
    parts.push("The sessions are 20 minutes by design, not as a marketing claim.");
  } else if (answers.block === "Starting over after a bad week") {
    parts.push("That restart cycle is exactly what the weekly adjustment system is built to break.");
  } else {
    parts.push("We write the plan around your actual week — not an ideal one.");
  }

  return parts.join(" ");
}

export function FitQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  function choose(value: string) {
    const q = QUESTIONS[step];
    const updated = { ...answers, [q.id]: value };
    setAnswers(updated);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="animate-rise rounded-2xl border border-(--color-brand)/25 bg-(--color-brand)/5 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--color-brand) text-white" aria-hidden="true"><Check size={14} strokeWidth={2.5} /></span>
          <div>
            <p className="font-semibold text-foreground">Sounds like a strong fit.</p>
            <p className="mt-1 text-sm leading-6 text-(--color-muted)">{buildResult(answers)}</p>
          </div>
        </div>
        <div className="mt-4 border-t border-(--color-brand)/15 pt-4">
          <p className="text-sm text-(--color-muted)">
            Fill in the form below and Maya will reply with a personalised note — usually within a few hours.
          </p>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div key={step} className="animate-rise">
      {/* Progress dots */}
      <div className="mb-3 flex items-center gap-1.5" aria-label={`Question ${step + 1} of ${QUESTIONS.length}`}>
        {QUESTIONS.map((_, i) => (
          <span
            key={i}
            className={`block h-1.5 rounded-full transition-all duration-300 ${
              i < step
                ? "w-4 bg-(--color-brand)"
                : i === step
                  ? "w-6 bg-(--color-brand)"
                  : "w-4 bg-(--color-border)"
            }`}
            aria-hidden="true"
          />
        ))}
        <span className="ml-1 text-xs text-(--color-muted)">{step + 1}/{QUESTIONS.length}</span>
      </div>
      <p className="text-sm font-medium text-foreground">{q.text}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {q.options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => choose(opt)}
            className="rounded-full border border-(--color-border) bg-(--color-bg-soft) px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:border-(--color-brand) hover:text-(--color-brand) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
