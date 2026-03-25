export default function LoadingWorkouts() {
  return (
    <div className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite" aria-busy="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="surface-card h-44 animate-pulse"
        />
      ))}
    </div>
  );
}
