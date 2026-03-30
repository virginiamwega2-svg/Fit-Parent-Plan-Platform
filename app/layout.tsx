import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Script from "next/script";
import type React from "react";
import Analytics from "@/components/analytics/analytics";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollProgressBar } from "@/components/ui/scroll-progress-bar";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["100", "300", "600", "700", "900"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.siteUrl;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteUrl,
  email: siteConfig.contactEmail,
  priceRange: "$$",
  image: `${siteUrl}${siteConfig.ogImage}`,
  sameAs: [siteConfig.instagramUrl],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Online Fitness Coaching",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Monthly Fitness Coaching",
          description: "20-minute home workouts, weekly meal plans, and personal coach check-ins for busy parents.",
        },
        price: "199",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "RecurringChargeSpecification",
          billingDuration: "P1M",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "38",
    bestRating: "5",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | 20-minute workouts for busy parents`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | 20-minute workouts for busy parents`,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1920,
        height: 1080,
        alt: `${siteConfig.name} preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | 20-minute workouts for busy parents`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event",
      targetId: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        <Analytics />
        <ScrollProgressBar />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded-md focus:bg-(--color-bg-soft) focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
