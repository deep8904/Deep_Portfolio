const TOTAL = 39;

const SCORES = [
  { label: "Usefulness", value: "3.71 / 5" },
  { label: "Trust", value: "3.84 / 5" },
  { label: "Recommend likelihood", value: "7.55 / 10" },
];

const THEMES = [
  { count: 14, label: "wanted clearer donation-impact information" },
  { count: 12, label: "wanted an events calendar" },
  { count: 11, label: "wanted adoption stories with photos" },
  { count: 11, label: "wanted clearer volunteer sign-up information" },
  { count: 9, label: "wanted an FAQ" },
];

export function SurveyFindings() {
  return (
    <div className="flex flex-col gap-9">
      <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-3">
        {SCORES.map((s) => (
          <div key={s.label} className="rounded-xl border border-line-soft px-5 py-5 text-center">
            <span className="block text-[24px] font-medium tracking-[-0.02em]">{s.value}</span>
            <span className="mt-1.5 block text-[13px] text-ink-faint">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">
          RECURRING THEMES · {TOTAL} TOTAL RESPONSES
        </span>
        <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
          {THEMES.map((t) => (
            <li key={t.label} className="flex items-center gap-4">
              <div className="h-6 w-full max-w-[280px] overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-ink-tertiary/70"
                  style={{ width: `${(t.count / TOTAL) * 100}%` }}
                />
              </div>
              <span className="whitespace-nowrap text-[13px] font-medium tracking-[-0.01em]">
                {t.count} / {TOTAL}
              </span>
              <span className="text-[15px] text-ink-faint text-pretty">{t.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
