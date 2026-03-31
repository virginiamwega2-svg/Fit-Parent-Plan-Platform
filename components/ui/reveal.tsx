"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
};

export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Immediately reveal when reduced motion is preferred (covers CI + accessibility)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const safeDelay = Math.max(0, Math.min(delayMs, 360));

  return (
    <div
      ref={ref}
      className={cn("reveal-block", visible && "is-visible", className)}
      style={{ transitionDelay: `${safeDelay}ms` }}
    >
      {children}
    </div>
  );
}
