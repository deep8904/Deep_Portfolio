import type { Metadata } from "next";
import { MousePointerClick, Database, Radio, Tv } from "lucide-react";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyDecision } from "@/components/case-study/CaseStudyDecision";
import { PullStatement } from "@/components/case-study/PullStatement";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { ChapterNav } from "@/components/case-study/ChapterNav";
import { PhaseDivider } from "@/components/case-study/PhaseDivider";
import { ProductBrowserFrame } from "@/components/case-study/ProductBrowserFrame";
import { DisplaysRemotePair } from "@/components/case-study/kramflow/DisplaysRemotePair";
import { FeatureNote } from "@/components/case-study/FeatureNote";
import { CodeExcerpt } from "@/components/case-study/CodeExcerpt";
import { FlowDiagram } from "@/components/case-study/FlowDiagram";
import { SurfaceMap } from "@/components/case-study/kramflow/SurfaceMap";
import { AudienceSplit } from "@/components/case-study/kramflow/AudienceSplit";
import { ProblemBeforeAfter } from "@/components/case-study/kramflow/ProblemBeforeAfter";
import { ReadHierarchy } from "@/components/case-study/kramflow/ReadHierarchy";
import { ControlLockDiagram } from "@/components/case-study/kramflow/ControlLockDiagram";
import { HoldResumeDiagram } from "@/components/case-study/kramflow/HoldResumeDiagram";
import { RehearsalComparison } from "@/components/case-study/kramflow/RehearsalComparison";
import { FailureStatesTable } from "@/components/case-study/kramflow/FailureStatesTable";
import { ArchitectureEvolutionDiagram } from "@/components/case-study/kramflow/ArchitectureEvolutionDiagram";
import { CapabilityMap } from "@/components/case-study/kramflow/CapabilityMap";
import { KramflowStatusMatrix } from "@/components/case-study/kramflow/KramflowStatusMatrix";
import { StackList } from "@/components/case-study/kramflow/StackList";

const description =
  "A real-time production console for running a live, multi-day event: one shared state across six purpose-built surfaces, with a server-enforced control lock, a shift-on-resume Hold, and a rehearsal mode that's isolated by construction.";

export const metadata: Metadata = {
  title: "KramFlow",
  description,
  alternates: { canonical: "/work/kramflow" },
  openGraph: { title: "KramFlow · Deep Chadamiya", description, url: "/work/kramflow" },
};

const CHAPTERS = [
  { id: "problem", label: "Problem" },
  { id: "surfaces", label: "Surfaces" },
  { id: "read", label: "The 1-Second Read" },
  { id: "control", label: "Control" },
  { id: "hold", label: "Hold & Resume" },
  { id: "realtime", label: "Realtime" },
  { id: "rehearsal", label: "Rehearsal" },
  { id: "failures", label: "Failure States" },
  { id: "evolution", label: "Evolution" },
  { id: "status", label: "Status" },
  { id: "outcome", label: "Outcome" },
];

const CLAIM_CONTROL_CODE = `// enforced server-side, not just hinted at client-side: this is what
// actually stops two operators' clicks from racing past a UI-only check
if (LOCKED_ACTIONS.has(action) && isControllerActive(current) && current.controller_id !== clientId) {
  return NextResponse.json(
    { ok: false, error: "locked", controllerId: current.controller_id },
    { status: 423 }
  );
}

case "claimControl": {
  if (isControllerActive(current) && current.controller_id !== clientId && !force) {
    return NextResponse.json(
      { ok: false, error: "locked", controllerId: current.controller_id },
      { status: 423 }
    );
  }
  patch = { controller_id: clientId, controller_claimed_at: new Date().toISOString() };
}`;

const REALTIME_FLOW = [
  { icon: MousePointerClick, label: "Operator action", body: "Next / Previous / Hold / Jump calls the shared useEventStore(), which PATCHes /api/live." },
  { icon: Database, label: "Postgres write", body: "The route applies the mutation to the live_state row and appends a row to the activity log." },
  { icon: Radio, label: "Realtime broadcast", body: "Every open display subscribes to Realtime on that same row, so a change reaches every connected device within about a second." },
  { icon: Tv, label: "Role-specific render", body: "Each display is a pure renderer of { session, liveState }, with no local mutable program state to drift out of sync." },
];

export default function KramFlowCaseStudy() {
  return (
    <>
      <CaseStudyHero
        eyebrow="CASE STUDY 02"
        title="KramFlow"
        statement="Live events fall apart in a specific way: the operator, the presenter, the AV crew, and the lobby TV all end up working from a slightly different guess about what's happening right now. KramFlow replaces that guessing with one shared live state, expressed through six purpose-built surfaces: a laptop console, a phone, and TVs across the venue, all reading the same truth within about a second of each other."
        meta={[
          { label: "ROLE", value: "Product design & full-stack build" },
          { label: "STATUS", value: "Live V1, deployed" },
        ]}
      >
        <p className="mt-5 text-[13px] font-medium tracking-[0.02em] text-ink-num">
          6 surfaces · 1 shared state · &lt;1s sync · 423 on conflict
        </p>
        <div className="mt-9 tab:mt-11">
          <ProductBrowserFrame
            src="/work/kramflow/console.png"
            alt="The KramFlow Operator Console, showing the running order on the left, the live item and countdown in the center, and control/broadcast/activity panels on the right"
            caption="The Operator Console: the actual public deployment, mid-show on Day 1 of a two-day event."
            url="kramflow.vercel.app/console"
            title="Operator Console"
            chrome="mac"
            dark
            priority
          />
        </div>
      </CaseStudyHero>

      <ChapterNav chapters={CHAPTERS} />

      <CaseStudySection
        id="problem"
        tight
        num="01"
        eyebrow="The Operating Problem"
        title="Everyone in the room is making decisions off a different guess."
        intro="Against a real 200+ item, multi-day, multi-session cue sheet, that gap is where mistakes happen: a speaker walks up while a display still shows the previous session, or two people reach for the same control at once. An ordinary dashboard, refreshed on request, doesn't hold up. There's no single audience, no single distance from the screen, and no time to wait between “now” and the moment someone needs to know it."
        contentClassName="flex flex-col gap-9 pt-2"
      >
        <ProblemBeforeAfter />
        <AudienceSplit />
      </CaseStudySection>

      <PullStatement eyebrow="The design thesis">
        Live-event interfaces aren’t primarily about density. They’re about reducing uncertainty. The countdown
        dominates a display not because it’s the most data, but because it’s the one number that has to survive a
        glance from across a room.
      </PullStatement>

      <PhaseDivider label="THE SYSTEM" />

      <CaseStudySection
        id="surfaces"
        num="02"
        eyebrow="One System, Multiple Surfaces"
        title="Six surfaces, one row of shared state."
        intro="Every surface below reads the same Postgres row over Supabase Realtime. Nothing polls. Two surfaces are authenticated and interactive; four are public, read-only, and reached by a share link rather than a login."
        contentClassName="flex flex-col gap-9"
      >
        <SurfaceMap />
        <div className="flex flex-col gap-6">
          <ProductBrowserFrame
            src="/work/kramflow/cue-sheet.png"
            alt="The KramFlow Cue Sheet editor, listing the morning session's seven program items with start times and durations"
            caption="The Cue Sheet: the single source of truth every display and the console itself read from."
            url="kramflow.vercel.app/cue-sheet"
            title="Cue Sheet"
            aspect="aspect-[2360/1400]"
            dark
          />
          <div className="grid gap-6 tab:grid-cols-2">
            <FeatureNote num="01" title="Behind a login">
              Operator and Remote need an account (and, on this build, a PIN). The people driving the show are
              trained on the tool and come back to it repeatedly.
            </FeatureNote>
            <FeatureNote num="02" title="No login at all">
              AV, Speaker Ready, General, and Presenter are public. Nobody glancing at a lobby TV should need
              credentials to see what’s happening now.
            </FeatureNote>
          </div>
          <DisplaysRemotePair />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="read"
        num="03"
        eyebrow="Designing for the 1-Second Read"
        title="Distance dictates fidelity."
        intro="A TV read from across a room, a console read at arm's length, and a phone held one-handed are three different design problems with the same underlying data. The interface doesn't pretend they're one problem."
        contentClassName="flex flex-col gap-9"
      >
        <ReadHierarchy />
        <div className="flex flex-col gap-6">
          <ProductBrowserFrame
            src="/work/kramflow/av-waiting-room.png"
            alt="The KramFlow AV Waiting Room display, showing the current cue's countdown and a technical prep checklist for mic, video, lighting, and curtains"
            caption="AV Waiting Room, shown live: the current cue's countdown plus exactly the technical checklist the AV crew needs to prep the next one."
            url="kramflow.vercel.app/av"
            title="AV Waiting Room"
            aspect="aspect-[16/9]"
            dark
          />
          <div className="grid gap-6 tab:grid-cols-2">
            <FeatureNote num="01" title="Dominant, by size alone">
              The current cue and its countdown are the only two things that must survive a glance from across the
              room. Everything else is smaller by design, not by accident.
            </FeatureNote>
            <FeatureNote num="02" title="Detail, kept secondary">
              The prep checklist is real information the AV crew needs, but it doesn’t compete with the countdown for
              attention. General and Presenter don’t carry this panel at all.
            </FeatureNote>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">SPEAKER READY</span>
          <ProductBrowserFrame
            src="/work/kramflow/speaker-ready.png"
            alt="The KramFlow Speaker Ready display, showing the on-stage item, a countdown until the speaker is called, and operator notes"
            caption="A calmer version of the same read for a speaker waiting backstage: what's on stage now, a countdown until they're called, and the operator's own staging notes."
            url="kramflow.vercel.app/speaker-ready"
            title="Speaker Ready"
            aspect="aspect-[16/9]"
            dark
          />
        </div>
      </CaseStudySection>

      <PhaseDivider label="OPERATING UNDER PRESSURE" />

      <CaseStudySection
        id="control"
        num="04"
        eyebrow="Control Ownership"
        title="Only one client drives a live event at a time."
        intro="Two operators, or an operator and the remote, reaching for the same control at once is a real failure mode in a live room, first surfaced as a two-tab repro during QA: Tab A holds, Tab B hits Next unaware, and the room gets a contradiction. That grew from a presence indicator into a real, opt-in lock."
        contentClassName="flex flex-col gap-6"
      >
        <ControlLockDiagram />
        <CodeExcerpt label="app/api/live/route.ts: claimControl / locked-action check" code={CLAIM_CONTROL_CODE} />
        <CaseStudyDecision label="Verified, not assumed">
          Confirmed server-side by sending a raw request with a fabricated client id while a real lock was held. The
          server returned 423 regardless of what the client claimed, not just what the UI happened to show. Alerts
          and stage notes stay intentionally unlocked and collaborative; only the actions that actually move the show
          forward (start, next, previous, jump, hold, session switch) are gated.
        </CaseStudyDecision>
        <ProductBrowserFrame
          src="/work/kramflow/broadcast.png"
          alt="The KramFlow Broadcast Center, showing emergency override buttons, active alerts, and a compose panel for scheduling a message to every display"
          caption="Broadcast Center, one of the collaborative, unlocked surfaces: any operator can push an alert to every display without taking control first."
          url="kramflow.vercel.app/broadcast"
          title="Broadcast Center"
          aspect="aspect-[2560/1880]"
          dark
        />
      </CaseStudySection>

      <CaseStudySection
        id="hold"
        num="05"
        eyebrow="Hold & Resume"
        title="A pause that costs nothing when it ends."
        intro="Hold isn't a boolean. It's a timestamp, which is what makes resuming exact instead of approximate."
      >
        <HoldResumeDiagram />
        <div className="mt-6">
          <CaseStudyDecision>
            The full-screen Hold takeover sits above ordinary content but below an active emergency broadcast, and
            the Presenter page’s own control bar sits one layer above Hold itself, specifically so a real click can
            still reach it while Hold is active. Getting that ordering wrong was a real bug, not a hypothetical one.
            See Failure States below.
          </CaseStudyDecision>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="realtime"
        num="06"
        eyebrow="Realtime Synchronization"
        title="One write, every display updates within about a second."
        intro="Displays are pure renderers. They hold no local mutable program state, only animation state, so there's nothing for them to disagree with each other about."
      >
        <FlowDiagram steps={REALTIME_FLOW} />
        <div className="mt-6">
          <CaseStudyDecision label="Verified for real, not simulated">
            A connection-status layer resyncs a backgrounded tab on <code>visibilitychange</code> rather than waiting
            for a manual reload. Its failure path was confirmed by a genuine 401 an unrelated cookie-secret rotation
            produced organically during QA. The failure toast fired correctly and no state was corrupted, which is a
            stronger check than a simulated outage would have been.
          </CaseStudyDecision>
        </div>
      </CaseStudySection>

      <PhaseDivider label="SAFE BY DESIGN" />

      <CaseStudySection
        id="rehearsal"
        num="07"
        eyebrow="Rehearsal, By Construction"
        title="Nothing stops a full rehearsal from reaching a real screen, except never being able to."
        intro="A tech rehearsal needs to run Start / Next / Hold / Alert with zero chance of it reaching a real display, or a share link a guest might already have open."
        contentClassName="flex flex-col gap-6"
      >
        <RehearsalComparison />
        <CaseStudyDecision label="Architecture decision">
          Rehearsal Mode is a separate page holding its own local, unpersisted state, not a flag on the real
          live-state row that every display route would then need to remember to check. A flag makes “can’t reach a
          real display” a runtime check that one missed read anywhere in the surface area breaks; a page that never
          opens a write path or a Realtime channel to the shared state makes it true by construction instead. The
          honest trade-off: this rehearsal doesn’t sync across multiple operators’ tabs the way the real console
          does. It’s a solo practice run, not a multi-person live rehearsal.
        </CaseStudyDecision>
      </CaseStudySection>

      <CaseStudySection
        id="failures"
        num="08"
        eyebrow="Failure States"
        title="Live-event software fails in specific, findable ways."
        intro="Three real cases from QA, chosen because each one needed a genuine root cause, not a surface-level patch."
      >
        <FailureStatesTable />
      </CaseStudySection>

      <CaseStudySection
        id="evolution"
        num="09"
        eyebrow="Architectural Evolution"
        title="A system that outgrew its first architecture."
        intro="The repository has three real branches: main, frozen since July 17 (exactly what's running at the public deployment), and deep, roughly forty commits of continued work since, including everything from the Realtime migration onward. This isn't an unfinished project catching up to a plan; it's a working system that kept getting rebuilt on top of itself as the real requirements got clearer."
      >
        <ArchitectureEvolutionDiagram />
      </CaseStudySection>

      <PhaseDivider label="WHAT SHIPPED" />

      <CaseStudySection
        id="status"
        num="10"
        eyebrow="What's Actually Complete"
        title="What's live, what's implemented, and what hasn't shipped yet."
        intro="The public deployment and the current repository are not the same thing. This table says which is which for every claim above, not just the ones that are easy to admit."
        contentClassName="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-4">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">CAPABILITY MAP</span>
          <CapabilityMap />
        </div>
        <KramflowStatusMatrix />
      </CaseStudySection>

      <CaseStudySection num="11" eyebrow="Stack" title="What it's built on.">
        <StackList />
      </CaseStudySection>

      <CaseStudySection
        id="outcome"
        num="12"
        eyebrow="Outcome & Reflection"
        title="What this system actually supports, right now."
        contentClassName="flex flex-col gap-10"
      >
        <div className="grid grid-cols-2 gap-6 tab:grid-cols-4">
          {[
            { n: "6", label: "purpose-built surfaces" },
            { n: "1", label: "shared live state" },
            { n: "<1s", label: "sync across every display" },
            { n: "3", label: "real failure states fixed" },
          ].map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <span className="text-[34px] font-medium leading-none tracking-[-0.02em] text-ink tab:text-[42px]">
                {m.n}
              </span>
              <span className="text-[13px] leading-[1.4] text-ink-faint">{m.label}</span>
            </div>
          ))}
        </div>
        <ul className="m-0 flex list-none flex-col gap-2.5 border-t border-line-soft p-0 pt-9">
          <li className="text-[15px] leading-[1.65] text-ink-secondary">• Six real surfaces reading one shared state, verified live at the actual public deployment.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">• A server-enforced control lock, verified against a fabricated client id, not just the UI’s own belief.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">• A rehearsal mode that can’t reach a real display by construction, not by a flag someone has to remember.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">• A since-built multi-tenant, real-auth rebuild that exists in source but hasn’t reached the public deployment yet.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">• Three real failure states found, root-caused, and fixed through actual QA, not a hypothetical list.</li>
        </ul>
        <div className="flex flex-col gap-3.5 border-t border-line-soft pt-9">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">WHAT THIS REINFORCED</span>
          <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
            The harder lesson was architectural honesty with myself: this case study could have quietly described the
            newer multi-tenant rebuild as “the product,” since it’s real and it’s finished. Saying plainly that the
            public deployment still runs the older single-tenant version, and that I can’t personally re-verify the
            newer one live without credentials I don’t hold, was less comfortable than skipping the distinction, and
            the right call anyway.
          </p>
        </div>
      </CaseStudySection>

      <PullStatement>
        The hardest part wasn’t making six interfaces. It was making six interfaces feel like one system.
      </PullStatement>

      <CaseStudyNavigation nextSlug="glyph" nextTitle="Glyph" />
    </>
  );
}
