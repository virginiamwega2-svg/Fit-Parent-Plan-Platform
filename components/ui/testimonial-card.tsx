import type { Testimonial } from "@/lib/types";
import { Card } from "@/components/ui/card";

type Props = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: Props) {
  return (
    <Card className="h-full">
      <p className="leading-7 text-(--color-muted)">&ldquo;{testimonial.quote}&rdquo;</p>
      <p className="mt-4 text-sm font-semibold text-foreground">{testimonial.name}</p>
      <p className="text-sm text-(--color-muted)">{testimonial.role}</p>
      <p className="mt-2 text-sm font-medium text-(--color-brand-strong)">{testimonial.result}</p>
    </Card>
  );
}
