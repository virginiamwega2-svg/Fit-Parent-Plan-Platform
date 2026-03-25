export function PageLoadingSkeleton() {
  return (
    <div className="grid gap-4 py-8" aria-live="polite" aria-busy="true">
      <div className="surface-soft h-16 animate-pulse" />
      <div className="surface-card h-40 animate-pulse" />
      <div className="surface-card h-52 animate-pulse" />
    </div>
  );
}
