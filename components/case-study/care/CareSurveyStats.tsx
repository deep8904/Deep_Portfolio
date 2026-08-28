const STATS = [
  { value: "39", label: "Survey responses" },
  { value: "3.71 / 5", label: "Usefulness" },
  { value: "3.84 / 5", label: "Trust" },
  { value: "7.55 / 10", label: "Recommend likelihood" },
];

export function CareSurveyStats() {
  return (
    <div className="grid grid-cols-2 gap-3.5 tab:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="flex flex-col gap-1.5 rounded-xl border border-line-soft px-5 py-5 text-center">
          <span className="text-[26px] font-medium tracking-[-0.02em]">{s.value}</span>
          <span className="text-[13px] leading-[1.4] text-ink-faint">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

const NEEDS = [
  { count: 14, label: "Clearer donation impact" },
  { count: 12, label: "Events calendar" },
  { count: 11, label: "Adoption stories with photos" },
  { count: 11, label: "Clearer volunteer sign-up" },
  { count: 9, label: "An FAQ" },
];

const DENOMINATOR = 39;

export function CareRecurringNeeds() {
  const max = Math.max(...NEEDS.map((n) => n.count));
  return (
    <div className="flex flex-col gap-4">
      {NEEDS.map((n) => (
        <div key={n.label} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[14px] font-medium tracking-[-0.01em]">{n.label}</span>
            <span className="shrink-0 text-[13px] tabular-nums text-ink-faint">
              {n.count} / {DENOMINATOR}
            </span>
          </div>
          <div className="h-[8px] w-full overflow-hidden rounded-full bg-surface-raised">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${(n.count / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
      <p className="m-0 mt-1 text-[13px] leading-[1.6] text-ink-faint text-pretty">
        Bars are scaled to the largest response count, not to 39 — read each as a share of the same 39 responses,
        not a percentage of visitors overall.
      </p>
    </div>
  );
}
