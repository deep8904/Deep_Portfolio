import type { Metadata } from "next";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyDecision } from "@/components/case-study/CaseStudyDecision";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { SurveyFindings } from "@/components/case-study/care/SurveyFindings";
import { AccessibilitySummary } from "@/components/case-study/care/AccessibilitySummary";

const description =
  "A team UX research project for an equine nonprofit — a 39-response user survey, a heuristic evaluation, and an accessibility audit across roughly 9 pages, translated into concrete design recommendations.";

export const metadata: Metadata = {
  title: "C.A.R.E. for Horses",
  description,
  alternates: { canonical: "/work/care" },
  openGraph: { title: "C.A.R.E. for Horses — Deep Chadamiya", description, url: "/work/care" },
};

export default function CareCaseStudy() {
  return (
    <>
      <CaseStudyHero
        eyebrow="C.A.R.E. for Horses"
        title="What a nonprofit's visitors actually needed, versus what the site assumed."
        statement="A team research project for an equine nonprofit's website — a survey, a heuristic evaluation, and a full accessibility audit, used to ground information-architecture and usability recommendations in what visitors actually said, not assumptions about them."
        meta={[
          { label: "Role", value: "UX research & accessibility audit" },
          { label: "Team", value: "3 — Deep Chadamiya, Pei-Chun Chen, Tanvi Byakod" },
          { label: "Method", value: "Survey · heuristic evaluation · accessibility audit" },
          { label: "Status", value: "Research project — no shipped redesign claimed" },
        ]}
      />

      <CaseStudySection
        eyebrow="The Brief"
        title="Understand the site through its visitors, not just its screens."
        intro="An equine nonprofit's website serves several different visitors at once — people considering a donation, people looking to adopt, people looking to volunteer. Before recommending any changes, the team needed to know where those specific journeys were actually breaking down, and for whom."
      />

      <CaseStudySection
        eyebrow="Research Method"
        title="Three research methods, run as one team."
        intro="A three-person team combined a heuristic evaluation of the existing site, a visitor survey, and a full accessibility audit — 39 total survey responses came in across the team's combined recruitment, 16 of them from my own outreach specifically."
      />

      <CaseStudySection
        eyebrow="Survey Findings"
        title="What the survey suggested — read directionally, not as consensus."
        intro="These are response counts and averages from the 39-person sample the team recruited, not claims about every visitor to the site. They're presented here exactly as directional signal, which is what a 39-response survey actually supports."
      >
        <SurveyFindings />
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Accessibility Audit"
        title="33 issues, evaluated against the POUR principles."
        intro="The audit covered roughly 9 pages and produced 33 findings — 20 rated High severity, 13 Medium — spanning all four WCAG POUR principles (Perceivable, Operable, Understandable, Robust). This reflects the audit's own findings and methodology; it isn't a claim that the site failed a specific WCAG conformance level."
      >
        <AccessibilitySummary />
      </CaseStudySection>

      <CaseStudySection
        eyebrow="From Research to Design Decisions"
        title="Recommendations traced back to a specific finding, not a hunch."
        intro="Each recommendation below responds directly to one of the recurring survey themes or audit findings above — not a general redesign instinct."
        contentClassName="flex flex-col gap-3.5"
      >
        <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-2">
          <div className="rounded-xl border border-line-soft px-5 py-5">
            <span className="text-[13.5px] font-medium">Donation-impact clarity</span>
            <p className="m-0 mt-2 text-[15px] leading-[1.6] text-ink-faint">
              The most-requested theme (14/39) — recommended surfacing where a donation actually goes earlier in the
              donation flow, not just in a separate impact page.
            </p>
          </div>
          <div className="rounded-xl border border-line-soft px-5 py-5">
            <span className="text-[13.5px] font-medium">Events calendar</span>
            <p className="m-0 mt-2 text-[15px] leading-[1.6] text-ink-faint">
              Recommended as a first-class nav item rather than buried content, based on 12/39 responses looking
              for it.
            </p>
          </div>
          <div className="rounded-xl border border-line-soft px-5 py-5">
            <span className="text-[13.5px] font-medium">Adoption stories with photos</span>
            <p className="m-0 mt-2 text-[15px] leading-[1.6] text-ink-faint">
              11/39 responses specifically wanted photo-supported adoption stories — recommended as a structured
              content type, not a one-off page.
            </p>
          </div>
          <div className="rounded-xl border border-line-soft px-5 py-5">
            <span className="text-[13.5px] font-medium">Clearer volunteer sign-up</span>
            <p className="m-0 mt-2 text-[15px] leading-[1.6] text-ink-faint">
              Matching the donation-clarity theme, 11/39 responses wanted a clearer volunteer path — recommended
              simplifying it to the same information hierarchy as the donation flow.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-line-soft px-5 py-5 tab:max-w-[calc(50%-7px)]">
          <span className="text-[13.5px] font-medium">FAQ</span>
          <p className="m-0 mt-2 text-[15px] leading-[1.6] text-ink-faint">
            9/39 responses asked for one directly — recommended as a dedicated page addressing the specific
            questions that came up across the survey and evaluation.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudySection eyebrow="Scope" title="What this case study is, and isn't.">
        <CaseStudyDecision label="Honest scope">
          This is presented as a research and accessibility audit, with design recommendations that trace back to
          specific findings — not a shipped redesign with measured before/after results. No business-impact numbers
          are claimed here, because none were measured. All participant data shown is aggregated and anonymized; no
          names, contact details, or individual responses are shown.
        </CaseStudyDecision>
      </CaseStudySection>

      <CaseStudyNavigation nextSlug="glyph" nextTitle="Glyph" />
    </>
  );
}
