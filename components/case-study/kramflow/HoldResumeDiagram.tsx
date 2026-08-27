import { Play, Pause, RotateCcw, LucideIcon } from "lucide-react";

const STATES: { icon: LucideIcon; label: string; body: string }[] = [
  {
    icon: Play,
    label: "Running",
    body: "The countdown ticks against the item's real startedAt time — every display computes the same number independently, from the same timestamp.",
  },
  {
    icon: Pause,
    label: "Hold",
    body: "pausedAt is set to now. Every display freezes its own countdown against that timestamp instead of the live clock — no per-client pause bookkeeping needed.",
  },
  {
    icon: RotateCcw,
    label: "Resume",
    body: "startedAt shifts forward by exactly how long the hold lasted. The countdown resumes at the same number it paused on, in lockstep across every display.",
  },
];

export function HoldResumeDiagram() {
  return (
    <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-3">
      {STATES.map(({ icon: Icon, label, body }, i) => (
        <div key={label} className="relative flex flex-col gap-2.5 rounded-xl border border-line-strong px-4 py-4 tab:px-5 tab:py-5">
          <div className="flex items-center gap-2.5">
            <Icon size={17} strokeWidth={2} className="text-ink-faint" />
            <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">{`0${i + 1}`}</span>
          </div>
          <span className="text-[14.5px] font-medium tracking-[-0.01em]">{label}</span>
          <span className="text-[15px] leading-[1.6] text-ink-faint text-pretty">{body}</span>
        </div>
      ))}
    </div>
  );
}
