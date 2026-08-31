import { CheckCircle2, GitBranch, CircleDashed, Clock, Globe, LucideIcon } from "lucide-react";
import clsx from "clsx";

type Tier = "current" | "built" | "active" | "next" | "lineage";

const TIER_CONFIG: Record<Tier, { label: string; icon: LucideIcon; className: string }> = {
  current: { label: "Current Product", icon: CheckCircle2, className: "border-line-strong text-ink-secondary" },
  built: { label: "Built in Current Source", icon: GitBranch, className: "border-line-strong text-ink-secondary" },
  active: { label: "Active Development", icon: CircleDashed, className: "border-dashed border-line-strong text-ink-secondary" },
  next: { label: "Product Direction", icon: Clock, className: "border-dashed border-line-soft text-ink-faint" },
  lineage: { label: "Public Lineage Only", icon: Globe, className: "border-dashed border-line-soft text-ink-faint" },
};

const ROWS: { name: string; tier: Tier; note: string }[] = [
  { name: "Developer identity, private-first projects", tier: "current", note: "Verified against a disposable seeded backend: private default, owner edit, deliberate publish." },
  { name: "Discover, public devlog feed", tier: "current", note: "Populated and permission-filtered against real seeded data." },
  { name: "Devlogs, comments, reactions, follow", tier: "built", note: "Built in the current uncommitted Stage 5 work; a final live two-user E2E rerun is still outstanding." },
  { name: "Playtest request creation", tier: "built", note: "Form, action, and a private build-link table exist and were exercised." },
  { name: "Collaboration post listing/creation", tier: "built", note: "Read/create verified; no application workflow locally." },
  { name: "Event listing", tier: "built", note: "Read surface verified; no local organizer/RSVP UI." },
  { name: "GitHub OAuth round-trip", tier: "active", note: "UI and callback code exist; not exercised in this pass." },
  { name: "Playtest discovery, signup, feedback", tier: "next", note: "Schema exists; no current-local routes. Not claimed as a working loop." },
  { name: "Event authoring / RSVP, collaboration applications", tier: "next", note: "Schema only; product direction, not current behavior." },
  { name: "Notifications", tier: "next", note: "Table and RLS only — no dedicated route in current source." },
  { name: "Broad public deployment (Explore, playtests, publisher tools)", tier: "lineage", note: "Exists on a separate public lineage with a different schema and privacy model. Not this product's evidence." },
];

export function GlyphStatusMatrix() {
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
