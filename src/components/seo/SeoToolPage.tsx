import type { ReactNode } from "react";
import Link from "next/link";

import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import SiteFooter from "@/components/seo/SiteFooter";
import SiteHeader from "@/components/seo/SiteHeader";
import type { SeoPageConfig } from "@/lib/seo-content";
import { SEO_CONTENT_DATE, SITE_NAME, type SeoRoute } from "@/lib/site";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildPrimaryPageJsonLd,
} from "@/lib/structured-data";

const SECTION_LABELS = {
  "en-US": {
    jumpToTool: "Use the free calculator",
    readGuide: "Read the comparison guide",
    featuresHeading: "What you can examine",
    stepsHeading: "How to use this page",
    faqHeading: "Frequently asked questions",
    relatedHeading: "Related Vedic astrology tools",
    disclaimerLabel: "Use with perspective",
  },
  "en-IN": {
    jumpToTool: "Use the free calculator",
    readGuide: "Read the comparison guide",
    featuresHeading: "What you can examine",
    stepsHeading: "How to use this page",
    faqHeading: "Frequently asked questions",
    relatedHeading: "Related Vedic astrology tools",
    disclaimerLabel: "Use with perspective",
  },
  "hi-IN": {
    jumpToTool: "मुफ़्त कैलकुलेटर खोलें",
    readGuide: "तुलना मार्गदर्शिका पढ़ें",
    featuresHeading: "आप क्या देख सकते हैं",
    stepsHeading: "इस पेज का उपयोग कैसे करें",
    faqHeading: "अक्सर पूछे जाने वाले प्रश्न",
    relatedHeading: "संबंधित वैदिक ज्योतिष उपकरण",
    disclaimerLabel: "संतुलित दृष्टिकोण रखें",
  },
} as const;

const FOCUSED_GUIDE_BY_ROUTE: Partial<Record<SeoRoute, string>> = {
  "/vedic-birth-chart-calculator": "/learn/lahiri-vs-raman-vs-kp-ayanamsha",
  "/kundli": "/learn/lahiri-vs-raman-vs-kp-ayanamsha",
  "/hi/janam-kundli": "/learn/lahiri-vs-raman-vs-kp-ayanamsha",
  "/navamsa-d9-calculator": "/learn/how-to-read-navamsa-d9",
  "/vimshottari-dasha-calculator": "/learn/current-mahadasha-antardasha",
  "/kundli-matching": "/learn/kundli-matching-score-18-of-36",
  "/hi/kundli-milan": "/learn/kundli-matching-score-18-of-36",
  "/ashtakavarga-calculator": "/learn/ashtakavarga-bav-vs-sav",
  "/shadbala-calculator": "/learn/shadbala-rupas-planetary-strength",
  "/manglik-dosha-calculator": "/learn/manglik-dosha-houses-cancellation-rules",
  "/north-indian-birth-chart-calculator": "/learn/north-vs-south-vs-east-indian-charts",
  "/south-indian-birth-chart-calculator": "/learn/north-vs-south-vs-east-indian-charts",
  "/east-indian-birth-chart-calculator": "/learn/north-vs-south-vs-east-indian-charts",
};

export default function SeoToolPage({
  config,
  calculator,
}: {
  config: SeoPageConfig;
  calculator: ReactNode;
}) {
  const labels = SECTION_LABELS[config.locale];
  const hasCalculator = config.kind === "tool" && calculator !== null;
  const focusedGuide =
    FOCUSED_GUIDE_BY_ROUTE[config.route] ??
    "/learn/why-kundli-calculators-differ";

  return (
    <div lang={config.locale} className="min-h-screen bg-[#fffaf0] text-[#1c1712]">
      <JsonLd
        id="primary-page-jsonld"
        data={buildPrimaryPageJsonLd(config)}
      />
      <JsonLd
        id="breadcrumb-jsonld"
        data={buildBreadcrumbJsonLd(config)}
      />
      <JsonLd id="faq-jsonld" data={buildFaqJsonLd(config)} />

      <SiteHeader
        locale={config.locale}
        languageAlternates={config.languageAlternates}
      />

      <main id="main-content">
        <section className="border-b border-amber-200 bg-[#fffdf7]">
          <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:py-12 lg:px-8 lg:py-16">
            <Breadcrumbs items={config.breadcrumbs} locale={config.locale} />

            <div className="mt-8 max-w-4xl">
              <h1 className="max-w-4xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#4e1010] sm:text-5xl lg:text-6xl">
                {config.h1}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-stone-700 sm:text-lg">
                {config.intro}
              </p>
              {config.kind === "guide" ? (
                <p className="mt-4 text-sm font-semibold text-stone-500">
                  Published {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  }).format(new Date(`${SEO_CONTENT_DATE}T00:00:00Z`))} · {SITE_NAME}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold">
                {!hasCalculator ? (
                  <Link
                    href="/vedic-birth-chart-calculator"
                    className="text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-[#8d1f1f]"
                  >
                    {labels.jumpToTool}
                  </Link>
                ) : null}
                {config.kind === "tool" ? (
                  <Link
                    href={focusedGuide}
                    className="text-sm font-bold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-[#8d1f1f]"
                  >
                    {labels.readGuide}
                    {config.locale === "hi-IN" ? " (English)" : ""}
                  </Link>
                ) : null}
              </div>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-amber-200 pt-4 text-sm text-stone-600">
                {config.trustItems.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-1 bg-[#a15e12]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {hasCalculator ? (
          <section id="calculator" className="scroll-mt-6 border-b border-amber-200 bg-[#f8edcf]">
            <div className="mx-auto w-full max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
              <div className="max-w-3xl">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-[#4e1010] sm:text-4xl">
                  {config.calculatorHeading}
                </h2>
                {config.calculatorIntro ? (
                  <p className="mt-4 text-base leading-7 text-stone-700">
                    {config.calculatorIntro}
                  </p>
                ) : null}
              </div>

              <div className="mt-8 overflow-hidden border-y border-[#d8bd72] bg-[#fffdf7]">
                {calculator}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-white">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-20">
            <div>
              <h2 className="max-w-xl font-serif text-3xl font-bold tracking-tight text-[#4e1010] sm:text-4xl">
                {config.methodologyHeading}
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-stone-700">
              {config.methodology.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-amber-200 bg-[#fff7df]">
          <div className="mx-auto w-full max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#4e1010] sm:text-4xl">
              {labels.featuresHeading}
            </h2>
            <div className="mt-8 grid gap-x-8 md:grid-cols-2">
              {config.features.map((feature, index) => (
                <article
                  key={feature.title}
                  className="grid grid-cols-[2rem_1fr] gap-4 border-t border-amber-300 py-6"
                >
                  <span className="font-mono text-sm font-bold text-[#a15e12]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#681414]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {feature.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto w-full max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#4e1010] sm:text-4xl">
              {labels.stepsHeading}
            </h2>
            <ol className="mt-8 max-w-4xl divide-y divide-amber-200 border-y border-amber-200">
              {config.steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-4 py-6">
                  <span className="font-mono text-sm font-bold text-[#a15e12]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#681414]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-amber-200 bg-[#fffaf0]">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.7fr_1.3fr] lg:px-8 lg:py-20">
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#4e1010] sm:text-4xl">
                {labels.faqHeading}
              </h2>
            </div>
            <div className="divide-y divide-amber-200 border-y border-amber-200">
              {config.faqs.map((faq, index) => (
                <details key={faq.question} className="group" open={index === 0}>
                  <summary className="flex min-h-12 cursor-pointer list-none items-start justify-between gap-4 py-4 text-base font-bold text-[#681414] marker:content-none">
                    <span>{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className="mt-1 text-xl leading-none text-[#b27619] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-5 pt-1 text-sm leading-7 text-stone-700">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto w-full max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#4e1010] sm:text-4xl">
              {labels.relatedHeading}
            </h2>
            <div className="mt-8 grid gap-x-8 md:grid-cols-2">
              {config.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group border-t border-amber-200 py-5"
                >
                  <h3 className="font-bold text-[#681414] group-hover:underline group-hover:underline-offset-4">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <aside className="border-t border-amber-200 bg-[#f4e7c5]">
          <div className="mx-auto w-full max-w-7xl px-5 py-8 lg:px-8">
            <p className="text-sm font-bold text-[#8d1f1f]">
              {labels.disclaimerLabel}
            </p>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-stone-700">
              {config.disclaimer}
            </p>
          </div>
        </aside>
      </main>

      <SiteFooter locale={config.locale} />
    </div>
  );
}
