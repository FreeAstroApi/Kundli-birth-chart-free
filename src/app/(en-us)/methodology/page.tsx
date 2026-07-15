import type { Metadata } from "next";
import Link from "next/link";

import TrustPage, {
  buildTrustPageMetadata,
  TrustNotice,
  TrustSection,
} from "@/components/seo/TrustPage";

export const metadata: Metadata = buildTrustPageMetadata({
  path: "/methodology",
  title: "Calculation Methodology – Kundli Settings and Data Flow",
  description:
    "Review Jyotish Desk inputs, supported ayanamsha, house and node settings, FreeAstroAPI calculation modules, defaults and reproducibility limits.",
});

export default function MethodologyPage() {
  return (
    <TrustPage
      currentPath="/methodology"
      eyebrow="Calculation methodology"
      title="Inputs, settings and the calculation boundary"
      intro="Jyotish Desk exposes the settings a visitor can control, normalizes those inputs in server routes, and sends calculation requests to FreeAstroAPI. This page documents the current interface contract at a useful level without claiming an undisclosed ephemeris engine or exposing credentials."
      summaryItems={[
        {
          title: "Controllable inputs",
          description:
            "Birth record, coordinates, timezone, ayanamsha, houses, nodes and chart style.",
        },
        {
          title: "Calculation boundary",
          description:
            "FreeAstroAPI supplies the chart and requested Vedic calculation modules.",
        },
        {
          title: "Reproducibility",
          description:
            "Compare the complete input record and settings—not only the chart image.",
        },
      ]}
    >
      <TrustSection title="Who performs the calculation">
        <p>
          Interactive tools call same-site server routes for city lookup, birth
          charts, matching and Muhurat. The routes validate and normalize the
          request, attach a server-held API key, and proxy it to FreeAstroAPI.
          The browser never needs the provider key. Jyotish Desk then presents
          the returned data in chart, table and report views.
        </p>
        <p>
          This separation matters when comparing products. The interface and
          presentation code belong to this project, while the upstream service
          is the calculation engine for the API-backed results. A visual layout
          or table assembled by Jyotish Desk should not be mistaken for a claim
          that this site maintains an independent astronomical engine.
        </p>
        <TrustNotice title="No invented ephemeris claim">
          <p>
            This project does not identify or certify a particular ephemeris
            library, including Swiss Ephemeris, for its calculations. The route
            code identifies FreeAstroAPI as the upstream service. Any statement
            about that provider’s internal astronomical implementation must come
            from the provider’s current documentation, not from inference.
          </p>
        </TrustNotice>
      </TrustSection>

      <TrustSection title="Birth-chart inputs and supported settings">
        <div className="overflow-x-auto rounded border border-amber-200">
          <table className="data-table min-w-[42rem]">
            <thead>
              <tr>
                <th>Control</th>
                <th>Current choices or behavior</th>
                <th>Why it matters</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold">Birth record</td>
                <td>Date, hour, minute and optional seconds</td>
                <td>Time changes can affect the ascendant, houses and timing layers.</td>
              </tr>
              <tr>
                <td className="font-semibold">Place</td>
                <td>
                  City lookup or manual latitude/longitude, plus a named timezone
                  or override
                </td>
                <td>Coordinates and civil-time interpretation anchor the event.</td>
              </tr>
              <tr>
                <td className="font-semibold">Ayanamsha</td>
                <td>Lahiri, Raman or Krishnamurti (KP)</td>
                <td>The sidereal offset choice can change reported longitudes.</td>
              </tr>
              <tr>
                <td className="font-semibold">House system</td>
                <td>Whole Sign, Equal or Placidus</td>
                <td>House placement can differ even when a zodiac degree does not.</td>
              </tr>
              <tr>
                <td className="font-semibold">Lunar nodes</td>
                <td>Mean or true</td>
                <td>Rahu and Ketu positions depend on the node convention.</td>
              </tr>
              <tr>
                <td className="font-semibold">Chart style</td>
                <td>North Indian, South Indian or East Indian</td>
                <td>This changes the visual arrangement, not the chosen birth record.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The birth-chart form begins with Lahiri ayanamsha, Whole Sign houses,
          mean nodes and a North Indian visual style. The server route also uses
          Lahiri, Whole Sign and mean nodes as fallbacks if those values are
          absent. It uses <code className="rounded bg-stone-100 px-2 py-1 text-sm">AUTO</code>{" "}
          only when no timezone string is supplied; the normal interface sends
          the selected city timezone or a visitor’s explicit override.
        </p>
      </TrustSection>

      <TrustSection title="Birth-chart modules requested">
        <p>
          Every birth-chart calculation requests the main Vedic chart and a
          FreeAstroAPI-rendered SVG visual chart. The visual request includes D1
          and D9 divisions and uses the selected North, South or East Indian
          style. Optional report switches can add these upstream operations:
        </p>
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {[
            ["Vimshottari Dasha", "Requested to three levels in the current route."],
            ["Yogas", "Requested when the yoga report option is enabled."],
            ["Strength", "Supplies the strength section used by specialist views."],
            [
              "Divisional charts",
              "Requests divisions D1, D2, D3, D7, D9, D10, D12, D30 and D60.",
            ],
            ["Panchang", "Requested when the panchang option is enabled."],
          ].map(([title, description]) => (
            <li key={title} className="border-t border-amber-200 py-4">
              <h3 className="font-bold text-[#681414]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p>
            </li>
          ))}
        </ul>
        <p>
          The site sends those calls sequentially through a shared pacing queue.
          Optional modules can therefore add noticeable time to a complete
          report. If an optional module fails, the interface can still receive
          the main chart together with an error for that module; failure of the
          main chart makes the whole chart request fail.
        </p>
      </TrustSection>

      <TrustSection title="Matching, Muhurat and city search">
        <h3 className="text-lg font-bold text-[#681414]">Kundli matching</h3>
        <p>
          Matching sends two normalized birth records to the FreeAstroAPI match
          operation. The visitor-selected ayanamsha is included. The current
          matching route fixes the house system to Whole Sign and the lunar-node
          convention to mean for both people; those two values are not separate
          matching controls in the interface.
        </p>
        <h3 className="pt-2 text-lg font-bold text-[#681414]">Muhurat search</h3>
        <p>
          Muhurat sends a purpose, start and end date, city, coordinates,
          timezone, ayanamsha and result limit to the upstream search. Supported
          purposes in this build are general work, vehicle purchase, property
          purchase, Griha Pravesh, Namkaran and Mundan. A search may span no more
          than 31 days. The route accepts a result limit from 1 to 50, and the
          current interface starts at eight results.
        </p>
        <h3 className="pt-2 text-lg font-bold text-[#681414]">City lookup</h3>
        <p>
          Autocomplete calls the site’s geo route, which forwards the query and
          requested limit to FreeAstroAPI’s city-search operation. The selected
          result supplies a city name, coordinates and timezone. A visitor can
          override coordinates and timezone in the birth-chart workflow, so the
          values visible at submission—not the typed city text alone—are the
          meaningful calculation inputs.
        </p>
      </TrustSection>

      <TrustSection title="Reading and reproducing a result">
        <p>
          For a useful comparison, record the complete birth date and clock time
          including seconds, latitude and longitude, timezone identifier,
          ayanamsha, house system and node convention. Also record the chart
          style and optional modules if you are comparing presentation or report
          sections. A person’s name or label is not a calculation setting.
        </p>
        <p>
          Compare numeric positions and metadata before comparing diagram shape.
          North, South and East Indian layouts arrange the same houses and signs
          differently. A mismatch in appearance may be a layout difference; a
          mismatch in longitude, ascendant or house assignment may point to an
          input, ruleset or upstream difference.
        </p>
        <p>
          Saved charts keep the form, options, settings, returned result and
          timestamps in browser IndexedDB, which can help with a later local
          comparison. A JSON export captures the same working state plus notes.
          Neither mechanism certifies the result or freezes the upstream service
          version. For a step-by-step comparison, read{
          " "}
          <Link
            href="/learn/why-kundli-calculators-differ"
            className="font-semibold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            why Kundli calculators differ
          </Link>
          .
        </p>
      </TrustSection>

      <TrustSection title="Validation and limitations">
        <p>
          The server routes reject missing or malformed core fields and constrain
          coordinate, date-range and result-limit values. Validation catches an
          invalid request shape; it cannot prove that a visitor selected the
          correct city, timezone or birth time. It also does not independently
          verify every upstream astronomical value.
        </p>
        <p>
          Results depend on the provider response and service availability.
          Timeouts, rate limits, network errors or a provider contract change can
          affect a calculation. The current code avoids caching upstream
          calculation responses, but that is a delivery behavior rather than a
          scientific-quality guarantee.
        </p>
        <p>
          Finally, astrology is a cultural and interpretive tradition, not a
          scientifically established predictive method. Method transparency can
          make an astrological calculation easier to compare; it does not turn
          the interpretation into scientific evidence or professional advice.
        </p>
      </TrustSection>
    </TrustPage>
  );
}
