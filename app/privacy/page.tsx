import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("Privacy Policy", "Privacy policy for Fit Parent Plan.", "/privacy");

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 sm:px-10">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-(--color-muted)">Last updated: March 5, 2026</p>

      <div className="mt-8 space-y-6 text-foreground">
        <section>
          <h2 className="text-xl font-semibold">Information we collect</h2>
          <p className="mt-2">
            We collect contact details and coaching inquiry details you provide
            through forms on this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">How we use your information</h2>
          <p className="mt-2">
            We use your information to respond to your inquiry, provide coaching
            details, and improve site performance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Analytics</h2>
          <p className="mt-2">
            We may use analytics tools to understand page visits and engagement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Your choices</h2>
          <p className="mt-2">
            You can request data deletion or correction by contacting us through
            the contact page.
          </p>
        </section>
      </div>

      <Link
        href="/"
        className="mt-10 inline-flex rounded-full border border-(--color-border) px-5 py-2 text-sm font-medium hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand)"
      >
        Back to Home
      </Link>
    </main>
  );
}

