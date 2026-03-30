import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <label className="grid gap-1">
      {label ? <span className="text-sm font-medium text-foreground">{label}</span> : null}
      <input
        className={`h-10 rounded-xl border border-(--color-border) px-3 outline-none ring-(--color-brand) transition focus-visible:ring-2 ${error ? "border-red-400" : ""} ${className}`}
        {...props}
      />
      {error ? <span className="text-xs text-red-700">{error}</span> : null}
    </label>
  );
}
