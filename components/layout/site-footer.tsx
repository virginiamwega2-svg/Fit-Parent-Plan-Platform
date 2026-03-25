import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-(--color-border) bg-(--color-bg-soft)">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-(--color-border) bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-foreground">Ready to see if this fits your life?</p>
            <p className="mt-1 text-sm text-(--color-muted)">Takes 2 minutes. We reply within 24 hours.</p>
          </div>
          <Link
            href="/#apply"
            className="shrink-0 rounded-full bg-(--color-brand) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-(--color-brand-strong)"
          >
            Apply for a spot →
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-foreground">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-(--color-muted)">{siteConfig.description}</p>
            <Link
              href="#"
              className="mt-4 inline-flex text-sm font-semibold text-(--color-brand-strong) hover:text-foreground"
            >
              Back to top
            </Link>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Pages</p>
            <ul className="mt-2 grid gap-2 text-sm text-(--color-muted)">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="/workouts" className="hover:text-foreground">Workouts</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
            </ul>
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
