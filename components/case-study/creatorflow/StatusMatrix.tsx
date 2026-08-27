import { CaseStudyStatus, CaseStudyStatusKind } from "@/components/case-study/CaseStudyStatus";

type Column = { kind: CaseStudyStatusKind; heading: string; items: string[] };

const COLUMNS: Column[] = [
  {
    kind: "working",
    heading: "Working",
    items: [
      "Auth — real signup / login / password reset",
      "Deals — kanban pipeline, stage moves, delete, Lost state, bulk select/move/delete",
      "Ideas — create, edit, delete, status transitions",
      "Drafts — create, rename, delete, unsaved-changes guard",
      "Team — invite, accept, role change, remove, ownership transfer",
      "Settings — profile, data export",
      "Basic search on Ideas and Deals",
      "5-role permission model, enforced via RLS",
      "Gmail & YouTube OAuth, tokens stored via Supabase Vault with automatic refresh",
    ],
  },
  {
    kind: "preview",
    heading: "Preview",
    items: [
      "“Draft reply” / “Review contract” — template output, explicitly labeled",
      "“AI assist” on Drafts — canned structure, explicitly labeled",
      "Automations — 2 of 3 default rules run on a real schedule; the third (video-published trigger) doesn't fire yet",
      "Notifications — the in-app signal is live; there's no email/cron delivery layer",
    ],
  },
  {
    kind: "planned",
    heading: "Planned / not live",
    items: [
      "Full-text search across every module",
      "Automated trigger for the video-published → repurpose-suggestion rule",
      "Email/cron notification delivery",
    ],
  },
];

export function StatusMatrix() {
  return (
    <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-3">
      {COLUMNS.map((col) => (
        <div key={col.heading} className="flex flex-col gap-4 rounded-xl border border-line-soft px-5 py-5 tab:px-5">
          <CaseStudyStatus kind={col.kind} label={col.heading} />
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {col.items.map((item) => (
              <li key={item} className="text-[15px] leading-[1.55] text-ink-faint text-pretty">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
