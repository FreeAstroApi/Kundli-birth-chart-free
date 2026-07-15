import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/seo/JsonLd";
import SiteFooter from "@/components/seo/SiteFooter";
import SiteHeader from "@/components/seo/SiteHeader";
import { LONGTAIL_GUIDES } from "@/lib/longtail-guides";
import { SEO_PAGE_CONTENT } from "@/lib/seo-content";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Learn Vedic Chart Calculation Methods" },
  description:
    "Practical guides to ayanamsha, Navamsa D9, Vimshottari Dasha, Kundli matching, Manglik rules, Shadbala, Ashtakavarga and regional charts.",
  alternates: { canonical: absoluteUrl("/learn") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/learn"),
    siteName: SITE_NAME,
    title: "Learn Vedic Chart Calculation Methods",
    description:
      "Understand the inputs, settings and traditional frameworks behind the calculators.",
    locale: "en_US",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Jyotish Desk calculation guides",
      },
    ],
  },
};

export default function LearnPage() {
  const comparisonGuide =
    SEO_PAGE_CONTENT["/learn/why-kundli-calculators-differ"];

  return (
    <div className="min-h-screen bg-[#fffaf0] text-[#1c1712]">
      <JsonLd
        id="collection-jsonld"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Jyotish calculation guides",
          description:
            "Guides to the settings, derived charts and traditional frameworks used by Jyotish Desk calculators.",
          url: absoluteUrl("/learn"),
          inLanguage: "en-US",
        }}
      />
      <SiteHeader locale="en-US" />

      <main id="main-content">
        <section className="border-b border-amber-200 bg-[#fffdf7]">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
            <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight text-[#4e1010] sm:text-6xl">
              Learn what the calculator is doing
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-700">
              These guides explain the birth inputs, sidereal settings, divisional calculations and traditional scoring frameworks behind the tools. Each article links back to a calculator where the relevant data can be inspected.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
              <Link
                href="/methodology"
                className="rounded bg-[#681414] px-5 py-3 text-white hover:bg-[#8d1f1f]"
              >
                Read the site methodology
              </Link>
              <Link
                href="/vedic-birth-chart-calculator"
                className="rounded border border-[#b98a2f] bg-white px-5 py-3 text-[#681414]"
              >
                Open the birth chart calculator
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <h2 className="font-serif text-3xl font-bold text-[#4e1010]">
              Start with calculator differences
            </h2>
            <Link
              href={comparisonGuide.route}
              className="mt-7 block border-y border-amber-300 bg-[#fff7df] p-7"
            >
              <h3 className="text-2xl font-bold text-[#681414] hover:underline hover:underline-offset-4">
                {comparisonGuide.h1}
              </h3>
              <p className="mt-3 max-w-3xl leading-7 text-stone-700">
                {comparisonGuide.intro}
              </p>
            </Link>
          </div>
        </section>

        <section className="border-y border-amber-200 bg-[#fff7df]">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <h2 className="font-serif text-3xl font-bold text-[#4e1010]">
              Calculation and interpretation guides
            </h2>
            <div className="mt-8 grid gap-x-8 md:grid-cols-2">
              {Object.values(LONGTAIL_GUIDES).map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/learn/${guide.slug}`}
                  className="border-t border-amber-300 py-6"
                >
                  <h3 className="text-xl font-bold text-[#681414] hover:underline hover:underline-offset-4">
                    {guide.h1}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {guide.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <aside className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-12 text-sm leading-7 text-stone-700 lg:px-8">
            Vedic astrology is a cultural and interpretive tradition. The guides explain calculations and traditional frameworks without presenting them as scientifically validated predictions or professional advice.
          </div>
        </aside>
      </main>

      <SiteFooter locale="en-US" />
    </div>
  );
}
