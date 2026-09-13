const POSITIVE = [
  { label: "Freshness", points: 20 },
  { label: "Primary-source presence", points: 15 },
  { label: "Discussion velocity", points: 15 },
  { label: "Audience relevance", points: 15 },
  { label: "Source diversity", points: 10 },
  { label: "Analysis potential", points: 10 },
  { label: "Search shelf life", points: 10 },
  { label: "Original-angle opportunity", points: 5 },
];

const PENALTIES = ["Rumor risk", "Recent coverage", "Weak evidence", "Saturation", "Staleness", "Single-source dependency"];

export function ScoringModel() {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-line-strong bg-surface px-6 py-6 tab:px-7 tab:py-7">
      <div className="flex flex-col gap-1.5">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">EVERY CANDIDATE, SCORED THE SAME WAY</span>
        <span className="text-[15px] leading-[1.6] text-ink-faint text-pretty">
          No model decides what’s worth writing about. Eight positive components sum to 100 points; six separate
          penalties can pull a score back down.
        </span>
      </div>
      <div className="grid gap-x-8 gap-y-2.5 tab:grid-cols-2">
        {POSITIVE.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3 border-b border-line-soft pb-2.5">
            <span className="text-[14px] text-ink-secondary">{item.label}</span>
            <span className="font-mono text-[13px] tabular-nums text-ink-faint">+{item.points}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[12px] font-semibold tracking-[0.08em] text-ink-faint">PENALTIES</span>
        <div className="flex flex-wrap gap-2">
          {PENALTIES.map((label) => (
            <span key={label} className="rounded-full border border-line-soft px-2.5 py-1 text-[12.5px] text-ink-faint">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
