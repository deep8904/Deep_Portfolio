import { CheckCircle2, Eye, Clock, LucideIcon } from "lucide-react";
import clsx from "clsx";

export type CaseStudyStatusKind = "working" | "preview" | "planned";

const CONFIG: Record<CaseStudyStatusKind, { label: string; icon: LucideIcon; className: string }> = {
  working: { label: "Working", icon: CheckCircle2, className: "border-line-strong text-ink-secondary" },
  preview: { label: "Preview", icon: Eye, className: "border-dashed border-line-strong text-ink-secondary" },
  planned: { label: "Planned", icon: Clock, className: "border-dashed border-line-soft text-ink-faint" },
};

export function CaseStudyStatus({ kind, label }: { kind: CaseStudyStatusKind; label?: string }) {
  const { label: defaultLabel, icon: Icon, className } = CONFIG[kind];
  return (
    <span
      className={clsx(
        "inline-flex h-[26px] shrink-0 items-center gap-[6px] rounded-md border px-2.5 text-[11px] font-medium tracking-[0.02em]",
        className
      )}
    >
      <Icon size={12} strokeWidth={2.25} />
      {label ?? defaultLabel}
    </span>
  );
}
