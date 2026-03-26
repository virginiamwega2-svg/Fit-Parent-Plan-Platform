import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-mono text-7xl font-bold text-(--color-border)">404</p>
      <h1 className="mt-4 text-3xl tracking-tight">
        <span className="font-light italic text-(--color-muted)">That page took a </span>
        <span className="font-black text-foreground">rest day.</span>
      </h1>
      <p className="mt-3 max-w-sm text-sm text-(--color-muted)">
        Either the link is broken or it moved. Either way — nothing a quick redirect can&apos;t fix.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/workouts" variant="secondary">Browse workouts</Button>
      </div>
      <p className="mt-6 text-xs text-(--color-muted)">
        Something broken?{" "}
        <Link href="/contact" className="underline hover:text-foreground">
          Let us know.
        </Link>
      </p>
    </div>
  );
}
