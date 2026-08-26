import { CaseStudyStatus, CaseStudyStatusKind } from "@/components/case-study/CaseStudyStatus";

type Column = { kind: CaseStudyStatusKind; heading: string; items: string[] };

const COLUMNS: Column[] = [
  {
    kind: "working",
    heading: "Working",
    items: [
      "Auth — real signup / login / password reset",
      "Deals — kanban pipeline, stage moves, delete, Lost state",
      "Ideas — create, edit, delete, status transitions",
      "Drafts — create, rename, delete, unsaved-changes guard",
      "Team — invite, accept, role change, remove, ownership transfer",
      "Settings — profile, data export",
      "Basic search on Ideas and Deals",
      "5-role permission model, enforced via RLS",
    ],
  },
  {
    kind: "preview",
    heading: "Preview",
    items: [
      "“Draft reply” / “Review contract” — template output, explicitly labeled",
      "“AI assist” on Drafts — canned structure, explicitly labeled",
    ],
  },
  {
    kind: "planned",
    heading: "Planned / not live",
    items: [
      "Gmail & YouTube OAuth connections",
      "Automation execution (toggle exists, no backend trigger yet)",
      "Full-text search across every module",
      "Notifications, bulk actions",
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
