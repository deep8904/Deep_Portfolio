import type { Metadata } from "next";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyDecision } from "@/components/case-study/CaseStudyDecision";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { ChapterNav } from "@/components/case-study/ChapterNav";
import { PhaseDivider } from "@/components/case-study/PhaseDivider";
import { ProductBrowserFrame } from "@/components/case-study/ProductBrowserFrame";
import { FeatureNote } from "@/components/case-study/FeatureNote";
import { CaseStudyFigure } from "@/components/case-study/CaseStudyFigure";
import { CareProcessSteps } from "@/components/case-study/care/CareProcessSteps";
import { CareHeuristicTable } from "@/components/case-study/care/CareHeuristicTable";
import { CareSurveyStats, CareRecurringNeeds } from "@/components/case-study/care/CareSurveyStats";
import { CareAudienceSegments } from "@/components/case-study/care/CareAudienceSegments";
import { CareAccessibilityMatrix } from "@/components/case-study/care/CareAccessibilityMatrix";
import { CareSynthesisTable } from "@/components/case-study/care/CareSynthesisTable";
import { CareIAComparison } from "@/components/case-study/care/CareIAComparison";
import { CareVisualFoundation } from "@/components/case-study/care/CareVisualFoundation";

const description =
  "A UX research and redesign of the C.A.R.E. for Horses Foundation website — a heuristic evaluation, a 39-response survey, an accessibility audit, and a working high-fidelity redesign built from what that research surfaced.";

export const metadata: Metadata = {
  title: "C.A.R.E. for Horses",
  description,
  alternates: { canonical: "/work/care" },
  openGraph: { title: "C.A.R.E. for Horses — Deep Chadamiya", description, url: "/work/care" },
};

const CHAPTERS = [
  { id: "problem", label: "The Problem" },
  { id: "process", label: "Process" },
  { id: "audit", label: "Existing Site" },
  { id: "heuristics", label: "Heuristics" },
  { id: "users", label: "Learning from Users" },
  { id: "accessibility", label: "Accessibility" },
  { id: "synthesis", label: "Synthesis" },
  { id: "structure", label: "Structure" },
  { id: "wireframes", label: "Wireframes" },
  { id: "foundation", label: "Visual Foundation" },
  { id: "product", label: "The Redesign" },
  { id: "outcome", label: "Outcome" },
];

export default function CareCaseStudy() {
  return (
    <>
      <CaseStudyHero
        eyebrow="CASE STUDY 05"
        title="C.A.R.E. for Horses Foundation"
        statement="A UX research and redesign project for a Maricopa, AZ horse-rescue nonprofit — a heuristic evaluation, a 39-response survey, and an accessibility audit of the live site, synthesized into a working high-fidelity redesign built to answer exactly what that research surfaced."
        meta={[
          { label: "ROLE", value: "UX research, accessibility audit, IA & UI design" },
          { label: "TEAM", value: "3-person team — Deep Chadamiya, Pei-Chun Chen, Tanvi Byakod" },
          { label: "TOOLS", value: "Figma · survey & usability spreadsheets · React/Vite prototype" },
          { label: "STATUS", value: "Redesign preview — not deployed to the live domain" },
        ]}
      >
        <div className="mt-9 tab:mt-11">
          <ProductBrowserFrame
            src="/work/care/redesign-home.png"
            alt="The redesigned C.A.R.E. for Horses Foundation homepage, reading 'Sanctuary, rehabilitation, and a second chance for at-risk horses'"
            caption="The redesigned homepage, running as a real React prototype — not a static comp."
            url="localhost:5173"
            title="C.A.R.E. for Horses (redesign)"
            aspect="aspect-[3456/2400]"
            chrome="mac"
          />
        </div>
      </CaseStudyHero>

      <ChapterNav chapters={CHAPTERS} />

      <CaseStudySection
        id="problem"
        eyebrow="The Problem"
        title="Visitors couldn't tell what their support would actually do."
        intro="C.A.R.E. for Horses Foundation is a 501(c)(3) horse-rescue nonprofit in Maricopa, AZ. Its live site works, but research — a heuristic evaluation, a 39-response survey, and an accessibility audit — repeatedly surfaced the same gaps: donation impact wasn't clear at the point of giving, there was no real events calendar, adoption and rescue stories weren't visible anywhere, and volunteering, donating, and adopting all funneled into one undifferentiated contact form."
        contentClassName="pt-2"
      >
        <p className="m-0 text-[15px] leading-[1.7] text-ink-secondary text-pretty">
          We — Deep Chadamiya, Pei-Chun Chen, and Tanvi Byakod — worked as a team across research and design.
          Individually, Deep sourced 16 of the 39 survey responses, ran the heuristic evaluation and accessibility
          audit of the live site, and led information architecture and UI design for the redesign shown below.
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="process"
        eyebrow="End-to-End Process"
        title="Research first, then structure, then screens."
        intro="Every stage below produced real evidence used later in the redesign — nothing here is a placeholder step added to look thorough."
      >
        <CareProcessSteps />
      </CaseStudySection>

      <PhaseDivider label="RESEARCH" />

      <CaseStudySection
        id="audit"
        eyebrow="Existing Website Audit"
        title="Real problems, found by using the real site."
        intro="Captured directly from the live site at careforhorsesfoundation.org — not recreated from memory."
        contentClassName="flex flex-col gap-9"
      >
        <div className="flex flex-col gap-3">
          <ProductBrowserFrame
            src="/work/care/original-events.png"
            alt="The current Events page on the live C.A.R.E. for Horses website, showing one static seminar description and an empty gray image carousel"
            caption="The current Events page — one recurring-seminar description and an image carousel that loads empty. No dated list of upcoming events exists."
            url="careforhorsesfoundation.org/events"
            title="Events"
          />
          <div className="grid gap-6 tab:grid-cols-2">
            <FeatureNote num="01" title="No way to see what's coming up">
              The only date information on the entire page is “typically October through May” — there’s no list of
              specific upcoming dates anywhere on the site.
            </FeatureNote>
            <FeatureNote num="02" title="A broken-feeling gallery widget">
              The carousel component loads to a plain gray box with no images, arrows that do nothing, and no
              indication anything is wrong.
            </FeatureNote>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <ProductBrowserFrame
            src="/work/care/original-giving.png"
            alt="The current How to Give page on the live C.A.R.E. for Horses website, showing three dense paragraphs of donation program descriptions"
            caption="The current donation page — real programs (Care Fund, Sponsor a Horse, Sponsor a Clinic), described in dense paragraphs with no scannable summary near the decision itself."
            url="careforhorsesfoundation.org/giving"
            title="How to Give"
          />
        </div>

        <div className="flex flex-col gap-3">
          <ProductBrowserFrame
            src="/work/care/original-meet-our-horses.png"
            alt="The current Meet Our Horses page on the live C.A.R.E. for Horses website"
            caption="Meet Our Horses is reached through a nav dropdown rather than a browsable page — there's no roster, no count of horses in care, and no way to search by name."
            url="careforhorsesfoundation.org/meet-our-horses"
            title="Meet Our Horses"
          />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="heuristics"
        eyebrow="Heuristic Evaluation"
        title="Named against Nielsen's usability heuristics, not just 'this feels dated.'"
        intro="Selected findings that carried directly into the redesign priorities below."
      >
        <CareHeuristicTable />
      </CaseStudySection>

      <CaseStudySection
        id="users"
        eyebrow="Learning from Users"
        title="39 survey responses, and the same handful of gaps kept recurring."
        intro="Among 39 survey responses, usefulness and trust both landed in the middle of their scales — not a failing site, but not a confident one either. Responses repeatedly pointed toward the same five gaps."
        contentClassName="flex flex-col gap-10"
      >
        <CareSurveyStats />
        <div className="flex flex-col gap-4">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">RECURRING NEEDS</span>
          <CareRecurringNeeds />
        </div>
        <div className="flex flex-col gap-4 border-t border-line-soft pt-9">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">WHO WE DESIGNED FOR</span>
          <CareAudienceSegments />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="accessibility"
        eyebrow="Accessibility Audit"
        title="33 issues, evaluated across the four POUR principles."
        intro="The accessibility audit identified 33 issues across roughly 9 evaluated pages — 20 high severity, 13 medium. Selected findings below carried directly into redesign decisions."
      >
        <CareAccessibilityMatrix />
      </CaseStudySection>

      <CaseStudySection
        id="synthesis"
        eyebrow="Research Synthesis"
        title="From what people asked for, to what the redesign actually does."
        intro="Every major redesign decision below traces back to a specific finding above — not a general sense that the site 'needed updating.'"
      >
        <CareSynthesisTable />
      </CaseStudySection>

      <PhaseDivider label="DESIGN" />

      <CaseStudySection
        id="structure"
        eyebrow="Exploring the Structure"
        title="Fewer nav items, doing more real work each."
        intro="The current site's Events and Updates are two thin pages; Mission repeats part of About; Meet Our Horses is a dropdown, not a destination. The proposed structure consolidates around what research showed people actually came looking for."
      >
        <CareIAComparison />
      </CaseStudySection>

      <CaseStudySection
        id="wireframes"
        eyebrow="Wireframes"
        title="Low-fidelity layouts before visual design — for the pages research flagged first."
        intro="Real project wireframes, not recreated after the fact — the donation page wireframe below is the direct ancestor of the finished Donate flow shown later."
        contentClassName="flex flex-col gap-9"
      >
        <div className="grid gap-6 tab:grid-cols-2">
          <CaseStudyFigure
            src="/work/care/wireframe-home.png"
            alt="A low-fidelity wireframe of the redesigned homepage, showing grayscale placeholder blocks for the hero, mission, and horse-story sections"
            caption="Low-fidelity — homepage structure, before visual design."
            aspect="aspect-[4200/2700]"
          />
          <CaseStudyFigure
            src="/work/care/wireframe-how-to-give.png"
            alt="A low-fidelity wireframe of the redesigned donation page, showing a Donate/Volunteer toggle and four placeholder donation-option cards"
            caption="Low-fidelity — the Donate/Volunteer toggle and four giving options, before copy or visual design."
            aspect="aspect-[4200/3200]"
          />
        </div>
        <CaseStudyDecision label="Wireframe decision">
          The Donate/Volunteer toggle was decided at the wireframe stage — before any visual design — specifically
          to separate the two intents the current site’s single contact form conflates.
        </CaseStudyDecision>
      </CaseStudySection>

      <CaseStudySection
        id="foundation"
        eyebrow="Building the Visual Foundation"
        title="A warm, editorial palette pulled from the running prototype."
        intro="Extracted from the actual redesign's computed styles — colors, type, and controls as they render, not as designed in isolation."
      >
        <CareVisualFoundation />
      </CaseStudySection>

      <PhaseDivider label="EXPERIENCE" />

      <CaseStudySection
        id="product"
        eyebrow="Designing the New Experience"
        title="Every research finding above, now a real screen."
        intro="Captured from the actual running redesign prototype — every screen below is real UI, not a mockup standing in for one."
        contentClassName="flex flex-col gap-9"
      >
        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">HOMEPAGE</span>
          <ProductBrowserFrame
            src="/work/care/redesign-home.png"
            alt="The redesigned homepage, showing the hero, a broken-out 'What C.A.R.E. stands for' section, horse cards, and a featured horse story"
            caption="Compassion, Allegiance, Rehabilitation, and Education are broken into four individually-explained items, instead of one paragraph."
            url="localhost:5173/"
            title="Home"
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">OUR HORSES — REAL ADOPTION STORIES</span>
          <ProductBrowserFrame
            src="/work/care/redesign-horses.png"
            alt="The redesigned Our Horses page, showing tabs for Current Residents, Adopted, and In Memory, a search field, and a list of 13 horses with photos"
            caption="13 current residents, each with a real photo and background — plus separate Adopted and In Memory tabs, directly answering the request for visible adoption stories."
            url="localhost:5173/horses"
            title="Our Horses"
          />
          <div className="grid gap-6 tab:grid-cols-2">
            <FeatureNote num="01" title="Search and real counts">
              A visible “13 horses” count and a name search replace the current site’s nav dropdown with no roster
              at all.
            </FeatureNote>
            <FeatureNote num="02" title="Status, not just a photo">
              Current Resident / Adopted / In Memory tabs give every horse an honest status, including the ones no
              longer at the ranch.
            </FeatureNote>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">DONATE — A 3-STEP FLOW WITH STATED IMPACT</span>
          <ProductBrowserFrame
            src="/work/care/redesign-donate.png"
            alt="The redesigned Donate page, showing a Choose/Amount/Review step indicator and five giving options, each with a one-line description of what it funds"
            caption="Each giving option states what it funds in one line — sponsoring a clinic, for example, explicitly removes the standard $30 audit fee for the public."
            url="localhost:5173/donate"
            title="Donate"
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">STORIES & EVENTS — A REAL EVENTS STRUCTURE</span>
          <ProductBrowserFrame
            src="/work/care/redesign-stories-events.png"
            alt="The redesigned Stories & Events page, showing tabs for Events & Clinics, Horse Stories, Foundation Updates, and Media & Learning, with a structured seminar-details table"
            caption="Season, location, audit fee, sponsorship status, and what to bring are laid out as scannable fields — an honest 'no upcoming dates posted' note replaces a broken carousel rather than faking a calendar."
            url="localhost:5173/stories-events"
            title="Stories & Events"
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">GET INVOLVED — VOLUNTEER, VISIT, AND ADOPTION, SEPARATED</span>
          <ProductBrowserFrame
            src="/work/care/redesign-get-involved.png"
            alt="The redesigned Get Involved page, showing distinct sections for Volunteer, Plan a Visit, and Adoption & Rehoming, each with its own inquiry action"
            caption="Volunteering, visiting, and adoption each get their own section and their own call to action, instead of five checkboxes on one shared form."
            url="localhost:5173/get-involved"
            title="Get Involved"
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">ON A PHONE</span>
          <div className="grid grid-cols-2 gap-4 tab:grid-cols-4">
            <CaseStudyFigure
              src="/work/care/mobile-home.png"
              alt="The redesigned homepage on a mobile viewport"
              caption="Home"
              aspect="aspect-[390/844]"
            />
            <CaseStudyFigure
              src="/work/care/mobile-horses.png"
              alt="The redesigned Our Horses page on a mobile viewport"
              caption="Our Horses"
              aspect="aspect-[390/844]"
            />
            <CaseStudyFigure
              src="/work/care/mobile-donate.png"
              alt="The redesigned Donate page on a mobile viewport"
              caption="Donate"
              aspect="aspect-[390/844]"
            />
            <CaseStudyFigure
              src="/work/care/mobile-get-involved.png"
              alt="The redesigned Get Involved page on a mobile viewport"
              caption="Get Involved"
              aspect="aspect-[390/844]"
            />
          </div>
        </div>

        <CaseStudyDecision label="Honest about what the prototype is">
          The redesign states this plainly on its own pages: “This website is a redesign preview. All contact
          forms are client-side demonstrations and do not transmit data. Donations are processed externally
          through verified third-party providers.” It’s a working front-end prototype, not a connected backend —
          the case study doesn’t claim otherwise.
        </CaseStudyDecision>
      </CaseStudySection>

      <PhaseDivider label="OUTCOME" />

      <CaseStudySection
        id="outcome"
        eyebrow="Potential Impact & Learnings"
        title="What this redesign is built to make possible."
        contentClassName="flex flex-col gap-9"
      >
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— Clearer understanding of what a donation funds, stated at the point of giving rather than in a separate paragraph.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— A real, structured place for event information to live, instead of a static blurb and a broken carousel.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— Adoption and rescue stories made visible through a real, browsable horse roster.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— Separate, legible paths for volunteering, visiting, and adopting, instead of one shared form.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— 33 audited accessibility issues addressed through concrete redesign responses, not a general “more accessible” claim.</li>
        </ul>
        <p className="m-0 text-[13px] leading-[1.6] text-ink-faint text-pretty">
          These are potential outcomes the redesign is built toward — the prototype hasn’t been deployed to the
          live domain, so none of this is backed by post-launch metrics.
        </p>
        <div className="flex flex-col gap-3.5 border-t border-line-soft pt-9">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">KEY LEARNINGS</span>
          <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
            Accessibility findings changed information architecture, not just contrast values — the broken Events
            carousel, for instance, was as much a structural problem (no real events page existed) as a technical
            one. Several of the clearest navigation problems on the current site turned out to be content-structure
            problems: Meet Our Horses wasn’t missing a better dropdown, it was missing a page.
          </p>
          <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
            Nonprofit UX means balancing storytelling the organization wants to tell against the specific tasks a
            visitor actually showed up to do — the redesign tries to hold both by giving the organization’s stories
            a real home (Our Horses, featured stories) without making them the only thing between a visitor and
            donating, volunteering, or finding an event.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudyNavigation nextSlug="creatorflow" nextTitle="CreatorFlow" />
    </>
  );
}
