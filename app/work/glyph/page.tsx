import type { Metadata } from "next";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyFigure } from "@/components/case-study/CaseStudyFigure";
import { CaseStudyDecision } from "@/components/case-study/CaseStudyDecision";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { GlyphStatusMatrix } from "@/components/case-study/glyph/GlyphStatusMatrix";

const description =
  "An indie game developer platform, in development — a real working auth flow and waitlist landing page today, designed around a larger vision for devlogs, playtesting, and a developer community.";

export const metadata: Metadata = {
  title: "Glyph",
  description,
  alternates: { canonical: "/work/glyph" },
  openGraph: { title: "Glyph — Deep Chadamiya", description, url: "/work/glyph" },
};

export default function GlyphCaseStudy() {
  return (
    <>
      <CaseStudyHero
        eyebrow="Glyph"
        title="A dev identity platform for the game you're making right now."
        statement="Not another LinkedIn or GitHub — Glyph is built specifically for indie developers to document a build in progress, get real feedback on it, and find other people making things. It's an early, honestly-labeled product: a real working front door today, designed against a larger planned platform."
        meta={[
          { label: "Role", value: "Product strategy & full-stack build" },
          { label: "Stack", value: "Next.js · Supabase · TypeScript" },
          { label: "Status", value: "In development" },
          { label: "Note", value: "Working vs. planned split below" },
        ]}
      />

      <CaseStudySection
        eyebrow="What's Live"
        title="A real front door, not a mockup."
        intro="The waitlist landing page and the auth flow are both genuinely working — not a design comp standing in for a product."
        contentClassName="flex flex-col gap-8"
      >
        <CaseStudyFigure
          src="/work/glyph/landing.png"
          alt="The Glyph waitlist landing page, reading 'Your dev identity starts here.'"
          caption="The live waitlist landing page."
          tag="Live · real screenshot"
        />
        <CaseStudyFigure
          src="/work/glyph/signup.png"
          alt="The Glyph signup screen, with GitHub OAuth and email/password fields"
          caption="The live signup screen — GitHub OAuth, plus email and password."
          tag="Live · real screenshot"
        />
      </CaseStudySection>

      <CaseStudySection
        eyebrow="The Vision"
        title="A platform sized for what an indie dev actually needs."
        intro="Beyond the identity layer, the product is designed around devlogs (documenting a build over time), structured playtesting requests with real feedback, a collaboration board for finding teammates, and local in-person events — a fuller alternative to scattering that across Discord, a spreadsheet, and a LinkedIn post."
      />

      <CaseStudySection
        eyebrow="Honest Status"
        title="What's shipped, versus what's designed."
        intro="This is presented as an in-development product, not a finished one. The distinction below is deliberate — not everything in the vision above is live yet."
      >
        <GlyphStatusMatrix />
        <div className="mt-6">
          <CaseStudyDecision label="Product decision">
            An early platform that oversells its own progress loses the exact audience it’s for — other builders can
            tell. Glyph’s own status is labeled the same way its identity layer asks other developers to label
            theirs.
          </CaseStudyDecision>
        </div>
      </CaseStudySection>

      <CaseStudyNavigation nextSlug="creatorflow" nextTitle="CreatorFlow" />
    </>
  );
}
