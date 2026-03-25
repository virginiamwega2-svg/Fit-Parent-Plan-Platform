"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";

type Testimonial = {
  quote: string;
  name: string;
  result: string;
  photo?: string;
};

function TestimonialCard({
  quote,
  name,
  result,
  photo,
  className,
}: Testimonial & { className?: string }) {
  return (
    <blockquote
      className={`rounded-2xl border border-(--color-border) bg-white p-5 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.35)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-(--color-brand)/20 hover:shadow-[0_18px_35px_-22px_rgba(0,0,0,0.45)]${className ? ` ${className}` : ""}`}
    >
      <p className="text-sm text-amber-400" aria-label="5 out of 5 stars">
        ★★★★★
      </p>
      <p className="mt-2 leading-7 text-foreground/80">&ldquo;{quote}&rdquo;</p>
      <footer className="mt-4 flex items-center gap-3">
        {photo ? (
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-(--color-border)">
            <Image
              src={photo}
              alt={name}
              width={36}
              height={36}
              quality={75}
              loading="lazy"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-(--color-border) bg-(--color-mint-soft)">
            <span className="text-xs font-semibold text-(--color-brand-strong)">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs font-medium text-(--color-brand)">{result}</p>
        </div>
      </footer>
    </blockquote>
  );
}

export function TestimonialsSection({ items }: { items: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const max = scrollWidth - clientWidth;
      setActiveIndex(
        max > 0 ? Math.round((scrollLeft / max) * (items.length - 1)) : 0,
      );
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [items.length]);

  return (
    <>
      {/* Mobile carousel */}
      <div className="sm:hidden">
        <div
          ref={scrollRef}
          className="relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-white/80 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-white/80 to-transparent"
            aria-hidden="true"
          />
          {items.map((item) => (
            <TestimonialCard
              key={item.name}
              {...item}
              className="snap-center shrink-0 basis-[90%]"
            />
          ))}
        </div>
        {/* Dot indicators */}
        <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
          {items.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-4 bg-(--color-brand)"
                  : "w-1.5 bg-(--color-border)"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid with stagger */}
      <div className="mt-4 hidden gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.name} delayMs={i * 90}>
            <TestimonialCard {...item} className="h-full" />
          </Reveal>
        ))}
      </div>
    </>
  );
}
