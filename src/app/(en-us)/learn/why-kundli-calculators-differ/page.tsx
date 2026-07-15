import SeoToolPage from "@/components/seo/SeoToolPage";
import { buildSeoMetadata } from "@/lib/seo";
import { SEO_PAGE_CONTENT } from "@/lib/seo-content";

const route = "/learn/why-kundli-calculators-differ" as const;

export const metadata = buildSeoMetadata(SEO_PAGE_CONTENT[route]);

export default function WhyKundliCalculatorsDifferPage() {
  return <SeoToolPage config={SEO_PAGE_CONTENT[route]} calculator={null} />;
}
