import { CheckCircle2 } from "lucide-react";
import { MODES, ModeId } from "@/lib/after-hours-data";

export function ModeSwitcher({
  active,
  completed,
  onSelect,
}: {
  active: ModeId;
  completed: Set<ModeId>;
  onSelect: (id: ModeId) => void;
}) {
  return (
    <div
      className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [mask-image:linear-gradient(to_right,transparent_0,black_12px,black_calc(100%-24px),transparent_100%)] tab:[mask-image:none]"
      role="group"
      aria-label="Switch mode"
    >
      {MODES.map((mode) => {
        const isActive = mode.id === active;
        const isDone = completed.has(mode.id);
        return (
          <button
            key={mode.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(mode.id)}
            className={[
              "inline-flex h-11 shrink-0 items-center gap-[7px] rounded-lg border px-4 text-[13px] font-medium tracking-[0.02em] transition-colors duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
              isActive
                ? "border-line-hover bg-surface-active text-ink"
                : "border-line-soft bg-transparent text-ink-tertiary hover:bg-surface-hover hover:text-ink",
            ].join(" ")}
          >
            {isDone && <CheckCircle2 size={13} strokeWidth={2} className="text-accent" />}
            {mode.title.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
