import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import SiteFooter from "@/components/seo/SiteFooter";
import SiteHeader from "@/components/seo/SiteHeader";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export type TrustPagePath =
  | "/about"
  | "/privacy"
  | "/methodology"
  | "/editorial-policy"
  | "/contact";

type SummaryItem = {
  title: string;
  description: string;
};

const TRUST_LINKS: readonly { href: TrustPagePath; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/methodology", label: "Methodology" },
  { href: "/privacy", label: "Privacy" },
  { href: "/editorial-policy", label: "Editorial policy" },
  { href: "/contact", label: "Contact" },
];

export function buildTrustPageMetadata({
  path,
  title,
  description,
}: {
  path: TrustPagePath;
  title: string;
  description: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          alt: title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function TrustSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 border-b border-amber-100 pb-11 last:border-0 last:pb-0">
      <h2 className="font-serif text-2xl font-bold tracking-tight text-[#4e1010] sm:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-5 text-base leading-8 text-stone-700">
        {children}
      </div>
    </section>
  );
}

export function TrustNotice({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded border border-[#d8bd72] bg-[#fff7df] p-5 sm:p-6">
      <p className="text-sm font-bold text-[#8d1f1f]">
        {title}
      </p>
      <div className="mt-3 space-y-3 text-sm leading-7 text-stone-700">
        {children}
      </div>
    </div>
  );
}

export default function TrustPage({
  currentPath,
  eyebrow,
  title,
  intro,
  summaryItems,
  children,
}: {
  currentPath: TrustPagePath;
  eyebrow: string;
  title: string;
  intro: string;
  summaryItems: readonly SummaryItem[];
  children: ReactNode;
}) {
  return (
    <div lang="en-US" className="min-h-screen bg-[#fffaf0] text-[#1c1712]">
      <SiteHeader locale="en-US" />

      <main id="main-content">
        <section className="border-b border-amber-200 bg-[#fffdf7]">
          <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:py-14 lg:px-8 lg:py-20">
            <nav aria-label="Breadcrumb" className="text-sm text-stone-600">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="font-semibold text-[#681414] underline-offset-4 hover:underline"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-amber-600">
                  /
                </li>
                <li aria-current="page">{eyebrow}</li>
              </ol>
            </nav>

            <div className="mt-10 max-w-4xl">
              <h1 className="max-w-4xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#4e1010] sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-stone-700 sm:text-lg">
                {intro}
              </p>
            </div>
          </div>
        </section>

        <section aria-label="Page summary" className="border-b border-amber-200 bg-white">
          <div className="mx-auto grid w-full max-w-7xl divide-y divide-amber-100 px-5 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
            {summaryItems.map((item) => (
              <div
                key={item.title}
                className="py-5 md:px-6 md:first:pl-0 md:last:pr-0"
              >
                <p className="text-sm font-bold text-[#a15e12]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-700">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-8 lg:py-20">
            <article className="space-y-11">{children}</article>

            <aside className="self-start lg:sticky lg:top-6">
              <div className="border-y border-amber-200 bg-[#fffaf0] p-5">
                <h2 className="font-serif text-xl font-bold text-[#4e1010]">
                  Trust and transparency
                </h2>
                <nav aria-label="Trust pages" className="mt-5">
                  <ul className="divide-y divide-amber-100 border-y border-amber-100 text-sm">
                    {TRUST_LINKS.map((item) => {
                      const isCurrent = item.href === currentPath;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={isCurrent ? "page" : undefined}
                            className={`flex min-h-11 items-center py-3 font-semibold underline-offset-4 hover:text-[#8d1f1f] hover:underline ${
                              isCurrent ? "text-[#8d1f1f]" : "text-stone-700"
                            }`}
                          >
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              <div className="mt-5 border-y border-[#d8bd72] bg-[#681414] p-5 text-white">
                <p className="text-sm font-bold text-[#ffe6a2]">
                  See the settings
                </p>
                <p className="mt-3 text-sm leading-6 text-red-50">
                  Open the birth chart tool to inspect the location, timezone,
                  ayanamsha, house and node controls before calculating.
                </p>
                <Link
                  href="/vedic-birth-chart-calculator"
                  className="mt-2 inline-flex min-h-11 items-center text-sm font-bold text-white underline decoration-amber-300 decoration-2 underline-offset-4"
                >
                  Open the calculator
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter locale="en-US" />
    </div>
  );
}
