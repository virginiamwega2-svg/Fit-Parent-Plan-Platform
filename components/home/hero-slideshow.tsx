"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/images/hero-1", alt: "A parent stretches in the living room while their child plays nearby" },
  { src: "/images/hero-2", alt: "A family on the couch — one parent feeding a baby, the other on a phone" },
  { src: "/images/hero-3", alt: "A parent and two children at the kitchen table together" },
] as const;

const HERO_BLUR =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAED/8QAHhAAAgEFAQEBAAAAAAAAAAAAAQIDAAQREiExQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwBFtfQqvh4cHbmK2jukkvraQqUXYjJ86poMNpAQ2Y/z6ajQoqrrsMyjOGPakK//2Q==";

const ROTATE_MS = 6000;

export function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={`${slide.src}.webp`}
          alt={slide.alt}
          fill
          sizes="100vw"
          quality={85}
          // Only the first frame gets priority + blur — the others lazy-load
          // after first paint and crossfade in once decoded.
          priority={i === 0}
          placeholder={i === 0 ? "blur" : "empty"}
          blurDataURL={i === 0 ? HERO_BLUR : undefined}
          className={`object-cover object-[center_40%] transition-opacity duration-1000 ease-in-out sm:object-center ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
