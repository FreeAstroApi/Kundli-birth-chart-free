import type { MetadataRoute } from "next";

import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} – Vedic Birth Chart Calculator`,
    short_name: SITE_NAME,
    description:
      "Free Vedic astrology calculators for Kundli, Navamsa D9, Vimshottari Dasha, matching and Indian birth charts.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f3eb",
    theme_color: "#7c2d12",
    lang: "en-US",
    categories: ["education", "utilities"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
