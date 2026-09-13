const GUESSES = [
  { role: "Operator", guess: "“Demo.”" },
  { role: "Presenter", guess: "“Break?”" },
  { role: "AV crew", guess: "“Next speaker?”" },
  { role: "Lobby TV", guess: "“Session starting.”" },
];

const SURFACES = ["Operator", "Presenter", "AV", "Displays"];

export function ProblemBeforeAfter() {
  return (
    <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-2">
      <div className="flex flex-col gap-4 rounded-xl bg-ink px-5 py-6 tab:px-6">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-accent-cream/50">BEFORE: four guesses</span>
        <div className="grid grid-cols-2 gap-3">
          {GUESSES.map((g) => (
            <div key={g.role} className="flex flex-col gap-1 rounded-lg bg-white/[0.06] px-3 py-2.5">
              <span className="text-[11px] font-medium tracking-[0.04em] text-accent-cream/45">{g.role}</span>
              <span className="text-[14px] font-medium text-accent-cream">{g.guess}</span>
            </div>
          ))}
        </div>
        <p className="m-0 text-[13px] leading-[1.6] text-accent-cream/60 text-pretty">
          Same moment, four different beliefs about what’s actually happening.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-line-strong px-5 py-6 tab:px-6">
        <span className="self-start text-[12px] font-semibold tracking-[0.1em] text-ink-num">
          AFTER: one shared truth
        </span>
        <div className="flex flex-col items-center gap-2 rounded-lg border border-line-soft bg-surface px-4 py-2.5">
          <span className="text-[13px] font-semibold tracking-[-0.01em] text-ink">Shared live state</span>
        </div>
        <div className="flex w-full items-start justify-between gap-2 px-1">
          {SURFACES.map((s) => (
            <div key={s} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="h-4 w-px bg-line-strong" />
              <span className="text-center text-[12px] font-medium leading-[1.3] text-ink-secondary">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
