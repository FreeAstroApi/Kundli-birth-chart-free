import Link from "next/link";

import {
  PRIMARY_NAVIGATION,
  SITE_NAME,
  localizedNavigationRoute,
  routeLocale,
  type SeoRoute,
  type SiteLocale,
} from "@/lib/site";

type LanguageAlternates = Partial<Record<SiteLocale | "x-default", SeoRoute>>;

export default function SiteHeader({
  locale,
  languageAlternates,
}: {
  locale: SiteLocale;
  languageAlternates?: LanguageAlternates;
}) {
  const isHindi = locale === "hi-IN";
  const languageTarget = isHindi
    ? (languageAlternates?.["en-IN"] ??
      languageAlternates?.["en-US"] ??
      "/kundli")
    : (languageAlternates?.["hi-IN"] ?? "/hi/janam-kundli");
  const languageTargetLocale = isHindi
    ? languageAlternates?.["en-IN"]
      ? "en-IN"
      : "en-US"
    : "hi-IN";
  const showLanguageSwitch = Boolean(languageAlternates && languageTarget);

  return (
    <header className="relative border-b border-amber-200 bg-[#fffaf0]">
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-50 inline-flex min-h-11 -translate-y-20 items-center rounded bg-[#681414] px-4 text-sm font-bold text-white focus:translate-y-0"
      >
        {isHindi ? "मुख्य सामग्री पर जाएं" : "Skip to main content"}
      </a>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-6">
          <Link
            href={isHindi ? "/hi/janam-kundli" : "/"}
            className="inline-flex items-center text-[#681414]"
            aria-label={isHindi ? `${SITE_NAME} मुखपृष्ठ` : `${SITE_NAME} home`}
          >
            <span>
              <span className="block font-serif text-xl font-bold tracking-tight">
                {SITE_NAME}
              </span>
              <span className="block text-xs text-stone-500">
                {isHindi ? "वैदिक ज्योतिष उपकरण" : "Vedic astrology tools"}
              </span>
            </span>
          </Link>

          {showLanguageSwitch ? (
            <Link
              href={languageTarget}
              hrefLang={languageTargetLocale}
              className="inline-flex min-h-11 items-center px-2 text-xs font-bold text-[#681414] underline decoration-amber-400 underline-offset-4 lg:hidden"
            >
              {isHindi ? "English" : "हिंदी"}
            </Link>
          ) : null}
        </div>

        <nav
          aria-label={isHindi ? "मुख्य नेविगेशन" : "Primary navigation"}
          className="flex items-center gap-x-5 gap-y-2 overflow-x-auto pb-1 text-sm font-semibold text-stone-700 lg:flex-wrap lg:justify-end lg:overflow-visible lg:pb-0"
        >
          {PRIMARY_NAVIGATION.map((item) => {
            const destination = localizedNavigationRoute(item.href, locale);
            const destinationLocale = routeLocale(destination);
            const crossesFromHindiToEnglish =
              isHindi && destinationLocale !== "hi-IN";

            return (
              <Link
                key={item.href}
                href={destination}
                hrefLang={crossesFromHindiToEnglish ? destinationLocale : undefined}
                className="inline-flex min-h-11 items-center whitespace-nowrap underline-offset-4 transition-colors hover:text-[#8d1f1f] hover:underline"
              >
                {isHindi ? (item.labelHi ?? item.label) : item.label}
                {crossesFromHindiToEnglish ? " (English)" : ""}
              </Link>
            );
          })}
          <Link
            href="/learn"
            hrefLang={isHindi ? "en-US" : undefined}
            className="inline-flex min-h-11 items-center whitespace-nowrap underline-offset-4 transition-colors hover:text-[#8d1f1f] hover:underline"
          >
            {isHindi ? "जानें (English)" : "Learn"}
          </Link>
          {showLanguageSwitch ? (
            <Link
              href={languageTarget}
              hrefLang={languageTargetLocale}
              className="hidden min-h-11 items-center px-2 text-xs font-bold text-[#681414] underline decoration-amber-400 underline-offset-4 lg:inline-flex"
            >
              {isHindi ? "English" : "हिंदी"}
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
