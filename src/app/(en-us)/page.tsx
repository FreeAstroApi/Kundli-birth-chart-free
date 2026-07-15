import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd, SiteFooter, SiteHeader } from "@/components/seo";
import { SEO_PAGE_CONTENT } from "@/lib/seo-content";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Jyotish Desk – Free Vedic Astrology Calculators" },
  description:
    "Free Vedic astrology calculators for birth charts, Kundli, Navamsa D9, Vimshottari Dasha, matching, strength, dosha and Muhurat.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    title: "Jyotish Desk – Free Vedic Astrology Calculators",
    description:
      "Calculate Vedic birth charts, Kundli matching, D9, dashas, strength and Muhurat with the settings kept visible.",
    locale: "en_US",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Vedic astrology calculators`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jyotish Desk – Free Vedic Astrology Calculators",
    description:
      "Birth chart, Kundli, D9, Dasha, matching, strength and Muhurat tools.",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        alt: `${SITE_NAME} Vedic astrology calculators`,
      },
    ],
  },
};

const featuredRoutes = [
  "/vedic-birth-chart-calculator",
  "/kundli",
  "/navamsa-d9-calculator",
  "/vimshottari-dasha-calculator",
  "/kundli-matching",
  "/muhurat",
] as const;

const specialistRoutes = [
  "/ashtakavarga-calculator",
  "/shadbala-calculator",
  "/manglik-dosha-calculator",
  "/north-indian-birth-chart-calculator",
  "/south-indian-birth-chart-calculator",
  "/east-indian-birth-chart-calculator",
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fffaf0] text-[#1c1712]">
      <JsonLd
        id="website-jsonld"
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: absoluteUrl("/"),
          description:
            "Free Vedic astrology calculators with transparent calculation settings.",
          inLanguage: ["en-US", "en-IN", "hi-IN"],
        }}
      />
      <JsonLd
        id="organization-jsonld"
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          url: absoluteUrl("/"),
          description:
            "Vedic astrology calculators and calculation guides with visible settings, documented limitations and privacy information.",
          knowsAbout: [
            "Vedic birth charts",
            "Navamsa D9",
            "Vimshottari Dasha",
            "Ashtakoota matching",
            "Shadbala",
            "Ashtakavarga",
          ],
        }}
      />
      <SiteHeader locale="en-US" />

      <main id="main-content">
        <section className="border-b border-amber-200 bg-[#fffdf7]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:px-8 lg:py-24">
            <div>
              <h1 className="max-w-4xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#4e1010] sm:text-6xl">
                Free Vedic astrology calculators with the method in view
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-700">
                Jyotish Desk brings birth charts, Janam Kundli, Navamsa, dasha,
                matching, strength and Muhurat into focused tools. Birthplace,
                timezone, ayanamsha, house system and node settings remain visible
                so a result can be checked—not merely accepted.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/vedic-birth-chart-calculator"
                  className="inline-flex min-h-12 items-center rounded bg-[#681414] px-5 py-3 text-sm font-bold text-white hover:bg-[#8d1f1f]"
                >
                  Calculate a Vedic birth chart
                </Link>
                <Link
                  href="/hi/janam-kundli"
                  hrefLang="hi-IN"
                  className="inline-flex min-h-12 items-center rounded border border-[#b98a2f] bg-white px-5 py-3 text-sm font-bold text-[#681414] hover:bg-amber-50"
                >
                  हिंदी जन्म कुंडली
                </Link>
              </div>
            </div>

            <div className="border-y border-amber-300 bg-white p-6">
              <p className="text-sm font-bold text-[#681414]">Calculation defaults</p>
              <dl className="mt-5 grid gap-4 text-sm">
                {[
                  ["Zodiac", "Sidereal"],
                  ["Ayanamsha", "Lahiri, Raman or KP"],
                  ["Nodes", "Mean or true"],
                  ["Charts", "North, South or East Indian"],
                  ["Privacy", "No account required"],
                ].map(([term, detail]) => (
                  <div key={term} className="flex justify-between gap-4 border-b border-amber-100 pb-3 last:border-0 last:pb-0">
                    <dt className="text-stone-500">{term}</dt>
                    <dd className="text-right font-semibold text-stone-800">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
            <h2 className="font-serif text-3xl font-bold text-[#4e1010] sm:text-4xl">
              One search intent, one complete calculator
            </h2>
            <div className="mt-8 grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredRoutes.map((route) => {
                const page = SEO_PAGE_CONTENT[route];
                return (
                  <Link
                    key={route}
                    href={route}
                    className="group border-t border-amber-200 py-6"
                  >
                    <h3 className="text-xl font-bold text-[#681414] group-hover:underline group-hover:underline-offset-4">
                      {page.h1}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-stone-600">
                      {page.intro}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-amber-200 bg-[#fff7df]">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <h2 className="font-serif text-3xl font-bold text-[#4e1010] sm:text-4xl">
                  Go straight to the layer you need
                </h2>
                <p className="mt-5 text-base leading-7 text-stone-700">
                  Specialist pages request the relevant calculation module and
                  open on its result, while keeping the full birth record and
                  settings available for verification.
                </p>
              </div>
              <div className="grid gap-x-8 sm:grid-cols-2">
                {specialistRoutes.map((route) => {
                  const page = SEO_PAGE_CONTENT[route];
                  return (
                    <Link
                      key={route}
                      href={route}
                      className="border-t border-amber-300 py-5 text-sm font-bold text-[#681414] hover:underline hover:underline-offset-4"
                    >
                      {page.h1}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#4e1010] sm:text-4xl">
                A different chart is often a different setting
              </h2>
              <p className="mt-5 text-base leading-8 text-stone-700">
                Timezone history, coordinates, daylight saving, ayanamsha, house
                system and node convention can all create visible differences.
                Our comparison guide shows what to check before calling one chart
                right and another wrong.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                <Link
                  href="/learn/why-kundli-calculators-differ"
                  className="inline-flex min-h-11 items-center font-bold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
                >
                  Read why Kundli calculators differ
                </Link>
                <Link
                  href="/learn"
                  className="inline-flex min-h-11 items-center font-bold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
                >
                  Browse every calculation guide
                </Link>
              </div>
            </div>
            <aside className="border-y border-amber-200 bg-[#fffaf0] p-6 text-sm leading-7 text-stone-700">
              <h2 className="text-lg font-bold text-[#681414]">A responsible scope</h2>
              <p className="mt-3">
                Vedic astrology is a cultural and interpretive tradition. These
                calculators support study and personal reflection; they do not
                provide medical, legal, financial, or other professional advice.
                Birth-time uncertainty should remain visible in any interpretation.
              </p>
            </aside>
          </div>
        </section>

        <section className="border-t border-amber-200 bg-[#fff7df]">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <h2 className="max-w-3xl font-serif text-3xl font-bold text-[#4e1010] sm:text-4xl">
              See how calculations, content and birth data are handled
            </h2>
            <div className="mt-8 grid gap-x-8 md:grid-cols-3">
              {[
                {
                  href: "/methodology",
                  title: "Calculation methodology",
                  body: "Review the supported settings, data flow and limitations behind every calculator.",
                },
                {
                  href: "/editorial-policy",
                  title: "Editorial policy",
                  body: "See how educational content is written, reviewed, corrected and dated.",
                },
                {
                  href: "/privacy",
                  title: "Privacy and birth data",
                  body: "Understand API processing, browser-saved charts, exports and user controls.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-t border-amber-300 py-6"
                >
                  <h3 className="text-lg font-bold text-[#681414] hover:underline hover:underline-offset-4">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{item.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale="en-US" />
    </div>
  );
}
