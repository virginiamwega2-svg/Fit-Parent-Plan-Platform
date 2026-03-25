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

const values = [
  "Consistency over perfection",
  "Simple systems beat complicated plans",
  "Family-friendly routines are non-negotiable",
];

const coachingFramework = [
  {
    title: "Plan from reality",
    detail: "We plan from your real calendar, not ideal conditions.",
  },
  {
    title: "Train minimum effective dose",
    detail: "Short, focused sessions that build momentum without burnout.",
  },
  {
    title: "Adapt every week",
    detail: "When sleep or stress shifts, your plan shifts too.",
  },
];

const highlights = [
  { label: "Parent sessions", value: "10-20 min" },
  { label: "Typical weekly goal", value: "3 workouts" },
  { label: "Planning overhead", value: "< 15 min" },
];

const team = [
  {
    name: "Maya Grant",
    role: "Head Coach",
    bio: "Mom of two and strength coach for ten years. She writes every training block around what parents can actually do on a Tuesday night.",
    credential: "NASM-CPT, Pre/Postnatal Performance Specialist",
    photo: "/images/team-maya.jpg",
  },
  {
    name: "Chris Dalton",
    role: "Nutrition Lead",
    bio: "Father of three who got tired of meal plans nobody followed. His approach: one dinner, everyone eats it, done in under 45 minutes.",
    credential: "Precision Nutrition L2, Family Nutrition Practitioner",
    photo: "/images/team-chris.jpg",
  },
  {
    name: "Leah Shaw",
    role: "Accountability Coach",
    bio: "She runs the weekly check-ins and has a knack for helping parents get back on track after a rough week without the guilt spiral.",
    credential: "Behavior Change Coach, Parent Accountability Specialist",
    photo: "/images/team-leah.jpg",
  },
];

const trustSignals = [
  { headline: "NASM & Precision Nutrition certified coaches", detail: "Every plan is built by credentialed coaches, not templates or AI-generated programs." },
  { headline: "14-day money-back guarantee", detail: "Show up for the first two weeks. If it isn't working, email us for a full refund — no forms, no hoops." },
  { headline: "One meal for the whole family", detail: "No separate plates. Every nutrition recommendation is designed to work for adults and kids at the same table." },
  { headline: "Reply within one business day", detail: "Questions go to a real coach, not a support queue. You'll have a name and a direct line from day one." },
];

const BLUR_BANNER = "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAbEAACAgMBAAAAAAAAAAAAAAABAgADBRFBIf/EABUBAQEAAAAAAAAAAAAAAAAAAAAC/8QAFREBAQAAAAAAAAAAAAAAAAAAADH/2gAMAwEAAhEDEQA/ALrMm7BgtTovh0RzujERIhX/2Q==";

export default function AboutPage() {
  const sectionLinks = [
    { href: "#mission", label: "Mission" },
    { href: "#values", label: "Values" },
    { href: "#framework", label: "Framework" },
    { href: "#team", label: "Team" },
    { href: "#trust", label: "Trust" },
  ];

  return (
    <div className="pb-8 sm:pb-10">
      <Reveal>
        <SectionHeader
          eyebrow="About Fit Parent Plan"
          title="Built for parents who need practical systems, not perfect plans"
          description="Fit Parent Plan helps busy parents train consistently, eat better with their families, and stay on track during chaotic weeks."
        />
      </Reveal>

      <Reveal className="mt-6" delayMs={40}>
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-3xl">
          <Image
            src="/images/about-banner.jpg"
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

      <Reveal className="mt-4" delayMs={60}>
        <div className="grid gap-4 lg:grid-cols-[1.1fr_2fr]">
          <Card className="hover-lift h-fit lg:sticky lg:top-24">
            <h2 className="text-base font-semibold text-foreground">Quick Navigation</h2>
            <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
              {sectionLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="shrink-0 rounded-full border border-(--color-border) bg-(--color-bg-soft) px-3 py-1 text-xs font-semibold text-(--color-muted) hover:border-(--color-brand) hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card id="mission" className="hover-lift scroll-mt-28">
              <h2 className="text-xl font-semibold text-foreground">Mission</h2>
              <p className="mt-3 text-(--color-muted)">
                We help parents build momentum with short sessions, adaptive plans, and routines that survive busy days.
              </p>
            </Card>
            <Card className="hover-lift">
              <h2 className="text-xl font-semibold text-foreground">Who we serve</h2>
              <p className="mt-3 text-(--color-muted)">
                Parents balancing work, childcare, and home life who want progress without a gym-heavy lifestyle.
              </p>
            </Card>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-4" delayMs={90}>
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.label} className="hover-lift text-center">
              <p className="text-sm uppercase tracking-[0.14em] text-(--color-muted)">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{item.value}</p>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10" delayMs={120}>
        <div id="values" className="scroll-mt-28">
          <SectionHeader
            eyebrow="Values"
            title="What shapes every plan we build"
            description="Every recommendation is filtered through sustainability, family fit, and low-friction execution."
          />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value} className="hover-lift">
                <p className="font-medium text-foreground">{value}</p>
              </Card>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10" delayMs={150}>
        <div id="framework" className="scroll-mt-28">
          <SectionHeader
            eyebrow="How We Coach"
            title="Our operating framework"
            description="Every plan follows the same three-part system to keep progress predictable."
          />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {coachingFramework.map((item) => (
              <Card key={item.title} className="hover-lift">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-(--color-muted)">{item.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10" delayMs={180}>
        <div id="team" className="scroll-mt-28">
          <SectionHeader
            eyebrow="Team"
            title="People behind the platform"
            description="Coaching, nutrition, and accountability roles built for real parent schedules."
          />
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
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10" delayMs={210}>
        <div id="trust" className="scroll-mt-28">
          <SectionHeader
            eyebrow="Why Parents Trust Us"
            title="What you can hold us to"
            description="Specific commitments — not marketing promises."
          />
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
          <h2 className="text-2xl sm:text-3xl">Think this could work for you?</h2>
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
