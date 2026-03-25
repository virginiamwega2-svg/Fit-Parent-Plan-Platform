export function HeroMark() {
  return (
    <svg
      viewBox="0 0 420 180"
      role="img"
      aria-label="Fit Parent Plan family rhythm illustration"
      className="w-full max-w-xl"
    >
      <defs>
        <linearGradient id="fit15Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-brand)" />
          <stop offset="100%" stopColor="var(--color-melon-soft)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="420" height="180" rx="28" fill="var(--color-cream)" />
      <path
        d="M38 128c32-36 74-36 107 0s74 36 108 0 74-36 107 0"
        fill="none"
        stroke="var(--color-melon-glow)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="88" cy="64" r="18" fill="url(#fit15Gradient)" className="brand-float brand-float-a" />
      <circle cx="210" cy="44" r="22" fill="var(--color-mint-soft)" className="brand-float brand-float-b" />
      <circle cx="332" cy="66" r="16" fill="var(--color-sky-soft)" className="brand-float brand-float-c" />
      <text x="40" y="104" fill="var(--color-ink)" fontSize="36" fontFamily="var(--font-fraunces)">
        Fit Parent Plan Rhythm
      </text>
      <text x="40" y="132" fill="var(--color-muted)" fontSize="16" fontFamily="var(--font-manrope)">
        Built around family schedules, not perfect calendars.
      </text>
    </svg>
  );
}
