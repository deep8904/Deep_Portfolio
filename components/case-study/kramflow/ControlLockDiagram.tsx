import { ShieldCheck, Timer, Lock, LucideIcon } from "lucide-react";

const STEPS: { icon: LucideIcon; label: string; body: string }[] = [
  {
    icon: Lock,
    label: "The rule",
    body: "Only one client can act on a live event at a time. Claiming control writes a controller id and timestamp onto the shared state row.",
  },
  {
    icon: Timer,
    label: "The staleness window",
    body: "A claim expires after 45 seconds of silence, so a dropped connection can't lock a live event forever — a fresh claim after that window is allowed through.",
  },
  {
    icon: ShieldCheck,
    label: "The enforcement",
    body: "Every locked action re-checks ownership server-side, not just in the UI — a second client attempting a locked action gets a 423, not a race.",
  },
];

export function ControlLockDiagram() {
  return (
    <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-3">
      {STEPS.map(({ icon: Icon, label, body }) => (
        <div key={label} className="flex flex-col gap-2.5 rounded-xl border border-line-strong px-4 py-4 tab:px-5 tab:py-5">
          <Icon size={17} strokeWidth={2} className="text-ink-faint" />
          <span className="text-[13.5px] font-medium tracking-[-0.01em]">{label}</span>
          <span className="text-[15px] leading-[1.6] text-ink-faint text-pretty">{body}</span>
        </div>
      ))}
    </div>
  );
}
