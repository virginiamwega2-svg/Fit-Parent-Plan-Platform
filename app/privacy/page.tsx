import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("Privacy Policy", "Privacy policy for Fit Parent Plan.", "/privacy");

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 sm:px-10">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-(--color-muted)">Last updated: March 30, 2026</p>

      <div className="mt-8 space-y-8 text-foreground">

        <section>
          <h2 className="text-xl font-semibold">1. Who we are</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            Fit Parent Plan (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website at fitparentplan.com and provides
            online fitness coaching services. Our contact email is{" "}
            <a href="mailto:support@fitparentplan.com" className="underline">support@fitparentplan.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. What information we collect</h2>
          <ul className="mt-2 space-y-2 leading-7 text-(--color-muted)">
            <li><strong className="text-foreground">Contact details</strong> — your name and email address when you submit an application or contact form.</li>
            <li><strong className="text-foreground">Coaching information</strong> — your fitness goals, available time, and any challenges you share with us through our application form.</li>
            <li><strong className="text-foreground">Payment data</strong> — billing information processed securely by our payment provider (Stripe). We never store your full card number.</li>
            <li><strong className="text-foreground">Usage data</strong> — pages visited, time on site, and interactions, collected via analytics tools (Google Analytics) to improve our service.</li>
            <li><strong className="text-foreground">Technical data</strong> — IP address, browser type, and device information collected automatically when you visit our site.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. How we use your information</h2>
          <ul className="mt-2 space-y-2 leading-7 text-(--color-muted)">
            <li>To respond to your coaching application and communicate with you about our programme.</li>
            <li>To deliver coaching services, workout plans, and nutrition guidance to active members.</li>
            <li>To process payments and manage your subscription.</li>
            <li>To send programme-related emails including weekly check-ins and plan updates.</li>
            <li>To improve our website and services based on how visitors use them.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Legal basis for processing (GDPR)</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            If you are located in the European Economic Area (EEA) or United Kingdom, we process your
            personal data under the following legal bases:
          </p>
          <ul className="mt-2 space-y-2 leading-7 text-(--color-muted)">
            <li><strong className="text-foreground">Contract</strong> — processing necessary to deliver the coaching service you have signed up for.</li>
            <li><strong className="text-foreground">Legitimate interests</strong> — improving our service and communicating about your programme.</li>
            <li><strong className="text-foreground">Consent</strong> — for marketing emails, which you may withdraw at any time.</li>
            <li><strong className="text-foreground">Legal obligation</strong> — where required by law.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. How we share your information</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            We do not sell your personal data. We share information only with trusted service providers
            who help us operate our business:
          </p>
          <ul className="mt-2 space-y-2 leading-7 text-(--color-muted)">
            <li><strong className="text-foreground">Stripe</strong> — payment processing. View their privacy policy at stripe.com/privacy.</li>
            <li><strong className="text-foreground">Google Analytics</strong> — website analytics. You can opt out at tools.google.com/dlpage/gaoptout.</li>
            <li><strong className="text-foreground">Cloudflare</strong> — bot protection on our forms (Turnstile).</li>
            <li><strong className="text-foreground">Email service provider</strong> — for sending transactional and coaching emails.</li>
          </ul>
          <p className="mt-3 leading-7 text-(--color-muted)">
            All third-party providers are contractually required to handle your data securely and only
            for the purpose we specify.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. How long we keep your data</h2>
          <ul className="mt-2 space-y-2 leading-7 text-(--color-muted)">
            <li><strong className="text-foreground">Active members</strong> — for the duration of your membership plus 2 years.</li>
            <li><strong className="text-foreground">Applicants who did not join</strong> — up to 12 months from application date.</li>
            <li><strong className="text-foreground">Payment records</strong> — 7 years for legal and tax compliance.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Your rights</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul className="mt-2 space-y-2 leading-7 text-(--color-muted)">
            <li><strong className="text-foreground">Access</strong> — request a copy of the data we hold about you.</li>
            <li><strong className="text-foreground">Correction</strong> — ask us to correct inaccurate data.</li>
            <li><strong className="text-foreground">Deletion</strong> — request that we delete your data (&quot;right to be forgotten&quot;).</li>
            <li><strong className="text-foreground">Portability</strong> — receive your data in a machine-readable format.</li>
            <li><strong className="text-foreground">Objection</strong> — object to processing based on legitimate interests.</li>
            <li><strong className="text-foreground">Withdraw consent</strong> — unsubscribe from marketing emails at any time via the unsubscribe link.</li>
          </ul>
          <p className="mt-3 leading-7 text-(--color-muted)">
            To exercise any of these rights, email us at{" "}
            <a href="mailto:support@fitparentplan.com" className="underline">support@fitparentplan.com</a>.
            We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Cookies</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            We use essential cookies required for the site to function and analytics cookies to
            understand usage. You can disable analytics cookies in your browser settings or via the
            Google Analytics opt-out tool. We do not use advertising or tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">9. Data security</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            We use industry-standard security measures including HTTPS encryption, secure password
            hashing, and access controls. Payment data is handled entirely by Stripe and never touches
            our servers. No method of transmission over the internet is 100% secure — if you have
            concerns, contact us directly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">10. Children&apos;s privacy</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            Our service is intended for adults aged 18 and over. We do not knowingly collect data from
            anyone under 18. If you believe a child has submitted information, contact us immediately
            and we will delete it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">11. Changes to this policy</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            We may update this policy from time to time. We will notify active members of material
            changes by email. The &quot;last updated&quot; date at the top of this page reflects the most
            recent revision.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">12. Contact us</h2>
          <p className="mt-2 leading-7 text-(--color-muted)">
            For any privacy-related questions or to exercise your rights, contact us at:{" "}
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
