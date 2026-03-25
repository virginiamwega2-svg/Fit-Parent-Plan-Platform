"use client";

import { useEffect, useState } from "react";

export function StickyApplyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-(--color-border) bg-(--color-bg-soft)/95 p-3 backdrop-blur transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <a
        href="#apply"
        tabIndex={visible ? 0 : -1}
        className="flex h-12 w-full items-center justify-center rounded-full bg-(--color-brand) text-sm font-semibold text-white transition hover:bg-(--color-brand-strong)"
      >
        Apply now →
      </a>
    </div>
  );
}
