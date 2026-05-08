import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pause, RefreshCw, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buildMetadata } from "@/lib/metadata";

const MISSED_BLUR =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIDBv/EACAQAAIBBAEFAAAAAAAAAAAAAAECAwAEETEFEiEzYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//EABcRAQADAAAAAAAAAAAAAAAAAAAREiH/2gAMAwEAAhEDEQA/AF4DmBHZGKfLFAek57AAa9VPmreS8mgvYgpLhVwrZA3us9H4notpPtTrpS//2Q==";

export const metadata: Metadata = buildMetadata(
  "I missed a week. Now what?",
  "Most fitness apps mark you 'failed' when life gets in the way. This one is built for the comeback — Pause without guilt, Adapt last week, no streaks to break.",
  "/i-missed-a-week",
);

const PILLARS = [
  {
    icon: Pause,
    title: "Pause the week",
    body: "One tap. Seven days off. The plan waits. No 'are you sure?' modals, no cancel-and-restart, no guilt-trip emails.",
  },
  {
    icon: RefreshCw,
    title: "Adapt last week",
    body: "Tell the assistant what actually happened. It rewrites today smaller — not as a punishment for skipping, just as a smarter restart.",
  },
  {
    icon: MessageCircle,
    title: "No streaks to break",
    body: "We don't show day counts. We don't badge perfect weeks. The only number that matters is whether you came back at all — and you did.",
  },
];

export default function MissedAWeekPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-16 pt-12 lg:px-8 lg:pt-16">

      <Reveal>
        <p className="eyebrow text-(--color-brand)">An honest page</p>
        <h1 className="mt-3 text-4xl tracking-tight sm:text-5xl">
          <span className="font-light italic text-(--color-muted)">I missed a week.</span>{" "}
          <span className="font-black text-foreground">Now what?</span>
        </h1>
      </Reveal>

      <Reveal className="mt-8" delayMs={50}>
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl">
          <Image
            src="/images/missed.webp"
            alt="Empty kitchen at golden hour — coffee mugs catching the morning light"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            quality={82}
            placeholder="blur"
            blurDataURL={MISSED_BLUR}
            loading="lazy"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal className="mt-6" delayMs={80}>
        <p className="text-base leading-7 text-(--color-muted)">
          You opened an app three weeks ago. You did great for nine days. Then a kid got sick, work blew up, and the streak counter started feeling like an accusation. You closed the tab. You haven&apos;t opened it since.
        </p>
        <p className="mt-3 text-base leading-7 text-(--color-muted)">
          Every fitness app on the market is built around <em>not breaking the streak</em>. We think that&apos;s the wrong design for a parent. Real life isn&apos;t a streak. It&apos;s a sequence of weeks, some of which fall apart — and the only question that matters is whether you come back the next one.
        </p>
      </Reveal>

      <Reveal className="mt-10" delayMs={120}>
        <h2 className="text-2xl tracking-tight">
          <span className="font-light italic text-(--color-muted)">What we built </span>
          <span className="font-black text-foreground">instead.</span>
        </h2>
        <div className="mt-5 grid gap-4">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-(--color-border) bg-(--color-bg-soft) p-5">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-mint-soft) text-(--color-brand-strong)">
                  <Icon size={15} aria-hidden="true" />
                </span>
                <h3 className="text-base font-bold text-foreground">{title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-(--color-muted)">{body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10" delayMs={180}>
        <div className="rounded-3xl bg-foreground p-8 text-(--color-on-brand) sm:p-10">
          <h2 className="text-2xl tracking-tight sm:text-3xl">
            <span className="font-light italic text-white/70">Try the assistant. </span>
            <span className="font-black text-white">Tell it about the gap.</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
            30 seconds. No signup. Type or speak whatever&apos;s actually going on — including &ldquo;I haven&apos;t trained in three weeks.&rdquo; You&apos;ll get a real plan back.
          </p>
          <Link
            href="/#section-ai"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-(--color-brand) px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-(--color-brand-strong)"
          >
            Try it — 30 seconds <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </Reveal>

      <Reveal className="mt-8" delayMs={240}>
        <p className="text-center text-xs text-(--color-muted)">
          Or{" "}
          <Link href="/#apply" className="underline hover:text-foreground">
            apply for coaching
          </Link>{" "}
          — 2 minutes, no card.
        </p>
      </Reveal>
    </div>
  );
}
