import { Radio, CircleDashed, CircleSlash, Clock, LucideIcon } from "lucide-react";
import clsx from "clsx";

type Tier = "live" | "partial" | "disabled" | "planned";

const TIER_CONFIG: Record<Tier, { label: string; icon: LucideIcon; className: string }> = {
  live: { label: "Live", icon: Radio, className: "border-line-strong text-ink-secondary" },
  partial: { label: "Partial", icon: CircleDashed, className: "border-dashed border-line-strong text-ink-secondary" },
  disabled: { label: "Disabled", icon: CircleSlash, className: "border-dashed border-line-soft text-ink-faint" },
  planned: { label: "Planned", icon: Clock, className: "border-dashed border-line-soft text-ink-faint" },
};

const ROWS: { name: string; tier: Tier; note: string }[] = [
  {
    name: "Gmail OAuth",
    tier: "live",
    note: "Real OAuth grant, tokens in Supabase Vault with automatic refresh, feeding a narrow keyword-based deal classifier.",
  },
  {
    name: "YouTube OAuth",
    tier: "live",
    note: "Same Vault-backed connection flow as Gmail; imports real channel video metadata once connected.",
  },
  {
    name: "YouTube Analytics (views/watch-time trend)",
    tier: "partial",
    note: "Needs a separate Analytics API grant beyond the Data API scope most connections have — the UI shows the real video list either way, never a fake trend.",
  },
  {
    name: "Automations execution",
    tier: "partial",
    note: "2 of 3 default rules run on a genuine pg_cron schedule; the third has no trigger engine wired up yet, and says so.",
  },
  {
    name: "Notification delivery",
    tier: "partial",
    note: "The in-app signal is real; there's no email or cron-based delivery layer behind it.",
  },
];

export function IntegrationsMatrix() {
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
