import { Camera, Gamepad2, Waypoints, FlaskConical, CheckCircle2, Circle, LucideIcon } from "lucide-react";
import { MODES, ModeId } from "@/lib/after-hours-data";

const ICONS: Record<ModeId, LucideIcon> = {
  frame: Camera,
  play: Gamepad2,
  signal: Waypoints,
  lab: FlaskConical,
};

function SignalPreview() {
  return (
    <div className="mt-3 flex items-center gap-1.5" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span
            className="h-[5px] w-[5px] rounded-full bg-accent"
            style={{
              animation: "ahPulse 2.2s ease-in-out infinite",
              animationDelay: `${i * 0.25}s`,
            }}
          />
          {i < 3 && <span className="h-px w-3 bg-line-hover" />}
        </span>
      ))}
    </div>
  );
}

export function ConsoleGrid({
  completed,
  onSelect,
}: {
  completed: Set<ModeId>;
  onSelect: (id: ModeId) => void;
}) {
  return (
    <div data-ah-intro className="grid grid-cols-1 gap-3 tab:grid-cols-2 desk:grid-cols-4">
      {MODES.map((mode) => {
        const Icon = ICONS[mode.id];
        const isDone = completed.has(mode.id);
        const isSignal = mode.id === "signal";
        return (
          <button
            key={mode.id}
            type="button"
            onClick={() => onSelect(mode.id)}
            className={[
              "group flex flex-col items-start gap-4 rounded-xl border border-line-strong bg-surface px-5 py-6 text-left transition-all duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-0.5 hover:border-line-hover hover:bg-surface-hover active:translate-y-0 active:scale-[0.99]",
              isSignal ? "ring-1 ring-inset ring-line-hover" : "",
            ].join(" ")}
          >
            <div className="flex w-full items-start justify-between">
              <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">{mode.num}</span>
              <Icon size={18} strokeWidth={1.8} className="text-ink-tertiary transition-colors group-hover:text-accent" />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[17px] font-medium tracking-[-0.015em]">{mode.title}</span>
              <span className="text-[15px] leading-[1.55] text-ink-muted text-pretty">{mode.description}</span>
            </div>

            {isSignal && <SignalPreview />}

            <span className="mt-auto flex items-center gap-[6px] pt-2 text-[12px] font-medium tracking-[0.08em] text-ink-faint">
              {isDone ? (
                <>
                  <CheckCircle2 size={12} strokeWidth={2} className="text-accent" />
                  DONE
                </>
              ) : (
                <>
                  <Circle size={8} strokeWidth={2} />
                  OPEN
                </>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
