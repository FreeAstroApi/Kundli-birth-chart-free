import type { Metadata } from "next";
import Link from "next/link";

import TrustPage, {
  buildTrustPageMetadata,
  TrustNotice,
  TrustSection,
} from "@/components/seo/TrustPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildTrustPageMetadata({
  path: "/contact",
  title: "Contact Jyotish Desk – Corrections and Issue Reporting",
  description:
    "Find the current Jyotish Desk reporting path for technical issues, privacy concerns and editorial corrections, with guidance on redacting birth data.",
});

const configuredHost = new URL(SITE_URL).hostname;

export default function ContactPage() {
  return (
    <TrustPage
      currentPath="/contact"
      eyebrow="Contact and reporting"
      title="Report an issue without exposing personal data"
      intro="This build does not yet configure or publish a monitored email address, contact form or support desk. Rather than inventing one, this page identifies the site-operator and source-repository paths that can be used now and the permanent contact channel that must be added before a public launch."
      summaryItems={[
        {
          title: "Channel status",
          description:
            "A permanent domain-based contact channel still needs to be configured before launch.",
        },
        {
          title: "Current path",
          description:
            "Use the operator or publisher channel attached to the deployment you are visiting.",
        },
        {
          title: "Redaction",
          description:
            "Never post full birth records, notes, exports or API credentials in a public report.",
        },
      ]}
    >
      <TrustSection title="Contact-channel status">
        <p>
          The canonical host currently configured for this build is{
          " "}
          <strong className="text-stone-900">{configuredHost}</strong>. Before
          production launch, the operator must publish a monitored contact method
          on that canonical domain or link clearly from it to an identified
          operator channel. That method may be a domain email address, secure
          form or ticket system, but none is configured in the current source.
        </p>
        <p>
          Until that work is complete, there is no represented support inbox and
          no guaranteed response time. A deployed copy should not replace this
          notice with a placeholder address or imply that a form is monitored
          when it is not. Visitors should confirm the hostname in the browser and
          use the operator details associated with that particular deployment.
        </p>
        <TrustNotice title="Launch requirement">
          <p>
            A monitored contact channel, responsible operator identity and
            deployment-specific privacy details must be configured before this
            page can serve as a complete production contact notice.
          </p>
        </TrustNotice>
      </TrustSection>

      <TrustSection title="Practical reporting paths available now">
        <ol className="space-y-5 border-l border-amber-300 pl-6">
          <li>
            <h3 className="font-bold text-[#681414]">1. Contact the deploying site operator</h3>
            <p className="mt-2">
              If you reached Jyotish Desk through an organization website,
              hosting profile, app directory or publisher page, use the verified
              operator channel shown there. This is the correct route for
              deployment-specific privacy, abuse, uptime, domain or server
              questions.
            </p>
          </li>
          <li>
            <h3 className="font-bold text-[#681414]">2. Report a reproducible source-code defect</h3>
            <p className="mt-2">
              The project README identifies the{
              " "}
              <a
                href="https://github.com/GabrielRw/Kundli-birth-chart-free"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
              >
                Kundli Birth Chart Free source repository
              </a>
              . For an issue reproducible in the unmodified project, use the
              repository owner or issue controls if they are enabled. A fork or
              separately branded deployment remains the responsibility of its
              own operator.
            </p>
          </li>
          <li>
            <h3 className="font-bold text-[#681414]">3. Keep sensitive reports out of public issues</h3>
            <p className="mt-2">
              A public repository is not a private support channel. For a
              security or privacy concern, post only a minimal, redacted notice
              asking the verified operator to provide a private route. Do not
              attach an exported chart, consultation notes or a real person’s
              birth record.
            </p>
          </li>
        </ol>
      </TrustSection>

      <TrustSection id="reporting-checklist" title="What makes a report actionable">
        <div className="grid gap-x-8 sm:grid-cols-2">
          {[
            {
              title: "Technical defect",
              items: [
                "Exact page URL and device/browser",
                "Date and approximate time observed",
                "Steps that reproduce the problem",
                "Redacted error text or screenshot",
              ],
            },
            {
              title: "Calculation discrepancy",
              items: [
                "Tool and result section compared",
                "Timezone, ayanamsha, houses and nodes",
                "Expected and actual numeric output",
                "A fictional test case where possible",
              ],
            },
            {
              title: "Editorial correction",
              items: [
                "Page URL and exact disputed passage",
                "Why the statement appears inaccurate",
                "A primary or authoritative source",
                "Whether the issue occurs on other pages",
              ],
            },
            {
              title: "Accessibility issue",
              items: [
                "Page and interface control involved",
                "Keyboard, screen reader or zoom context",
                "What prevented task completion",
                "Expected accessible behavior",
              ],
            },
          ].map((group) => (
            <div key={group.title} className="border-t border-amber-200 py-5">
              <h3 className="font-bold text-[#681414]">{group.title}</h3>
              <ul className="mt-3 space-y-2 pl-5 text-sm leading-6 marker:text-[#a15e12]">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p>
          A full real-world birth record is rarely needed to demonstrate a bug.
          Replace names, choose an artificial date if the issue still reproduces,
          crop unrelated screen areas and remove location or note fields that do
          not affect the problem.
        </p>
      </TrustSection>

      <TrustSection title="Do not include these items">
        <ul className="space-y-3 pl-5 marker:text-[#a15e12]">
          <li>FreeAstroAPI keys, environment variables or other credentials.</li>
          <li>
            Full names paired with birth dates, precise times and birthplaces.
          </li>
          <li>Private consultation notes or an unredacted JSON export.</li>
          <li>
            Another person’s data unless they consented to the report and the
            information is strictly necessary.
          </li>
          <li>
            Medical, legal, financial or emergency details seeking advice from
            the astrology tool or its operator.
          </li>
        </ul>
        <p>
          Jyotish Desk does not require an account, so a legitimate report should
          not require a site password. If anyone asks for credentials, payment or
          unrelated identity documents in order to “fix” a chart, verify the
          operator independently before responding.
        </p>
      </TrustSection>

      <TrustSection title="Questions about saved data">
        <p>
          A chart you deliberately save is stored in IndexedDB in the current
          browser profile. Use the saved-chart interface to delete an individual
          record, or use your browser’s site-data controls to clear local storage.
          Downloaded JSON, printed pages and PDFs must be deleted from their own
          destinations separately. See the{
          " "}
          <Link
            href="/privacy"
            className="font-semibold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            privacy and data-handling page
          </Link>{" "}
          for the complete distinction.
        </p>
        <p>
          Calculation and city-search traffic passes through server and upstream
          infrastructure. This interface does not expose a request-history or
          deletion dashboard, and the source does not define hosting or provider
          log retention. A question about those records must go to the verified
          operator for the deployment, who may also need to coordinate with its
          hosting platform or FreeAstroAPI.
        </p>
      </TrustSection>

      <TrustSection title="No emergency or professional support">
        <p>
          This contact route is for product defects, privacy concerns,
          accessibility feedback and factual corrections. It is not monitored as
          an emergency service and cannot provide medical, mental-health, legal,
          financial, safeguarding or crisis assistance. If a situation is urgent
          or safety-critical, stop using the astrology tool and contact an
          appropriate qualified or local emergency service.
        </p>
        <p>
          The{
          " "}
          <Link
            href="/editorial-policy"
            className="font-semibold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            editorial policy
          </Link>{" "}
          explains how factual corrections are assessed. It does not guarantee a
          particular response time while the permanent contact channel remains
          unconfigured.
        </p>
      </TrustSection>
    </TrustPage>
  );
}
