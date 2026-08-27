import type { Metadata } from "next";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyDecision } from "@/components/case-study/CaseStudyDecision";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { CodeExcerpt } from "@/components/case-study/CodeExcerpt";
import { SurfaceMap } from "@/components/case-study/kramflow/SurfaceMap";
import { ControlLockDiagram } from "@/components/case-study/kramflow/ControlLockDiagram";
import { KramflowStatusMatrix } from "@/components/case-study/kramflow/KramflowStatusMatrix";
import { StackList } from "@/components/case-study/kramflow/StackList";

const description =
  "A live-event operating system built for a real multi-day event — one shared live state synced across an operator console, a mobile remote, and role-specific displays, with server-enforced control ownership and an architecturally isolated rehearsal mode.";

export const metadata: Metadata = {
  title: "KramFlow",
  description,
  alternates: { canonical: "/work/kramflow" },
  openGraph: { title: "KramFlow — Deep Chadamiya", description, url: "/work/kramflow" },
};

const GET_LIVE_SQL = `export function getLive(session: Session, state: LiveState): Program | null {
  const { currentOrder } = activeProgress(state);
  if (currentOrder === null) return null;
  return session.items.find((p) => p.order === currentOrder) ?? null;
}

export function getNext(session: Session, state: LiveState): Program | null {
  const { currentOrder } = activeProgress(state);
  if (currentOrder === null) return session.items[0] ?? null;
  return session.items.find((p) => p.order === currentOrder + 1) ?? null;
}`;

const CONTROL_LOCK_CODE = `const controllerActive =
  state.controllerId !== null &&
  state.controllerClaimedAt !== null &&
  now - Date.parse(state.controllerClaimedAt) < CONTROLLER_STALE_MS; // 45s

const iHaveControl = controllerActive && state.controllerId === clientId;
const lockedByOther = controllerActive && state.controllerId !== clientId;

// server-side, on every locked action:
if (isControllerActive(current) && current.controller_id !== clientId) {
  return NextResponse.json(
    { ok: false, error: "locked", controllerId: current.controller_id },
    { status: 423 }
  );
}`;

export default function KramFlowCaseStudy() {
  return (
    <>
      <CaseStudyHero
        eyebrow="KramFlow"
        title="A live-event operating system for what's happening now."
        statement="Built for a real multi-day event program — six sessions, roughly 250 cues — KramFlow keeps an operator console, a mobile remote, and four role-specific TV displays synced around one shared answer to two questions: what's live, and what's next."
        meta={[
          { label: "Role", value: "Product design & full-stack build" },
          { label: "Timeline", value: "~5 weeks, 56 commits" },
          { label: "Stack", value: "Next.js · Supabase Realtime · Postgres" },
          { label: "Status", value: "Project preview — see honest status below" },
        ]}
      />

      <CaseStudySection
        eyebrow="The Problem"
        title="Nobody in a live event agrees on 'now' by default."
        intro="An operator, a presenter, a green-room speaker, and the AV team are all making decisions off what they each individually believe is happening. In a run-of-show with hundreds of cues across a multi-day program, that gap is where mistakes happen — a speaker walks up while a display still shows the previous session, or two people both reach for the same control at once."
      />

      <CaseStudySection
        eyebrow="System Architecture"
        title="Six surfaces, one source of truth."
        intro="Every surface subscribes to the same Postgres row over Supabase Realtime's postgres_changes — a change from any client reaches every other client without anything polling for it."
      >
        <SurfaceMap />
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Live State"
        title="Current and next, computed — not stored twice."
        intro="Rather than keeping separate 'current' and 'next' fields that could drift apart, both are derived from a single order position each time they're needed."
      >
        <CodeExcerpt label="lib/types.ts — getLive() / getNext()" code={GET_LIVE_SQL} />
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Control Ownership"
        title="Only one client drives a live event at a time."
        intro="Two operators — or an operator and the remote — reaching for the same control at once is a real failure mode in a live room. This is enforced on the server, not assumed from the UI."
      >
        <ControlLockDiagram />
        <div className="mt-6">
          <CodeExcerpt label="lib/use-control-lock.ts + app/api/live/route.ts" code={CONTROL_LOCK_CODE} />
        </div>
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Failure-State Thinking"
        title="A rehearsal that structurally cannot go live."
        intro="A full tech rehearsal needs to run Start / Next / Hold / Alert without any chance of it reaching a real display or a share link a guest might already have open."
      >
        <CaseStudyDecision label="Architecture decision">
          Rehearsal Mode is a separate page holding its own local, unpersisted state — not a flag on the real live
          state row that every display route would then need to check and refuse to render for. A flag can be
          forgotten to reset; a page that never writes to the shared row has nothing to forget.
        </CaseStudyDecision>
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Honest Status"
        title="What's actually running, versus what's designed."
        intro="Verified directly against the repository rather than from memory — including the parts that aren't finished."
      >
        <KramflowStatusMatrix />
      </CaseStudySection>

      <CaseStudySection eyebrow="Stack" title="What it's built on.">
        <StackList />
      </CaseStudySection>

      <CaseStudyNavigation nextSlug="care" nextTitle="C.A.R.E. for Horses" />
    </>
  );
}
