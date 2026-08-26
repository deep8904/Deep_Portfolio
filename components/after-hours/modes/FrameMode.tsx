"use client";

import { useRef, useState } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Aperture } from "lucide-react";

const GUIDE_SIZE = 46; // % of the field's width/height
const STEP = 3; // % nudged per key press / button press

export function FrameMode({ onComplete }: { onComplete: () => void }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 }); // guide center, in % of field
  const [captured, setCaptured] = useState(false);
  const [flash, setFlash] = useState(false);
  const draggingRef = useRef(false);

  const clamp = (v: number) => Math.min(100 - GUIDE_SIZE / 2, Math.max(GUIDE_SIZE / 2, v));

  const nudge = (dx: number, dy: number) => {
    setPos((p) => ({ x: clamp(p.x + dx), y: clamp(p.y + dy) }));
  };

  const positionFromPointer = (clientX: number, clientY: number) => {
    const field = fieldRef.current;
    if (!field) return;
    const rect = field.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setPos({ x: clamp(x), y: clamp(y) });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, [number, number]> = {
      ArrowUp: [0, -STEP],
      ArrowDown: [0, STEP],
      ArrowLeft: [-STEP, 0],
      ArrowRight: [STEP, 0],
    };
    const delta = map[e.key];
    if (!delta) return;
    e.preventDefault();
    nudge(...delta);
  };

  const capture = () => {
    setCaptured(true);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 220);
    onComplete();
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        ref={fieldRef}
        role="group"
        aria-label="Framing area. Use arrow keys or drag to move the frame guide."
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          draggingRef.current = true;
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          positionFromPointer(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (!draggingRef.current) return;
          positionFromPointer(e.clientX, e.clientY);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
        className="relative aspect-[4/3] w-full touch-none overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{
          background:
            "linear-gradient(135deg, var(--color-placeholder-a) 0%, var(--color-placeholder-b) 55%, var(--color-surface) 100%)",
        }}
      >
        {/* rule-of-thirds guide */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {[33.333, 66.666].map((p) => (
            <span key={`v${p}`} className="absolute top-0 bottom-0 w-px bg-white/10" style={{ left: `${p}%` }} />
          ))}
          {[33.333, 66.666].map((p) => (
            <span key={`h${p}`} className="absolute left-0 right-0 h-px bg-white/10" style={{ top: `${p}%` }} />
          ))}
        </div>

        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[12px] font-medium tracking-[0.08em] text-ink-faint">
          [ FRAME PLACEHOLDER ]
        </span>

        {/* movable crop guide */}
        <div
          className="pointer-events-none absolute rounded-md border-2 border-accent/80"
          style={{
            width: `${GUIDE_SIZE}%`,
            height: `${GUIDE_SIZE}%`,
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 0 2000px rgba(0,0,0,0.35)",
          }}
        />

        {flash && <div className="absolute inset-0 bg-white" style={{ animation: "ahFlash 220ms ease-out both" }} />}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="grid grid-cols-3 gap-1" role="group" aria-label="Nudge frame">
          <span />
          <button type="button" onClick={() => nudge(0, -STEP)} aria-label="Move frame up" className="flex h-10 w-10 items-center justify-center rounded-md border border-line-strong text-ink-secondary hover:bg-surface-hover">
            <ChevronUp size={16} strokeWidth={2} />
          </button>
          <span />
          <button type="button" onClick={() => nudge(-STEP, 0)} aria-label="Move frame left" className="flex h-10 w-10 items-center justify-center rounded-md border border-line-strong text-ink-secondary hover:bg-surface-hover">
            <ChevronLeft size={16} strokeWidth={2} />
          </button>
          <button type="button" onClick={() => nudge(0, STEP)} aria-label="Move frame down" className="flex h-10 w-10 items-center justify-center rounded-md border border-line-strong text-ink-secondary hover:bg-surface-hover">
            <ChevronDown size={16} strokeWidth={2} />
          </button>
          <button type="button" onClick={() => nudge(STEP, 0)} aria-label="Move frame right" className="flex h-10 w-10 items-center justify-center rounded-md border border-line-strong text-ink-secondary hover:bg-surface-hover">
            <ChevronRight size={16} strokeWidth={2} />
          </button>
        </div>

        <button
          type="button"
          onClick={capture}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-[13.5px] font-medium text-accent-cream transition-[background,transform] duration-200 hover:bg-accent-hover active:scale-[0.98]"
        >
          <Aperture size={15} strokeWidth={2} />
          Capture
        </button>
      </div>

      <p aria-live="polite" className="m-0 min-h-[1.4em] text-[13px] font-medium tracking-[0.02em] text-ink-faint">
        {captured ? "Frame captured." : ""}
      </p>
    </div>
  );
}
