const GROUPS: { group: string; items: string[] }[] = [
  { group: "Control", items: ["Next / Previous / Jump to item", "Hold / Resume (shift-on-resume)", "Session switching", "Control ownership lock (423)"] },
  { group: "Display", items: ["Operator console", "Remote (one-handed)", "Presenter confidence monitor", "AV, Green Room, General displays"] },
  { group: "Timing", items: ["Hold-aware countdown", "Auto-follow + manual timer modes", "5-step overtime escalation", "Server-computed resume offset"] },
  { group: "Communication", items: ["Targeted broadcasts (all / type / display / group)", "Emergency takeover vs. dismissible banner", "Stage notes with live overrides", "Alert banners across all displays"] },
  { group: "Safety", items: ["Rehearsal Mode, isolated by construction", "Confirm dialogs on destructive actions", "Double-submit guards", "prefers-reduced-motion respected app-wide"] },
  { group: "Event Management", items: ["Multi-session, multi-day scheduling", "Excel cue-sheet import", "Ad-hoc item add/edit/delete", "Dynamic, per-context item fields"] },
  { group: "Auth / Ownership", items: ["Per-operator accounts (current source)", "PIN-gated console (live V1)", "Share-link display access, revocable", "Database-level tenant isolation (current source)"] },
  { group: "Realtime", items: ["Postgres change subscriptions, no polling", "Connection-status tracking + resync", "Display registry with heartbeat", "Screen Wake Lock, re-acquired on visibility change"] },
];

export function CapabilityMap() {
  return (
    <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-2 desk:grid-cols-4">
      {GROUPS.map((g) => (
        <div key={g.group} className="flex flex-col gap-3 rounded-xl border border-line-soft px-4 py-4 tab:px-5 tab:py-5">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">{g.group.toUpperCase()}</span>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {g.items.map((item) => (
              <li key={item} className="text-[13.5px] leading-[1.5] text-ink-faint text-pretty">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
