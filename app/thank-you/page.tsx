import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your request has been received.",
  robots: {
    index: false,
    follow: false,
  },
};

type ThankYouPageProps = {
  searchParams: Promise<{ name?: string }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const leadName = params.name?.trim() || "there";

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <div className="surface-card p-8">
        <div className="mb-6 relative aspect-[4/3] w-full overflow-hidden rounded-[24px]">
          <Image
            src="/images/thankyou.jpg"
            alt="Parent celebrating their fitness journey"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            quality={80}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAbEAACAwEBAQAAAAAAAAAAAAABAwACEQQhMf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCbepp42Gjibmuu36MweGIiER//2Q=="
            className="object-cover"
            priority
          />
        </div>
        <p className="inline-flex rounded-full border border-(--color-border) bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-muted)">
          Submission received
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
          Thanks, {leadName}.
        </h1>
        <p className="mt-4 leading-7 text-(--color-muted)">
          We&apos;ll email you within 24 hours with your next steps and a secure checkout link.
        </p>
        <p className="mt-3 text-sm text-(--color-muted)">
          While you wait — browse the workout library to see exactly what sessions look like.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/workouts"
            className="inline-flex h-11 items-center justify-center rounded-full bg-(--color-brand) px-5 text-sm font-semibold text-(--color-on-brand) hover:bg-(--color-brand-strong)"
          >
            Browse workouts
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-(--color-secondary) bg-(--color-bg-soft) px-5 text-sm font-semibold text-(--color-secondary) hover:bg-(--color-secondary)/10"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

