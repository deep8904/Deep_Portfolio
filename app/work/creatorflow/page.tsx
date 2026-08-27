import type { Metadata } from "next";
import { Mail, UserPlus, CheckCircle2, UserCog, UserMinus, Crown } from "lucide-react";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyFigure } from "@/components/case-study/CaseStudyFigure";
import { CaseStudyDecision } from "@/components/case-study/CaseStudyDecision";
import { CaseStudyStatus } from "@/components/case-study/CaseStudyStatus";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { ChapterNav } from "@/components/case-study/ChapterNav";
import { ProductSystemMap } from "@/components/case-study/creatorflow/ProductSystemMap";
import { WorkflowBlock, StageStrip, TeamFlowStrip } from "@/components/case-study/creatorflow/WorkflowBlock";
import { RolesEnforcementDiagram } from "@/components/case-study/creatorflow/RolesEnforcementDiagram";
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
  { id: "product", label: "Product" },
  { id: "workflows", label: "Workflows" },
  { id: "permissions", label: "Permissions" },
  { id: "ai", label: "AI & Automations" },
  { id: "status", label: "Status" },
  { id: "stack", label: "Stack" },
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
      />

      <ChapterNav chapters={CHAPTERS} />

      <CaseStudySection
        id="problem"
        eyebrow="The Problem"
        title="A creator's workflow lives in more places than it should."
        intro="Sponsorship deals, content ideas, drafts, and collaborators tend to end up scattered across email, spreadsheets, and whichever tool was closest at hand. CreatorFlow was designed around a specific product problem: give a creator, and the people they work with, one connected place for that workflow — with real permissions once more than one person is involved."
        tight
      />

      <CaseStudySection
        id="product"
        eyebrow="Defining the Product System"
        title="Not a set of screens — a system."
        intro="Every module below reads and writes against the same account, the same auth session, and the same role-based permission layer. That shared foundation is what turns a list of features into one product."
        contentClassName="flex flex-col gap-9"
      >
        <ProductSystemMap />
        <CaseStudyFigure
          src="/work/creatorflow/dashboard-earlier-iteration.jpg"
          alt="The CreatorFlow dashboard, showing demo account data"
          caption="The live Dashboard, running the current dark, single-accent design system — shown with demo account data, not real production metrics."
          tag="Live product · demo data"
        />
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
        <CaseStudyFigure
          src="/work/creatorflow/deals.png"
          alt="The CreatorFlow Deals kanban board, showing sponsorship deals across pipeline stages"
          caption="The Deals board — the same stage pipeline described above, with demo brand names and deal values."
          tag="Live product · demo data"
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
        <CaseStudyFigure
          src="/work/creatorflow/team-members.png"
          alt="The CreatorFlow Team screen, showing two members with role dropdowns and one pending invite with a Revoke action"
          caption="The Team screen — two real members with a live role dropdown, and a pending invite with a Revoke action. The same flow the diagram above describes."
          tag="Live product · demo data"
          aspect="aspect-[1182/490]"
        />
      </CaseStudySection>

      <CaseStudySection
        id="permissions"
        eyebrow="Permissions as Product Design"
        title="Five roles, enforced where it actually matters."
        intro="Permissions here aren't hidden buttons. Every role is checked again at the database layer, so a UI mistake or a bypassed request still can't reach data a role isn't allowed to touch."
        contentClassName="flex flex-col gap-8"
      >
        <RolesEnforcementDiagram />
        <CodeExcerpt label="has_role_access() — the single function every scoped policy calls" code={HAS_ROLE_ACCESS_SQL} />
        <div className="w-full max-w-[460px]">
          <CaseStudyFigure
            src="/work/creatorflow/team-role-matrix.png"
            alt="The CreatorFlow 'What each role can do' matrix, listing which modules each of the five roles can access"
            caption="The product's own “What each role can do” matrix — including an honest admission that Moderator has no assigned modules yet, since CreatorFlow has no community-facing features today."
            tag="Live product · demo data"
            aspect="aspect-[655/780]"
            sizes="(min-width: 810px) 460px, 100vw"
          />
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
              Both came out of the QA process, chosen because each one required understanding the permission model
              more deeply — not just patching a symptom.
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
              Both bugs above came out of a multi-round QA process — each round re-testing prior fixes live against
              the real database before looking for the next gap, rather than trusting that a passing type-check meant
              a feature actually worked. The repository defines CI checks for the same four things; as of this case
              study, all four pass cleanly against the current codebase.
            </p>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="ai"
        eyebrow="Honest AI Product Design"
        title="Say what's real, clearly, before the click."
        intro="A few features are AI-adjacent but not backed by a live model call. Rather than presenting them as more finished than they are, the product decision was to label them plainly — before the user clicks, not just after."
      >
        <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-2">
          <div className="rounded-xl border border-line-soft px-5 py-5">
            <span className="text-[13.5px] font-medium">“Draft reply” / “Review contract” / “AI assist”</span>
            <p className="m-0 mt-2 text-[15px] leading-[1.6] text-ink-faint">
              Template-based output, built from a rate card and structure — not a live AI call. Labeled “— preview” on
              the trigger button itself, with a footer disclosure explaining exactly what it is.
            </p>
          </div>
          <div className="rounded-xl border border-line-soft px-5 py-5">
            <span className="text-[13.5px] font-medium">Gmail deal detection</span>
            <p className="m-0 mt-2 text-[15px] leading-[1.6] text-ink-faint">
              A real, narrow keyword-based classifier, wired to a genuine Gmail OAuth connection with tokens stored in
              Supabase Vault and refreshed automatically — worth noting honestly as real integration code, not
              generalized AI.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <CaseStudyFigure
            src="/work/creatorflow/automations.png"
            alt="The CreatorFlow Automations screen, showing which rules run on a real schedule and which are preview-only"
            caption="Automations — the banner and “PREVIEW (NOT RUNNING)” badges are the actual product copy, not an annotation added for this case study."
            tag="Live product · demo data"
          />
        </div>
        <div className="mt-6">
          <CaseStudyDecision>
            An interface that overstates what’s live erodes trust the first time a user notices. Labeling preview
            functionality accurately was treated as a product decision, not a disclaimer to hide.
          </CaseStudyDecision>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="status"
        eyebrow="Current State"
        title="What's actually working, previewed, or not built yet."
        intro="No feature below is described as more finished than it is."
      >
        <StatusMatrix />
      </CaseStudySection>

      <CaseStudySection id="stack" eyebrow="Engineering Stack" title="What each piece is actually doing.">
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
          <li className="text-[15px] leading-[1.65] text-ink-secondary">— Two real correctness/security issues found through that process, root-caused, fixed, and re-verified live.</li>
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
            The other lesson was about communication, not code: a feature that isn’t finished yet is fine to ship as a
            preview. Presenting it as more finished than it is isn’t.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudyNavigation nextSlug="care" nextTitle="C.A.R.E. for Horses" />
    </>
  );
}
