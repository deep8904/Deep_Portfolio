"use client";

import { useMemo, useState } from "react";
import { Camera, Shuffle, Cpu, Monitor, CheckCircle2, LucideIcon } from "lucide-react";

type NodeId = "camera" | "switcher" | "processor" | "display";

const ORDER: NodeId[] = ["camera", "switcher", "processor", "display"];

const NODE_META: Record<NodeId, { label: string; icon: LucideIcon }> = {
  camera: { label: "Camera", icon: Camera },
  switcher: { label: "Switcher", icon: Shuffle },
  processor: { label: "Processor", icon: Cpu },
  display: { label: "Display", icon: Monitor },
};

function shuffled(): NodeId[] {
  const arr = [...ORDER];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function SignalMode({ onComplete }: { onComplete: () => void }) {
  const [layout, setLayout] = useState<NodeId[]>(() => shuffled());
  const [progress, setProgress] = useState<NodeId[]>([]);
  const [message, setMessage] = useState("");
  const [locked, setLocked] = useState(false);

  const nextExpected = ORDER[progress.length];

  const select = (id: NodeId) => {
    if (locked) return;
    if (id === nextExpected) {
      const next = [...progress, id];
      setProgress(next);
      if (next.length === ORDER.length) {
        setLocked(true);
        setMessage("Signal locked.");
        onComplete();
      } else {
        setMessage("");
      }
    } else {
      setProgress([]);
      setMessage("Wrong path — try again.");
    }
  };

  const retry = () => {
    setLayout(shuffled());
    setProgress([]);
    setLocked(false);
    setMessage("");
  };

  const connectorActive = useMemo(
    () => (index: number) => index < progress.length - 1 || (index === progress.length - 1 && locked),
    [progress, locked]
  );

  return (
    <div className="flex flex-col gap-6">
      <p className="m-0 text-[13.5px] leading-[1.6] text-ink-muted">
        Route the signal — select the four nodes in the order a signal actually travels, from source to screen.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 tab:flex-nowrap tab:gap-0">
        {layout.map((id, i) => {
          const meta = NODE_META[id];
          const Icon = meta.icon;
          const stepIndex = progress.indexOf(id);
          const isCorrectSoFar = stepIndex !== -1;
          return (
            <div key={id} className="flex items-center">
              <button
                type="button"
                onClick={() => select(id)}
                disabled={locked}
                aria-label={meta.label}
                aria-pressed={isCorrectSoFar}
                className={[
                  "flex h-[84px] w-[84px] flex-col items-center justify-center gap-1.5 rounded-xl border text-[11.5px] font-medium tracking-[0.02em] transition-all duration-200 disabled:cursor-default",
                  isCorrectSoFar
                    ? "border-accent bg-accent/10 text-ink"
                    : "border-line-strong bg-surface text-ink-secondary hover:border-line-hover hover:bg-surface-hover",
                ].join(" ")}
              >
                {isCorrectSoFar ? (
                  <CheckCircle2 size={18} strokeWidth={2} className="text-accent" />
                ) : (
                  <Icon size={18} strokeWidth={1.8} />
                )}
                {meta.label}
              </button>
              {i < layout.length - 1 && (
                <span
                  aria-hidden="true"
                  className={[
                    "mx-1.5 hidden h-px w-6 tab:block transition-colors duration-300",
                    connectorActive(i) ? "bg-accent" : "bg-line-hover",
                  ].join(" ")}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <p aria-live="polite" className="m-0 min-h-[1.4em] text-[13.5px] font-medium tracking-[0.02em] text-ink-secondary">
          {message}
        </p>
        {locked && (
          <>
            <p className="m-0 text-[12px] tracking-[0.04em] text-ink-faint">
              In broadcast terms: Source → Program → Process → Display.
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-1 text-[12.5px] font-medium text-ink-faint underline decoration-line-hover underline-offset-4 transition-colors hover:text-ink-secondary"
            >
              Route again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
