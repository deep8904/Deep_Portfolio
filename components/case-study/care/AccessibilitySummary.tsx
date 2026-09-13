import { AlertTriangle, AlertCircle, LucideIcon } from "lucide-react";

const SEVERITY: { icon: LucideIcon; count: number; label: string; className: string }[] = [
  { icon: AlertTriangle, count: 20, label: "High severity", className: "text-ink" },
  { icon: AlertCircle, count: 13, label: "Medium severity", className: "text-ink-faint" },
];

const PRINCIPLES = ["Perceivable", "Operable", "Understandable", "Robust"];

export function AccessibilitySummary() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-3.5 tab:grid-cols-2">
        {SEVERITY.map(({ icon: Icon, count, label, className }) => (
          <div key={label} className="flex flex-col gap-2.5 rounded-xl border border-line-strong px-5 py-5">
            <Icon size={17} strokeWidth={2} className={className} />
            <span className="text-[24px] font-medium tracking-[-0.02em]">{count}</span>
            <span className="text-[13px] text-ink-faint">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">
          33 ISSUES · ACROSS ALL FOUR POUR PRINCIPLES · ~9 PAGES EVALUATED
        </span>
        <div className="flex flex-wrap gap-2">
          {PRINCIPLES.map((p) => (
            <span
              key={p}
              className="inline-flex h-8 items-center rounded-md border border-line-soft px-3 text-[13px] font-medium text-ink-secondary"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
