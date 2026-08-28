"use client";

// A small internal visual system for the simulated Minecraft UI —
// deliberately separate from the portfolio's own design tokens (cream,
// editorial serif rhythm). Light gray panels, rounded slots, a soft drop
// shadow: matched directly against the "Minecraft Inventory Template —
// Community" Figma file's actual rendered appearance (light theme, rounded
// corners throughout, a black character-preview panel, a green Recipe Book
// button) rather than an assumed "authentic pixel Minecraft" look. See
// docs/minecraft-case-study-asset-provenance.md for the full reasoning and
// what was — and wasn't — taken from that file.

import { ReactNode, useState } from "react";
import clsx from "clsx";
import { ItemGlyph, ITEM_META, type ItemId } from "./ItemGlyph";
import { RecipeBookIcon } from "./PixelIcon";

export type MinecraftSlotData = { item: ItemId; qty: number } | null;

const panelShadow = { boxShadow: "0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.6)" };
const slotShadow = { boxShadow: "inset 0 1px 2px rgba(0,0,0,0.25)" };
const insetShadow = { boxShadow: "inset 0 1px 3px rgba(0,0,0,0.12)" };

/** The outer game window — light gray, rounded corners, a soft drop shadow.
 * Everything simulating Minecraft UI lives inside one of these. */
export function MinecraftPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx("relative rounded-2xl border border-[#d4d4d4] bg-[#e6e6e6] p-4 tab:p-6", className)}
      style={panelShadow}
    >
      {children}
    </div>
  );
}

/** A recessed sub-surface inside the panel — used for the crafting-clarity
 * card. */
export function MinecraftInset({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("rounded-xl bg-[#d9d9d9] p-3", className)} style={insetShadow}>
      {children}
    </div>
  );
}

export function MinecraftLabel({ children }: { children: ReactNode }) {
  return <span className="text-[11px] font-bold tracking-[0.04em] text-[#6b6b6b]">{children}</span>;
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
        style={selected ? undefined : slotShadow}
        className={clsx(
          "relative flex aspect-square w-full items-center justify-center rounded-[6px] bg-[#9a9a9a] transition-[filter] duration-100",
          selected && "ring-2 ring-inset ring-[#f5b83d]",
          selectable && slot && "hover:brightness-105 focus-visible:brightness-105",
          !selectable && "cursor-default",
          !slot && "opacity-80"
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
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#f5b83d] text-[#4a3410]">
            ✓
          </span>
        )}
      </button>
      {hovered && slot && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 flex -translate-x-1/2 flex-col items-center whitespace-nowrap rounded-[4px] px-2 py-1 text-[11px] font-medium text-white"
          style={{ background: "#2a2a2ae6", border: "1px solid #454545" }}
        >
          <span className="font-bold">{itemLabel(slot.item)}</span>
          <span className="text-[#b8b8b8]">×{slot.qty}{statusLine ? ` · ${statusLine}` : ""}</span>
        </span>
      )}
    </span>
  );
}

/**
 * Armor column + character-preview area + offhand slot, plus the Recipe
 * Book button — measured and styled from two supplied Figma files: the
 * "Minecraft Inventory Template" file's overall layout (4-slot armor column
 * beside a black character-preview panel, offhand slot at its lower-right
 * corner) and the "MINECRAFT UI KIT" file's real "UI KIT" page (canvas
 * `2:554`, frame "Inventory", node `5:234`) for the Recipe Button's own
 * construction — a beveled button (light top/left edge, dark bottom/right
 * edge, confirmed vector-built, not a texture) holding a pixel-built green
 * book icon (`RecipeBookIcon` in PixelIcon.tsx). See
 * docs/minecraft-case-study-asset-provenance.md.
 */
export function MinecraftPlayerFrame({ armor, offhand }: { armor: MinecraftSlotData[]; offhand: MinecraftSlotData }) {
  // Fixed pixel widths throughout, not flex-1/aspect-square chains — a flex
  // child with no explicit width and an aspect-square descendant has no
  // dimension to derive from, and the whole frame collapsed to ~9px tall
  // when this used flex-1. 36px slots (matching MinecraftSlot's own "small"
  // sizing) and a 76px preview box, scaled up from the Figma template's
  // 18px-unit measurements.
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-[3px]">
        <div className="grid w-9 grid-rows-4 gap-[3px]">
          {armor.map((slot, i) => (
            <MinecraftSlot key={i} slot={slot} selectable={false} selected={false} size="small" />
          ))}
        </div>
        <div className="relative h-[157px] w-[76px] shrink-0 rounded-[6px] bg-black" aria-hidden>
          <div className="absolute -bottom-1.5 -right-1.5 w-9">
            <MinecraftSlot slot={offhand} selectable={false} selected={false} size="small" />
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-label="Recipe Book"
        className="flex h-7 w-7 items-center justify-center rounded-[3px] bg-[#5b8a3f]"
        style={{
          boxShadow:
            "inset 1px 1px 0 rgba(255,255,255,0.45), inset -1px -1px 0 rgba(0,0,0,0.35)",
        }}
      >
        <RecipeBookIcon size={14} />
      </button>
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
    <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
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
        "inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-[11.5px] font-semibold tracking-[0.01em] transition-colors duration-150",
        active ? "border-[#4a7a2f] bg-[#5b8a3f] text-white" : "border-[#c4c4c4] bg-[#d9d9d9] text-[#4a4a4a] hover:bg-[#cfcfcf]",
        disabled && "cursor-not-allowed opacity-40"
      )}
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)" }}
    >
      <Icon size={12} strokeWidth={2.25} />
      {label}
    </button>
  );
}

export { slotShadow, insetShadow, panelShadow };
