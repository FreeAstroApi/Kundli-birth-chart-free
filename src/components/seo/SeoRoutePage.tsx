import KundliWorkspace, {
  type KundliWorkspaceProps,
} from "@/components/kundli-workspace";
import DailyLocationTool from "@/components/growth/DailyLocationTool";
import GocharCalculator from "@/components/growth/GocharCalculator";
import SeoToolPage from "@/components/seo/SeoToolPage";
import { SEO_PAGE_CONTENT } from "@/lib/seo-content";
import type { SeoRoute } from "@/lib/site";

const WORKSPACE_PROPS: Partial<Record<SeoRoute, KundliWorkspaceProps>> = {
  "/vedic-birth-chart-calculator": {
    market: "usa",
    focus: "general",
    initialStyle: "north",
  },
  "/kundli": {
    market: "india",
    focus: "general",
    initialStyle: "north",
  },
  "/hi/janam-kundli": {
    market: "india",
    locale: "hi",
    focus: "general",
    initialStyle: "north",
  },
  "/navamsa-d9-calculator": {
    market: "usa",
    focus: "navamsa",
    initialTab: "navamsa",
    initialStyle: "north",
  },
  "/vimshottari-dasha-calculator": {
    market: "usa",
    focus: "dasha",
    initialTab: "dasha",
    initialStyle: "north",
  },
  "/kundli-matching": {
    market: "india",
    initialMode: "matching",
    initialStyle: "north",
  },
  "/hi/kundli-milan": {
    market: "india",
    locale: "hi",
    initialMode: "matching",
    initialStyle: "north",
  },
  "/ashtakavarga-calculator": {
    market: "india",
    focus: "ashtakavarga",
    initialTab: "ashtakavarga",
    initialStyle: "north",
  },
  "/shadbala-calculator": {
    market: "india",
    focus: "shadbala",
    initialTab: "shadbala",
    initialStyle: "north",
  },
  "/manglik-dosha-calculator": {
    market: "india",
    focus: "manglik",
    initialTab: "manglik",
    initialStyle: "north",
  },
  "/muhurat": {
    market: "india",
    initialMode: "muhurat",
    initialStyle: "north",
  },
  "/nakshatra-calculator": {
    market: "india",
    focus: "nakshatra",
    initialTab: "nakshatra",
    initialStyle: "north",
  },
  "/dashamsa-d10-calculator": {
    market: "india",
    focus: "dashamsa",
    initialTab: "dashamsa",
    initialStyle: "north",
  },
  "/north-indian-birth-chart-calculator": {
    market: "usa",
    focus: "general",
    initialStyle: "north",
  },
  "/south-indian-birth-chart-calculator": {
    market: "usa",
    focus: "general",
    initialStyle: "south",
  },
  "/east-indian-birth-chart-calculator": {
    market: "usa",
    focus: "general",
    initialStyle: "east",
  },
};

export default function SeoRoutePage({ route }: { route: SeoRoute }) {
  const config = SEO_PAGE_CONTENT[route];
  const workspaceProps = WORKSPACE_PROPS[route];

  const calculator = workspaceProps ? (
    <KundliWorkspace {...workspaceProps} showModeNavigation={false} />
  ) : route === "/panchang-today" ? (
    <DailyLocationTool mode="panchang" locale="en" />
  ) : route === "/hi/aaj-ka-panchang" ? (
    <DailyLocationTool mode="panchang" locale="hi" />
  ) : route === "/daily-muhurat-timings" ? (
    <DailyLocationTool mode="muhurat" locale="en" />
  ) : route === "/hi/aaj-ka-muhurat" ? (
    <DailyLocationTool mode="muhurat" locale="hi" />
  ) : route === "/vedic-transit-calculator" ? (
    <GocharCalculator />
  ) : null;

  return (
    <SeoToolPage
      config={config}
      calculator={config.kind === "tool" ? calculator : null}
    />
  );
}
