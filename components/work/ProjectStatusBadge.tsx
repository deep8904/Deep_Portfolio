import { BookOpen, Eye, Search, Hammer, LucideIcon } from "lucide-react";
import clsx from "clsx";
import type { CaseStudyStatusLevel } from "@/lib/data";

// Separate from CaseStudyStatus (which marks a single feature's build state
// inside a case study) — this describes how much depth the case study
// ITSELF has, independent of the underlying product's own maturity.
const CONFIG: Record<CaseStudyStatusLevel, { label: string; icon: LucideIcon; className: string }> = {
  detailed: { label: "Detailed Case Study", icon: BookOpen, className: "border-line-strong text-ink-secondary" },
  preview: { label: "Project Preview", icon: Eye, className: "border-dashed border-line-strong text-ink-secondary" },
  research: { label: "Research Project", icon: Search, className: "border-line-strong text-ink-secondary" },
  "in-development": { label: "In Development", icon: Hammer, className: "border-dashed border-line-soft text-ink-faint" },
};

export function ProjectStatusBadge({ level }: { level: CaseStudyStatusLevel }) {
  const { label, icon: Icon, className } = CONFIG[level];
  return (
    <span
      className={clsx(
        "inline-flex h-[22px] w-fit shrink-0 items-center gap-[6px] rounded-[6px] border px-2.5 text-[12px] font-medium tracking-[0.02em]",
        className
      )}
    >
      <Icon size={11} strokeWidth={2.25} />
      {label}
    </span>
  );
}
