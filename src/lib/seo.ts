import type { Metadata } from "next";

import type { SeoPageConfig } from "@/lib/seo-content";
import { absoluteUrl, SEO_CONTENT_DATE, SITE_NAME } from "@/lib/site";

function openGraphLocale(locale: SeoPageConfig["locale"]): string {
  return locale.replace("-", "_");
}

export function buildSeoMetadata(config: SeoPageConfig): Metadata {
  const languages = config.languageAlternates
    ? Object.fromEntries(
        Object.entries(config.languageAlternates).map(([locale, path]) => [
          locale,
          absoluteUrl(path),
        ]),
      )
    : undefined;

  const alternateLocales = config.languageAlternates
    ? Object.keys(config.languageAlternates)
        .filter((locale) => locale !== "x-default" && locale !== config.locale)
        .map((locale) => locale.replace("-", "_"))
    : undefined;

  return {
    title: { absolute: config.metaTitle },
    description: config.metaDescription,
    alternates: {
      canonical: absoluteUrl(config.route),
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      ...(config.kind === "guide"
        ? {
            type: "article" as const,
            publishedTime: SEO_CONTENT_DATE,
            modifiedTime: SEO_CONTENT_DATE,
            authors: [SITE_NAME],
          }
        : { type: "website" as const }),
      url: absoluteUrl(config.route),
      siteName: SITE_NAME,
      title: config.metaTitle,
      description: config.metaDescription,
      locale: openGraphLocale(config.locale),
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: config.h1,
        },
      ],
      ...(alternateLocales?.length
        ? { alternateLocale: alternateLocales }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: config.metaTitle,
      description: config.metaDescription,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          alt: config.h1,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
