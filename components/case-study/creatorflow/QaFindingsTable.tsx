const CASES = [
  {
    title: "Drafts “Unsaved changes”",
    expected: "Saving a draft clears the “Unsaved changes” indicator.",
    observed: "The indicator stayed on indefinitely after a successful save, until the next full page load.",
    cause: "The dirty check compared live content against a snapshot that only ever came from the server-rendered prop — a successful save doesn't itself refresh that prop.",
    fix: "After a confirmed save, the component's own copy of the snapshot is patched with the saved values, so the comparison has something current to check against.",
  },
  {
    title: "RLS query performance",
    expected: "A row-level security policy evaluates its auth check once per query.",
    observed: "Several policies called auth.uid() / auth.jwt() directly in their USING clause, which Postgres re-evaluates for every row scanned.",
    cause: "Writing `auth.uid() = user_id` reads naturally, but Postgres doesn't cache that call as a stable per-statement value the way `(select auth.uid())` does.",
    fix: "Rewrote the affected policies to the cached `(select ...)` form, and added covering indexes on every FK/user_id column the app actually queries.",
  },
  {
    title: "Silent failures",
    expected: "A failed database read either shows real data or a visible error — never a false empty state.",
    observed: "Several query functions returned an empty array on a genuine Supabase error, which the UI then rendered as an honest \"nothing here yet\" — indistinguishable from a real empty state.",
    cause: "Error handling had been written to keep pages from crashing, without distinguishing \"no rows\" from \"the query itself failed.\"",
    fix: "Query functions now throw on a real error; a group-level error boundary catches it with a calm, non-alarming message instead of a red crash screen.",
  },
];

export function QaFindingsTable() {
  return (
    <div className="flex flex-col gap-6">
      {CASES.map((c) => (
        <div key={c.title} className="overflow-hidden rounded-xl border border-line-strong">
          <div className="border-b border-line-strong bg-surface-raised px-5 py-3">
            <span className="text-[13.5px] font-medium tracking-[-0.01em]">{c.title}</span>
          </div>
          <div className="grid grid-cols-1 gap-4 px-5 py-5 tab:grid-cols-4 tab:gap-5">
            {(
              [
                ["EXPECTED", c.expected],
                ["OBSERVED", c.observed],
                ["ROOT CAUSE", c.cause],
                ["FIX", c.fix],
              ] as const
            ).map(([label, body]) => (
              <div key={label} className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num">{label}</span>
                <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">{body}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
