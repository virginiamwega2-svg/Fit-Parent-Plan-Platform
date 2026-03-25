import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Fit Parent Plan.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 sm:px-10">
      <h1 className="text-4xl font-bold tracking-tight">Terms of Use</h1>
      <p className="mt-4 text-(--color-muted)">Last updated: March 5, 2026</p>

      <div className="mt-8 space-y-6 text-foreground">
        <section>
          <h2 className="text-xl font-semibold">Coaching scope</h2>
          <p className="mt-2">
            Program content is educational and coaching-focused. It does not
            replace licensed medical advice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Payments and access</h2>
          <p className="mt-2">
            Pricing and access terms are provided before purchase. Continued use
            indicates acceptance of those terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">User responsibilities</h2>
          <p className="mt-2">
            You are responsible for ensuring the program fits your health status
            and for seeking medical clearance when needed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-2">
            Questions about these terms can be sent through the contact page.
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

