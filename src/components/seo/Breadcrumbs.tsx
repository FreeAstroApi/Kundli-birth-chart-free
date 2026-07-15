import Link from "next/link";

import type { SeoBreadcrumb } from "@/lib/seo-content";
import type { SiteLocale } from "@/lib/site";

export default function Breadcrumbs({
  items,
  locale,
}: {
  items: readonly SeoBreadcrumb[];
  locale: SiteLocale;
}) {
  return (
    <nav
      aria-label={locale === "hi-IN" ? "ब्रेडक्रंब" : "Breadcrumb"}
      className="text-sm text-stone-500"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-amber-500">
                  /
                </span>
              ) : null}
              {item.href && !isCurrent ? (
                <Link
                  href={item.href}
                  className="underline-offset-4 hover:text-[#681414] hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isCurrent ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
