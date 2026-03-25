import type React from "react";

type IllustrationProps = React.SVGProps<SVGSVGElement>;

export function CalendarSketch(props: IllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect className="sketch-stroke" x="8" y="10" width="32" height="28" rx="6" />
      <line className="sketch-stroke" x1="8" y1="18" x2="40" y2="18" />
      <line className="sketch-stroke" x1="16" y1="8" x2="16" y2="14" />
      <line className="sketch-stroke" x1="32" y1="8" x2="32" y2="14" />
      <circle className="sketch-pulse" cx="18" cy="26" r="2.5" />
      <path className="sketch-stroke" d="M26 28l3 3 6-6" />
    </svg>
  );
}

export function TimerSketch(props: IllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle className="sketch-stroke" cx="24" cy="26" r="14" />
      <line className="sketch-stroke" x1="24" y1="12" x2="24" y2="8" />
      <line className="sketch-stroke" x1="18" y1="8" x2="30" y2="8" />
      <path className="sketch-stroke" d="M24 26l6-6" />
      <circle className="sketch-pulse" cx="24" cy="26" r="2.5" />
      <path className="sketch-stroke" d="M10 26a14 14 0 0 0 2 7" />
    </svg>
  );
}

export function HomeSketch(props: IllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path className="sketch-stroke" d="M8 22l16-12 16 12" />
      <path className="sketch-stroke" d="M12 20v18h24V20" />
      <rect className="sketch-stroke" x="20" y="28" width="8" height="10" rx="2" />
      <path className="sketch-stroke" d="M34 24v8" />
      <circle className="sketch-pulse" cx="34" cy="34" r="2" />
    </svg>
  );
}

export function DumbbellSketch(props: IllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect className="sketch-stroke" x="6" y="18" width="6" height="12" rx="2" />
      <rect className="sketch-stroke" x="36" y="18" width="6" height="12" rx="2" />
      <rect className="sketch-stroke" x="14" y="21" width="20" height="6" rx="3" />
      <line className="sketch-stroke" x1="12" y1="24" x2="14" y2="24" />
      <line className="sketch-stroke" x1="34" y1="24" x2="36" y2="24" />
      <path className="sketch-stroke" d="M16 32c4 2 12 2 16 0" />
    </svg>
  );
}

export function ProgressSketch(props: IllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect className="sketch-stroke" x="8" y="10" width="32" height="28" rx="6" />
      <path className="sketch-stroke" d="M14 30l6-6 6 4 8-10" />
      <circle className="sketch-pulse" cx="34" cy="18" r="2.5" />
      <line className="sketch-stroke" x1="14" y1="36" x2="34" y2="36" />
    </svg>
  );
}

export function PlateSketch(props: IllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle className="sketch-stroke" cx="24" cy="24" r="14" />
      <circle className="sketch-stroke" cx="24" cy="24" r="6" />
      <path className="sketch-stroke" d="M10 18c2-3 6-5 10-6" />
      <path className="sketch-stroke" d="M32 36c-3 2-7 3-11 2" />
      <circle className="sketch-pulse" cx="30" cy="18" r="2.5" />
    </svg>
  );
}

export function PlaySketch(props: IllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle className="sketch-stroke" cx="24" cy="24" r="16" />
      <path className="sketch-stroke" d="M20 18l12 6-12 6z" />
      <path className="sketch-stroke" d="M8 24c0-9 7-16 16-16" />
      <circle className="sketch-pulse" cx="12" cy="30" r="2" />
    </svg>
  );
}
