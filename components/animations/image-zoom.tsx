"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  fromScale?: number;
  toScale?: number;
}

export function ImageZoom({
  src,
  alt,
  className,
  fromScale = 1.15,
  toScale = 1,
}: ImageZoomProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !imgRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.fromTo(
      imgRef.current,
      { scale: fromScale },
      {
        scale: toScale,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [fromScale, toScale]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={src} alt={alt} className="h-full w-full object-cover will-change-transform" />
    </div>
  );
}
