"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-6 space-y-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.question}
            className="rounded-2xl border border-(--color-border) bg-white px-4 py-3 transition-[border-color,box-shadow] duration-200 hover:border-(--color-brand)/30 hover:shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-3 text-left font-semibold text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
            >
              <span>{item.question}</span>
              <svg
                className={`shrink-0 text-(--color-muted) transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
            <div
              id={`faq-answer-${i}`}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="mt-2 pb-1 text-sm leading-7 text-(--color-muted)">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
