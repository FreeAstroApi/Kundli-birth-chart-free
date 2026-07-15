import type { Metadata } from "next";
import Link from "next/link";

import TrustPage, {
  buildTrustPageMetadata,
  TrustNotice,
  TrustSection,
} from "@/components/seo/TrustPage";

export const metadata: Metadata = buildTrustPageMetadata({
  path: "/privacy",
  title: "Privacy Policy – Birth Data, Browser Storage and API Use",
  description:
    "See what Jyotish Desk sends to FreeAstroAPI, what saved charts keep in browser IndexedDB, how exports work, and which logging limits remain unknown.",
});

export default function PrivacyPage() {
  return (
    <TrustPage
      currentPath="/privacy"
      eyebrow="Privacy"
      title="Where your chart data goes"
      intro="A saved chart and a calculated chart do not follow the same data path. Saved charts and notes use this browser’s IndexedDB, while calculations and city lookup pass through the site server to FreeAstroAPI. This policy describes that distinction and does not promise that hosting or provider logs are absent."
      summaryItems={[
        {
          title: "Calculation traffic",
          description:
            "Required inputs pass through this site’s server and then to FreeAstroAPI.",
        },
        {
          title: "Saved records",
          description:
            "Charts and notes you choose to save are written to IndexedDB in this browser.",
        },
        {
          title: "Consent",
          description:
            "Do not enter another person’s birth data unless you have their informed permission.",
        },
      ]}
    >
      <TrustSection title="The short version">
        <p>
          You can browse explanatory pages without creating an account. An
          account is not required to calculate, save or export a chart in this
          build. When you start a calculation or use city autocomplete, however,
          the necessary request data leaves the browser: it goes first to this
          site’s server route and then to FreeAstroAPI.
        </p>
        <p>
          Choosing “Save chart” creates a separate local copy in the current
          browser profile. The application does not implement account-based
          cloud sync for that copy. Choosing JSON export or print creates a file,
          print job or PDF only after you initiate the action.
        </p>
        <TrustNotice title="Please obtain consent first">
          <p>
            Birth dates, precise times, places, relationship records and private
            notes can identify or reveal information about a person. Do not
            enter someone else’s details without their informed permission. If
            consent is uncertain, do not submit the data. Use a fictional or
            deliberately non-identifying test record instead.
          </p>
        </TrustNotice>
      </TrustSection>

      <TrustSection title="Information handled by each activity">
        <div className="overflow-x-auto rounded border border-amber-200">
          <table className="data-table min-w-[44rem]">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Information involved</th>
                <th>Destination in this build</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold">City search</td>
                <td>
                  Search text, result limit and a country filter if one is
                  supplied
                </td>
                <td>Site server, then FreeAstroAPI geo search</td>
              </tr>
              <tr>
                <td className="font-semibold">Birth chart</td>
                <td>
                  Label, birth date and time, city, coordinates, timezone,
                  selected gender value, ayanamsha, house, node, chart-style and
                  report choices
                </td>
                <td>Site server; required calculation fields go to FreeAstroAPI</td>
              </tr>
              <tr>
                <td className="font-semibold">Kundli matching</td>
                <td>
                  Two labels and two birth records, including date, time,
                  location, coordinates and timezone, plus ayanamsha
                </td>
                <td>Site server; both calculation records go to FreeAstroAPI</td>
              </tr>
              <tr>
                <td className="font-semibold">Muhurat search</td>
                <td>
                  Purpose, date range, city, coordinates, timezone, ayanamsha and
                  result limit
                </td>
                <td>Site server, then FreeAstroAPI Muhurat search</td>
              </tr>
              <tr>
                <td className="font-semibold">Save chart</td>
                <td>
                  Form, options, visual settings, returned result, notes and
                  created/updated timestamps
                </td>
                <td>IndexedDB in the current browser profile</td>
              </tr>
              <tr>
                <td className="font-semibold">Export or print</td>
                <td>Chart data and notes included in the chosen output</td>
                <td>Your browser download or print destination</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The current birth-chart route does not include the label or selected
          gender value in its upstream calculation payload, although the browser
          request to this site contains both. The matching route keeps the two
          labels in the site response but sends both underlying birth records to
          the upstream matching service. These implementation details can change
          if the route contract changes, so this policy should be reviewed with
          every material data-flow update.
        </p>
      </TrustSection>

      <TrustSection title="Server proxy and API key">
        <p>
          Browser code calls same-site routes for chart calculation, matching,
          Muhurat and city search. Those routes read the FreeAstroAPI key from a
          server environment variable, add it to the upstream request and return
          the provider response. The key is kept server-side by this design; it
          is not a field that a visitor supplies and the routes do not
          intentionally return it to the browser.
        </p>
        <p>
          Upstream fetches are marked <code className="rounded bg-stone-100 px-2 py-1 text-sm">no-store</code>
          , which tells the application not to use the normal response cache.
          That setting is not the same as a no-logging guarantee. The deployed
          hosting platform, network infrastructure, site server and FreeAstroAPI
          may keep request, security, abuse-prevention or operational logs under
          configurations and retention periods that are not defined in this
          repository.
        </p>
        <TrustNotice title="No unsupported retention promise">
          <p>
            This page therefore does not claim that calculation requests are
            never logged, are deleted on a fixed schedule or can always be
            retrieved or erased by this interface. The deploying site operator
            must verify provider and hosting practices and publish any additional
            deployment-specific terms before launch.
          </p>
        </TrustNotice>
      </TrustSection>

      <TrustSection title="Browser-saved charts and notes">
        <p>
          When you save a chart, the app opens an IndexedDB database named{
          " "}
          <code className="rounded bg-stone-100 px-2 py-1 text-sm">kundli-chart-desk</code>{" "}
          and stores the record in its <code className="rounded bg-stone-100 px-2 py-1 text-sm">charts</code>{" "}
          object store. A record can contain the complete form, calculation
          options, chart display settings, API result, consultation notes and
          timestamps. Other people using the same browser profile or a device
          with access to that profile may be able to view it.
        </p>
        <p>
          You can delete an individual chart from the saved-chart interface.
          Clearing this site’s browser storage can also remove the database,
          subject to your browser’s behavior. Private-browsing modes, browser
          cleanup, storage quotas, device migration, extensions and backups can
          affect whether local data persists. Because there is no account sync,
          the site cannot restore a local record that your browser removes.
        </p>
      </TrustSection>

      <TrustSection title="Downloads, printing and shared devices">
        <p>
          “Export JSON” creates a file from the current form, options, settings,
          result and notes, then asks the browser to download it. “Print” and
          “Save as PDF” use the browser print dialog. The application does not
          silently export either format, but your browser, operating system,
          printer, download folder or cloud-backed filesystem may retain the
          output after you create it.
        </p>
        <p>
          Review notes before exporting, choose a protected destination and
          remove files you no longer need. On a shared device, avoid saving a
          chart or notes unless every person with profile access is authorized to
          see them. Closing the tab does not by itself delete IndexedDB records or
          downloaded files.
        </p>
      </TrustSection>

      <TrustSection title="Your choices and privacy questions">
        <ul className="space-y-3 pl-5 marker:text-[#a15e12]">
          <li>Browse the static guides without submitting a calculation.</li>
          <li>
            Use a non-identifying label and enter only the information required
            for the tool you choose.
          </li>
          <li>
            Do not save a result locally, or delete it after the session if the
            browser profile is shared.
          </li>
          <li>
            Do not export notes or full records unless you can protect the
            resulting file.
          </li>
          <li>
            Stop before submission if you do not consent to the server and
            FreeAstroAPI data path described above.
          </li>
        </ul>
        <p>
          For a privacy concern, use the channel described on the{
          " "}
          <Link
            href="/contact"
            className="font-semibold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            contact page
          </Link>
          . Do not post a full birth record, exported chart or private notes in a
          public issue. The current build does not yet publish a dedicated
          privacy inbox, and the contact page states that launch limitation
          plainly.
        </p>
      </TrustSection>
    </TrustPage>
  );
}
