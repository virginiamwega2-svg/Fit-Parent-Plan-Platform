import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("Terms of Use", "Terms of use for Fit Parent Plan.", "/terms");

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 sm:px-10">
      <h1 className="text-4xl font-bold tracking-tight">Terms of Use</h1>
      <p className="mt-4 text-(--color-muted)">Last updated: March 30, 2026</p>

      <div className="mt-8 space-y-8 text-foreground">

        <section>
          <h2 className="text-xl font-semibold">1. Agreement to terms</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            By accessing fitparentplan.com or purchasing a coaching programme, you agree to be
            bound by these Terms of Use. If you do not agree, please do not use our services.
            These terms form a binding contract between you and Fit Parent Plan (&quot;we&quot;,
            &quot;us&quot;, &quot;our&quot;).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Medical disclaimer</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            Our coaching programme is for <strong className="text-foreground">educational and general fitness purposes only</strong>.
            It is not a substitute for professional medical advice, diagnosis, or treatment.
            Before beginning any exercise or nutrition programme, you should:
          </p>
          <ul className="mt-2 space-y-2 leading-7 text-(--color-muted)">
            <li>Consult your doctor or a qualified healthcare provider, especially if you have any pre-existing medical conditions, injuries, or are pregnant or postpartum.</li>
            <li>Disclose any relevant health conditions to your coach before starting.</li>
            <li>Stop exercising immediately and seek medical attention if you experience pain, dizziness, shortness of breath, or any unusual symptoms.</li>
          </ul>
          <p className="mt-3 leading-7 text-(--color-muted)">
            We are not liable for any injury, illness, or adverse outcome resulting from following
            our programme. You participate entirely at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Programme access and membership</h2>
          <ul className="mt-2 space-y-2 leading-7 text-(--color-muted)">
            <li>Access to the coaching programme begins upon receipt of your first payment.</li>
            <li>Membership is personal and non-transferable — your login credentials may not be shared.</li>
            <li>We reserve the right to suspend or terminate access if these terms are violated.</li>
            <li>Programme content (workouts, nutrition guides, videos) is proprietary. You may not reproduce, distribute, or resell it.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Payments and billing</h2>
          <ul className="mt-2 space-y-2 leading-7 text-(--color-muted)">
            <li><strong className="text-foreground">Price</strong> — $199 per month (or as stated at the time of purchase).</li>
            <li><strong className="text-foreground">Billing</strong> — Payments are charged monthly on the same date each month via Stripe.</li>
            <li><strong className="text-foreground">Automatic renewal</strong> — Your membership renews automatically until you cancel.</li>
            <li><strong className="text-foreground">Failed payments</strong> — If a payment fails, access may be paused until the balance is settled.</li>
            <li><strong className="text-foreground">Price changes</strong> — We will give at least 14 days&apos; notice before changing the monthly price for existing members.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Cancellation policy</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            You may cancel your membership at any time by emailing{" "}
            <a href="mailto:support@fitparentplan.com" className="underline">support@fitparentplan.com</a>.
          </p>
          <ul className="mt-2 space-y-2 leading-7 text-(--color-muted)">
            <li>Cancellation takes effect at the end of your current billing period.</li>
            <li>You will retain access until that date.</li>
            <li>No partial refunds are issued for unused days within a billing period, except where required by law or under our 14-day guarantee.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. 14-day money-back guarantee</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            If you are not satisfied within your first 14 days, email us at{" "}
            <a href="mailto:support@fitparentplan.com" className="underline">support@fitparentplan.com</a>{" "}
            and we will issue a full refund — no questions asked. This guarantee applies to your
            first payment only and is not available on subsequent billing cycles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Results disclaimer</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            Any results — fitness improvements, weight loss, strength gains — mentioned on this
            website are illustrative of what members have achieved. Individual results vary based
            on consistency, starting fitness level, nutrition, sleep, stress, and other lifestyle
            factors. We do not guarantee specific outcomes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Intellectual property</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            All content on fitparentplan.com — including text, images, workout plans, and programme
            materials — is owned by Fit Parent Plan and protected by copyright law. You may not
            copy, reproduce, distribute, or create derivative works without our written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">9. Limitation of liability</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            To the fullest extent permitted by law, Fit Parent Plan shall not be liable for any
            indirect, incidental, special, or consequential damages arising from your use of our
            services, including but not limited to injury, loss of data, or loss of revenue. Our
            total liability shall not exceed the amount paid by you in the 30 days prior to the
            claim.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">10. Governing law</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            These terms are governed by and construed in accordance with applicable law. Any disputes
            shall first be attempted to be resolved amicably by contacting{" "}
            <a href="mailto:support@fitparentplan.com" className="underline">support@fitparentplan.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">11. Changes to these terms</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            We may update these terms periodically. Active members will be notified of material
            changes by email at least 14 days before they take effect. Continued use of the service
            after changes take effect constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">12. Contact</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            For any questions about these terms, email us at:{" "}
            <a href="mailto:support@fitparentplan.com" className="underline">support@fitparentplan.com</a>
          </p>
        </section>

      </div>

      <Link
        href="/"
        className="mt-12 inline-flex rounded-full border border-(--color-border) px-5 py-2 text-sm font-medium hover:bg-(--color-cream) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand)"
      >
        Back to Home
      </Link>
    </main>
  );
}
