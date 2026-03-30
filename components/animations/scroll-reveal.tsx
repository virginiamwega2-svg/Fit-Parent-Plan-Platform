"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealVariant = "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  scrub?: boolean;
  className?: string;
  once?: boolean;
}

const INITIAL_STATES: Record<RevealVariant, gsap.TweenVars> = {
  "fade-up":    { opacity: 0, y: 48 },
  "fade-in":    { opacity: 0 },
  "scale-in":   { opacity: 0, scale: 0.88 },
  "slide-left": { opacity: 0, x: -60 },
  "slide-right":{ opacity: 0, x: 60 },
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.9,
  scrub = false,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const el = ref.current;
    const initial = INITIAL_STATES[variant];

    gsap.set(el, initial);

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: scrub ? 1 : duration,
      delay: scrub ? 0 : delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        end: "top 40%",
        scrub: scrub ? 1 : false,
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: "all" });
    };
  }, [variant, delay, duration, scrub, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
