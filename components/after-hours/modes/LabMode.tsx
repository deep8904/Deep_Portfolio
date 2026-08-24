"use client";

import { useEffect, useRef, useState } from "react";
import { contrastRatio, contrastLevel } from "@/lib/contrast";

const DEFAULT_FG = "#f3eee6";
const DEFAULT_BG = "#221e1a";

export function LabMode({ onComplete }: { onComplete: () => void }) {
  const [fg, setFg] = useState(DEFAULT_FG);
  const [bg, setBg] = useState(DEFAULT_BG);
  const touched = useRef(false);

  const ratio = contrastRatio(fg, bg);
  const level = contrastLevel(ratio);

  useEffect(() => {
    if (touched.current) onComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fg, bg]);

  const markTouched = () => {
    touched.current = true;
  };

  const levelClass =
    level === "AAA" ? "text-accent" : level === "AA" ? "text-ink-secondary" : "text-ink";

  return (
    <div className="flex flex-col gap-6">
      <p className="m-0 max-w-[520px] text-[13.5px] leading-[1.6] text-ink-muted">
        A small experiment connected to the design system this portfolio is actually built on — pick two colors and
        see their real WCAG contrast ratio, computed the same way an accessibility audit would.
      </p>

      <div className="grid grid-cols-1 gap-4 tab:grid-cols-2">
        <label className="flex items-center justify-between gap-3 rounded-lg border border-line-strong bg-surface px-4 py-3">
          <span className="text-[13px] font-medium text-ink-secondary">Foreground</span>
          <span className="flex items-center gap-2">
            <span className="text-[12px] tracking-[0.03em] text-ink-faint">{fg}</span>
            <input
              type="color"
              value={fg}
              onChange={(e) => {
                markTouched();
                setFg(e.target.value);
              }}
              aria-label="Foreground color"
              className="h-8 w-8 cursor-pointer rounded-md border border-line-strong bg-transparent p-0"
            />
          </span>
        </label>

        <label className="flex items-center justify-between gap-3 rounded-lg border border-line-strong bg-surface px-4 py-3">
          <span className="text-[13px] font-medium text-ink-secondary">Background</span>
          <span className="flex items-center gap-2">
            <span className="text-[12px] tracking-[0.03em] text-ink-faint">{bg}</span>
            <input
              type="color"
              value={bg}
              onChange={(e) => {
                markTouched();
                setBg(e.target.value);
              }}
              aria-label="Background color"
              className="h-8 w-8 cursor-pointer rounded-md border border-line-strong bg-transparent p-0"
            />
          </span>
        </label>
      </div>

      <div
        className="flex min-h-[120px] items-center justify-center rounded-xl border border-line-strong px-6 py-8 transition-colors duration-150"
        style={{ background: bg }}
      >
        <span className="text-[26px] font-medium tracking-[-0.02em] transition-colors duration-150" style={{ color: fg }}>
          Aa — sample text
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line-strong bg-surface px-5 py-4">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num">CONTRAST (NORMAL TEXT)</span>
          <span className="text-[19px] font-medium tracking-[-0.01em]">{ratio.toFixed(2)} : 1</span>
        </div>
        <span aria-live="polite" className={["text-[15px] font-semibold tracking-[0.04em]", levelClass].join(" ")}>
          {level}
        </span>
      </div>
    </div>
  );
}
