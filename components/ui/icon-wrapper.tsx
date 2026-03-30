import type { ReactNode } from "react";

type IconWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function IconWrapper({ children, className = "" }: IconWrapperProps) {
  return (
    <div className={`flex items-center justify-center rounded-xl bg-(--color-cream) p-2 ${className}`}>
      {children}
    </div>
  );
}
