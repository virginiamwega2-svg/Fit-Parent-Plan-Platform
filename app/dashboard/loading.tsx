export default function LoadingDashboard() {
  return (
    <div className="grid gap-4 py-8 sm:grid-cols-2" aria-live="polite" aria-busy="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="surface-card h-56 animate-pulse" />
      ))}
    </div>
  );
}
