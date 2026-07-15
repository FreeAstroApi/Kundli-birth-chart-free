import type { SeoPageConfig } from "@/lib/seo-content";
import { absoluteUrl, SEO_CONTENT_DATE, SITE_NAME, SITE_URL } from "@/lib/site";

export type JsonLdData = Record<string, unknown> | readonly unknown[];

export function buildPrimaryPageJsonLd(
  config: SeoPageConfig,
): Record<string, unknown> {
  if (config.kind === "guide") {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: config.h1,
      description: config.metaDescription,
      image: absoluteUrl("/opengraph-image"),
      datePublished: SEO_CONTENT_DATE,
      dateModified: SEO_CONTENT_DATE,
      inLanguage: config.locale,
      mainEntityOfPage: absoluteUrl(config.route),
      author: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: config.h1,
    description: config.metaDescription,
    url: absoluteUrl(config.route),
    inLanguage: config.locale,
    applicationCategory: "LifestyleApplication",
    applicationSubCategory: "Vedic astrology calculator",
    operatingSystem: "Any operating system with a modern web browser",
    browserRequirements: "Requires JavaScript for interactive calculations",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: config.features.map((feature) => feature.title),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildBreadcrumbJsonLd(
  config: SeoPageConfig,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: config.breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.label,
      item: absoluteUrl(breadcrumb.href ?? config.route),
    })),
  };
}

export function buildFaqJsonLd(
  config: SeoPageConfig,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
