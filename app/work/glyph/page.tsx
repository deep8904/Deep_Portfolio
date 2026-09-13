import type { Metadata } from "next";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyDecision } from "@/components/case-study/CaseStudyDecision";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { ChapterNav } from "@/components/case-study/ChapterNav";
import { PhaseDivider } from "@/components/case-study/PhaseDivider";
import { ProductBrowserFrame } from "@/components/case-study/ProductBrowserFrame";
import { FeatureNote } from "@/components/case-study/FeatureNote";
import { GlyphSourceLineage } from "@/components/case-study/glyph/GlyphSourceLineage";
import { GlyphValueLoop } from "@/components/case-study/glyph/GlyphValueLoop";
import { GlyphAudienceSegments } from "@/components/case-study/glyph/GlyphAudienceSegments";
import { GlyphTraceabilityTable } from "@/components/case-study/glyph/GlyphTraceabilityTable";
import { GlyphSystemMap } from "@/components/case-study/glyph/GlyphSystemMap";
import { GlyphPlaytestFlow } from "@/components/case-study/glyph/GlyphPlaytestFlow";
import { GlyphPrivacyModel } from "@/components/case-study/glyph/GlyphPrivacyModel";
import { GlyphStatusMatrix } from "@/components/case-study/glyph/GlyphStatusMatrix";
import { GlyphStackList } from "@/components/case-study/glyph/GlyphStackList";

const description =
  "Glyph gives unfinished games a credible home before launch, connecting developer identity, private-first projects, visible progress, and structured feedback in one durable product record.";

export const metadata: Metadata = {
  title: "Glyph",
  description,
  alternates: { canonical: "/work/glyph" },
  openGraph: { title: "Glyph · Deep Chadamiya", description, url: "/work/glyph" },
};

const CHAPTERS = [
  { id: "gap", label: "The Gap" },
  { id: "landscape", label: "Landscape" },
  { id: "principles", label: "Principles" },
  { id: "architecture", label: "Architecture" },
  { id: "identity", label: "Identity" },
  { id: "projects", label: "Projects" },
  { id: "devlogs", label: "Devlogs" },
  { id: "playtesting", label: "Playtesting" },
  { id: "network", label: "Discover & Network" },
  { id: "foundation", label: "Technical Foundation" },
  { id: "evolution", label: "Evolution" },
  { id: "outcome", label: "Outcome" },
];

export default function GlyphCaseStudy() {
  return (
    <>
      <CaseStudyHero
        eyebrow="CASE STUDY 03"
        title="Glyph"
        statement="Glyph gives unfinished games a credible home before launch. It connects a developer's identity, private-first projects, visible progress, and focused feedback in one durable record."
        meta={[
          { label: "ROLE", value: "Product design & full-stack development" },
          { label: "STATUS", value: "Active development" },
        ]}
      >
        <div className="mt-9 tab:mt-11">
          <ProductBrowserFrame
            src="/work/glyph/landing-page.png"
            alt="The Glyph landing page: 'Your home base before launch,' with a 'Platform for builders' badge, a workflow pain-point section, and a stat card reading '70% of indie projects never reach launch'"
            caption="The real landing page: the pitch before anyone signs up."
            url="Glyph: current local product"
            title="Glyph"
            aspect="aspect-[4102/2434]"
            chrome="mac"
            priority
          />
        </div>
      </CaseStudyHero>

      <ChapterNav chapters={CHAPTERS} />

      <CaseStudySection
        id="gap"
        tight
        eyebrow="The Product Gap"
        title="The space between 'I'm building something' and 'I'm ready to launch' is fragmented."
        intro="Developers already have places to publish a finished game and places to talk while they build one. The missing layer is continuity: progress, feedback, and collaboration context scattered across tools instead of accumulating around the project."
        contentClassName="pt-2"
      >
        <p className="m-0 text-[15px] leading-[1.7] text-ink-secondary text-pretty">
          This is a product hypothesis informed by the project’s own planning documents and secondary competitor
          research, not a claim backed by user interviews. There is no direct user research in the current source.
        </p>
      </CaseStudySection>

      <PhaseDivider label="DISCOVER" />

      <CaseStudySection
        id="landscape"
        eyebrow="Landscape"
        title="Adjacent platforms each solve one piece, not the space between them."
        intro="itch.io has strong project pages and distribution, but identity is downstream of a game page. GitHub has a durable profile, but isn't built for cross-disciplinary game development. Discord and social feeds are excellent for conversation, weak for durable project-attached progress. Structured-collaboration directories exist but sit disconnected from a living project history."
      >
        <p className="m-0 text-[15px] leading-[1.7] text-ink-secondary text-pretty">
          This is secondary landscape analysis, not formal market validation. It doesn’t claim no competitor
          addresses any part of the problem. It describes where Glyph chose to integrate: identity, project-attached
          publishing, and structured feedback as one connected system.
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="principles"
        eyebrow="Product Principles"
        title="Five rules, traceable back to the same problem."
      >
        <GlyphTraceabilityTable />
      </CaseStudySection>

      <PhaseDivider label="SYSTEM" />

      <CaseStudySection
        id="architecture"
        eyebrow="Product Architecture"
        title="The developer and the project are the roots of the system."
        intro="Devlogs build the project's history. Public records feed Discover. Playtest and collaboration requests stay attached to the work they're about, not floating as unrelated posts."
        contentClassName="flex flex-col gap-9"
      >
        <GlyphValueLoop />
        <GlyphSystemMap />
      </CaseStudySection>

      <CaseStudySection
        id="identity"
        eyebrow="Developer Identity"
        title="A profile that's useful before a finished game exists."
        intro="Role, engines, skills, and availability connect to public projects and devlog history: one durable record, not a résumé that goes stale."
        contentClassName="flex flex-col gap-9"
      >
        <ProductBrowserFrame
          src="/work/glyph/developer-profile.png"
          alt="Nova Calder's developer profile on Glyph, showing role, engines, skills, availability, and current project"
          caption="A seeded fictional developer profile: identity, availability, and public work in one place."
          url="Glyph: developer profile"
          title="@demo-nova"
        />
      </CaseStudySection>

      <CaseStudySection
        id="projects"
        eyebrow="Projects: Private First, Public Deliberately"
        title="Every new project starts private. The developer decides when that changes."
        intro="This is Glyph's strongest current-product story: unfinished work is treated as sensitive by default, not exposed the moment a project is created."
        contentClassName="flex flex-col gap-9"
      >
        <ProductBrowserFrame
          src="/work/glyph/project-create.png"
          alt="The New Project form on Glyph, with fields for project title, URL slug, short and long description, tags, engine, and genre"
          caption="The top of the create form: title, slug, description, tags, engine, and genre. The Visibility field sits further down; see below for what it defaults to."
          url="Glyph: new project"
          title="New project"
        />
        <div className="grid gap-6 tab:grid-cols-2">
          <FeatureNote num="01" title="Private is the state, not a setting">
            Further down the same form, a &ldquo;Private by default&rdquo; badge sits next to the Visibility field:
            the product states its own privacy posture before anyone touches that setting.
          </FeatureNote>
          <FeatureNote num="02" title="Verified, not assumed">
            Confirmed directly: signed in as the project owner, the private project is fully readable and editable;
            signed in as a second account, the exact same URL returns a non-disclosing 404. Glyph never confirms a
            private project exists to anyone but its owner.
          </FeatureNote>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">PRIVATE-PROJECT ACCESS, VERIFIED</span>
          <ProductBrowserFrame
            src="/work/glyph/private-owner-view.png"
            alt="Nova Calder viewing her own private project 'Private Orbit', showing full project detail and owner actions"
            caption="Owner view: full project detail and owner actions. The same URL requested from a second account returns a real, non-disclosing 404 instead."
            url="Glyph: private project (owner)"
            title="Private Orbit"
          />
          <GlyphPrivacyModel />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="devlogs"
        eyebrow="Devlogs: Building in Public"
        title="Progress stays attached to the project it's about."
        intro="A devlog is a dated post on a project. The feed is exactly the set of public devlogs from developers you follow, with nothing separate maintained for it."
        contentClassName="flex flex-col gap-9"
      >
        <div className="grid gap-6 tab:grid-cols-2">
          <ProductBrowserFrame
            src="/work/glyph/feed.png"
            alt="The Glyph feed, showing devlog posts from a followed developer, each tagged with its project and dated"
            caption="Signed in as a developer following this author: project-tagged posts, not a generic timeline."
            url="Glyph: feed"
            title="Feed"
          />
          <ProductBrowserFrame
            src="/work/glyph/devlog-detail.png"
            alt="A single devlog detail page, showing heart, lightbulb, fire, and thinking-face reactions"
            caption="A single devlog: reactions attach to this exact update, not a general wall."
            url="Glyph: devlog"
            title="Combat Redesign"
          />
        </div>
        <CaseStudyDecision label="Active development">
          Devlog detail/edit, feed pagination, comments, and reactions were built in the current uncommitted Stage 5
          work and committed as a checkpoint before this capture pass. Lint, typecheck, 36 unit tests, and a
          production build all pass at that commit; a final live two-account E2E rerun is the next verification
          step, not yet recorded.
        </CaseStudyDecision>
      </CaseStudySection>

      <CaseStudySection
        id="playtesting"
        eyebrow="Structured Playtesting"
        title="A request defines what to test, before anyone tests it."
        intro="Platform, expected time, capacity, and focus areas are structured fields, not a link dropped in a chat."
        contentClassName="flex flex-col gap-9"
      >
        <ProductBrowserFrame
          src="/work/glyph/playtest-new.png"
          alt="The Request Playtesters form on Glyph, with fields for project, build URL, build type, requested testers, platforms, focus areas, and description"
          caption="The real playtest-request form: project, build URL, platforms, requested testers, and focus areas as structured fields, not a link dropped in a chat."
          url="Glyph: new playtest"
          title="Request Playtesters"
        />
        <GlyphPlaytestFlow />
      </CaseStudySection>

      <CaseStudySection
        id="network"
        eyebrow="Discover & Network"
        title="Public work becomes discoverable; private work never does."
        intro="Collaboration and events extend the same network, but stay secondary to the project and developer identity at the center."
        contentClassName="flex flex-col gap-9"
      >
        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">DISCOVER</span>
          <ProductBrowserFrame
            src="/work/glyph/discover.png"
            alt="The Glyph Discover page, showing recent public projects and eight developer profiles, mostly seeded fictional accounts"
            caption="Recent public projects and eight developer profiles. Most are clearly seeded fixtures (@demo-nova, @jonas-weber); one, a real personal test account, isn't: a cleanup item on the live product, not this write-up."
            url="Glyph: discover"
            title="Discover"
          />
        </div>
        <p className="m-0 text-[13px] leading-[1.6] text-ink-faint text-pretty">
          Collaboration and events extend the same network: two open roles scoped to specific projects, and two
          fictional capture-fixture events. Both show real current-local read/create behavior against seeded data,
          not evidence of active community, successful matches, or event attendance.
        </p>
      </CaseStudySection>

      <PhaseDivider label="FOUNDATION" />

      <CaseStudySection
        id="foundation"
        eyebrow="Technical Foundation"
        title="Privacy is enforced at the database, not just the interface."
        intro="Server-validated mutations, policy-backed data access, owner-scoped media, and non-disclosing private routes, verified directly and not assumed from the schema."
        contentClassName="flex flex-col gap-9"
      >
        <GlyphAudienceSegments />
        <GlyphStackList />
      </CaseStudySection>

      <PhaseDivider label="EVOLUTION" />

      <CaseStudySection
        id="evolution"
        eyebrow="Product Evolution"
        title="Two source lineages, kept explicit rather than blended into one story."
        intro="A separate, publicly deployed prototype exists with a broader feature set and a different privacy model. It's evidence of exploration, not a substitute for verifying this product."
        contentClassName="flex flex-col gap-9"
      >
        <GlyphSourceLineage />
        <GlyphStatusMatrix />
      </CaseStudySection>

      <CaseStudySection
        id="outcome"
        eyebrow="Outcome & Reflection"
        title="What this build demonstrates, and what comes next."
        contentClassName="flex flex-col gap-9"
      >
        <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
          Community software becomes more credible when it protects unfinished work and makes status visible, even
          when the honest state is empty, local, or still being built. The next step isn’t more surface area; it’s
          completing and validating the feedback loop (tester discovery, signup, and structured response) in the
          current architecture.
        </p>
      </CaseStudySection>

      <CaseStudyNavigation nextSlug="care" nextTitle="C.A.R.E. for Horses" />
    </>
  );
}
