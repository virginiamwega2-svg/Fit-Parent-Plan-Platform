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


const BLUR_BANNER = "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAHABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAED/8QAHRABAAIBBQEAAAAAAAAAAAAAAQIDAAQREiFRof/EABUBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AKTjq2qNxxQLQi9Pm/3M7a7DTxsVknGCed4xkmv/2Q==";

export default function AboutPage() {
  return (
    <div className="pb-8 pt-8 sm:pb-10 sm:pt-10">
      <Reveal>
        <SectionHeader
          eyebrow="About Fit Parent Plan"
          title="Built for real life, not perfect plans"
          titleLight="Built for real life,"
          titleBold="not perfect plans."
          description="Fit Parent Plan coaches busy parents to train consistently and eat better — through the chaotic weeks, not around them."
        />
      </Reveal>

      <Reveal className="mt-6" delayMs={40}>
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-3xl">
          <Image
            src="/images/about.webp"
            alt="A parent and child cooking together at home"
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
          <p className="eyebrow text-(--color-brand)">Why this exists</p>
          <h2 className="mt-2 text-2xl tracking-tight">
            <span className="font-light italic text-(--color-muted)">The problem isn&apos;t </span>
            <span className="font-black text-foreground">motivation.</span>
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-(--color-muted)">
            Every fitness programme assumes ideal conditions. But parenting doesn&apos;t. Someone does great for three weeks — then the kids get sick, work blows up, and they restart from zero two months later. Fit Parent Plan was built the other way around: the adjustment system came first. The workouts and meals wrap around your week, not the other way around.
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-10" delayMs={90}>
        <div id="team" className="scroll-mt-28">
          <h2 className="text-2xl tracking-tight">
            <span className="font-light italic text-(--color-muted)">Your </span>
            <span className="font-black text-foreground">coach.</span>
          </h2>
          <p className="mt-1 text-sm text-(--color-muted)">A parent herself — coaches the way she actually lives.</p>
          <div className="mt-5">
            <Card className="hover-lift lg:flex lg:items-start lg:gap-8">
              <div className="shrink-0">
                <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-(--color-border)">
                  <Image
                    src="/images/team-maya.webp"
                    alt="Maya Grant — Head Coach"
                    width={80}
                    height={80}
                    quality={85}
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mt-4 lg:mt-0">
                <h3 className="text-xl font-semibold text-foreground">Maya Grant</h3>
                <p className="text-sm font-medium text-(--color-brand-strong)">Head Coach</p>
                <p className="eyebrow mt-1 text-(--color-muted)">NASM-CPT · Pre/Postnatal Specialist</p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-(--color-muted)">
                  Mom of two. Strength coach for ten years. Sets her alarm 22 minutes early so she can train before the school run — and builds every plan the way she actually lives. She reads every application personally and replies within 24 hours.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10" delayMs={180}>
        <Card className="hover-lift bg-foreground text-(--color-on-brand)">
          <h2 className="text-2xl tracking-tight sm:text-3xl">
            <span className="font-light italic text-white/70">Think this could </span>
            <span className="font-black text-white">work for you?</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-(--color-on-brand)/80">
            $10/mo, 14-day refund. Or send Maya a note first — she replies personally within 24 hours.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/#section-offer"
              className="inline-flex rounded-full bg-(--color-brand) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--color-brand-strong)"
            >
              Start — $10/mo
            </Link>
            <Link
              href="/#apply"
              className="inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Talk to Maya
            </Link>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
