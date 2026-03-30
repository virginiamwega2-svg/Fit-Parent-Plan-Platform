"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

interface ParallaxHeroProps {
  children: React.ReactNode;
}

export function ParallaxHero({ children }: ParallaxHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null); // slowest (furthest back)
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null); // fastest (closest)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const tweens: gsap.core.Tween[] = [];

    const layers = [
      { ref: layer1Ref, speed: 0.12 },
      { ref: layer2Ref, speed: 0.22 },
      { ref: layer3Ref, speed: 0.38 },
      { ref: layer4Ref, speed: 0.55 },
    ];

    layers.forEach(({ ref, speed }) => {
      if (!ref.current) return;
      const t = gsap.to(ref.current, {
        y: () => section.offsetHeight * speed * -1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tweens.push(t);
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      {/* Layer 1 — deep background gradient blobs */}
      <div ref={layer1Ref} className="pointer-events-none absolute inset-0 will-change-transform" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-brand) 18%, transparent) 0%, transparent 70%)" }} />
        <div className="absolute -right-48 top-1/4 h-[500px] w-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 22%, transparent) 0%, transparent 70%)" }} />
      </div>

      {/* Layer 2 — mid blob */}
      <div ref={layer2Ref} className="pointer-events-none absolute inset-0 will-change-transform" aria-hidden="true">
        <div className="absolute bottom-1/3 left-1/4 h-72 w-72 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-brand) 30%, transparent) 0%, transparent 70%)" }} />
      </div>

      {/* Layer 3 — floating accent dots */}
      <div ref={layer3Ref} className="pointer-events-none absolute inset-0 will-change-transform" aria-hidden="true">
        <motion.div
          className="absolute right-[15%] top-[20%] h-3 w-3 rounded-full"
          style={{ background: "var(--color-brand)" }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[18%] top-[40%] h-2 w-2 rounded-full"
          style={{ background: "var(--color-secondary)" }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute right-[30%] bottom-[30%] h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--color-brand)" }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Layer 4 — foreground noise texture */}
      <div ref={layer4Ref} className="pointer-events-none absolute inset-0 will-change-transform" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px 180px",
          }}
        />
      </div>

      {/* Content (children) sits above all parallax layers */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
