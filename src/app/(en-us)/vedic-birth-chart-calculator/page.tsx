import SeoRoutePage from "@/components/seo/SeoRoutePage";

import { SEO_PAGE_CONTENT } from "@/lib/seo-content";
import { buildSeoMetadata } from "@/lib/seo";

const route = "/vedic-birth-chart-calculator" as const;

export const metadata = buildSeoMetadata(SEO_PAGE_CONTENT[route]);

export default function VedicBirthChartCalculatorPage() {
  return <SeoRoutePage route={route} />;
}
