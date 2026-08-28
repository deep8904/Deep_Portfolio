const ROWS = [
  {
    heuristic: "Visibility of System Status",
    observation: "The Events page's image carousel loads to an empty gray box, and the page offers no dated list of what's actually coming up.",
    consequence: "A visitor checking 'is there anything happening soon' gets no answer at all.",
  },
  {
    heuristic: "Recognition Rather Than Recall",
    observation: "The Donate page describes what a gift funds in dense paragraphs, with no scannable summary near the giving decision itself.",
    consequence: "Someone deciding how much to give has to read and remember, not glance and decide.",
  },
  {
    heuristic: "Consistency and Standards",
    observation: "The same generic contact form (Name/Email/Phone/'I am interested in') repeats at the bottom of every page, standing in for donating, volunteering, and adopting alike.",
    consequence: "Three very different intents funnel into one undifferentiated form with no confirmation of what happens next.",
  },
  {
    heuristic: "Match Between System and the Real World",
    observation: "'Meet Our Horses' is a nav item with a hidden dropdown rather than a browsable page — there's no way to see how many horses are in care or search by name.",
    consequence: "A visitor interested in a specific horse or in adoption history has no page built for that question.",
  },
];

export function CareHeuristicTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong">
      <div className="grid grid-cols-1 gap-x-6 border-b border-line-strong bg-surface-raised px-5 py-3 tab:grid-cols-[1fr_1.4fr_1fr]">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">HEURISTIC</span>
        <span className="hidden text-[12px] font-semibold tracking-[0.1em] text-ink-num tab:block">OBSERVATION</span>
        <span className="hidden text-[12px] font-semibold tracking-[0.1em] text-ink-num tab:block">CONSEQUENCE</span>
      </div>
      {ROWS.map((row) => (
        <div
          key={row.heuristic}
          className="grid grid-cols-1 gap-3 border-t border-line-soft px-5 py-4 first:border-t-0 tab:grid-cols-[1fr_1.4fr_1fr] tab:gap-6 tab:py-5"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num tab:hidden">HEURISTIC</span>
            <span className="text-[14.5px] font-medium tracking-[-0.01em] text-pretty">{row.heuristic}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num tab:hidden">OBSERVATION</span>
            <span className="text-[14.5px] leading-[1.6] text-ink-secondary text-pretty">{row.observation}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num tab:hidden">CONSEQUENCE</span>
            <span className="text-[14.5px] leading-[1.6] text-ink-faint text-pretty">{row.consequence}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
