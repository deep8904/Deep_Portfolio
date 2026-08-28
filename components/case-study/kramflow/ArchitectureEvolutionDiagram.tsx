import { Radio, ArrowRight, GitBranch, LucideIcon } from "lucide-react";

const STAGES: { icon: LucideIcon; label: string; sub: string; body: string }[] = [
  {
    icon: Radio,
    label: "Live V1",
    sub: "main branch · frozen since Jul 17",
    body: "Single-tenant, PIN-gated. This is exactly what's running at the public deployment today — the screenshots in this case study are from it.",
  },
  {
    icon: GitBranch,
    label: "System Evolution",
    sub: "~40 commits since",
    body: "Supabase Realtime, the control lock, Hold/Resume, Rehearsal Mode, and the Display Engine were all built on top of this foundation.",
  },
  {
    icon: ArrowRight,
    label: "Current Architecture",
    sub: "deep branch · current",
    body: "Rebuilt around real per-operator accounts, multi-tenant events, and per-event routing — a deliberate move from a single-crew tool to one any operator can run their own events on.",
  },
];

export function ArchitectureEvolutionDiagram() {
  return (
    <div className="flex flex-col gap-3.5 tab:flex-row tab:items-stretch">
      {STAGES.map((stage, i) => (
        <div key={stage.label} className="flex flex-1 items-stretch gap-3.5">
          <div className="flex flex-1 flex-col gap-2.5 rounded-xl border border-line-strong px-4 py-4 tab:px-5 tab:py-5">
            <stage.icon size={17} strokeWidth={2} className="text-ink-faint" />
            <span className="text-[14px] font-medium tracking-[-0.01em]">{stage.label}</span>
            <span className="text-[11.5px] font-semibold tracking-[0.06em] text-ink-num">{stage.sub}</span>
            <span className="text-[15px] leading-[1.55] text-ink-faint text-pretty">{stage.body}</span>
          </div>
          {i < STAGES.length - 1 && (
            <div className="hidden shrink-0 items-center tab:flex">
              <ArrowRight size={16} strokeWidth={2} className="text-ink-faint" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
