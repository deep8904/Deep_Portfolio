const ROWS = [
  { principle: "Work in progress is sensitive", response: "Projects start private. Visibility is a deliberate owner choice, not a default." },
  { principle: "Progress is the content", response: "Devlogs build the project's record over time, not a disconnected update stream." },
  { principle: "Identity compounds", response: "Projects, devlogs, and participation all connect back to one developer profile." },
  { principle: "Feedback should be structured", response: "A playtest request defines focus, time, platform, and capacity up front." },
  { principle: "Credibility over vanity", response: "No fabricated activity, counts, or public scoring of unfinished work." },
];

export function GlyphTraceabilityTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong">
      <div className="grid grid-cols-1 gap-x-6 border-b border-line-strong bg-surface-raised px-5 py-3 tab:grid-cols-[1fr_1.4fr]">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">PRINCIPLE</span>
        <span className="hidden text-[12px] font-semibold tracking-[0.1em] text-ink-num tab:block">PRODUCT RESPONSE</span>
      </div>
      {ROWS.map((row) => (
        <div
          key={row.principle}
          className="grid grid-cols-1 gap-3 border-t border-line-soft px-5 py-4 first:border-t-0 tab:grid-cols-[1fr_1.4fr] tab:gap-6 tab:py-5"
        >
          <span className="text-[14.5px] font-medium tracking-[-0.01em] text-pretty">{row.principle}</span>
          <span className="text-[14.5px] leading-[1.6] text-ink-secondary text-pretty">{row.response}</span>
        </div>
      ))}
    </div>
  );
}
