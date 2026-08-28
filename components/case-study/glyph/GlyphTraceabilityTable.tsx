const ROWS = [
  {
    observation: "A build-in-progress has nowhere credible to live before a store page exists.",
    need: "A persistent identity for unfinished work, not just a folder of screenshots.",
    response: "Developer profile + project pages, private by default, promoted to public deliberately.",
  },
  {
    observation: "Feedback given in a Discord thread or a DM disappears within days.",
    need: "Feedback that survives past the conversation it was given in.",
    response: "Structured playtest requests with signups and per-tester rating + written feedback, all persisted.",
  },
  {
    observation: "General reactions to a build get mixed in with unrelated chat.",
    need: "A lightweight signal that's still attached to the exact thing it's reacting to.",
    response: "Per-devlog and per-project reactions and comments, split by target type in the schema.",
  },
  {
    observation: "\"Build in public\" usually means scattered posts across two or three unrelated platforms.",
    need: "One place progress accumulates in order, attached to the project it's about.",
    response: "Devlogs as dated, visibility-scoped posts on a project — and a feed built from exactly those rows.",
  },
  {
    observation: "Finding a collaborator or a local playtester is mostly word of mouth.",
    need: "A lightweight, project-scoped way to state what's needed and let people find it.",
    response: "A collaboration board tied to a project, plus local/online events with real RSVPs.",
  },
];

export function GlyphTraceabilityTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong">
      <div className="grid grid-cols-1 gap-x-6 border-b border-line-strong bg-surface-raised px-5 py-3 tab:grid-cols-[1fr_1fr_1fr]">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">OBSERVATION</span>
        <span className="hidden text-[12px] font-semibold tracking-[0.1em] text-ink-num tab:block">PRODUCT NEED</span>
        <span className="hidden text-[12px] font-semibold tracking-[0.1em] text-ink-num tab:block">GLYPH RESPONSE</span>
      </div>
      {ROWS.map((row) => (
        <div
          key={row.observation}
          className="grid grid-cols-1 gap-3 border-t border-line-soft px-5 py-4 first:border-t-0 tab:grid-cols-[1fr_1fr_1fr] tab:gap-6 tab:py-5"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num tab:hidden">OBSERVATION</span>
            <span className="text-[14.5px] leading-[1.6] text-ink-secondary text-pretty">{row.observation}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num tab:hidden">NEED</span>
            <span className="text-[14.5px] leading-[1.6] text-ink-secondary text-pretty">{row.need}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num tab:hidden">RESPONSE</span>
            <span className="text-[14.5px] leading-[1.6] text-ink text-pretty">{row.response}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
