import type { Metadata } from "next";
import Link from "next/link";

import TrustPage, {
  buildTrustPageMetadata,
  TrustNotice,
  TrustSection,
} from "@/components/seo/TrustPage";

export const metadata: Metadata = buildTrustPageMetadata({
  path: "/about",
  title: "About Jyotish Desk – Transparent Vedic Astrology Tools",
  description:
    "Learn what Jyotish Desk is, how its Kundli tools use FreeAstroAPI, what stays in your browser, and where the service's limits begin.",
});

export default function AboutPage() {
  return (
    <TrustPage
      currentPath="/about"
      eyebrow="About the project"
      title="A chart desk built to keep the method visible"
      intro="Jyotish Desk is the working name of this web project: a focused set of Vedic astrology calculators that shows the location, timezone and calculation choices behind a result. This page explains the product without implying credentials, independence or data practices that the code does not support."
      summaryItems={[
        {
          title: "Purpose",
          description:
            "Practical Kundli tools with inputs and calculation settings kept in view.",
        },
        {
          title: "Calculation service",
          description:
            "Interactive calculations and city search are sent server-side to FreeAstroAPI.",
        },
        {
          title: "Access model",
          description:
            "No account is required; optional saved charts stay in this browser.",
        },
      ]}
    >
      <TrustSection title="What Jyotish Desk is">
        <p>
          Jyotish Desk brings birth charts, Janam Kundli, Navamsa D9,
          Vimshottari Dasha, matching, strength, dosha and Muhurat views into one
          web interface. The project is designed as a usable calculator and as a
          starting point that can be cloned and configured by another site
          operator. The name “Jyotish Desk” identifies the product shown here; it
          is not a claim that the site is a professional association, a research
          institution or a licensed advisory practice.
        </p>
        <p>
          The public explanatory pages are rendered by the site, while the
          interactive workspace lets a visitor choose inputs and request a
          calculation. The aim is straightforward: make it easier to see which
          birth record and settings produced a chart instead of presenting an
          unexplained result as authoritative.
        </p>
      </TrustSection>

      <TrustSection title="How a calculation moves through the service">
        <p>
          The browser sends chart, matching, Muhurat and city-search requests to
          this site’s own Next.js route handlers. Those server routes proxy the
          relevant information to FreeAstroAPI and return the response to the
          browser. The FreeAstroAPI key is read from a server environment
          variable and is not intentionally included in browser code or request
          forms.
        </p>
        <p>
          Jyotish Desk arranges the returned information into visual charts,
          tables and report sections. Depending on the tool, a request can cover
          the main Vedic chart, a rendered D1/D9 image, dasha, yogas, strength,
          divisional charts, panchang, matching or ranked Muhurat windows. The
          supported controls and route defaults are listed on the{
          " "}
          <Link
            href="/methodology"
            className="font-semibold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            methodology page
          </Link>
          .
        </p>
        <TrustNotice title="Important boundary">
          <p>
            The calculation engine is FreeAstroAPI. Jyotish Desk does not claim
            a particular ephemeris library, independent astronomical engine or
            external certification for those calculations.
          </p>
        </TrustNotice>
      </TrustSection>

      <TrustSection title="What is saved, and where">
        <p>
          No sign-up is required. When a visitor deliberately saves a chart, the
          application writes the chart form, selected options, returned result,
          consultation notes and timestamps to IndexedDB in the current browser
          profile. There is no account sync in this build. A saved chart on one
          browser should not be expected to appear on another device or profile.
        </p>
        <p>
          JSON export and printing are also visitor-directed actions. Selecting
          export creates a local JSON download; selecting print or “Save as PDF”
          opens the browser’s print flow. Once a file is downloaded, printed or
          stored as a PDF, it is outside the site’s browser database and is the
          visitor’s responsibility to protect or delete.
        </p>
        <p>
          Calculations themselves are not browser-only: the data needed for an
          interactive request passes through the site server and the upstream
          API. The{
          " "}
          <Link
            href="/privacy"
            className="font-semibold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            privacy page
          </Link>{" "}
          separates local storage from calculation traffic and explains why the
          project does not promise that infrastructure logs never exist.
        </p>
      </TrustSection>

      <TrustSection title="What transparency means here">
        <ul className="space-y-3 pl-5 marker:text-[#a15e12]">
          <li>
            Keep the birthplace, coordinates, timezone, ayanamsha, house system
            and lunar-node choice visible where the interface supports them.
          </li>
          <li>
            State when a feature relies on FreeAstroAPI rather than suggesting
            that every calculation is performed inside this website.
          </li>
          <li>
            Separate browser-saved records from data sent for a calculation and
            make exports an explicit user action.
          </li>
          <li>
            Describe astrology as a cultural and interpretive tradition, not as
            established science or a source of guaranteed outcomes.
          </li>
          <li>
            Publish corrections when product behavior or factual explanatory
            copy is shown to be wrong.
          </li>
        </ul>
        <p>
          Transparency does not make two calculators identical. Small changes to
          time or coordinates, a different ayanamsha, a different house system,
          mean instead of true nodes, or an upstream implementation change can
          alter a result. The guide to{
          " "}
          <Link
            href="/learn/why-kundli-calculators-differ"
            className="font-semibold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            why Kundli calculators differ
          </Link>{" "}
          gives a practical comparison checklist.
        </p>
      </TrustSection>

      <TrustSection title="Limits and responsible use">
        <p>
          Astrology is not scientifically established as a way to predict events
          or determine personal traits. Jyotish Desk provides these tools for
          cultural study, personal exploration and entertainment. A chart or
          interpretation should not replace medical, mental-health, legal,
          financial, safety or other qualified professional advice.
        </p>
        <p>
          The service also depends on network access and an upstream provider.
          Requests can fail, time out, be rate-limited or change when the
          provider changes its response. Visitors should preserve the inputs and
          settings needed to reproduce any result that matters to their own
          comparison or study.
        </p>
        <p>
          Site explanations are currently authored and reviewed under the
          Jyotish Desk organization-level byline. No named astrologer, scientist
          or independent external reviewer is claimed. See the{
          " "}
          <Link
            href="/editorial-policy"
            className="font-semibold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            editorial policy
          </Link>{" "}
          for the review and correction standard.
        </p>
      </TrustSection>
    </TrustPage>
  );
}
