import type { Metadata } from "next";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyDecision } from "@/components/case-study/CaseStudyDecision";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { ChapterNav } from "@/components/case-study/ChapterNav";
import { ProductBrowserFrame } from "@/components/case-study/ProductBrowserFrame";
import { FeatureNote } from "@/components/case-study/FeatureNote";
import { PipelineFlow } from "@/components/case-study/acm/PipelineFlow";
import { ScoringModel } from "@/components/case-study/acm/ScoringModel";

const description =
  "How AI Content Machine turns a raw trend signal into a published article: deterministic discovery and scoring, source-backed research, an AI draft-and-review loop, two Telegram approval gates, and a verified publish to Loose Thread.";

export const metadata: Metadata = {
  title: "AI Content Machine + Loose Thread",
  description,
  alternates: { canonical: "/work/loose-thread" },
  openGraph: { title: "AI Content Machine + Loose Thread · Deep Chadamiya", description, url: "/work/loose-thread" },
};

const CHAPTERS = [
  { id: "pipeline", label: "The Pipeline" },
  { id: "discover", label: "Discover & Rank" },
  { id: "topic-approval", label: "Topic Approval" },
  { id: "research", label: "Research" },
  { id: "draft-review", label: "Draft & Review" },
  { id: "final-approval", label: "Final Approval" },
  { id: "publish", label: "Publish & Verify" },
  { id: "loose-thread", label: "Loose Thread" },
  { id: "status", label: "Status" },
];

export default function LooseThreadCaseStudy() {
  return (
    <>
      <CaseStudyHero
        eyebrow="SELECTED PROJECT"
        title="AI Content Machine + Loose Thread"
        statement="AI Content Machine runs a personal technology publication end to end: it finds stories, ranks them on a fixed formula, researches them against real sources, drafts and reviews the article, then stops twice in Telegram before anything goes live. Loose Thread is the quiet, finished side of the same system, the Next.js site where the approved writing actually lives."
        meta={[
          { label: "ROLE", value: "Systems design & full-stack development" },
          { label: "STATUS", value: "Automation worker running on schedule in production; first fully automated publish still pending" },
        ]}
      >
        <div className="mt-9 tab:mt-11">
          <ProductBrowserFrame
            src="/work/selected/loose-thread.png"
            alt="The Loose Thread home page: 'I keep notes while ideas change,' beside a dark full-bleed photo of stage lighting"
            caption="Loose Thread, the publication AI Content Machine feeds."
            url="readloosethread.vercel.app"
            title="Loose Thread"
            chrome="mac"
            priority
          />
        </div>
      </CaseStudyHero>

      <ChapterNav chapters={CHAPTERS} />

      <CaseStudySection
        id="pipeline"
        num="01"
        eyebrow="The Pipeline"
        title="Automate the repetitive work. Keep the judgment human."
        intro="Seven stages run between a trend appearing somewhere on the internet and an article going live. Five of them are fully automated on a schedule. The other two are a single person, in Telegram, deciding whether the work so far is worth continuing."
      >
        <PipelineFlow />
      </CaseStudySection>

      <CaseStudySection
        id="discover"
        num="02"
        eyebrow="Discover & Rank"
        title="Nothing here calls a model."
        intro="Discovery reads configured RSS, Atom, and Hacker News sources on a schedule (Tuesdays and Fridays by default), strips markup, and deduplicates exact matches. A separate deterministic stage clusters near-duplicate coverage of the same story and scores every surviving candidate. No embeddings, no vector database, no AI call anywhere in this half of the pipeline."
        contentClassName="flex flex-col gap-9"
      >
        <ScoringModel />
        <div className="grid gap-6 tab:grid-cols-2">
          <FeatureNote num="01" title="Conservative clustering on purpose">
            A story only joins a cluster if it matches the cluster’s representative story and every other member in
            it. That blocks “A relates to B, B relates to C, so C must relate to A” bridging: it would rather split
            coverage than falsely merge two different stories.
          </FeatureNote>
          <FeatureNote num="02" title="History-aware suppression">
            Topics recently recommended, approved, or published are suppressed by fingerprint and product/event
            overlap, with a meaningful-update override for genuine follow-ups like a security patch.
          </FeatureNote>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="topic-approval"
        num="03"
        eyebrow="Topic Approval"
        title="The first Telegram gate."
        intro="A ranked shortlist arrives as Telegram cards: score, trend reasons, angle, evidence strength, and source counts, all computed by the deterministic stage above. A person approves, rejects, or replaces each one, or adds a manual topic or URL the ranking pipeline never saw. Nothing is researched until this happens."
      >
        <div className="grid gap-6 tab:grid-cols-2">
          <FeatureNote num="01" title="Signed, not guessable">
            Every button is a signed callback tied to a short-lived topic reference and version. A stale, replayed, or
            tampered callback is rejected server-side before it can do anything.
          </FeatureNote>
          <FeatureNote num="02" title="Allowlisted by numeric ID">
            Only a configured numeric chat ID and user ID can act, never a username or display name, since Telegram
            doesn’t guarantee either one is unique or stable.
          </FeatureNote>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="research"
        num="04"
        eyebrow="Research"
        title="Real sources, fetched safely, scored for sufficiency."
        intro="Once a topic is approved, the research stage retrieves the sources behind it directly, with DNS resolution, private-network and cloud-metadata blocking, size and redirect limits, and robots.txt respected. Extracted text is reduced to short excerpts with explicit source IDs, a timeline, and any numeric disagreements between sources flagged, then scored 0-100 for evidence sufficiency."
        contentClassName="flex flex-col gap-9"
      >
        <div className="grid gap-6 tab:grid-cols-2">
          <FeatureNote num="01" title="Insufficient evidence stops here">
            No primary source, missing supported facts, or an unresolved conflict between sources blocks the topic
            before it ever reaches drafting. The system would rather stall than write from thin evidence.
          </FeatureNote>
          <FeatureNote num="02" title="The model only synthesizes what was retrieved">
            When evidence needs assisted synthesis, the model is instructed to cite only existing source and excerpt
            IDs and to preserve unresolved uncertainty. It never browses on its own.
          </FeatureNote>
        </div>
        <CaseStudyDecision label="Recovery, not silent failure">
          If a source can’t be retrieved (a 429, a robots block, a dead link), Telegram sends a “Research blocked”
          card with buttons to add a replacement primary source, retry later, or cancel the topic outright. The
          person closes the gap; the pipeline never guesses at missing evidence on its own.
        </CaseStudyDecision>
      </CaseStudySection>

      <CaseStudySection
        id="draft-review"
        num="05"
        eyebrow="Draft & Review"
        title="One model writes it. A second pass tries to break it."
        intro="A durable worker asks the configured model (Groq first, with Gemini and others as failover) to write one complete, source-grounded article against a strict schema: every claim must cite a real source or research claim ID, first-hand experience is never allowed, and facts, analysis, and prediction have to stay distinguishable."
        contentClassName="flex flex-col gap-9"
      >
        <div className="grid gap-6 tab:grid-cols-2">
          <FeatureNote num="01" title="Deterministic blockers outrank the model">
            Fabricated evidence, unknown source IDs, missing disclosure, or unsafe MDX block the draft regardless of
            what an imported review says. A lexical check, not the model’s opinion of itself, has the final say on
            those.
          </FeatureNote>
          <FeatureNote num="02" title="The revision loop is automatic">
            When review finds addressable issues, the worker prepares a scoped revision task, generates a fix, and
            re-imports it as a new immutable draft version, then reviews again. A person only sees the article once
            this loop lands on a clean pass.
          </FeatureNote>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="final-approval"
        num="06"
        eyebrow="Final Approval"
        title="The second, mandatory Telegram gate."
        intro="Once review passes clean, Telegram gets a card with the article’s metrics only, title, article type, length, citation coverage, source count, and outstanding risk, never the body. From there: approve, schedule, request changes, hold, or reject. Nothing about this step can be skipped or inferred from topic approval; it’s a separate, independently checked gate."
      />

      <CaseStudySection
        id="publish"
        num="07"
        eyebrow="Publish & Verify"
        title="Publishing means one commit and one proof."
        intro="Approval creates a frozen, unconsumed event carrying an exact draft/review snapshot hash. The publisher converts it into one Git commit to Deep-Blog, footnotes citations, strips tracking parameters, and rejects private or non-HTTPS URLs in the final MDX. It doesn’t stop there: it looks up the resulting Vercel deployment by that exact commit SHA and confirms the live page actually returns before the article is considered published."
      />

      <CaseStudySection
        id="loose-thread"
        num="08"
        eyebrow="Loose Thread"
        title="The quiet half of the system."
        intro="ACM is complicated behind the scenes. Loose Thread deliberately isn’t: a Next.js site reading file-based Markdown notes, with an editorial type system and small entrance reveals, and nothing else competing for the reader’s attention. It’s just where the approved writing ends up."
      />

      <CaseStudySection
        id="status"
        num="09"
        eyebrow="Status"
        title="What’s actually running right now."
        contentClassName="flex flex-col gap-9"
      >
        <p className="m-0 text-[15px] leading-[1.7] text-ink-secondary text-pretty">
          The durable worker is live: it runs on schedule via GitHub Actions, applying migrations and draining
          queued work every run. What hasn’t happened yet is a full pass through both Telegram gates ending in a
          real, automated commit to Deep-Blog. That’s the next milestone, not something this write-up claims has
          already happened.
        </p>
        <CaseStudyDecision label="Honest current state">
          The two published notes on Loose Thread today were written and committed by hand, not through this
          pipeline. The automation exists, runs, and is production-configured; what’s still ahead is the first
          end-to-end run that clears both approval gates on its own.
        </CaseStudyDecision>
      </CaseStudySection>

      <CaseStudyNavigation nextSlug="creatorflow" nextTitle="CreatorFlow" />
    </>
  );
}
