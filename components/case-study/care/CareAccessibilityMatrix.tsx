import { AlertCircle, CircleDashed } from "lucide-react";

const TOTALS = [
  { value: "33", label: "Total issues" },
  { value: "20", label: "High severity" },
  { value: "13", label: "Medium severity" },
];

const POUR = [
  { letter: "P", name: "Perceivable", body: "Color contrast and non-text alternatives fell short on several pages." },
  { letter: "O", name: "Operable", body: "Some interactive elements weren't reliably reachable or operable by keyboard." },
  { letter: "U", name: "Understandable", body: "Form fields and error states didn't consistently label what was expected." },
  { letter: "R", name: "Robust", body: "Some markup didn't expose consistent semantic structure to assistive tech." },
];

const FINDINGS = [
  {
    issue: "Low-contrast body text on the dark navy navigation bar",
    severity: "High" as const,
    pour: "Perceivable",
    consequence: "Low-vision visitors struggle to read primary navigation on every page.",
    response: "Redesign uses a light, high-contrast header with dark text throughout.",
  },
  {
    issue: "The repeated contact form has no visible field labels beyond placeholder text",
    severity: "High" as const,
    pour: "Understandable",
    consequence: "Placeholder text disappears on focus and isn't read reliably by all screen readers.",
    response: "Redesign forms use persistent visible labels above every field.",
  },
  {
    issue: "The Events page image carousel has no accessible controls or state announcement",
    severity: "Medium" as const,
    pour: "Operable",
    consequence: "Keyboard and screen-reader users can't tell the carousel is there or move through it.",
    response: "Redesign replaces the carousel with a structured, static events layout.",
  },
];

export function CareAccessibilityMatrix() {
  return (
    <div className="flex flex-col gap-9">
      <div className="grid grid-cols-3 gap-3.5">
        {TOTALS.map((t) => (
          <div key={t.label} className="flex flex-col gap-1.5 rounded-xl border border-line-soft px-5 py-5 text-center">
            <span className="text-[26px] font-medium tracking-[-0.02em]">{t.value}</span>
            <span className="text-[13px] leading-[1.4] text-ink-faint">{t.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3.5 tab:grid-cols-4">
        {POUR.map((p) => (
          <div key={p.letter} className="flex flex-col gap-2 rounded-xl border border-line-soft px-4 py-4">
            <span className="text-[20px] font-medium tracking-[-0.01em] text-ink-num">{p.letter}</span>
            <span className="text-[13.5px] font-medium tracking-[-0.01em]">{p.name}</span>
            <p className="m-0 text-[13px] leading-[1.55] text-ink-faint text-pretty">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3.5">
        {FINDINGS.map((f) => (
          <div key={f.issue} className="flex flex-col gap-2.5 rounded-xl border border-line-soft px-5 py-5">
            <div className="flex flex-wrap items-center gap-2.5">
              {f.severity === "High" ? (
                <AlertCircle size={14} strokeWidth={2.25} className="text-ink-secondary" />
              ) : (
                <CircleDashed size={14} strokeWidth={2.25} className="text-ink-faint" />
              )}
              <span className="text-[14px] font-medium tracking-[-0.01em]">{f.issue}</span>
              <span className="ml-auto inline-flex h-[22px] shrink-0 items-center rounded-md border border-line-strong px-2 text-[11px] font-medium tracking-[0.02em] text-ink-secondary">
                {f.severity} · {f.pour}
              </span>
            </div>
            <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">
              <span className="text-ink-secondary">Consequence: </span>
              {f.consequence}
            </p>
            <p className="m-0 text-[14px] leading-[1.6] text-ink text-pretty">
              <span className="text-ink-secondary">Redesign response: </span>
              {f.response}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
