import { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

export function CaseStudyDecision({ label = "Product decision", children }: { label?: string; children: ReactNode }) {
  return (
    <div className="flex gap-3.5 rounded-xl border border-line-strong bg-surface px-5 py-5 tab:px-6 tab:py-6">
      <Lightbulb size={17} strokeWidth={2} className="mt-0.5 shrink-0 text-ink-faint" />
      <div className="flex flex-col gap-1.5">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">{label.toUpperCase()}</span>
        <div className="text-[14.5px] leading-[1.7] text-ink-secondary text-pretty">{children}</div>
      </div>
    </div>
  );
}
