"use client";

// A small internal visual system for the simulated Minecraft UI —
// deliberately separate from the portfolio's own design tokens (cream,
// rounded, soft shadows). Square geometry, stone-gray surfaces, and a
// pixel-scale bevel (light top/left edge, dark bottom/right edge) on every
// nested surface, matching Java Edition's own window/slot construction.
// Cross-checked against real Java Edition screenshots and Minecraft Wiki
// captures — see docs/minecraft-case-study-asset-provenance.md for what was
// used as reference versus what was (deliberately) not shipped.

import { ReactNode, useState } from "react";
import clsx from "clsx";
import { ItemGlyph, ITEM_META, type ItemId } from "./ItemGlyph";

export type MinecraftSlotData = { item: ItemId; qty: number } | null;

const panelBevel = { boxShadow: "inset -2px -2px 0 rgba(0,0,0,0.5), inset 2px 2px 0 rgba(255,255,255,0.1)" };
const gridBevel = { boxShadow: "inset -2px -2px 0 rgba(255,255,255,0.08), inset 2px 2px 0 rgba(0,0,0,0.4)" };
const slotBevel = { boxShadow: "inset -2px -2px 0 rgba(0,0,0,0.35), inset 2px 2px 0 rgba(255,255,255,0.18)" };
const recessBevel = { boxShadow: "inset -1px -1px 0 rgba(255,255,255,0.08), inset 1px 1px 0 rgba(0,0,0,0.4)" };

/** The outer game window — dark backdrop, square corners, a visible pixel
 * border instead of a soft card shadow. Everything simulating Minecraft UI
 * lives inside one of these. */
export function MinecraftPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx("relative border-2 border-black/60 bg-gradient-to-b from-[#0f1a12] to-[#1c2b1c] p-4 tab:p-7", className)}
      style={panelBevel}
    >
      {children}
    </div>
  );
}

/** A recessed sub-surface inside the panel — used for the crafting-clarity
 * card, not a rounded "card" but a beveled inset panel. */
export function MinecraftInset({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("bg-[#6b6b66]/40 p-3", className)} style={recessBevel}>
      {children}
    </div>
  );
}

export function MinecraftLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-bold tracking-[0.04em] text-[#a8a89f]" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}>
      {children}
    </span>
  );
}

function itemLabel(item: ItemId) {
  return ITEM_META[item].label;
}

/** A single slot, with a Java-style hover tooltip (item name + count, plus
 * an optional status line) instead of a browser default tooltip. */
export function MinecraftSlot({
  slot,
  selectable,
  selected,
  onClick,
  size = "normal",
  statusLine,
}: {
  slot: MinecraftSlotData;
  selectable: boolean;
  selected: boolean;
  onClick?: () => void;
  size?: "normal" | "small";
  statusLine?: string;
}) {
  const [hovered, setHovered] = useState(false);
  // Fills its grid track (w-full/h-full + aspect-square) instead of a fixed
  // pixel box — a fixed size fought the grid's fr-based columns and pushed
  // a 9-wide row past the panel edge on narrow viewports. A max-width caps
  // how large a slot gets on spacious desktop layouts.
  const maxDim = size === "small" ? "max-w-9" : "max-w-11";
  return (
    // Hover/focus tracking lives on this wrapper, not the button itself —
    // the button is legitimately `disabled` outside Smart Select mode (it
    // isn't clickable then), and disabled elements never fire mouse/focus
    // events in the browser, which silently killed the tooltip whenever
    // selection wasn't active. The wrapper has no disabled state, so hover
    // always works regardless of whether the slot is currently selectable.
    <span
      className={clsx("relative block w-full", maxDim)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <button
        type="button"
        disabled={!selectable || !slot}
        aria-pressed={selectable ? selected : undefined}
        aria-label={slot ? `${itemLabel(slot.item)} × ${slot.qty}${statusLine ? ` — ${statusLine}` : ""}` : "Empty slot"}
        onClick={onClick}
        style={selected ? undefined : slotBevel}
        className={clsx(
          "relative flex aspect-square w-full items-center justify-center bg-[#8b8b8b] transition-[filter] duration-100",
          selected && "ring-2 ring-inset ring-[#fbd35c]",
          selectable && slot && "hover:brightness-110 focus-visible:brightness-110",
          !selectable && "cursor-default",
          !slot && "opacity-90"
        )}
      >
        {slot && (
          <>
            <ItemGlyph id={slot.item} size={size === "small" ? 22 : 26} />
            {slot.qty > 1 && (
              <span className="absolute bottom-0 right-0.5 text-[11px] font-bold text-white" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.8)" }}>
                {slot.qty}
              </span>
            )}
          </>
        )}
        {selected && (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#fbd35c] text-[#3a2f10]">
            ✓
          </span>
        )}
      </button>
      {hovered && slot && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 flex -translate-x-1/2 flex-col items-center whitespace-nowrap rounded-[3px] px-2 py-1 text-[11px] font-medium text-white"
          style={{ background: "#100010e6", border: "1px solid #2c1f4a" }}
        >
          <span className="font-bold">{itemLabel(slot.item)}</span>
          <span className="text-[#a8a89f]">×{slot.qty}{statusLine ? ` · ${statusLine}` : ""}</span>
        </span>
      )}
    </span>
  );
}

/**
 * Armor column + character-preview area + offhand slot — the piece the
 * prototype was missing entirely. Proportions (4 stacked armor slots to the
 * left of a preview square, one offhand slot below-right of it) come from
 * measuring the "Minecraft Inventory Template — Community" Figma file's
 * Armor Slots / Offhand frames (18px slots, zero gap between armor slots,
 * a distinct preview region) rather than being invented. See
 * docs/minecraft-case-study-asset-provenance.md.
 */
export function MinecraftPlayerFrame({ armor, offhand }: { armor: MinecraftSlotData[]; offhand: MinecraftSlotData }) {
  return (
    <div className="flex items-stretch gap-[3px]">
      <div className="grid grid-rows-4 gap-[3px] bg-[#545450] p-[6px]" style={gridBevel}>
        {armor.map((slot, i) => (
          <MinecraftSlot key={i} slot={slot} selectable={false} selected={false} size="small" />
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-between bg-[#545450] p-[6px]" style={gridBevel}>
        <div className="flex-1 bg-black/70" aria-hidden />
        <div className="mt-[3px] flex justify-end">
          <div className="w-9">
            <MinecraftSlot slot={offhand} selectable={false} selected={false} size="small" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MinecraftSlotGrid({
  slots,
  selectable,
  selected,
  onSelect,
  cols = 9,
  statusFor,
}: {
  slots: MinecraftSlotData[];
  selectable: boolean;
  selected: number[];
  onSelect?: (i: number) => void;
  cols?: number;
  statusFor?: (i: number) => string | undefined;
}) {
  return (
    <div className="grid gap-[3px] bg-[#545450] p-[6px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, ...gridBevel }}>
      {slots.map((slot, i) => (
        <MinecraftSlot
          key={i}
          slot={slot}
          selectable={selectable}
          selected={selected.includes(i)}
          onClick={() => onSelect?.(i)}
          statusLine={statusFor?.(i)}
        />
      ))}
    </div>
  );
}

export function MinecraftButton({
  icon: Icon,
  label,
  onClick,
  active,
  disabled,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={clsx(
        "inline-flex h-8 items-center gap-1.5 border px-2.5 text-[11.5px] font-semibold tracking-[0.01em] transition-colors duration-150",
        active ? "border-[#fbd35c] bg-[#5b7a33] text-white" : "border-black/30 bg-[#6b6b66] text-[#e8e6df] hover:bg-[#787873]",
        disabled && "cursor-not-allowed opacity-40"
      )}
      style={{ boxShadow: "inset -1px -1px 0 rgba(0,0,0,0.35), inset 1px 1px 0 rgba(255,255,255,0.12)" }}
    >
      <Icon size={12} strokeWidth={2.25} />
      {label}
    </button>
  );
}

export { slotBevel, gridBevel, recessBevel, panelBevel };
