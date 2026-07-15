import type { MetadataRoute } from "next";

import {
  absoluteUrl,
  LONGTAIL_LEARN_ROUTES,
  REQUESTED_ROUTES,
  SEO_CONTENT_DATE,
  TRUST_ROUTES,
  type SeoRoute,
} from "@/lib/site";

const kundliLanguages = {
  "en-US": absoluteUrl("/vedic-birth-chart-calculator"),
  "en-IN": absoluteUrl("/kundli"),
  "hi-IN": absoluteUrl("/hi/janam-kundli"),
  "x-default": absoluteUrl("/vedic-birth-chart-calculator"),
};

const matchingLanguages = {
  "en-IN": absoluteUrl("/kundli-matching"),
  "hi-IN": absoluteUrl("/hi/kundli-milan"),
  "x-default": absoluteUrl("/kundli-matching"),
};

const panchangLanguages = {
  "en-IN": absoluteUrl("/panchang-today"),
  "hi-IN": absoluteUrl("/hi/aaj-ka-panchang"),
  "x-default": absoluteUrl("/panchang-today"),
};

const dailyMuhuratLanguages = {
  "en-IN": absoluteUrl("/daily-muhurat-timings"),
  "hi-IN": absoluteUrl("/hi/aaj-ka-muhurat"),
  "x-default": absoluteUrl("/daily-muhurat-timings"),
};

const languageAlternates: Partial<
  Record<SeoRoute, Record<string, string>>
> = {
  "/vedic-birth-chart-calculator": kundliLanguages,
  "/kundli": kundliLanguages,
  "/hi/janam-kundli": kundliLanguages,
  "/kundli-matching": matchingLanguages,
  "/hi/kundli-milan": matchingLanguages,
  "/panchang-today": panchangLanguages,
  "/hi/aaj-ka-panchang": panchangLanguages,
  "/daily-muhurat-timings": dailyMuhuratLanguages,
  "/hi/aaj-ka-muhurat": dailyMuhuratLanguages,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${SEO_CONTENT_DATE}T00:00:00Z`);

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
    },
    ...REQUESTED_ROUTES.map((route) => {
      const alternates = languageAlternates[route];

      return {
        url: absoluteUrl(route),
        lastModified,
        ...(alternates
          ? {
              alternates: {
                languages: alternates,
              },
            }
        : {}),
      };
    }),
    ...LONGTAIL_LEARN_ROUTES.map((route) => ({
      url: absoluteUrl(route),
      lastModified,
    })),
    ...TRUST_ROUTES.map((route) => ({
      url: absoluteUrl(route),
      lastModified,
    })),
  ];
}
