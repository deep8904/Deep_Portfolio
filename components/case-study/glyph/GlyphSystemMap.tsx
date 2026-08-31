const GROUPS = [
  { label: "Identity / content", tables: ["profiles", "projects", "project_media", "devlogs", "devlog_media"] },
  { label: "Social", tables: ["follows", "devlog_reactions", "project_reactions", "devlog_comments", "project_comments"] },
  { label: "Playtesting", tables: ["playtest_requests", "playtest_signups", "playtest_feedback", "playtest_build_links"] },
  { label: "Community", tables: ["events", "event_attendees", "collaboration_posts", "notifications"] },
];

export function GlyphSystemMap() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full flex-col items-center gap-2 rounded-2xl border border-line-strong bg-surface px-6 py-6 text-center">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">DEVELOPER + PROJECT ARE THE ROOTS</span>
        <span className="text-[15px] leading-[1.6] text-ink-faint">
          Every other table exists to attach progress, feedback, or connection to one of these two — never as a
          disconnected feature island.
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-2 desk:grid-cols-4">
        {GROUPS.map((g) => (
          <div key={g.label} className="flex flex-col gap-2.5 rounded-xl border border-line-soft px-4 py-4">
            <span className="text-[12px] font-semibold tracking-[0.08em] text-ink-num">{g.label.toUpperCase()}</span>
            <div className="flex flex-col gap-1">
              {g.tables.map((t) => (
                <span key={t} className="font-mono text-[12.5px] text-ink-faint">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="m-0 text-[13px] leading-[1.6] text-ink-faint text-pretty">
        19 tables from the current local migrations, with Row Level Security declared on every one. Verified
        against a disposable seeded environment, not claimed as production-proven at scale.
      </p>
    </div>
  );
}
