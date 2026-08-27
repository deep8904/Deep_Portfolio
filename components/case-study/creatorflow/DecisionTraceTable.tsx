const ROWS = [
  {
    constraint: "More than one person needs access, but not the same access.",
    decision: "A 5-role model (Owner, Manager, Editor, Designer, Moderator), each mapped to a fixed set of modules.",
  },
  {
    constraint: "A UI check alone doesn't stop a direct API request.",
    decision: "Every role check is repeated at the database layer via one RLS-called function, not just in the interface.",
  },
  {
    constraint: "OAuth tokens are long-lived credentials, not session data.",
    decision: "Stored in Supabase Vault as encrypted secrets; the integrations table keeps only a reference, never the token.",
  },
  {
    constraint: "A scheduled action needs to run without anyone's browser open.",
    decision: "Real Postgres cron jobs call an Edge Function directly — not a client-side timer pretending to be one.",
  },
  {
    constraint: "Some AI-adjacent features aren't backed by a model call yet.",
    decision: "Labeled “— preview” on the control itself, before the click, not disclosed only after.",
  },
];

export function DecisionTraceTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong">
      <div className="grid grid-cols-1 gap-x-6 border-b border-line-strong bg-surface-raised px-5 py-3 tab:grid-cols-[1fr_1fr]">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">PRODUCT CONSTRAINT</span>
        <span className="hidden text-[12px] font-semibold tracking-[0.1em] text-ink-num tab:block">ARCHITECTURE DECISION</span>
      </div>
      {ROWS.map((row) => (
        <div
          key={row.constraint}
          className="grid grid-cols-1 gap-3 border-t border-line-soft px-5 py-4 first:border-t-0 tab:grid-cols-[1fr_1fr] tab:gap-6 tab:py-5"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num tab:hidden">CONSTRAINT</span>
            <span className="text-[14.5px] leading-[1.6] text-ink-secondary text-pretty">{row.constraint}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num tab:hidden">DECISION</span>
            <span className="text-[14.5px] leading-[1.6] text-ink text-pretty">{row.decision}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
