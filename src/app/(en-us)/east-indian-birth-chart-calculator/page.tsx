import SeoRoutePage from "@/components/seo/SeoRoutePage";
import { buildSeoMetadata } from "@/lib/seo";
import { SEO_PAGE_CONTENT } from "@/lib/seo-content";

const route = "/east-indian-birth-chart-calculator" as const;

export const metadata = buildSeoMetadata(SEO_PAGE_CONTENT[route]);

export default function EastIndianBirthChartCalculatorPage() {
  return <SeoRoutePage route={route} />;
}
