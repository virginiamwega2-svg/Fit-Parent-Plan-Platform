import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Application received — Fit Parent Plan",
  description: "Your application has been received.",
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
        <div className="mb-6 relative aspect-4/3 w-full overflow-hidden rounded-3xl">
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
        <h1 className="mt-4 text-4xl tracking-tight">
          <span className="font-light italic text-(--color-muted)">Thanks, </span>
          <span className="font-black text-foreground">{leadName}.</span>
        </h1>
        <p className="mt-4 leading-7 text-(--color-muted)">
          We&apos;ll email you within 24 hours with your next steps and a secure checkout link.
        </p>
        <p className="mt-3 text-sm text-(--color-muted)">
          Check your inbox — including your spam folder — for a message from {siteConfig.contactEmail}.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-(--color-brand) px-6 text-sm font-semibold text-(--color-on-brand) hover:bg-(--color-brand-strong)"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

