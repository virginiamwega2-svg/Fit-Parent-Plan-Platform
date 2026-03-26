import type React from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, className, id, error, ...props }: InputProps) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;

  return (
    <label className="grid gap-2 text-sm font-medium text-foreground" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        className={cn(
          "rounded-xl border border-(--color-border) bg-(--color-bg-soft) px-3 py-2 text-sm outline-none transition focus-visible:border-(--color-brand) focus-visible:ring-2 focus-visible:ring-(--color-brand)/20",
          error && "border-red-500",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
