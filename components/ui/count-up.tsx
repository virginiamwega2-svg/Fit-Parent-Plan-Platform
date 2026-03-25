"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  target: number;
  suffix?: string;
  durationMs?: number;
};

export function CountUp({ target, suffix = "", durationMs = 900 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const fps = 60;
        const totalFrames = Math.round((durationMs / 1000) * fps);
        let frame = 0;

        const timer = window.setInterval(() => {
          frame++;
          const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
          setCount(Math.min(Math.round(target * progress), target));
          if (frame >= totalFrames) window.clearInterval(timer);
        }, 1000 / fps);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, durationMs]);

  return <span ref={ref}>{count}{suffix}</span>;
}
