import { Shield, AlertTriangle, CheckCircle2, LucideIcon } from "lucide-react";

const STEPS: { icon: LucideIcon; label: string; body: string }[] = [
  {
    icon: Shield,
    label: "The rule",
    body: "A database constraint guarantees exactly one Owner per account, at all times.",
  },
  {
    icon: AlertTriangle,
    label: "The failure",
    body: "A single UPDATE swapping two members' roles violated that constraint mid-statement — Postgres checks a partial unique index per row written, even inside one statement.",
  },
  {
    icon: CheckCircle2,
    label: "The fix",
    body: "Delete both membership rows, then insert them back with roles swapped. Between the delete and the insert, there's nothing left to collide with.",
  },
];

export function OwnershipTransferDiagram() {
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
