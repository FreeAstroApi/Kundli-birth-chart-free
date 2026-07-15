import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LongtailGuidePage from "@/components/seo/LongtailGuidePage";
import {
  getLongtailGuide,
  LONGTAIL_GUIDE_SLUGS,
} from "@/lib/longtail-guides";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return LONGTAIL_GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getLongtailGuide(slug);

  if (!guide) return {};

  const path = `/learn/${guide.slug}`;

  return {
    title: { absolute: guide.metaTitle },
    description: guide.metaDescription,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      title: guide.metaTitle,
      description: guide.metaDescription,
      locale: "en_US",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: guide.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle,
      description: guide.metaDescription,
      images: [{ url: absoluteUrl("/opengraph-image"), alt: guide.h1 }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getLongtailGuide(slug);

  if (!guide) notFound();

  return <LongtailGuidePage guide={guide} />;
}
