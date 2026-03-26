"use client";

import { useEffect, useState } from "react";

export default function MobileScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const total = root.scrollHeight - root.clientHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }

      const value = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
      setProgress(value);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-30 h-1 bg-(--color-border)/70 md:hidden">
      <div
        className="h-full bg-(--color-brand) transition-[width] duration-200"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </div>
  );
}

