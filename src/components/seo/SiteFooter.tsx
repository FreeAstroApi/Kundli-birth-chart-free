import Link from "next/link";

import {
  FOOTER_NAVIGATION,
  SITE_NAME,
  localizedNavigationRoute,
  routeLocale,
  type SiteLocale,
} from "@/lib/site";

export default function SiteFooter({ locale }: { locale: SiteLocale }) {
  const isHindi = locale === "hi-IN";

  return (
    <footer className="border-t border-amber-200 bg-[#281d18] text-stone-200">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <Link
            href={isHindi ? "/hi/janam-kundli" : "/"}
            className="font-serif text-2xl font-bold text-[#ffe6a2]"
          >
            {SITE_NAME}
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-stone-400">
            {isHindi
              ? "पारदर्शी गणना विकल्पों और स्पष्ट पद्धति के साथ जन्म कुंडली, नवांश, दशा, मिलान और मुहूर्त के उपकरण।"
              : "Birth chart, Navamsa, dasha, matching, and Muhurat tools with transparent calculation settings and plain-language methodology."}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {FOOTER_NAVIGATION.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-[#e6bd5c]">
                {isHindi ? group.titleHi : group.title}
              </h2>
              <ul className="mt-4 text-sm text-stone-300">
                {group.items.map((item) => {
                  const destination = localizedNavigationRoute(item.href, locale);
                  const destinationLocale = routeLocale(destination);
                  const crossesFromHindiToEnglish =
                    isHindi && destinationLocale !== "hi-IN";

                  return (
                    <li key={item.href}>
                      <Link
                        href={destination}
                        hrefLang={crossesFromHindiToEnglish ? destinationLocale : undefined}
                        className="inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        {isHindi ? item.labelHi : item.label}
                        {crossesFromHindiToEnglish ? " (English)" : ""}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="text-sm font-semibold text-[#e6bd5c]">
              {isHindi ? "साइट की जानकारी" : "Trust and transparency"}
            </h2>
            <ul className="mt-4 text-sm text-stone-300">
              {[
                ["/about", "About", "हमारे बारे में"],
                ["/methodology", "Methodology", "गणना पद्धति"],
                ["/editorial-policy", "Editorial policy", "संपादकीय नीति"],
                ["/privacy", "Privacy", "गोपनीयता"],
                ["/contact", "Contact", "संपर्क"],
              ].map(([href, label, labelHi]) => (
                <li key={href}>
                  <Link
                    href={href}
                    hrefLang={isHindi ? "en-US" : undefined}
                    className="inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {isHindi ? `${labelHi} (English)` : label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-5 text-xs leading-5 text-stone-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} {SITE_NAME}</p>
          <p>
            {isHindi
              ? "ज्योतिषीय परिणाम सांस्कृतिक अध्ययन और मनोरंजन के लिए हैं।"
              : "Astrology results are provided for cultural study and entertainment."}
          </p>
        </div>
      </div>
    </footer>
  );
}
