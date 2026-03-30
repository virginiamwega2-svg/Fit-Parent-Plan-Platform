"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-foreground text-(--color-bg)">
      {/* Sign-off — the brand voice closing line */}
      <div className="border-b border-(--color-bg)/10">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="font-display text-[clamp(2rem,5vw,4.5rem)] font-thin italic leading-tight text-(--color-bg)/30">
            See you
          </p>
          <p className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black leading-tight tracking-tighter text-(--color-bg)">
            Tuesday, 06:22.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-xl font-black text-(--color-bg)">{siteConfig.name}</p>
            <p className="mt-1 text-sm text-(--color-bg)/50">
              20-minute workouts built around the week you actually have.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-1.5 text-sm font-semibold text-(--color-bg)/60 transition-colors hover:text-(--color-bg)"
              >
                <ArrowUp size={13} aria-hidden="true" /> Back to top
              </button>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-(--color-bg)/60 transition-colors hover:text-(--color-bg)"
                aria-label="Fit Parent Plan on Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
                Instagram
              </a>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-sm text-(--color-bg)/60 transition-colors hover:text-(--color-bg)"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-(--color-bg)/40">Quick links</p>
            <ul className="mt-3 grid gap-2 text-sm text-(--color-bg)/50">
              <li><a href="/#section-how" className="transition-colors hover:text-(--color-bg)">How it works</a></li>
              <li><a href="/#section-results" className="transition-colors hover:text-(--color-bg)">Results</a></li>
              <li><a href="/#section-offer" className="transition-colors hover:text-(--color-bg)">Pricing</a></li>
              <li><a href="/#section-faq" className="transition-colors hover:text-(--color-bg)">FAQ</a></li>
              <li><Link href="/sample-workout" className="transition-colors hover:text-(--color-bg)">Sample workout</Link></li>
              <li><a href="/#apply" className="transition-colors hover:text-(--color-bg)">Apply</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-(--color-bg)/40">Legal</p>
            <ul className="mt-3 grid gap-2 text-sm text-(--color-bg)/50">
              <li><Link href="/privacy" className="transition-colors hover:text-(--color-bg)">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-(--color-bg)">Terms of Use</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-(--color-bg)/8 px-4 py-4">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-bg)/25">
          {siteConfig.name} © 2026
        </p>
      </div>
    </footer>
  );
}
