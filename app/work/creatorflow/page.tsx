import type { Metadata } from "next";
import { Mail, UserPlus, CheckCircle2, UserCog, UserMinus, Crown, Globe, Link2, KeyRound, Timer, Database, PlayCircle } from "lucide-react";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyFigure } from "@/components/case-study/CaseStudyFigure";
import { CaseStudyDecision } from "@/components/case-study/CaseStudyDecision";
import { CaseStudyStatus } from "@/components/case-study/CaseStudyStatus";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { ChapterNav } from "@/components/case-study/ChapterNav";
import { PhaseDivider } from "@/components/case-study/PhaseDivider";
import { ProductBrowserFrame } from "@/components/case-study/ProductBrowserFrame";
import { FeatureNote } from "@/components/case-study/FeatureNote";
import { ProductSystemMap } from "@/components/case-study/creatorflow/ProductSystemMap";
import { WorkflowBlock, StageStrip, TeamFlowStrip } from "@/components/case-study/creatorflow/WorkflowBlock";
import { RolesEnforcementDiagram } from "@/components/case-study/creatorflow/RolesEnforcementDiagram";
import { FlowDiagram } from "@/components/case-study/FlowDiagram";
import { DecisionTraceTable } from "@/components/case-study/creatorflow/DecisionTraceTable";
import { QaFindingsTable } from "@/components/case-study/creatorflow/QaFindingsTable";
import { IntegrationsMatrix } from "@/components/case-study/creatorflow/IntegrationsMatrix";
import { AiHonestyMatrix } from "@/components/case-study/creatorflow/AiHonestyMatrix";
import { FragmentationDiagram } from "@/components/case-study/creatorflow/FragmentationDiagram";
import { CodeExcerpt } from "@/components/case-study/CodeExcerpt";
import { OwnershipTransferDiagram } from "@/components/case-study/creatorflow/OwnershipTransferDiagram";
import { InviteVisibilityDiagram } from "@/components/case-study/creatorflow/InviteVisibilityDiagram";
import { StatusMatrix } from "@/components/case-study/creatorflow/StatusMatrix";
import { StackList } from "@/components/case-study/creatorflow/StackList";

const description =
  "A full-stack creator workflow platform — product system design, role-based permissions enforced at the database layer, and an iterative QA process that found and fixed real engineering bugs.";

export const metadata: Metadata = {
  title: "CreatorFlow",
  description,
  alternates: { canonical: "/work/creatorflow" },
  openGraph: { title: "CreatorFlow — Deep Chadamiya", description, url: "/work/creatorflow" },
};

const CHAPTERS = [
  { id: "problem", label: "Problem" },
  { id: "system", label: "System" },
  { id: "workflows", label: "Workflows" },
  { id: "permissions", label: "Permissions" },
  { id: "integrations", label: "Integrations" },
  { id: "ai", label: "AI, Honestly" },
  { id: "interface", label: "Full Product" },
  { id: "qa", label: "QA" },
  { id: "status", label: "Status" },
  { id: "outcome", label: "Outcome" },
];

const HAS_ROLE_ACCESS_SQL = `create or replace function public.has_role_access(
  target_account_id uuid,
  allowed_roles text[]
)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.team_members tm
    where tm.account_id = target_account_id
      and tm.user_id = auth.uid()
      and tm.role = any(allowed_roles)
  );
$$;`;

const TRANSFER_OWNERSHIP_SQL = `-- a naive UPDATE swapping two roles violates the
-- one-owner constraint mid-statement. delete both rows,
-- then insert them back with roles swapped:
delete from public.team_members
  where id in (v_caller_member.id, p_new_owner_member_id);

insert into public.team_members (id, account_id, user_id, role, joined_at)
values
  (v_caller_member.id, v_caller_member.account_id,
   v_caller_member.user_id, 'manager', v_caller_member.joined_at),
  (v_target.id, v_target.account_id,
   v_target.user_id, 'owner', v_target.joined_at);`;

const OAUTH_FLOW = [
  { icon: Globe, label: "Browser", body: "The creator clicks “Connect” in Settings and is sent to Google's own consent screen — never a form asking for a password." },
  { icon: Link2, label: "OAuth callback", body: "Google redirects back with a short-lived authorization code, exchanged server-side for access and refresh tokens." },
  { icon: KeyRound, label: "Supabase Vault", body: "Tokens are stored as encrypted Vault secrets. The integrations table keeps only a secret ID — never the token itself." },
];

const AUTOMATION_FLOW = [
  { icon: PlayCircle, label: "Rule", body: "A member turns a rule on from the Automations screen. The toggle writes a preference, not a promise." },
  { icon: Database, label: "Postgres", body: "For the two scheduled rules, that preference is backed by a real pg_cron job on a fixed cadence — daily and weekly." },
  { icon: Timer, label: "Execution", body: "The cron job calls an Edge Function via pg_net, authenticated with a Vault-stored service-role key, which does the real work." },
];

export default function CreatorFlowCaseStudy() {
  return (
    <>
      <CaseStudyHero
        eyebrow="CASE STUDY 01"
        title="CreatorFlow"
        statement="A full-stack workflow platform that brings a creator's sponsorship deals, content ideas, drafts, and team into one connected product — designed, built, and hardened end to end."
        meta={[
          { label: "ROLE", value: "Product design & full-stack development" },
          { label: "TIMELINE", value: "2025–2026" },
          { label: "STATUS", value: "In active development — not publicly launched" },
          { label: "DISCIPLINES", value: "Product · UX · Full-stack · Permissions · QA" },
        ]}
      >
        <div className="mt-9 tab:mt-11">
          <ProductBrowserFrame
            src="/work/creatorflow/landing.png"
            alt="The CreatorFlow landing page, showing the real product's dark hero section with the headline 'Fewer dropped ideas. More consistent you.'"
            caption="The live marketing site — real product, real copy, not a placeholder splash page."
            url="creatorflow.app"
            title="CreatorFlow"
            aspect="aspect-[3456/2234]"
            chrome="mac"
          />
        </div>
      </CaseStudyHero>

      <ChapterNav chapters={CHAPTERS} />

      <CaseStudySection
        id="problem"
        eyebrow="The Problem"
        title="A creator's workflow lives in more places than it should."
        intro="Sponsorship deals, content ideas, drafts, and collaborators tend to end up scattered across email, spreadsheets, and whichever tool was closest at hand. CreatorFlow was designed around a specific product problem: give a creator, and the people they work with, one connected place for that workflow — with real permissions once more than one person is involved. This came from directly observing that workflow, not from a formal research study — worth saying plainly rather than dressing it up as validated user research."
        contentClassName="pt-2"
      >
        <FragmentationDiagram />
      </CaseStudySection>

      <PhaseDivider label="THE SYSTEM" />

      <CaseStudySection
        id="system"
        eyebrow="Defining the Product System"
        title="Four decisions, not six disconnected screens."
        intro="CreatorFlow is built around four decisions that show up in the architecture, not just the pitch: one operating surface instead of scattered tools, role-aware access enforced at the database, integrations that say what they actually do, and automation that runs on a real schedule or admits it doesn't."
        contentClassName="flex flex-col gap-10"
      >
        <ProductSystemMap />
        <div className="flex flex-col gap-6 border-t border-line-soft pt-9">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">CONSTRAINTS INTO DECISIONS</span>
            <p className="m-0 max-w-[600px] text-[15px] leading-[1.7] text-ink-secondary text-pretty">
              Each of those four decisions came from a specific limitation, not a preference — the same pattern shows
              up again in every section below.
            </p>
          </div>
          <DecisionTraceTable />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="workflows"
        eyebrow="Key Workflows"
        title="Three workflows that carry the real product logic."
        intro="Rather than walk through every screen, these three show what actually had to be designed and built — a staged pipeline, a lifecycle with edit/delete, and a permissions-sensitive collaboration flow."
        contentClassName="flex flex-col gap-8 tab:gap-9"
      >
        <WorkflowBlock
          num="01"
          title="Deals"
          diagram={<StageStrip stages={["Inbound", "Negotiating", "Contracted", "Delivered", "Paid"]} muted="Lost" />}
          needed="A sponsorship deal moves through real stages, and a stalled or declined deal still needs a home."
          structured="A kanban board over a staged pipeline, with a dedicated terminal “Lost” stage added alongside the original four active stages."
          edgeCases="Moving a deal backward, or to Lost, requires confirmation; moving it forward doesn't. Deleting a deal is confirm-gated."
          implemented="Full stage-move pipeline, edit, delete, bulk select/move/delete, and direct deep-linking from the Dashboard's “needs attention” list into the exact deal."
        />
        <ProductBrowserFrame
          src="/work/creatorflow/deals.png"
          alt="The CreatorFlow Deals kanban board, showing sponsorship deals across pipeline stages"
          caption="The Deals board — the same stage pipeline described above, shown with demo brand names and deal values."
          url="creatorflow.app/deals"
          title="Deals"
          aspect="aspect-[3456/2234]"
        />
        <WorkflowBlock
          num="02"
          title="Ideas"
          diagram={<StageStrip stages={["New", "In Progress", "Scheduled", "Done"]} />}
          needed="An idea needs a path from “captured” to “done,” not just a one-time note."
          structured="A status field with real transitions, plus the ability to actually change what was written after creation."
          edgeCases="Ideas originally had no update or delete path at all — status tabs existed but were dead ends for anything a user created themselves."
          implemented="Create, edit (title, notes, tags, status), and delete, verified end to end against the live database rather than trusted from the UI alone."
        />
        <WorkflowBlock
          num="03"
          title="Team"
          diagram={
            <TeamFlowStrip
              steps={[
                { icon: Mail, label: "Invite" },
                { icon: UserPlus, label: "Accept" },
                { icon: UserCog, label: "Role change" },
                { icon: UserMinus, label: "Remove" },
                { icon: Crown, label: "Transfer ownership" },
              ]}
            />
          }
          needed="Bringing in a collaborator without losing control of the account — and without the account being locked to one owner forever."
          structured="An invite → accept flow backed by a real acceptance state machine, plus role change, removal, and ownership transfer, each gated to what the account's rules allow."
          edgeCases="There can only be one Owner at a time; transferring ownership demotes the previous owner, so the interface confirms exactly what's being given up before it runs."
          implemented={
            <>
              Invite, accept (5 handled states: missing link, signed out, wrong account, invalid or already used,
              valid), role change, remove, and ownership transfer — see{" "}
              <CheckCircle2 size={12} strokeWidth={2} className="mb-0.5 inline" /> the permissions section below for
              how each of these is enforced, not just displayed.
            </>
          }
        />
        <ProductBrowserFrame
          src="/work/creatorflow/team-members.png"
          alt="The CreatorFlow Team screen, showing two members with role dropdowns and one pending invite with a Revoke action"
          caption="The Team screen — two real members with a live role dropdown, and a pending invite with a Revoke action. The same flow the diagram above describes."
          url="creatorflow.app/team"
          title="Team"
          aspect="aspect-[1392/1008]"
        />
      </CaseStudySection>

      <PhaseDivider label="PERMISSIONS & TRUST" />

      <CaseStudySection
        id="permissions"
        eyebrow="Permissions as Product Design"
        title="Five roles, enforced where it actually matters."
        intro="Permissions here aren't hidden buttons. Every role is checked again at the database layer, so a UI mistake or a bypassed request still can't reach data a role isn't allowed to touch."
        contentClassName="flex flex-col gap-8"
      >
        <RolesEnforcementDiagram />
        <CodeExcerpt label="has_role_access() — the single function every scoped policy calls" code={HAS_ROLE_ACCESS_SQL} />
        <div className="flex flex-col gap-6 tab:flex-row tab:items-start">
          <div className="w-full max-w-[460px] shrink-0">
            <ProductBrowserFrame
              src="/work/creatorflow/team-role-matrix.png"
              alt="The CreatorFlow 'What each role can do' matrix, listing which modules each of the five roles can access"
              caption="The product's own “What each role can do” matrix — real UI, not a mockup of the permission model."
              url="creatorflow.app/team"
              title="Team"
              aspect="aspect-[1392/1644]"
            />
          </div>
          <div className="flex flex-col gap-6 pt-1">
            <FeatureNote num="01" title="Owner sees everything">
              The baseline role — every module listed, nothing gated.
            </FeatureNote>
            <FeatureNote num="02" title="Moderator, honestly">
              The product’s own copy admits no module is assigned yet, since CreatorFlow has no community-facing
              features today — the same honesty this whole page is trying to practice.
            </FeatureNote>
          </div>
        </div>
        <CaseStudyDecision>
          The permission model was designed as part of the product, not bolted on afterward — each table’s policy
          reflects a real product decision about who should touch that kind of data, then that decision is enforced by
          Postgres itself.
        </CaseStudyDecision>

        <div className="mt-2 flex flex-col gap-10 border-t border-line-soft pt-9">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">PERMISSIONS IN PRACTICE</span>
            <h3 className="m-0 text-[19px] font-medium tracking-[-0.015em]">
              Two cases where the happy path wasn’t enough.
            </h3>
            <p className="m-0 max-w-[600px] text-[15px] leading-[1.7] text-ink-secondary text-pretty">
              Both came out of the same audit pass — chosen because each one required understanding the permission
              model more deeply, not just patching a symptom. The rest of that audit is in the QA section further
              down.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="m-0 text-[16px] font-medium tracking-[-0.01em] text-ink-secondary">Case A — Ownership transfer</h4>
            <OwnershipTransferDiagram />
            <CodeExcerpt label="transfer_account_ownership() — the working fix" code={TRANSFER_OWNERSHIP_SQL} />
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="m-0 text-[16px] font-medium tracking-[-0.01em] text-ink-secondary">Case B — Invite visibility</h4>
            <InviteVisibilityDiagram />
          </div>
        </div>
      </CaseStudySection>

      <PhaseDivider label="SAYING WHAT'S REAL" />

      <CaseStudySection
        id="integrations"
        eyebrow="Integrations, Honestly"
        title="Two integrations, and how finished each one actually is."
        intro="Gmail and YouTube share the same real OAuth connection flow. What each one can actually do once connected is a different question — this section answers it plainly."
        contentClassName="flex flex-col gap-10"
      >
        <FlowDiagram steps={OAUTH_FLOW} />
        <IntegrationsMatrix />

        <div className="flex flex-col gap-6 border-t border-line-soft pt-9">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">AUTOMATION, HONESTLY</span>
            <h3 className="m-0 text-[19px] font-medium tracking-[-0.015em]">Real infrastructure, gated by a toggle.</h3>
            <p className="m-0 max-w-[600px] text-[15px] leading-[1.7] text-ink-secondary text-pretty">
              Turning a rule on doesn’t mean it runs — it means CreatorFlow’s own scheduling infrastructure now owns
              it. Two of the three default rules actually reach that infrastructure.
            </p>
          </div>
          <ProductBrowserFrame
            src="/work/creatorflow/automations.png"
            alt="The CreatorFlow Automations screen, showing which rules run on a real schedule and which are preview-only"
            caption="Automations — the banner and “PREVIEW (NOT RUNNING)” badges are the actual product copy, not an annotation added for this case study."
            url="creatorflow.app/automations"
            title="Automations"
            aspect="aspect-[3456/2234]"
          />
          <div className="grid grid-cols-1 gap-6 tab:grid-cols-2">
            <FeatureNote num="01" title="The rule, stated plainly">
              The banner names exactly which two rules run on a real timer once turned on — not a generic
              “automations enabled” message.
            </FeatureNote>
            <FeatureNote num="02" title="Preview means preview">
              A rule without a trigger engine behind it yet is labeled “PREVIEW (NOT RUNNING)” on the card itself,
              before anyone toggles it on.
            </FeatureNote>
          </div>
          <FlowDiagram steps={AUTOMATION_FLOW} />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="ai"
        eyebrow="AI, Honestly"
        title="The interface shouldn't promise intelligence the system doesn't have."
        intro="A few features are AI-adjacent but not backed by a live model call. Rather than presenting them as more finished than they are, the product decision was to label them plainly — before the user clicks, not just after."
      >
        <AiHonestyMatrix />
        <div className="mt-6">
          <CaseStudyDecision>
            An interface that overstates what’s live erodes trust the first time a user notices. Labeling preview
            functionality accurately was treated as a product decision, not a disclaimer to hide.
          </CaseStudyDecision>
        </div>
      </CaseStudySection>

      <PhaseDivider label="THE FULL PRODUCT" />

      <CaseStudySection
        id="interface"
        eyebrow="The Full Product"
        title="Twelve modules. One connected surface."
        intro="Deals and Team already appeared above, tied to the workflows they support. This is the rest of the product — the same account, the same design system, the same honesty about what's real."
        contentClassName="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-6">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">MANAGE — DASHBOARD</span>
          <ProductBrowserFrame
            src="/work/creatorflow/dashboard.png"
            alt="The CreatorFlow Dashboard, showing pipeline stats, a channel-views chart, and an ideas-shipped progress ring"
            caption="The Dashboard — the account's front page. Shown with demo account data, not real production metrics."
            url="creatorflow.app/dashboard"
            title="Dashboard"
            aspect="aspect-[3456/2234]"
          />
          <div className="grid grid-cols-1 gap-6 tab:grid-cols-2">
            <FeatureNote num="01" title="One glance, no digging">
              Open deals, pipeline value, and what needs follow-up sit in the same stat row — the questions a creator
              actually opens the app to answer.
            </FeatureNote>
            <FeatureNote num="02" title="Said plainly, in the product itself">
              “Seeded demo data. In production this pulls live from the YouTube Analytics API” — the app’s own
              caption, not an annotation added for this case study.
            </FeatureNote>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">PLAN — IDEAS + DRAFTS</span>
          <div className="grid grid-cols-1 gap-6 tab:grid-cols-2">
            <ProductBrowserFrame
              src="/work/creatorflow/ideas.png"
              alt="The CreatorFlow Ideas board, showing captured ideas with status tabs and tag chips"
              caption="Ideas — 12 captured, with New/In Progress/Scheduled/Done tabs and Table/Board/Gallery/Calendar views."
              url="creatorflow.app/ideas"
              title="Ideas"
              aspect="aspect-[3456/2234]"
            />
            <ProductBrowserFrame
              src="/work/creatorflow/drafts.png"
              alt="The CreatorFlow Drafts screen, showing a list of drafts and an open editor with a Submit for review action"
              caption="Drafts — a real editor with dictation, a “Submit for review” approval step, and the honestly-labeled “AI assist (preview).”"
              url="creatorflow.app/drafts"
              title="Drafts"
              aspect="aspect-[3456/2234]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">REPURPOSE</span>
          <ProductBrowserFrame
            src="/work/creatorflow/repurpose.png"
            alt="The CreatorFlow Repurpose screen, showing best-time-to-publish analytics and a list of published videos"
            caption="Repurpose — turns a published video into short-form clips and posts, starting from real publish-time analytics."
            url="creatorflow.app/repurpose"
            title="Repurpose"
            aspect="aspect-[3456/2234]"
          />
          <div className="grid grid-cols-1 gap-6 tab:grid-cols-2">
            <FeatureNote num="01" title="Computed, not guessed">
              Best day and best time to publish are averaged from the account’s own last 10 published videos — real
              aggregation, not a generic best-practice tip.
            </FeatureNote>
            <FeatureNote num="02" title="Real AI, scoped honestly">
              The product’s own copy: generating a new suggestion “calls Gemini against the video’s real transcript”
              in production — the demo account ships pre-generated results instead of requiring a live API key.
            </FeatureNote>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-line-soft pt-9">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">ON A PHONE</span>
            <h3 className="m-0 text-[19px] font-medium tracking-[-0.015em]">
              Two panes on desktop become a stack on mobile.
            </h3>
            <p className="m-0 max-w-[600px] text-[15px] leading-[1.7] text-ink-secondary text-pretty">
              Drafts’ list-and-editor layout doesn’t fit a phone screen, so it doesn’t try to shrink itself into one —
              tapping a draft swaps the list for the editor, with a back arrow to return, instead of cramming both
              panes side by side.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 tab:grid-cols-3">
            <div className="flex flex-col gap-3">
              <CaseStudyFigure
                src="/work/creatorflow/dashboard-mobile.png"
                alt="The CreatorFlow Dashboard on a 390px-wide mobile viewport, showing a single-column stat layout"
                caption="Dashboard — single-column stat cards, hamburger nav."
                tag="Mobile · demo data"
                aspect="aspect-[390/844]"
                sizes="(min-width: 810px) 33vw, 45vw"
              />
            </div>
            <div className="flex flex-col gap-3">
              <CaseStudyFigure
                src="/work/creatorflow/drafts-mobile-list.png"
                alt="The CreatorFlow Drafts list on mobile"
                caption="Drafts — list pane, full width."
                tag="Mobile · demo data"
                aspect="aspect-[390/844]"
                sizes="(min-width: 810px) 33vw, 45vw"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-3 tab:col-span-1">
              <CaseStudyFigure
                src="/work/creatorflow/drafts-mobile-editor.png"
                alt="The CreatorFlow Drafts editor on mobile, after tapping a draft, with a back arrow to return to the list"
                caption="Drafts — editor pane, after tapping a draft."
                tag="Mobile · demo data"
                aspect="aspect-[390/844]"
                sizes="(min-width: 810px) 33vw, 45vw"
              />
            </div>
          </div>
        </div>
      </CaseStudySection>

      <PhaseDivider label="WHAT SHIPPED" />

      <CaseStudySection
        id="qa"
        eyebrow="QA as Product Work"
        title="The same audit that fixed the two permission bugs above."
        intro="One pass through the backend — closing out silent failures, a stale-state bug, and a query-performance issue — alongside the RBAC rebuild that produced the permission bugs already covered."
        contentClassName="flex flex-col gap-8"
      >
        <QaFindingsTable />
        <div className="flex flex-col gap-3.5 rounded-xl border border-line-soft px-5 py-5">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">
            VERIFIED AGAINST THE CURRENT CODEBASE
          </span>
          <div className="flex flex-wrap gap-2">
            <CaseStudyStatus kind="working" label="tsc --noEmit" />
            <CaseStudyStatus kind="working" label="ESLint" />
            <CaseStudyStatus kind="working" label="Vitest" />
            <CaseStudyStatus kind="working" label="next build" />
          </div>
          <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">
            The repository defines CI checks for the same four things via GitHub Actions; as of this case study, all
            four pass cleanly against the current codebase.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="status"
        eyebrow="What Shipped"
        title="What's actually working, previewed, or not built yet."
        intro="No feature below is described as more finished than it is."
      >
        <StatusMatrix />
      </CaseStudySection>

      <CaseStudySection eyebrow="Engineering Stack" title="What each piece is actually doing.">
        <StackList />
      </CaseStudySection>

      <CaseStudySection
        id="outcome"
        eyebrow="Outcome & Reflection"
        title="What this project actually is, right now."
        contentClassName="flex flex-col gap-9"
      >
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— A working full-stack application, not a static prototype.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— A five-role permission architecture, designed as product logic and enforced in the database.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— Core workflows (Deals, Ideas, Team) exercised end to end through multiple QA rounds.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— Three real correctness/performance issues found through that process, root-caused, fixed, and re-verified live.</li>
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— Preview functionality clearly separated from live behavior throughout the interface.</li>
        </ul>
        <div className="flex flex-col gap-3.5 border-t border-line-soft pt-9">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">WHAT THIS REINFORCED</span>
          <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
            Permissions that only exist in the UI aren’t really permissions — the ownership-transfer and invite bugs
            both happened at the layer beneath the interface, which is exactly where they needed to be caught and
            fixed. Building the QA process as rounds, not a single pass, is what surfaced them at all.
          </p>
          <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
            A quieter lesson came from the RLS performance pass: writing <code>auth.uid() = user_id</code> and writing{" "}
            <code>(select auth.uid()) = user_id</code> look almost identical, and only one of them scales. Small
            syntax decisions in a permission system aren’t cosmetic.
          </p>
          <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
            The other lesson was about communication, not code: a feature that isn’t finished yet is fine to ship as a
            preview. Presenting it as more finished than it is isn’t.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudyNavigation nextSlug="care" nextTitle="C.A.R.E. for Horses" />
    </>
  );
}
