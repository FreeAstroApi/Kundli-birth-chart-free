import type { Metadata } from "next";

import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

const defaultTitle =
  "Free Vedic Birth Chart Calculator – Kundli, D9 & Dasha";
const defaultDescription =
  "Create a free Vedic birth chart with Kundli, Navamsa D9, Vimshottari Dasha, yogas, Shadbala, Ashtakavarga and Indian chart styles.";
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const bingSiteVerification = process.env.BING_SITE_VERIFICATION?.trim();

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  authors: [{ name: `${SITE_NAME} editorial team`, url: absoluteUrl("/editorial-policy") }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Vedic astrology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
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
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        alt: `${SITE_NAME} Vedic astrology calculators`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  ...(googleSiteVerification || bingSiteVerification
    ? {
        verification: {
          ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
          ...(bingSiteVerification
            ? { other: { "msvalidate.01": bingSiteVerification } }
            : {}),
        },
      }
    : {}),
};
