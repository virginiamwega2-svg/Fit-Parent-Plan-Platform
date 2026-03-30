"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  mode?: "words" | "chars";
  stagger?: number;
  delay?: number;
}

export function TextReveal({
  text,
  as: Tag = "p",
  className,
  mode = "words",
  stagger = 0.06,
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const el = ref.current;
    const units = mode === "words"
      ? el.querySelectorAll<HTMLElement>(".reveal-word")
      : el.querySelectorAll<HTMLElement>(".reveal-char");

    gsap.set(units, { opacity: 0, y: 24, rotateX: -12 });

    const tween = gsap.to(units, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.7,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, mode, stagger, delay]);

  const tokens = mode === "words"
    ? text.split(" ").map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <span className="reveal-word" style={{ display: "inline-block" }}>
            {w}
          </span>
          {i < text.split(" ").length - 1 ? "\u00a0" : ""}
        </span>
      ))
    : text.split("").map((c, i) => (
        <span key={i} className="reveal-char" style={{ display: "inline-block" }}>
          {c === " " ? "\u00a0" : c}
        </span>
      ));

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={ref} className={className} aria-label={text}>
      {tokens}
    </Tag>
  );
}
