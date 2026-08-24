import { ReactNode } from "react";
import { MODES, ModeId } from "@/lib/after-hours-data";

export function ModePanel({
  active,
  completed,
  children,
}: {
  active: ModeId;
  completed: Set<ModeId>;
  children: ReactNode;
}) {
  const mode = MODES.find((m) => m.id === active)!;
  const isDone = completed.has(active);

  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-surface">
      <div className="flex items-center justify-between border-b border-line-soft px-5 py-3">
        <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num">
          MODE — {mode.title.toUpperCase()}
        </span>
        <span className="flex items-center gap-[6px] text-[11px] font-medium tracking-[0.08em] text-ink-faint">
          <span className={["h-[6px] w-[6px] rounded-full", isDone ? "bg-accent" : "bg-ink-faint"].join(" ")} />
          {isDone ? "DONE" : "ACTIVE"}
        </span>
      </div>
      <div key={active} className="p-5 tab:p-7" style={{ animation: "ahPanelIn 280ms cubic-bezier(0.22,0.61,0.36,1) both" }}>
        {children}
      </div>
    </div>
  );
}
