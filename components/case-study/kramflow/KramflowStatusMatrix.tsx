import { Radio, CheckCircle2, CircleDashed, HelpCircle, Clock, LucideIcon } from "lucide-react";
import clsx from "clsx";

type Tier = "live" | "implemented" | "partial" | "not-proven" | "planned";

const TIER_CONFIG: Record<Tier, { label: string; icon: LucideIcon; className: string }> = {
  live: { label: "Live & Verified", icon: Radio, className: "border-line-strong text-ink-secondary" },
  implemented: { label: "Implemented", icon: CheckCircle2, className: "border-line-strong text-ink-secondary" },
  partial: { label: "Partial", icon: CircleDashed, className: "border-dashed border-line-strong text-ink-secondary" },
  "not-proven": { label: "Not Proven Live", icon: HelpCircle, className: "border-dashed border-line-soft text-ink-faint" },
  planned: { label: "Planned", icon: Clock, className: "border-dashed border-line-soft text-ink-faint" },
};

const ROWS: { name: string; tier: Tier; note: string }[] = [
  {
    name: "6-surface role picker, AV / Green Room / Presenter displays",
    tier: "live",
    note: "Directly observed running at the public deployment — the screenshots in this case study are from it.",
  },
  {
    name: "PIN-gated Operator/Remote console",
    tier: "live",
    note: "The current public deployment's actual auth model — confirmed live, not from memory.",
  },
  {
    name: "Control ownership lock (claim/release/423)",
    tier: "implemented",
    note: "Verified against the source and its own end-to-end test log (including a fabricated-clientId 423 check) — not re-observed live, since it sits behind a login this session doesn't hold credentials for.",
  },
  {
    name: "Hold/Resume, shift-on-resume timing",
    tier: "implemented",
    note: "Verified against source; the resume computation now runs server-side.",
  },
  {
    name: "Rehearsal Mode",
    tier: "implemented",
    note: "Verified against source — architecturally isolated by construction, not a runtime flag.",
  },
  {
    name: "Per-operator accounts, multi-tenant events, dashboard",
    tier: "not-proven",
    note: "Real, substantial code — signup/login, per-event routes, database-level tenant isolation — but the public deployment still runs the earlier single-tenant, PIN-gated version. This is a genuine architecture rebuild that hasn't reached production yet.",
  },
  {
    name: "Scheduled broadcast promotion",
    tier: "partial",
    note: "One-shot sends work; promotion relies on an in-tab poller, not a server-side cron — a known, documented limitation, not an oversight.",
  },
  {
    name: "Recurring broadcasts",
    tier: "planned",
    note: "Explicitly out of scope for the current broadcast system.",
  },
];

export function KramflowStatusMatrix() {
  return (
    <div className="flex flex-col gap-3.5">
      {ROWS.map((row) => {
        const cfg = TIER_CONFIG[row.tier];
        return (
          <div key={row.name} className="flex flex-col gap-2 rounded-xl border border-line-soft px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <span className="text-[13.5px] font-medium tracking-[-0.01em]">{row.name}</span>
              <span
                className={clsx(
                  "inline-flex h-[24px] shrink-0 items-center gap-[6px] rounded-md border px-2.5 text-[11.5px] font-medium tracking-[0.02em]",
                  cfg.className
                )}
              >
                <cfg.icon size={11} strokeWidth={2.25} />
                {cfg.label}
              </span>
            </div>
            <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">{row.note}</p>
          </div>
        );
      })}
    </div>
  );
}
