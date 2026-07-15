import Link from "next/link";

import JsonLd from "@/components/seo/JsonLd";
import SiteFooter from "@/components/seo/SiteFooter";
import SiteHeader from "@/components/seo/SiteHeader";
import type { LongtailGuide } from "@/lib/longtail-guides";
import { absoluteUrl, SEO_CONTENT_DATE, SITE_NAME } from "@/lib/site";

export default function LongtailGuidePage({
  guide,
}: {
  guide: LongtailGuide;
}) {
  const path = `/learn/${guide.slug}`;

  return (
    <div className="min-h-screen bg-[#fffaf0] text-[#1c1712]">
      <JsonLd
        id="article-jsonld"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.h1,
          description: guide.metaDescription,
          datePublished: SEO_CONTENT_DATE,
          dateModified: SEO_CONTENT_DATE,
          inLanguage: "en-US",
          mainEntityOfPage: absoluteUrl(path),
          author: {
            "@type": "Organization",
            name: `${SITE_NAME} editorial team`,
            url: absoluteUrl("/editorial-policy"),
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: absoluteUrl("/"),
          },
        }}
      />
      <JsonLd
        id="breadcrumb-jsonld"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: absoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Learn",
              item: absoluteUrl("/learn"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: guide.h1,
              item: absoluteUrl(path),
            },
          ],
        }}
      />

      <SiteHeader locale="en-US" />

      <main id="main-content">
        <article>
          <header className="border-b border-amber-200 bg-[#fffdf7]">
            <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-20">
              <nav aria-label="Breadcrumb" className="text-sm text-stone-600">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="font-semibold text-[#681414] hover:underline">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/learn" className="font-semibold text-[#681414] hover:underline">
                      Learn
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">{guide.h1}</li>
                </ol>
              </nav>

              <h1 className="mt-10 max-w-4xl font-serif text-4xl font-bold leading-tight tracking-tight text-[#4e1010] sm:text-5xl lg:text-6xl">
                {guide.h1}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-700">
                {guide.intro}
              </p>
              <p className="mt-5 text-sm font-semibold text-stone-500">
                Published July 13, 2026 · Reviewed by the {SITE_NAME} editorial team
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold">
                <Link
                  href="/methodology"
                  className="inline-flex min-h-11 items-center text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
                >
                  Calculation methodology
                </Link>
                <Link
                  href="/editorial-policy"
                  className="inline-flex min-h-11 items-center text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
                >
                  Editorial policy
                </Link>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-16">
            <aside className="border-y border-amber-300 bg-[#fff7df] p-6">
              <p className="text-sm font-bold text-[#8d1f1f]">
                Key takeaway
              </p>
              <p className="mt-3 text-base font-semibold leading-7 text-stone-800">
                {guide.takeaway}
              </p>
            </aside>

            <div className="mt-12 space-y-12">
              {guide.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-[#4e1010]">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-8 text-stone-700">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 border-t border-amber-200 py-3 text-sm font-semibold leading-6 text-stone-700"
                        >
                          <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-[#a15e12]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <section className="mt-16 border-y border-amber-200 py-12">
              <h2 className="font-serif text-3xl font-bold text-[#4e1010]">
                Frequently asked questions
              </h2>
              <div className="mt-7 divide-y divide-amber-200 border-y border-amber-200">
                {guide.faqs.map((faq, index) => (
                  <details key={faq.question} open={index === 0}>
                    <summary className="flex min-h-12 cursor-pointer items-center py-4 font-bold text-[#681414]">
                      {faq.question}
                    </summary>
                    <p className="max-w-3xl pb-5 pt-1 text-sm leading-7 text-stone-700">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="font-serif text-3xl font-bold text-[#4e1010]">
                Related calculators and guides
              </h2>
              <div className="mt-7 grid gap-x-8 md:grid-cols-3">
                {guide.related.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-t border-amber-200 py-5"
                  >
                    <h3 className="font-bold text-[#681414] hover:underline hover:underline-offset-4">{item.label}</h3>
                    <p className="mt-3 text-sm leading-6 text-stone-600">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <aside className="mt-14 border-y border-amber-200 bg-[#f4e7c5] p-6 text-sm leading-7 text-stone-700">
              Vedic astrology is a cultural and interpretive tradition, not a scientifically validated prediction system. This guide supports transparent study and should not replace medical, legal, financial, relationship-safety or other professional advice.
            </aside>
          </div>
        </article>
      </main>

      <SiteFooter locale="en-US" />
    </div>
  );
}
