import type { Metadata } from "next";
import Link from "next/link";

import TrustPage, {
  buildTrustPageMetadata,
  TrustNotice,
  TrustSection,
} from "@/components/seo/TrustPage";
import { SEO_CONTENT_DATE } from "@/lib/site";

export const metadata: Metadata = buildTrustPageMetadata({
  path: "/editorial-policy",
  title: "Editorial Policy – Astrology Content and Corrections",
  description:
    "Read how Jyotish Desk authors and reviews product guidance, frames astrology as non-scientific cultural content, and handles corrections.",
});

const policyDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${SEO_CONTENT_DATE}T00:00:00Z`));

export default function EditorialPolicyPage() {
  return (
    <TrustPage
      currentPath="/editorial-policy"
      eyebrow="Editorial policy"
      title="How explanations are written, reviewed and corrected"
      intro="Jyotish Desk publishes product guidance and astrology explainers under an organization-level byline. The current process is an internal publisher review, not an independent expert-review program, and no unnamed credentials should be inferred from the site’s tone."
      summaryItems={[
        {
          title: "Byline",
          description:
            "Content is currently attributed to Jyotish Desk as the publishing organization.",
        },
        {
          title: "Review",
          description:
            "Technical claims are checked against current routes, controls and source material.",
        },
        {
          title: "Framing",
          description:
            "Astrology is presented as cultural and interpretive, not scientifically established.",
        },
      ]}
    >
      <TrustSection title="Editorial responsibility">
        <p>
          Jyotish Desk is the organization-level author and reviewer shown for
          this site’s interface copy, methodology notes, frequently asked
          questions and learning pages. At present, the same publishing project
          creates and reviews that material. The site does not claim that each
          page has been separately reviewed by an independent astrologer,
          historian, scientist, physician, lawyer or other credentialed expert.
        </p>
        <p>
          A product name is not a credential. When no individual author or
          reviewer is named, visitors should understand the byline as
          organization-authored product content. A future named contributor must
          be identified with a real role and only with qualifications that can be
          substantiated; this policy does not reserve fictional biographies or
          implied authority for later use.
        </p>
        <TrustNotice title="Current policy baseline">
          <p>
            This policy reflects the organization-level review process used for
            the current site content as of {policyDate}. It does not represent an
            independent peer-review or scientific-validation process.
          </p>
        </TrustNotice>
      </TrustSection>

      <TrustSection title="The current review process">
        <ol className="space-y-5 border-l border-amber-300 pl-6">
          <li>
            <h3 className="font-bold text-[#681414]">1. Define the page’s job</h3>
            <p className="mt-2">
              A page is scoped as a calculator guide, methodology explanation,
              comparison guide, policy or interface instruction. It should answer
              that job directly instead of padding the page with generic claims.
            </p>
          </li>
          <li>
            <h3 className="font-bold text-[#681414]">2. Check product claims</h3>
            <p className="mt-2">
              Names of controls, defaults, available modules, storage behavior
              and data flow are checked against the current application code and
              route contract. Upstream capabilities should be attributed to
              FreeAstroAPI rather than described as an undocumented local engine.
            </p>
          </li>
          <li>
            <h3 className="font-bold text-[#681414]">3. Separate fact from tradition</h3>
            <p className="mt-2">
              Technical product behavior is stated as product behavior.
              Astrological meanings are labeled as traditional, cultural or
              interpretive rather than presented as scientific findings.
            </p>
          </li>
          <li>
            <h3 className="font-bold text-[#681414]">4. Review for harm and clarity</h3>
            <p className="mt-2">
              Copy is checked for deterministic predictions, unnecessary fear,
              fabricated credentials, unsupported privacy promises and language
              that could be mistaken for medical, legal, financial or safety
              advice.
            </p>
          </li>
          <li>
            <h3 className="font-bold text-[#681414]">5. Publish and correct</h3>
            <p className="mt-2">
              Material errors should be corrected when identified. A substantive
              methodology or meaning change should carry an updated content date;
              spelling and formatting fixes need not be treated as a new edition.
            </p>
          </li>
        </ol>
      </TrustSection>

      <TrustSection title="Source and claim standards">
        <p>
          For claims about this product, the strongest source is the behavior of
          the current interface and server routes. The{
          " "}
          <Link
            href="/methodology"
            className="font-semibold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            methodology page
          </Link>{" "}
          records the supported settings and calculation boundary. For an
          upstream capability, provider documentation and the request contract
          take priority over assumptions based on a response label or another
          calculator.
        </p>
        <p>
          Traditional astrology terms may have multiple spellings,
          transliterations and schools of interpretation. Content should name the
          convention being used when it materially affects meaning. It should not
          turn a disputed interpretation into a universal fact, invent a
          quotation, attach a teaching to an unnamed ancient authority or claim
          historical consensus without a source.
        </p>
        <p>
          Numerical output should be discussed with its input context. If two
          charts differ, the first editorial response is to compare birth time,
          coordinates, timezone, ayanamsha, house system and node convention—not
          to declare one result spiritually superior. The page on{
          " "}
          <Link
            href="/learn/why-kundli-calculators-differ"
            className="font-semibold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            calculator differences
          </Link>{" "}
          follows that standard.
        </p>
      </TrustSection>

      <TrustSection title="How astrology is framed">
        <p>
          Astrology is a longstanding cultural and interpretive tradition. It is
          not scientifically established as a reliable method for predicting
          events, diagnosing a person or determining character. Jyotish Desk may
          explain traditional concepts or display an API’s astrological result,
          but it should not recast that output as empirical proof.
        </p>
        <p>
          Interpretations should use proportionate language such as “traditionally
          associated with,” “some practitioners read” or “within this system.”
          They should avoid certainty about illness, death, fertility, legal
          outcomes, investment returns, another person’s intentions or other
          high-stakes matters. Fear-based remedies, guaranteed outcomes and
          pressure to purchase a service do not meet this policy.
        </p>
        <TrustNotice title="Use with perspective">
          <p>
            Site content is for cultural study, personal exploration and
            entertainment. It is not a substitute for qualified medical,
            mental-health, legal, financial, safeguarding or emergency help.
          </p>
        </TrustNotice>
      </TrustSection>

      <TrustSection title="Corrections policy">
        <p>
          A correction report should identify the page URL, the exact statement
          or behavior at issue, why it appears wrong and a source or reproducible
          non-sensitive example when available. For a calculation discrepancy,
          include the relevant settings and expected versus actual output, but
          redact names, notes and any birth record that you do not have permission
          to share.
        </p>
        <p>
          Reports are assessed in this order: privacy or security risk, broken or
          misleading product behavior, incorrect calculation-method claims,
          unsupported scientific or professional claims, and then terminology,
          clarity or presentation issues. A valid material correction should be
          made on the affected page and, when the same claim appears elsewhere,
          reviewed across the site rather than fixed in isolation.
        </p>
        <p>
          The project does not promise a response or correction within a fixed
          number of days, particularly while a permanent contact channel is not
          yet configured. The{
          " "}
          <Link
            href="/contact"
            className="font-semibold text-[#681414] underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            contact and reporting page
          </Link>{" "}
          explains the available route and what not to include in a public
          report.
        </p>
      </TrustSection>

      <TrustSection title="Independence and future contributors">
        <p>
          This policy does not claim that editorial review is institutionally
          independent from the site operator: it currently is not. The publisher
          controls both the product and its explanatory content. If sponsored
          material, paid placement, affiliate relationships or outside
          contributors are introduced, they should be disclosed where a visitor
          would encounter them and should not alter calculation results without a
          visible product explanation.
        </p>
        <p>
          Future contributor biographies, reviewer labels and credentials must be
          factual and attributable. An external review badge should name the
          scope of review; it should not imply scientific validation of astrology
          or validation of every future API response.
        </p>
      </TrustSection>
    </TrustPage>
  );
}
