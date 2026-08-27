import { CaseStudyStatus, CaseStudyStatusKind } from "@/components/case-study/CaseStudyStatus";

type Column = { kind: CaseStudyStatusKind; heading: string; items: string[] };

const COLUMNS: Column[] = [
  {
    kind: "working",
    heading: "Working",
    items: [
      "Operator console — session switcher, controls, live-details panel",
      "Remote — mobile controller sharing Operator's lock logic",
      "Current / next / on-deck program state, computed from one shared row",
      "Hold / Resume — server-enforced, timer freezes and resumes without time loss",
      "Control ownership — 45s staleness window, locked actions return HTTP 423",
      "Rehearsal Mode — architecturally isolated local state, can't reach a real display",
      "Connection-status tracking — reconnect handling on Realtime drop",
      "Broadcast messaging — targeted by all / type / display / group",
      "Per-operator auth via Supabase (replacing an earlier shared-PIN scheme)",
    ],
  },
  {
    kind: "preview",
    heading: "Preview",
    items: [
      "Scheduled broadcasts — one-shot sends work; promotion relies on an in-tab poller, not a server cron",
    ],
  },
  {
    kind: "planned",
    heading: "Planned / not live",
    items: [
      "Recurring broadcasts",
      "Server-side (cron-driven) broadcast promotion",
      "Confirmed production deployment — no deployment config found in the repo at time of writing",
    ],
  },
];

export function KramflowStatusMatrix() {
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
