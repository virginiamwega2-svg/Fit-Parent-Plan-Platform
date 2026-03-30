import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "About",
  "Why Fit Parent Plan exists and how we coach busy parents in real life.",
  "/about",
);

const team = [
  {
    name: "Maya Grant",
    role: "Head Coach",
    bio: "Mom of two and strength coach for ten years. She sets her alarm 22 minutes early so she can train before the school run — and builds every plan the way she lives.",
    quirk: "Her rule: if she wouldn't do it on a Tuesday night after work, it doesn't go in the plan.",
    credential: "NASM-CPT, Pre/Postnatal Performance Specialist",
    photo: "/images/team-maya.webp",
  },
  {
    name: "Chris Dalton",
    role: "Nutrition Lead",
    bio: "Father of three who got tired of meal plans nobody followed. He now rotates 4 dinners every week and has convinced himself they're different meals.",
    quirk: "His approach: one meal for the whole table, done in under 45 minutes, no separate plates.",
    credential: "Precision Nutrition L2, Family Nutrition Practitioner",
    photo: "/images/team-chris.webp",
  },
  {
    name: "Leah Shaw",
    role: "Accountability Coach",
    bio: "She runs the weekly check-ins and replies at 10pm from the couch. That's not a flex — it's just when she has time.",
    quirk: "She has a knack for helping parents get back on track after a rough week without the guilt spiral.",
    credential: "Behavior Change Coach, Parent Accountability Specialist",
    photo: "/images/team-leah.webp",
  },
];

const trustSignals = [
  { headline: "NASM & Precision Nutrition certified coaches", detail: "Every plan is built by credentialed coaches, not templates or AI-generated programs." },
  { headline: "14-day money-back guarantee", detail: "Show up for the first two weeks. If it isn't working, email us for a full refund — no forms, no hoops." },
  { headline: "One meal for the whole family", detail: "No separate plates. Every nutrition recommendation is designed to work for adults and kids at the same table." },
  { headline: "Reply within 24 hours", detail: "Questions go to a real coach, not a support queue. You'll have a name and a direct line from day one." },
];

const BLUR_BANNER = "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAbEAACAgMBAAAAAAAAAAAAAAABAgADBRFBIf/EABUBAQEAAAAAAAAAAAAAAAAAAAAC/8QAFREBAQAAAAAAAAAAAAAAAAAAADH/2gAMAwEAAhEDEQA/ALrMm7BgtTovh0RzujERIhX/2Q==";

export default function AboutPage() {
  return (
    <div className="pb-8 pt-8 sm:pb-10 sm:pt-10">
      <Reveal>
        <SectionHeader
          eyebrow="About Fit Parent Plan"
          title="Built for real life, not perfect plans"
          titleLight="Built for real life,"
          titleBold="not perfect plans."
          description="Fit Parent Plan helps busy parents train consistently, eat better with their families, and stay on track during chaotic weeks."
        />
      </Reveal>

      <Reveal className="mt-6" delayMs={40}>
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-3xl">
          <Image
            src="/images/about-banner.webp"
            alt="Parents building healthy habits together"
            fill
            sizes="(max-width: 1280px) 100vw, 1152px"
            quality={85}
            placeholder="blur"
            blurDataURL={BLUR_BANNER}
            className="object-cover"
            priority
          />
        </div>
      </Reveal>

      <Reveal className="mt-8" delayMs={50}>
        <div className="rounded-3xl border border-(--color-border) bg-(--color-bg-soft) p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--color-brand)">Why this exists</p>
          <h2 className="mt-2 text-2xl tracking-tight">
            <span className="font-light italic text-(--color-muted)">We kept seeing the </span>
            <span className="font-black text-foreground">same pattern.</span>
          </h2>
          <div className="mt-4 grid gap-4 text-sm leading-7 text-(--color-muted) sm:grid-cols-2">
            <p>
              Maya trained parents for nearly a decade before starting this. And the pattern she kept seeing was always the same: someone would do great for three weeks, the kids would get sick or work would blow up, and they&apos;d restart from zero two months later.
            </p>
            <p>
              The problem wasn&apos;t motivation. It was that every program assumed ideal conditions. So she built the adjustment system first — and wrapped everything else around it. The workouts, the nutrition, the check-ins are all designed for the week that&apos;s actually happening, not the one you planned.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-6" delayMs={60}>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift">
            <h2 className="text-xl font-bold text-foreground">Mission</h2>
            <p className="mt-3 text-(--color-muted)">
              We help parents build momentum with short sessions, adaptive plans, and routines that survive busy days.
            </p>
          </Card>
          <Card className="hover-lift">
            <h2 className="text-xl font-bold text-foreground">Who we serve</h2>
            <p className="mt-3 text-(--color-muted)">
              Parents balancing work, childcare, and home life who want progress without a gym-heavy lifestyle.
            </p>
          </Card>
        </div>
      </Reveal>

      <Reveal className="mt-10" delayMs={90}>
        <div id="team" className="scroll-mt-28">
          <h2 className="text-2xl tracking-tight">
            <span className="font-light italic text-(--color-muted)">The </span>
            <span className="font-black text-foreground">coaches.</span>
          </h2>
          <p className="mt-1 text-sm text-(--color-muted)">Coaching, nutrition, and accountability — all parents themselves.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {team.map((member, index) => (
              <Reveal key={member.name} delayMs={index * 60}>
                <Card className="hover-lift">
                  <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-(--color-border)">
                    <Image src={member.photo} alt={member.name} width={56} height={56} quality={75} loading="lazy" className="object-cover" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-(--color-brand-strong)">{member.role}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-(--color-muted)">
                    {member.credential}
                  </p>
                  <p className="mt-2 text-sm text-(--color-muted)">{member.bio}</p>
                  <p className="mt-2 border-t border-(--color-border) pt-2 text-xs italic text-(--color-muted)">{member.quirk}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10" delayMs={210}>
        <div id="trust" className="scroll-mt-28">
          <h2 className="text-2xl tracking-tight">
            <span className="font-light italic text-(--color-muted)">What you can </span>
            <span className="font-black text-foreground">hold us to.</span>
          </h2>
          <p className="mt-1 text-sm text-(--color-muted)">Specific commitments — not marketing promises.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {trustSignals.map((signal) => (
              <Card key={signal.headline} className="hover-lift">
                <p className="font-semibold text-foreground">{signal.headline}</p>
                <p className="mt-1 text-sm text-(--color-muted)">{signal.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10" delayMs={240}>
        <Card className="hover-lift bg-foreground text-(--color-on-brand)">
          <h2 className="text-2xl tracking-tight sm:text-3xl">
            <span className="font-light italic text-white/70">Think this could </span>
            <span className="font-black text-white">work for you?</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-(--color-on-brand)/80">
            Fill in a few details about your schedule and goals. We&apos;ll follow up within 24 hours with an honest answer on whether this is the right fit.
          </p>
          <div className="mt-5">
            <Link
              href="/#apply"
              className="inline-flex rounded-full bg-(--color-secondary) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--color-secondary-strong)"
            >
              Check if it fits you →
            </Link>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
