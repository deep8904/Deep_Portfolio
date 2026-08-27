import { ArrowDown, LucideIcon } from "lucide-react";

export type FlowStep = { icon: LucideIcon; label: string; body: string };

export function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flex flex-col items-center gap-0">
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-col items-center">
          <div className="flex w-full max-w-[520px] items-start gap-3.5 rounded-xl border border-line-strong bg-surface px-4 py-4">
            <step.icon size={17} strokeWidth={2} className="mt-0.5 shrink-0 text-ink-faint" />
            <div className="flex flex-col gap-1">
              <span className="text-[13.5px] font-medium tracking-[-0.01em]">{step.label}</span>
              <span className="text-[15px] leading-[1.55] text-ink-faint text-pretty">{step.body}</span>
            </div>
          </div>
          {i < steps.length - 1 && <ArrowDown size={15} strokeWidth={2} className="my-2 text-ink-faint" />}
        </div>
      ))}
    </div>
  );
}
