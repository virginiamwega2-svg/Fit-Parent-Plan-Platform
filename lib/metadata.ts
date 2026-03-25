import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export function buildMetadata(
  title: string,
  description: string,
  path = "/",
): Metadata {
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: `${siteConfig.name} preview` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}
