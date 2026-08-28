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
import { GlyphSystemMap } from "@/components/case-study/glyph/GlyphSystemMap";
import { GlyphTraceabilityTable } from "@/components/case-study/glyph/GlyphTraceabilityTable";
import { GlyphAudienceSegments } from "@/components/case-study/glyph/GlyphAudienceSegments";
import { GlyphStatusMatrix } from "@/components/case-study/glyph/GlyphStatusMatrix";
import { GlyphStackList } from "@/components/case-study/glyph/GlyphStackList";

const description =
  "A developer-identity and pre-launch coordination platform for indie game makers — private-by-default projects, structured playtesting, devlogs, and local community, verified against the real current source and a live seeded backend.";

export const metadata: Metadata = {
  title: "Glyph",
  description,
  alternates: { canonical: "/work/glyph" },
  openGraph: { title: "Glyph — Deep Chadamiya", description, url: "/work/glyph" },
};

const CHAPTERS = [
  { id: "problem", label: "The Gap" },
  { id: "landscape", label: "Landscape" },
  { id: "audience", label: "Audience" },
  { id: "definition", label: "Defining the Product" },
  { id: "system", label: "System" },
  { id: "identity", label: "Identity" },
  { id: "playtesting", label: "Playtesting" },
  { id: "public", label: "Building in Public" },
  { id: "collaboration", label: "Collaboration" },
  { id: "product", label: "Full Product" },
  { id: "evolution", label: "Evolution" },
  { id: "outcome", label: "Outcome" },
];

export default function GlyphCaseStudy() {
  return (
    <>
      <CaseStudyHero
        eyebrow="CASE STUDY 04"
        title="Glyph"
        statement="A developer-identity and pre-launch coordination platform for indie game makers — a credible home for a build in progress, structured feedback that doesn't disappear into chat, and a way to find collaborators before there's a store page to point to."
        meta={[
          { label: "ROLE", value: "Product strategy & full-stack build" },
          { label: "STACK", value: "Next.js · Supabase · TypeScript" },
          { label: "STATUS", value: "Active development · verified in local build" },
          { label: "SCOPE", value: "19-table schema, 8 product surfaces" },
        ]}
      >
        <div className="mt-9 tab:mt-11">
          <ProductBrowserFrame
            src="/work/glyph/landing.png"
            alt="The Glyph marketing landing page, reading 'Build your reputation before launch,' with a live-data policy panel"
            caption="The real marketing site — its own copy commits to showing honest empty states over sample data when Supabase isn't configured."
            url="glyph.app"
            title="Glyph"
            aspect="aspect-[3456/2234]"
          />
        </div>
      </CaseStudyHero>

      <ChapterNav chapters={CHAPTERS} />

      <CaseStudySection
        id="problem"
        eyebrow="The Product Gap"
        title="Progress, feedback, and recognition live in different places — and none of them persist."
        intro="An indie developer already has somewhere to host a finished game, somewhere to chat with other developers, and somewhere to post updates. What's missing is the middle: a credible, persistent place for a game that isn't finished yet, where progress accumulates instead of scrolling out of view and feedback survives past the thread it was given in."
        contentClassName="pt-2"
      >
        <div className="flex flex-col gap-3.5 rounded-xl border border-line-soft px-5 py-5 tab:flex-row tab:items-center tab:justify-center tab:gap-6 tab:py-6">
          {["Build something", "Need feedback", "Need collaborators", "Need visibility", "Continue past the jam"].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-3.5">
              <span className="whitespace-nowrap text-[14px] font-medium tracking-[-0.01em] text-ink-secondary">{step}</span>
              {i < arr.length - 1 && <span className="hidden text-ink-faint tab:inline">→</span>}
            </div>
          ))}
        </div>
        <p className="mt-5 text-[15px] leading-[1.65] text-ink-faint text-pretty">
          Each step above is a real, separate destination today — a chat server, a spreadsheet, a social post. This
          framing is the product’s own stated reasoning (from its internal brief), not a claim backed by direct user
          interviews.
        </p>
      </CaseStudySection>

      <PhaseDivider label="DISCOVER" />

      <CaseStudySection
        id="landscape"
        eyebrow="Where This Sits"
        title="Not a competitor to itch.io or Discord — the seam between them."
        intro="Glyph doesn't try to replace a storefront, a chat server, or a job board. It's built for the narrower, unaddressed step of documenting and getting structured feedback on a game that isn't ready for any of those yet."
      >
        <p className="m-0 text-[15px] leading-[1.7] text-ink-secondary text-pretty">
          No formal competitive analysis with scored feature comparisons exists for this project — stating one here
          would fabricate rigor that wasn’t actually done. What’s real is the product’s own framing: itch.io and
          Steam are built for a finished (or at least playable) release, Discord is built for real-time conversation
          that scrolls away, and none of them are built to answer “what has this developer actually shipped progress
          on, and did their last build get useful feedback?”
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="audience"
        eyebrow="Who This Is For"
        title="Five segments, drawn from planning docs — not from interviews."
        intro="These are audience segments the product was designed around, sourced from the project's own internal brief. They are deliberately not presented as user personas, since no direct user research (interviews, usability sessions, surveys) was conducted for Glyph."
      >
        <GlyphAudienceSegments />
      </CaseStudySection>

      <CaseStudySection
        id="definition"
        eyebrow="From Observation to Response"
        title="Every major feature traces back to a stated product need."
        intro="Glyph's own product-planning documents make this reasoning explicit — this table restates it, it doesn't invent it."
      >
        <GlyphTraceabilityTable />
      </CaseStudySection>

      <PhaseDivider label="SYSTEM" />

      <CaseStudySection
        id="system"
        eyebrow="Product Architecture"
        title="Eight surfaces, one RLS-enforced database."
        intro="Verified directly against the three migration files and a running instance of the app — not against the product-planning documents, which describe a table shape that turned out to be close but not identical to what actually shipped."
        contentClassName="flex flex-col gap-9"
      >
        <GlyphSystemMap />
      </CaseStudySection>

      <CaseStudySection
        id="identity"
        eyebrow="Identity Before Release"
        title="A developer profile and a project page, both private until you say otherwise."
        intro="Every project defaults to private. Making one public is a deliberate act, not an accident of a public-by-default schema."
        contentClassName="flex flex-col gap-9"
      >
        <ProductBrowserFrame
          src="/work/glyph/developer-profile.png"
          alt="Mira Okafor's real developer profile on Glyph, showing her bio, availability, and one public project"
          caption="A real developer profile, seeded with fictional demo data — bio, availability, and one public project with its own devlog feed."
          url="glyph.app/u/mira_okafor"
          title="mira_okafor"
        />
        <div className="grid gap-6 tab:grid-cols-2">
          <FeatureNote num="01" title="Availability, stated plainly">
            Open, busy, or closed — set once on the profile, not re-explained in every collaboration post.
          </FeatureNote>
          <FeatureNote num="02" title="Real projects, not a portfolio grid">
            The project card underneath is the same component Discover uses — one visibility-aware card type, not a
            separate “public profile” view of the data.
          </FeatureNote>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">PROJECT PAGE</span>
          <ProductBrowserFrame
            src="/work/glyph/project-page.png"
            alt="The Emberfall Keep project page, showing cover art, two screenshots, an open playtest sidebar card, and a devlog"
            caption="A public project page — media gallery, developer and open-playtest sidebar cards, and its devlog history below."
            url="glyph.app/p/emberfall-keep"
            title="Emberfall Keep"
          />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="playtesting"
        eyebrow="Structured Playtesting"
        title="Feedback that's rated, written, and tied to a specific build."
        intro="A playtest request isn't just a link drop — it states platforms, expected play time, focus areas, and a tester cap, then collects a rating plus written feedback per signed-up tester."
        contentClassName="flex flex-col gap-9"
      >
        <ProductBrowserFrame
          src="/work/glyph/playtest-new.png"
          alt="The 'New playtest' form on Glyph, with fields for project, title, description, build URL, platforms, minutes, capacity, and focus areas"
          caption="The real playtest-request form — this exact form was used to create the closed-alpha request shown on Emberfall Keep's project page above."
          url="glyph.app/playtests/new"
          title="New playtest"
        />
        <div className="grid gap-6 tab:grid-cols-2">
          <FeatureNote num="01" title="The build URL never becomes public">
            It’s split into its own owner-only table (<code>playtest_build_links</code>) rather than a column on the
            public playtest row — a real privacy hardening pass made partway through this project, not the original
            design.
          </FeatureNote>
          <FeatureNote num="02" title="Capacity is enforced, not decorative">
            Signups are capped and unique per tester at the database level — a request can’t silently overfill.
          </FeatureNote>
        </div>
      </CaseStudySection>

      <PhaseDivider label="SAFE BY DESIGN" />

      <CaseStudySection
        id="public"
        eyebrow="Building in Public"
        title="Devlogs accumulate; reactions and comments attach to the exact post."
        intro="A devlog is a dated, visibility-scoped post on a project. The feed is exactly the set of public devlogs, ordered by time — nothing separate maintained for it."
        contentClassName="flex flex-col gap-9"
      >
        <div className="grid gap-6 tab:grid-cols-2">
          <ProductBrowserFrame
            src="/work/glyph/feed.png"
            alt="The Glyph developer-updates feed, showing three real devlogs from different projects with reaction and comment counts"
            caption="The public devlog feed, signed in as a developer who follows two of these three authors."
            url="glyph.app/feed"
            title="Feed"
          />
          <ProductBrowserFrame
            src="/work/glyph/devlog-detail.png"
            alt="A single devlog detail page on Glyph, showing Fire/Eyes/Star/Ship reaction buttons and a comment box"
            caption="A single devlog — four reaction types (Fire, Eyes, Star, Ship) plus threaded comments, both scoped to this exact post."
            url="glyph.app/p/emberfall-keep/devlogs/..."
            title="Devlog"
          />
        </div>
        <CaseStudyDecision label="Found and fixed during this pass">
          Populating the feed with real data surfaced a genuine PostgREST ambiguity: once{" "}
          <code>devlog_reactions</code> also linked <code>devlogs</code> to <code>profiles</code>, the feed
          query&rsquo;s plain <code>profiles(*)</code> embed became ambiguous between two join paths and the query
          started failing silently, rendering an empty feed. Fixed by naming the foreign key explicitly —{" "}
          <code className="break-all">profiles!devlogs_author_id_fkey(*)</code> — in <code>lib/repository.ts</code>. This is a real defect
          found in the current, uncommitted Stage 5 work, not a hypothetical one.
        </CaseStudyDecision>
      </CaseStudySection>

      <CaseStudySection
        id="collaboration"
        eyebrow="Collaboration & Local Community"
        title="Finding a teammate or a playtest night, without leaving the project's context."
        intro="A collaboration post is scoped to a specific project and states commitment and compensation upfront. Events are separately real — organized by an actual profile, with RSVPs tracked in their own table."
        contentClassName="flex flex-col gap-9"
      >
        <div className="grid gap-6 tab:grid-cols-2">
          <ProductBrowserFrame
            src="/work/glyph/collaborate.png"
            alt="The Glyph collaboration board, showing two open roles and a form to post a new one"
            caption="Two real open roles, each scoped to a specific project, with a stated commitment and compensation."
            url="glyph.app/collaborate"
            title="Collaborate"
          />
          <ProductBrowserFrame
            src="/work/glyph/events.png"
            alt="The Glyph events page, showing an online devlog jam kickoff and an in-person Phoenix indie playtest night"
            caption="One online and one in-person event, each organized by a real developer profile."
            url="glyph.app/events"
            title="Events"
          />
        </div>
      </CaseStudySection>

      <PhaseDivider label="THE PRODUCT" />

      <CaseStudySection
        id="product"
        eyebrow="The Full Experience"
        title="A private-first home base, and a public network underneath it."
        intro="Signed in, Home leads with a developer's own private work; Discover is the same product surfaced publicly."
        contentClassName="flex flex-col gap-9"
      >
        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">HOME — PRIVATE WORKSPACE</span>
          <ProductBrowserFrame
            src="/work/glyph/home-dashboard.png"
            alt="The Glyph home dashboard, showing 'Welcome back, Tomas Reyes', owned-project counts, a next-action card, and public network totals"
            caption="Signed in as a real seeded developer — owned-project counts, a concrete next action, and honest system-state notes ('No runtime sample records are rendered')."
            url="glyph.app/home"
            title="Home"
          />
        </div>
        <div className="grid gap-6 tab:grid-cols-2">
          <FeatureNote num="01" title="Private projects surface first">
            The home view is explicitly ordered private-first, public-second — the opposite of a typical dashboard
            that leads with vanity public metrics.
          </FeatureNote>
          <FeatureNote num="02" title="The system narrates its own honesty">
            “Private URLs stay non-disclosing” and “No runtime sample records are rendered” are lines the product
            itself surfaces to the signed-in developer, not marketing copy layered on top.
          </FeatureNote>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">DISCOVER — PUBLIC NETWORK</span>
          <ProductBrowserFrame
            src="/work/glyph/discover.png"
            alt="The Glyph Discover page, showing four public projects — Emberfall Keep, Driftwood Signal, Glass Orbit, and Static Choir — each with real cover art"
            caption="Four real public projects across four different engines, each card built from the same visibility-aware project component used everywhere else in the product."
            url="glyph.app/discover"
            title="Discover"
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">ON A PHONE</span>
          <div className="grid grid-cols-2 gap-4 tab:grid-cols-3">
            <CaseStudyFigure
              src="/work/glyph/mobile-landing.png"
              alt="The Glyph landing page on a mobile viewport"
              caption="Landing"
              aspect="aspect-[390/844]"
            />
            <CaseStudyFigure
              src="/work/glyph/mobile-discover.png"
              alt="The Glyph Discover page on a mobile viewport"
              caption="Discover"
              aspect="aspect-[390/844]"
            />
            <CaseStudyFigure
              src="/work/glyph/mobile-project.png"
              alt="A Glyph project page on a mobile viewport, with a bottom tab bar for navigation"
              caption="Project page"
              aspect="aspect-[390/844]"
            />
          </div>
          <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">
            Navigation collapses to a bottom tab bar below the desktop breakpoint — the same product, not a separate
            mobile build.
          </p>
        </div>
      </CaseStudySection>

      <PhaseDivider label="WHAT SHIPPED" />

      <CaseStudySection
        id="evolution"
        eyebrow="Product Evolution"
        title="What's verified, what's implemented, and what's still direction."
        intro="This build exists only in local source today — the only public GitHub history under this project's name is an earlier, unrelated waitlist-page lineage. Everything marked 'Verified in Local Build' below was directly captured this pass against a real, temporary Supabase project seeded with fictional demo data, not read from source and assumed to work."
      >
        <GlyphStatusMatrix />
      </CaseStudySection>

      <CaseStudySection eyebrow="Stack" title="What it's built on.">
        <GlyphStackList />
      </CaseStudySection>

      <CaseStudySection
        id="outcome"
        eyebrow="Outcome & Reflection"
        title="What this build actually demonstrates, right now."
        contentClassName="flex flex-col gap-9"
      >
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— Eight real product surfaces reading and writing one RLS-enforced, 19-table schema, verified end to end against a live backend.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— A structured playtest workflow — request, signup, rated feedback — exercised with real seeded accounts, not described from source alone.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— A genuine feed-query bug found and fixed during this pass, in the current uncommitted Stage 5 work.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— A privacy-hardening migration that moved playtest build URLs into their own owner-only table after the initial schema shipped.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— No public deployment yet — the honest next step, not a gap papered over with a demo link.</li>
        </ul>
        <div className="flex flex-col gap-3.5 border-t border-line-soft pt-9">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">WHAT THIS REINFORCED</span>
          <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
            A product this schema-heavy is easy to describe convincingly from source alone — every table exists,
            every RLS policy reads correctly. Actually seeding it and clicking through as different real accounts
            found something source-reading missed: a working feature that silently broke the moment a second
            relationship was added to the schema. Verification against a running system, not just against the code,
            is what caught it.
          </p>
          <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
            The harder honesty here is about status, not features: it would have been easy to call this “live” since
            it demonstrably runs. It runs against a temporary backend I stood up for this case study — the product
            has never been deployed publicly under its current architecture. Saying that plainly, next to a build
            this substantial, is the same discipline the rest of this portfolio tries to hold to.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudyNavigation nextSlug="care" nextTitle="C.A.R.E. for Horses" />
    </>
  );
}
