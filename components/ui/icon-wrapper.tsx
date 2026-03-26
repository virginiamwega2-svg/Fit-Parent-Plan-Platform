import type React from "react";

type IconWrapperProps = {
  children: React.ReactNode;
  tone?: "brand" | "muted";
  className?: string;
};

export function IconWrapper({ children, tone = "brand", className = "" }: IconWrapperProps) {
  const base =
    tone === "brand"
      ? "bg-(--color-accent)/20 text-(--color-accent)"
      : "bg-(--color-border) text-(--color-muted)";

  return (
    <div
      className={`icon-wrapper flex h-10 w-10 items-center justify-center rounded-[20px] ${base} ${className}`}
    >
      <div className="icon-illustration">{children}</div>
    </div>
  );
}

