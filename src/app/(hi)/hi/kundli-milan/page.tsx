import SeoRoutePage from "@/components/seo/SeoRoutePage";
import { buildSeoMetadata } from "@/lib/seo";
import { SEO_PAGE_CONTENT } from "@/lib/seo-content";

const route = "/hi/kundli-milan" as const;

export const metadata = buildSeoMetadata(SEO_PAGE_CONTENT[route]);

export default function HindiKundliMilanPage() {
  return <SeoRoutePage route={route} />;
}
