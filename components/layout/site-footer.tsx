import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-(--color-border) bg-(--color-bg-soft)">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
<div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-display text-2xl text-foreground">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-(--color-muted)">{siteConfig.description}</p>
            <div className="mt-4 flex items-center gap-4">
              <Link
                href="#"
                className="text-sm font-semibold text-(--color-brand-strong) hover:text-foreground"
              >
                Back to top
              </Link>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-(--color-muted) hover:text-foreground"
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
            <p className="text-sm font-semibold text-foreground">Legal</p>
            <ul className="mt-2 grid gap-2 text-sm text-(--color-muted)">
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms of Use</Link></li>
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-foreground">
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-(--color-border) px-4 py-4 text-center text-xs text-(--color-muted)">
        {siteConfig.name} © 2026. Built for busy parents.
      </div>
    </footer>
  );
}
