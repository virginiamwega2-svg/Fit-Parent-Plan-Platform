"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-foreground text-(--color-bg)">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl text-(--color-bg)">{siteConfig.name}</p>
            <p className="mt-2 max-w-xs text-sm text-(--color-bg)/60">{siteConfig.description}</p>
            <div className="mt-5 flex items-center gap-5">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-sm font-semibold text-(--color-bg)/70 transition-colors hover:text-(--color-bg)"
              >
                Back to top ↑
              </button>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-(--color-bg)/70 transition-colors hover:text-(--color-bg)"
                aria-label="Fit Parent Plan on Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-(--color-bg)">Legal</p>
            <ul className="mt-3 grid gap-2 text-sm text-(--color-bg)/60">
              <li><Link href="/privacy" className="transition-colors hover:text-(--color-bg)">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-(--color-bg)">Terms of Use</Link></li>
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="transition-colors hover:text-(--color-bg)">
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-(--color-bg)/10 px-4 py-4 text-center text-xs text-(--color-bg)/40">
        {siteConfig.name} © 2026. Built for busy parents.
      </div>
    </footer>
  );
}
