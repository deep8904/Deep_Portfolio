import { ReactNode } from "react";
import { ArrowRight, LucideIcon } from "lucide-react";

export function StageStrip({ stages, muted }: { stages: string[]; muted?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {stages.map((stage, i) => (
        <span key={stage} className="flex items-center gap-2">
          <span className="inline-flex h-8 items-center rounded-md border border-line-strong px-3 text-[12.5px] font-medium text-ink-secondary">
            {stage}
          </span>
          {i < stages.length - 1 && <ArrowRight size={13} strokeWidth={2} className="text-ink-faint" />}
        </span>
      ))}
      {muted && (
        <span className="inline-flex h-8 items-center rounded-md border border-dashed border-line-soft px-3 text-[12.5px] font-medium text-ink-faint">
          {muted}
        </span>
      )}
    </div>
  );
}

export function TeamFlowStrip({
  steps,
}: {
  steps: { icon: LucideIcon; label: string }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={step.label} className="flex items-center gap-2">
          <span className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line-strong px-3 text-[12.5px] font-medium text-ink-secondary">
            <step.icon size={13} strokeWidth={2} />
            {step.label}
          </span>
          {i < steps.length - 1 && <ArrowRight size={13} strokeWidth={2} className="text-ink-faint" />}
        </span>
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">{label}</span>
      <p className="m-0 text-[14px] leading-[1.65] text-ink-secondary text-pretty">{children}</p>
    </div>
  );
}

export function WorkflowBlock({
  num,
  title,
  diagram,
  needed,
  structured,
  edgeCases,
  implemented,
}: {
  num: string;
  title: string;
  diagram: ReactNode;
  needed: ReactNode;
  structured: ReactNode;
  edgeCases: ReactNode;
  implemented: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 border-t border-line-soft pt-8 first:border-t-0 first:pt-0 tab:pt-9">
      <div className="flex flex-col gap-4">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">{num}</span>
          <h3 className="m-0 text-[19px] font-medium tracking-[-0.015em]">{title}</h3>
        </div>
        {diagram}
      </div>
      <div className="grid grid-cols-1 gap-5 tab:grid-cols-2 desk:grid-cols-4">
        <Field label="WHAT NEEDED TO HAPPEN">{needed}</Field>
        <Field label="HOW IT WAS STRUCTURED">{structured}</Field>
        <Field label="EDGE CASES">{edgeCases}</Field>
        <Field label="WHAT WAS IMPLEMENTED">{implemented}</Field>
      </div>
    </div>
  );
}
