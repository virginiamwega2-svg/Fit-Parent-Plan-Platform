const ITEMS = [
  "3 workouts a week",
  "20 minutes",
  "no gym needed",
  "real family meals",
  "adjusts when life gets messy",
  "50+ parents",
  "reply within 24 hours",
  "built for busy schedules",
];

export function Marquee() {
  return (
    <div
      className="relative -mx-4 overflow-hidden border-y border-(--color-border) py-3.5 sm:-mx-6"
      aria-hidden="true"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[0, 1].map((copy) => (
          <span key={copy} className="inline-flex shrink-0 items-center">
            {ITEMS.map((item) => (
              <span key={item} className="inline-flex items-center">
                <span className="px-7 text-sm font-medium tracking-wide text-(--color-muted) sm:px-10">
                  {item}
                </span>
                <span className="text-(--color-border)" aria-hidden="true">
                  ·
                </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
