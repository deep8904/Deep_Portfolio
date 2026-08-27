import type { Metadata } from "next";
import { MousePointerClick, Database, Radio, Tv } from "lucide-react";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyDecision } from "@/components/case-study/CaseStudyDecision";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { ChapterNav } from "@/components/case-study/ChapterNav";
import { PhaseDivider } from "@/components/case-study/PhaseDivider";
import { AnnotatedScreen } from "@/components/case-study/AnnotatedScreen";
import { CodeExcerpt } from "@/components/case-study/CodeExcerpt";
import { CaseStudyFigure } from "@/components/case-study/CaseStudyFigure";
import { FlowDiagram } from "@/components/case-study/FlowDiagram";
import { SurfaceMap } from "@/components/case-study/kramflow/SurfaceMap";
import { AudienceSplit } from "@/components/case-study/kramflow/AudienceSplit";
import { ReadHierarchy } from "@/components/case-study/kramflow/ReadHierarchy";
import { ControlLockDiagram } from "@/components/case-study/kramflow/ControlLockDiagram";
import { HoldResumeDiagram } from "@/components/case-study/kramflow/HoldResumeDiagram";
import { RehearsalComparison } from "@/components/case-study/kramflow/RehearsalComparison";
import { FailureStatesTable } from "@/components/case-study/kramflow/FailureStatesTable";
import { KramflowStatusMatrix } from "@/components/case-study/kramflow/KramflowStatusMatrix";
import { StackList } from "@/components/case-study/kramflow/StackList";

const description =
  "A real-time production console for running a live, multi-day event — one shared state across six purpose-built surfaces, with a server-enforced control lock, a shift-on-resume Hold, and a rehearsal mode that's isolated by construction.";

export const metadata: Metadata = {
  title: "KramFlow",
  description,
  alternates: { canonical: "/work/kramflow" },
  openGraph: { title: "KramFlow — Deep Chadamiya", description, url: "/work/kramflow" },
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
  { id: "status", label: "Status" },
  { id: "outcome", label: "Outcome" },
];

const CLAIM_CONTROL_CODE = `// enforced server-side, not just hinted at client-side — this is what
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
  { icon: Radio, label: "Realtime broadcast", body: "Every open display subscribes to Realtime on that same row — a change reaches every connected device within about a second." },
  { icon: Tv, label: "Role-specific render", body: "Each display is a pure renderer of { session, liveState } — no local mutable program state to drift out of sync." },
];

export default function KramFlowCaseStudy() {
  return (
    <>
      <CaseStudyHero
        eyebrow="CASE STUDY 02"
        title="KramFlow"
        statement="A real-time production console for running a live, multi-day event — one shared state, six purpose-built surfaces, and a server-enforced answer to who's allowed to touch it right now."
        meta={[
          { label: "ROLE", value: "Product design & full-stack build" },
          { label: "TIMELINE", value: "~5 weeks, 56 commits" },
          { label: "STACK", value: "Next.js · Supabase Realtime · Postgres" },
          { label: "STATUS", value: "Deployed on an earlier architecture — see Status below" },
        ]}
      >
        <div className="mt-9 tab:mt-11">
          <CaseStudyFigure
            src="/work/kramflow/presenter.png"
            alt="The KramFlow Presenter confidence monitor, showing a large countdown timer and mode controls"
            caption="The Presenter confidence monitor — the actual public deployment, shown in standby between cues."
            tag="Live product"
          />
        </div>
      </CaseStudyHero>

      <ChapterNav chapters={CHAPTERS} />

      <CaseStudySection
        id="problem"
        eyebrow="The Operating Problem"
        title="Everyone in the room is making decisions off a different guess."
        intro="An operator, a presenter, a green-room speaker, and the AV team are all deciding what to do next based on what they each individually believe is happening. Against a real 200+ item, multi-day, multi-session cue sheet, that gap is where mistakes happen — a speaker walks up while a display still shows the previous session, or two people reach for the same control at once. An ordinary dashboard, refreshed on request, doesn't hold up here: there's no single audience, no single distance from the screen, and no time to wait for a manual refresh between “now” and the moment someone needs to know it."
        contentClassName="pt-2"
      >
        <AudienceSplit />
      </CaseStudySection>

      <PhaseDivider label="THE SYSTEM" />

      <CaseStudySection
        id="surfaces"
        eyebrow="One System, Multiple Surfaces"
        title="Six surfaces, one row of shared state."
        intro="Every surface below reads the same Postgres row over Supabase Realtime — nothing polls. Two surfaces are authenticated and interactive; four are public, read-only, and reached by a share link rather than a login."
        contentClassName="flex flex-col gap-9"
      >
        <SurfaceMap />
        <AnnotatedScreen
          src="/work/kramflow/surfaces.png"
          alt="The KramFlow role picker, listing Operator, Remote, AV, Green Room, General, and Presenter"
          caption="The live app's own role picker — the actual public deployment, not a diagram standing in for it."
          tag="Live product"
          hotspots={[
            { index: 1, x: 35.6, y: 47.1 },
            { index: 2, x: 64.4, y: 47.1 },
          ]}
          annotations={[
            {
              index: 1,
              title: "Behind a login",
              body: "Operator and Remote need an account (and, on this build, a PIN) — the people driving the show are trained on the tool and come back to it repeatedly.",
            },
            {
              index: 2,
              title: "No login at all",
              body: "AV, Green Room, General, and Presenter are public. Nobody glancing at a lobby TV should need credentials to see what's happening now.",
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection
        id="read"
        eyebrow="Designing for the 1-Second Read"
        title="Distance dictates fidelity."
        intro="A TV read from across a room, a console read at arm's length, and a phone held one-handed are three different design problems with the same underlying data — the interface doesn't pretend they're one problem."
        contentClassName="flex flex-col gap-9"
      >
        <ReadHierarchy />
        <AnnotatedScreen
          src="/work/kramflow/av-waiting-room.png"
          alt="The KramFlow AV Waiting Room display, showing a large current-cue readout, a countdown, and a smaller live timeline panel"
          caption="The AV Waiting Room display, shown in standby — the real hierarchy described above, not a mockup of it."
          tag="Live product"
          hotspots={[
            { index: 1, x: 28.7, y: 44.1 },
            { index: 2, x: 77, y: 18.5 },
          ]}
          annotations={[
            {
              index: 1,
              title: "Dominant, by size alone",
              body: "The current cue and its countdown are the only two things that must survive a glance from across the room — everything else is smaller by design, not by accident.",
            },
            {
              index: 2,
              title: "Detail, kept secondary",
              body: "The live timeline is real information the AV crew needs, but it doesn't compete with the countdown for attention — General and Presenter don't carry this panel at all.",
            },
          ]}
        />
      </CaseStudySection>

      <PhaseDivider label="OPERATING UNDER PRESSURE" />

      <CaseStudySection
        id="control"
        eyebrow="Control Ownership"
        title="Only one client drives a live event at a time."
        intro="Two operators — or an operator and the remote — reaching for the same control at once is a real failure mode in a live room, first surfaced as a two-tab repro during QA: Tab A holds, Tab B hits Next unaware, and the room gets a contradiction. That grew from a presence indicator into a real, opt-in lock."
        contentClassName="flex flex-col gap-6"
      >
        <ControlLockDiagram />
        <CodeExcerpt label="app/api/live/route.ts — claimControl / locked-action check" code={CLAIM_CONTROL_CODE} />
        <CaseStudyDecision label="Verified, not assumed">
          Confirmed server-side by sending a raw request with a fabricated client id while a real lock was held — the
          server returned 423 regardless of what the client claimed, not just what the UI happened to show. Alerts
          and stage notes stay intentionally unlocked and collaborative; only the actions that actually move the show
          forward (start, next, previous, jump, hold, session switch) are gated.
        </CaseStudyDecision>
      </CaseStudySection>

      <CaseStudySection
        id="hold"
        eyebrow="Hold & Resume"
        title="A pause that costs nothing when it ends."
        intro="Hold isn't a boolean. It's a timestamp — which is what makes resuming exact instead of approximate."
      >
        <HoldResumeDiagram />
        <div className="mt-6">
          <CaseStudyDecision>
            The full-screen Hold takeover sits above ordinary content but below an active emergency broadcast — and
            the Presenter page’s own control bar sits one layer above Hold itself, specifically so a real click can
            still reach it while Hold is active. Getting that ordering wrong was a real bug, not a hypothetical one —
            see Failure States below.
          </CaseStudyDecision>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="realtime"
        eyebrow="Realtime Synchronization"
        title="One write, every display updates within about a second."
        intro="Displays are pure renderers — they hold no local mutable program state, only animation state. There's nothing for them to disagree with each other about."
      >
        <FlowDiagram steps={REALTIME_FLOW} />
        <div className="mt-6">
          <CaseStudyDecision label="Verified for real, not simulated">
            A connection-status layer resyncs a backgrounded tab on <code>visibilitychange</code> rather than waiting
            for a manual reload. Its failure path was confirmed by a genuine 401 an unrelated cookie-secret rotation
            produced organically during QA — the failure toast fired correctly and no state was corrupted, which is a
            stronger check than a simulated outage would have been.
          </CaseStudyDecision>
        </div>
      </CaseStudySection>

      <PhaseDivider label="SAFE BY DESIGN" />

      <CaseStudySection
        id="rehearsal"
        eyebrow="Rehearsal, By Construction"
        title="Nothing stops a full rehearsal from reaching a real screen — except never being able to."
        intro="A tech rehearsal needs to run Start / Next / Hold / Alert with zero chance of it reaching a real display, or a share link a guest might already have open."
        contentClassName="flex flex-col gap-6"
      >
        <RehearsalComparison />
        <CaseStudyDecision label="Architecture decision">
          Rehearsal Mode is a separate page holding its own local, unpersisted state — not a flag on the real
          live-state row that every display route would then need to remember to check. A flag makes “can’t reach a
          real display” a runtime check that one missed read anywhere in the surface area breaks; a page that never
          opens a write path or a Realtime channel to the shared state makes it true by construction instead. The
          honest trade-off: this rehearsal doesn’t sync across multiple operators’ tabs the way the real console
          does — it’s a solo practice run, not a multi-person live rehearsal.
        </CaseStudyDecision>
      </CaseStudySection>

      <CaseStudySection
        id="failures"
        eyebrow="Failure States"
        title="Live-event software fails in specific, findable ways."
        intro="Three real cases from QA — chosen because each one needed a genuine root cause, not a surface-level patch."
      >
        <FailureStatesTable />
      </CaseStudySection>

      <PhaseDivider label="WHAT SHIPPED" />

      <CaseStudySection
        id="status"
        eyebrow="What's Actually Complete"
        title="What's live, what's implemented, and what hasn't shipped yet."
        intro="The public deployment and the current repository are not the same thing — this table says which is which for every claim above, not just the ones that are easy to admit."
      >
        <KramflowStatusMatrix />
      </CaseStudySection>

      <CaseStudySection eyebrow="Stack" title="What it's built on.">
        <StackList />
      </CaseStudySection>

      <CaseStudySection
        id="outcome"
        eyebrow="Outcome & Reflection"
        title="What this system actually supports, right now."
        contentClassName="flex flex-col gap-9"
      >
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— Six real surfaces reading one shared state, verified live at the actual public deployment.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— A server-enforced control lock, verified against a fabricated client id, not just the UI’s own belief.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— A rehearsal mode that can’t reach a real display by construction, not by a flag someone has to remember.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— A since-built multi-tenant, real-auth rebuild that exists in source but hasn’t reached the public deployment yet.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— Three real failure states found, root-caused, and fixed through actual QA — not a hypothetical list.</li>
        </ul>
        <div className="flex flex-col gap-3.5 border-t border-line-soft pt-9">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">WHAT THIS REINFORCED</span>
          <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
            Live-event interfaces aren’t primarily about density. They’re about reducing uncertainty — the countdown
            dominates a display not because it’s the most data, but because it’s the one number that has to survive
            a glance from across a room. Every screen in this system exists to answer exactly one of two questions,
            and nothing else competes with that for attention.
          </p>
          <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
            The harder lesson was architectural honesty with myself: this case study could have quietly described the
            newer multi-tenant rebuild as “the product,” since it’s real and it’s finished. Saying plainly that the
            public deployment still runs the older single-tenant version — and that I can’t personally re-verify the
            newer one live without credentials I don’t hold — was less comfortable than skipping the distinction, and
            the right call anyway.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudyNavigation nextSlug="care" nextTitle="C.A.R.E. for Horses" />
    </>
  );
}
