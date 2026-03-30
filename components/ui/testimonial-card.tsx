import type { Testimonial } from "@/lib/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

export function TestimonialCard({ testimonial, className = "" }: TestimonialCardProps) {
  return (
    <div className={`rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-5 ${className}`}>
      <p className="text-sm leading-6 text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-xs text-(--color-muted)">{testimonial.role}</p>
        </div>
        <span className="rounded-full bg-(--color-cream) px-2.5 py-0.5 text-xs font-medium text-foreground">
          {testimonial.result}
        </span>
      </div>
    </div>
  );
}
