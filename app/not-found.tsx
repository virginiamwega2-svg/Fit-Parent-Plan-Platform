import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="py-16">
      <Card className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-strong)]">
          404
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">Page not found</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          The page you requested does not exist or has moved.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/">Go home</Button>
          <Button href="/workouts" variant="secondary">
            Browse workouts
          </Button>
        </div>
        <p className="mt-4 text-xs text-[var(--color-muted)]">
          Need help? <Link href="/contact" className="underline">Contact support</Link>
        </p>
      </Card>
    </div>
  );
}
