"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const SCROLL_DEPTHS = [25, 50, 75, 100];

export default function Analytics() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!gaId || typeof window.gtag !== "function") {
      return;
    }

    const query = window.location.search.replace(/^\?/, "");
    const pagePath = query ? `${pathname}?${query}` : pathname;
    window.gtag("config", gaId, { page_path: pagePath });
  }, [gaId, pathname]);

  useEffect(() => {
    const viewedDepths = new Set<number>();

    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total <= 0) {
        return;
      }

      const depth = Math.round((window.scrollY / total) * 100);
      for (const target of SCROLL_DEPTHS) {
        if (depth >= target && !viewedDepths.has(target)) {
          viewedDepths.add(target);
          trackEvent("scroll_depth", {
            category: "engagement",
            label: `${target}%`,
            value: target,
          });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
