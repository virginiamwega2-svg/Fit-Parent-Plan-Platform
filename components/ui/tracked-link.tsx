"use client";

import Link from "next/link";
import type React from "react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type TrackedLinkProps = {
  href: string;
  eventName: string;
  label: string;
  className?: string;
  children: React.ReactNode;
};

export function TrackedLink({ href, eventName, label, className, children }: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={cn(className)}
      onClick={() => {
        trackEvent(eventName, { category: "conversion", label });
      }}
    >
      {children}
    </Link>
  );
}
