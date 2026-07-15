import type { Metadata } from "next";
import Link from "next/link";

import { SITE_NAME, SITE_URL } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { absolute: `Page not found | ${SITE_NAME}` },
  description: "The requested Jyotish Desk page does not exist.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function GlobalNotFound() {
  return (
    <html lang="en-US" className="h-full antialiased">
      <body className="grid min-h-full place-items-center bg-[#fffaf0] px-5 text-[#1c1712]">
        <main className="w-full max-w-2xl rounded border border-amber-200 bg-white p-8 text-center sm:p-12">
          <p className="text-sm font-bold text-[#8d1f1f]">
            Error 404
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-[#4e1010]">
            This page is not in the chart
          </h1>
          <p className="mx-auto mt-5 max-w-lg leading-7 text-stone-600">
            The address may have changed or the page may never have existed. Return to the calculators or browse the calculation guides.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded bg-[#681414] px-5 py-3 text-sm font-bold text-white hover:bg-[#8d1f1f]"
            >
              Go to the homepage
            </Link>
            <Link
              href="/learn"
              className="rounded border border-[#b98a2f] bg-[#fff7df] px-5 py-3 text-sm font-bold text-[#681414]"
            >
              Browse guides
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
