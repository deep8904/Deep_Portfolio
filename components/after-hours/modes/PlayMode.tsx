"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, SkipForward } from "lucide-react";

const STEP = 14;
const HIT_RADIUS = 9;
const START = { x: 12, y: 88 };
const EXIT = { x: 88, y: 12 };
const POINTS = [
  { x: 30, y: 65 },
  { x: 55, y: 78 },
  { x: 70, y: 40 },
  { x: 40, y: 22 },
];

function clamp(v: number) {
  return Math.min(96, Math.max(4, v));
}

function near(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.abs(a.x - b.x) < HIT_RADIUS && Math.abs(a.y - b.y) < HIT_RADIUS;
}

export function PlayMode({ onComplete }: { onComplete: () => void }) {
  const [pos, setPos] = useState(START);
  const [collected, setCollected] = useState<boolean[]>(() => POINTS.map(() => false));
  const [done, setDone] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);

  const foundCount = collected.filter(Boolean).length;
  const allFound = foundCount === POINTS.length;

  const move = useCallback(
    (dx: number, dy: number) => {
      if (done) return;
      const next = { x: clamp(pos.x + dx), y: clamp(pos.y + dy) };
      setPos(next);

      const updatedCollected = collected.map((already, i) => already || near(next, POINTS[i]));
      setCollected(updatedCollected);

      if (updatedCollected.every(Boolean) && near(next, EXIT)) {
        setDone(true);
        onComplete();
      }
    },
    [pos, collected, done, onComplete]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const map: Record<string, [number, number]> = {
        ArrowUp: [0, -STEP],
        ArrowDown: [0, STEP],
        ArrowLeft: [-STEP, 0],
        ArrowRight: [STEP, 0],
        w: [0, -STEP],
        s: [0, STEP],
        a: [-STEP, 0],
        d: [STEP, 0],
      };
      const delta = map[e.key];
      if (!delta) return;
      e.preventDefault();
      move(...delta);
    };
    const field = fieldRef.current;
    field?.addEventListener("keydown", onKeyDown);
    return () => field?.removeEventListener("keydown", onKeyDown);
  }, [move]);

  return (
    <div className="flex flex-col gap-5">
      <div
        ref={fieldRef}
        tabIndex={0}
        role="group"
        aria-label="Collection field. Use arrow keys or WASD to move."
        className="relative aspect-square w-full max-w-[420px] overflow-hidden rounded-lg border border-line-soft bg-surface outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{
          backgroundImage: "radial-gradient(var(--color-line-hover) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        {POINTS.map((p, i) =>
          collected[i] ? null : (
            <span
              key={i}
              aria-hidden="true"
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-accent"
              style={{ left: `${p.x}%`, top: `${p.y}%`, animation: "ahPulse 1.8s ease-in-out infinite" }}
            />
          )
        )}

        <span
          aria-hidden="true"
          className={[
            "absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-[4px] border-2 transition-colors duration-300",
            allFound ? "border-accent" : "border-line-hover",
          ].join(" ")}
          style={{ left: `${EXIT.x}%`, top: `${EXIT.y}%` }}
        />

        <span
          aria-hidden="true"
          className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink transition-[left,top] duration-150 ease-out"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="grid grid-cols-3 gap-1" role="group" aria-label="Move">
          <span />
          <button type="button" onClick={() => move(0, -STEP)} aria-label="Move up" className="flex h-11 w-11 items-center justify-center rounded-md border border-line-strong text-ink-secondary hover:bg-surface-hover">
            <ChevronUp size={16} strokeWidth={2} />
          </button>
          <span />
          <button type="button" onClick={() => move(-STEP, 0)} aria-label="Move left" className="flex h-11 w-11 items-center justify-center rounded-md border border-line-strong text-ink-secondary hover:bg-surface-hover">
            <ChevronLeft size={16} strokeWidth={2} />
          </button>
          <button type="button" onClick={() => move(0, STEP)} aria-label="Move down" className="flex h-11 w-11 items-center justify-center rounded-md border border-line-strong text-ink-secondary hover:bg-surface-hover">
            <ChevronDown size={16} strokeWidth={2} />
          </button>
          <button type="button" onClick={() => move(STEP, 0)} aria-label="Move right" className="flex h-11 w-11 items-center justify-center rounded-md border border-line-strong text-ink-secondary hover:bg-surface-hover">
            <ChevronRight size={16} strokeWidth={2} />
          </button>
        </div>

        <span className="text-[13.5px] font-medium tracking-[0.02em] text-ink-secondary">
          {foundCount} / {POINTS.length} found
        </span>

        {!done && (
          <button
            type="button"
            onClick={onComplete}
            className="inline-flex h-10 items-center gap-1.5 text-[13px] font-medium text-ink-faint transition-colors hover:text-ink-secondary"
          >
            <SkipForward size={14} strokeWidth={2} />
            Skip activity
          </button>
        )}
      </div>

      <p aria-live="polite" className="m-0 min-h-[1.4em] text-[13px] font-medium tracking-[0.02em] text-ink-faint">
        {done ? "Found everything." : allFound ? "All found — head to the marked corner." : ""}
      </p>
    </div>
  );
}
