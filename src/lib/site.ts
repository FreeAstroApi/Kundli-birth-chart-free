export const SITE_NAME = "Jyotish Desk";
export const SEO_CONTENT_DATE = "2026-07-13";

const FALLBACK_SITE_URL = "https://kundli-birth-chart-free.vercel.app";

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) return FALLBACK_SITE_URL;

  try {
    return new URL(value).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL,
);

export const REQUESTED_ROUTES = [
  "/vedic-birth-chart-calculator",
  "/kundli",
  "/hi/janam-kundli",
  "/navamsa-d9-calculator",
  "/vimshottari-dasha-calculator",
  "/kundli-matching",
  "/hi/kundli-milan",
  "/ashtakavarga-calculator",
  "/shadbala-calculator",
  "/manglik-dosha-calculator",
  "/muhurat",
  "/panchang-today",
  "/hi/aaj-ka-panchang",
  "/daily-muhurat-timings",
  "/hi/aaj-ka-muhurat",
  "/vedic-transit-calculator",
  "/nakshatra-calculator",
  "/dashamsa-d10-calculator",
  "/north-indian-birth-chart-calculator",
  "/south-indian-birth-chart-calculator",
  "/east-indian-birth-chart-calculator",
  "/learn/why-kundli-calculators-differ",
] as const;

export type SeoRoute = (typeof REQUESTED_ROUTES)[number];
export type SiteLocale = "en-US" | "en-IN" | "hi-IN";

export const ROUTE_LOCALES: Record<SeoRoute, SiteLocale> = {
  "/vedic-birth-chart-calculator": "en-US",
  "/kundli": "en-IN",
  "/hi/janam-kundli": "hi-IN",
  "/navamsa-d9-calculator": "en-US",
  "/vimshottari-dasha-calculator": "en-US",
  "/kundli-matching": "en-IN",
  "/hi/kundli-milan": "hi-IN",
  "/ashtakavarga-calculator": "en-IN",
  "/shadbala-calculator": "en-IN",
  "/manglik-dosha-calculator": "en-IN",
  "/muhurat": "en-IN",
  "/panchang-today": "en-IN",
  "/hi/aaj-ka-panchang": "hi-IN",
  "/daily-muhurat-timings": "en-IN",
  "/hi/aaj-ka-muhurat": "hi-IN",
  "/vedic-transit-calculator": "en-US",
  "/nakshatra-calculator": "en-IN",
  "/dashamsa-d10-calculator": "en-IN",
  "/north-indian-birth-chart-calculator": "en-US",
  "/south-indian-birth-chart-calculator": "en-US",
  "/east-indian-birth-chart-calculator": "en-US",
  "/learn/why-kundli-calculators-differ": "en-US",
};

export function routeLocale(route: SeoRoute): SiteLocale {
  return ROUTE_LOCALES[route];
}

export const TRUST_ROUTES = [
  "/about",
  "/privacy",
  "/methodology",
  "/editorial-policy",
  "/contact",
] as const;

export const LONGTAIL_LEARN_ROUTES = [
  "/learn",
  "/learn/lahiri-vs-raman-vs-kp-ayanamsha",
  "/learn/how-to-read-navamsa-d9",
  "/learn/current-mahadasha-antardasha",
  "/learn/kundli-matching-score-18-of-36",
  "/learn/manglik-dosha-houses-cancellation-rules",
  "/learn/ashtakavarga-bav-vs-sav",
  "/learn/shadbala-rupas-planetary-strength",
  "/learn/north-vs-south-vs-east-indian-charts",
] as const;

const HINDI_EQUIVALENTS: Partial<Record<SeoRoute, SeoRoute>> = {
  "/vedic-birth-chart-calculator": "/hi/janam-kundli",
  "/kundli": "/hi/janam-kundli",
  "/kundli-matching": "/hi/kundli-milan",
  "/panchang-today": "/hi/aaj-ka-panchang",
  "/daily-muhurat-timings": "/hi/aaj-ka-muhurat",
};

export function localizedNavigationRoute(
  route: SeoRoute,
  locale: SiteLocale,
): SeoRoute {
  return locale === "hi-IN" ? (HINDI_EQUIVALENTS[route] ?? route) : route;
}

export type NavigationItem = {
  href: SeoRoute;
  label: string;
  labelHi?: string;
};

export const PRIMARY_NAVIGATION: readonly NavigationItem[] = [
  {
    href: "/vedic-birth-chart-calculator",
    label: "Birth chart",
    labelHi: "जन्म कुंडली",
  },
  {
    href: "/kundli-matching",
    label: "Matching",
    labelHi: "कुंडली मिलान",
  },
  {
    href: "/navamsa-d9-calculator",
    label: "Navamsa D9",
    labelHi: "नवांश D9",
  },
  {
    href: "/vimshottari-dasha-calculator",
    label: "Dasha",
    labelHi: "विंशोत्तरी दशा",
  },
  { href: "/muhurat", label: "Muhurat", labelHi: "मुहूर्त" },
  {
    href: "/panchang-today",
    label: "Panchang",
    labelHi: "आज का पंचांग",
  },
] as const;

export const FOOTER_NAVIGATION = [
  {
    title: "Calculators",
    titleHi: "कैलकुलेटर",
    items: [
      { href: "/kundli", label: "Free Kundli", labelHi: "मुफ़्त कुंडली" },
      {
        href: "/ashtakavarga-calculator",
        label: "Ashtakavarga",
        labelHi: "अष्टकवर्ग",
      },
      {
        href: "/shadbala-calculator",
        label: "Shadbala",
        labelHi: "षड्बल",
      },
      {
        href: "/manglik-dosha-calculator",
        label: "Manglik Dosha",
        labelHi: "मांगलिक दोष",
      },
      {
        href: "/nakshatra-calculator",
        label: "Nakshatra",
        labelHi: "जन्म नक्षत्र",
      },
      {
        href: "/daily-muhurat-timings",
        label: "Daily timings",
        labelHi: "आज के मुहूर्त",
      },
    ],
  },
  {
    title: "Chart styles",
    titleHi: "कुंडली शैलियाँ",
    items: [
      {
        href: "/north-indian-birth-chart-calculator",
        label: "North Indian",
        labelHi: "उत्तर भारतीय",
      },
      {
        href: "/south-indian-birth-chart-calculator",
        label: "South Indian",
        labelHi: "दक्षिण भारतीय",
      },
      {
        href: "/east-indian-birth-chart-calculator",
        label: "East Indian",
        labelHi: "पूर्वी भारतीय",
      },
      {
        href: "/dashamsa-d10-calculator",
        label: "Dashamsa D10",
        labelHi: "दशमांश D10",
      },
      {
        href: "/vedic-transit-calculator",
        label: "Vedic transits",
        labelHi: "वैदिक गोचर",
      },
    ],
  },
  {
    title: "Learn",
    titleHi: "जानें",
    items: [
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "Why calculators differ",
        labelHi: "कुंडली के परिणाम अलग क्यों होते हैं",
      },
      {
        href: "/hi/janam-kundli",
        label: "Hindi Janam Kundli",
        labelHi: "हिंदी जन्म कुंडली",
      },
      {
        href: "/hi/kundli-milan",
        label: "Hindi Kundli Milan",
        labelHi: "हिंदी कुंडली मिलान",
      },
    ],
  },
] as const;

export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).toString();
}
