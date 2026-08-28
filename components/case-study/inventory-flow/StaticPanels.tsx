import clsx from "clsx";
import { Lock, Check, ArrowRight } from "lucide-react";
import { ItemGlyph, type ItemId } from "./ItemGlyph";
import { MinecraftPanel, MinecraftPlayerFrame } from "./MinecraftUI";

const slotShadow = { boxShadow: "inset 0 1px 2px rgba(0,0,0,0.25)" };

type StaticSlot = { item: ItemId; qty: number; selected?: boolean } | null;

function StaticSlotEl({ slot, size = 34 }: { slot: StaticSlot; size?: number }) {
  return (
    <div
      className={clsx("relative flex items-center justify-center rounded-[6px] bg-[#9a9a9a]", slot?.selected && "ring-2 ring-inset ring-[#f5b83d]")}
      style={{ width: size, height: size, ...(slot?.selected ? {} : slotShadow) }}
    >
      {slot && (
        <>
          <ItemGlyph id={slot.item} size={size * 0.62} />
          {slot.qty > 1 && (
            <span className="absolute bottom-0 right-0.5 text-[10px] font-bold text-white" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.8)" }}>
              {slot.qty}
            </span>
          )}
          {slot.selected && (
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#f5b83d] text-[#4a3410]">
              <Check size={9} strokeWidth={3} />
            </span>
          )}
        </>
      )}
    </div>
  );
}

function StaticGrid({ slots, cols, size = 34 }: { slots: StaticSlot[]; cols: number; size?: number }) {
  return (
    <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
      {slots.map((slot, i) => (
        <StaticSlotEl key={i} slot={slot} size={size} />
      ))}
    </div>
  );
}

const HERO_STORAGE: StaticSlot[] = [
  { item: "cobblestone", qty: 64 }, null, null, { item: "oak-planks", qty: 64 }, null, null, { item: "iron-ingot", qty: 10 }, null, null,
];
const HERO_MAIN: StaticSlot[] = [
  { item: "oak-log", qty: 12, selected: true }, { item: "stick", qty: 30 }, null, { item: "oak-planks", qty: 20 }, { item: "iron-ingot", qty: 5 }, null, { item: "coal", qty: 6, selected: true }, null, null,
  null, null, null, null, null, null, null, null, null,
];
const HERO_HOTBAR: StaticSlot[] = [{ item: "torch", qty: 8 }, { item: "cobblestone", qty: 64 }, null, null, null, null, null, null, null];

/** A frozen, non-interactive preview of the Chest-mode panel — used only in
 * the hero, so the reader sees the real system before scrolling. Same visual
 * language as the live prototype further down the page. */
export function HeroConceptPreview() {
  return (
    <MinecraftPanel className="p-4">
      <div className="mx-auto flex max-w-[420px] flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold tracking-[0.02em] text-[#3a3a3a]">Large Chest</span>
          <span className="inline-flex h-6 items-center gap-1.5 rounded-md bg-[#5b8a3f] px-2 text-[10.5px] font-semibold text-white">
            Smart Select: ON
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-[#f5b83d]/70 bg-[#fdf1d9] px-2 py-1.5 text-[11px] text-[#4a3410]">
          <span>2 stacks selected · 18 items</span>
          <span>Move →</span>
        </div>
        <StaticGrid slots={HERO_STORAGE} cols={9} size={28} />
        <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.04em] text-[#6b6b6b]">
          <Lock size={9} />
          YOUR INVENTORY
        </div>
        <StaticGrid slots={HERO_MAIN} cols={9} size={28} />
        <StaticGrid slots={HERO_HOTBAR} cols={9} size={28} />
      </div>
    </MinecraftPanel>
  );
}

const HERO_CRAFT_BACKPACK: StaticSlot[] = [
  { item: "oak-planks", qty: 12 }, { item: "diamond", qty: 2 }, null, null, null, null,
];
const HERO_CRAFT_HOTBAR: StaticSlot[] = [{ item: "torch", qty: 4 }, null, null, null, null, null];

/** A small, secondary preview of Personal Inventory / Crafting mode — pairs
 * with HeroConceptPreview in the hero so the reader sees both original
 * contexts (Chest, Personal Inventory) before scrolling. */
export function HeroCraftingPreview() {
  return (
    <MinecraftPanel className="p-4">
      <div className="flex flex-col gap-2.5">
        <span className="text-[12px] font-bold tracking-[0.02em] text-[#3a3a3a]">Crafting Clarity</span>
        <div className="flex items-center gap-2">
          <div className="grid grid-cols-2 grid-rows-2 gap-[3px]">
            <StaticSlotEl slot={{ item: "coal", qty: 1 }} size={26} />
            <StaticSlotEl slot={null} size={26} />
            <StaticSlotEl slot={{ item: "stick", qty: 1 }} size={26} />
            <StaticSlotEl slot={null} size={26} />
          </div>
          <ArrowRight size={14} className="text-[#8a8a8a]" />
          <StaticSlotEl slot={{ item: "torch", qty: 4 }} size={30} />
        </div>
        <div className="flex items-center justify-between rounded-md bg-[#dbedc9] px-2 py-1 text-[11px] font-semibold text-[#3f5a26]">
          Coal <span>1 / 1</span>
        </div>
        <div className="flex items-center justify-between rounded-md bg-[#dbedc9] px-2 py-1 text-[11px] font-semibold text-[#3f5a26]">
          Stick <span>1 / 1</span>
        </div>
        <StaticGrid slots={HERO_CRAFT_BACKPACK} cols={6} size={24} />
        <StaticGrid slots={HERO_CRAFT_HOTBAR} cols={6} size={24} />
      </div>
    </MinecraftPanel>
  );
}

/** A plain, unaugmented recreation of vanilla Minecraft's inventory/hotbar/
 * crafting structure — no Smart Select, no Quick Organize, no color-coded
 * states. Built from the same MinecraftUI primitives as everything else on
 * this page, informed by inspecting the supplied Figma resources and cross-
 * checked against Minecraft's own documented slot counts and layout. Labeled
 * as a recreation, not a screenshot — see docs/minecraft-case-study-asset-provenance.md. */
export function VanillaBaselineRecreation() {
  const main: StaticSlot[] = [
    { item: "oak-log", qty: 12 }, { item: "stick", qty: 30 }, null, { item: "oak-planks", qty: 20 }, { item: "iron-ingot", qty: 5 }, null, { item: "coal", qty: 6 }, null, null,
    { item: "cobblestone", qty: 64 }, null, { item: "oak-planks", qty: 14 }, null, { item: "wheat", qty: 9 }, null, null, { item: "cobblestone", qty: 22 }, null,
    null, null, { item: "diamond", qty: 2 }, null, null, null, null, null, null,
  ];
  const hotbar: StaticSlot[] = [{ item: "torch", qty: 8 }, { item: "cobblestone", qty: 64 }, null, null, null, null, null, null, null];

  return (
    <MinecraftPanel className="p-4">
      <div className="mx-auto flex max-w-[520px] flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold tracking-[0.02em] text-[#3a3a3a]">Inventory &amp; Crafting</span>
          <span className="text-[10px] text-[#8a8a8a]">no bulk actions, no highlights</span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <MinecraftPlayerFrame armor={[null, null, null, null]} offhand={null} />
          <div className="flex items-center gap-2">
            <div className="grid grid-cols-2 grid-rows-2 gap-[3px]">
              <StaticSlotEl slot={null} size={26} />
              <StaticSlotEl slot={null} size={26} />
              <StaticSlotEl slot={null} size={26} />
              <StaticSlotEl slot={null} size={26} />
            </div>
            <ArrowRight size={14} className="text-[#8a8a8a]" />
            <StaticSlotEl slot={null} size={30} />
          </div>
        </div>
        <StaticGrid slots={main} cols={9} size={28} />
        <StaticGrid slots={hotbar} cols={9} size={28} />
      </div>
    </MinecraftPanel>
  );
}

const REJECTED_ROW_A: StaticSlot[] = Array.from({ length: 9 }, () => null);
const REJECTED_ROW_FULL: StaticSlot[] = Array.from({ length: 9 }, (_, i) => (i < 4 ? { item: "cobblestone", qty: 64 } : null));

/** Tiny mini-wireframe sketches for the rejected-concepts row — quick,
 * intentionally rough, not polished screens. */
export function RejectedSketch({ kind }: { kind: "extra-row" | "compartments" | "fullscreen" | "auto" | "toolbar" }) {
  if (kind === "extra-row") {
    return (
      <div className="flex flex-col gap-[3px]">
        <StaticGrid slots={REJECTED_ROW_A} cols={9} size={16} />
        <StaticGrid slots={REJECTED_ROW_A} cols={9} size={16} />
        <StaticGrid slots={REJECTED_ROW_A} cols={9} size={16} />
        <div className="grid grid-cols-9 gap-[3px]">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-4 w-full rounded-[4px] border border-dashed border-[#f5b83d]" />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "compartments") {
    const colors = ["#d9c24a", "#d9c24a", "#6a8fd9", "#6a8fd9", "#d97a7a", "#d97a7a", "#9a7ad9", "#9a7ad9", "#9a7ad9"];
    return (
      <div className="grid grid-cols-9 gap-[3px]">
        {colors.map((c, i) => (
          <div key={i} className="h-4 w-full rounded-[3px]" style={{ background: c }} />
        ))}
        {colors.map((c, i) => (
          <div key={`b${i}`} className="h-4 w-full rounded-[3px]" style={{ background: c, opacity: 0.7 }} />
        ))}
      </div>
    );
  }
  if (kind === "fullscreen") {
    return (
      <div className="flex h-full w-full flex-col gap-2 rounded-xl border border-line-strong bg-surface p-3">
        <div className="h-2 w-1/3 rounded-full bg-line-strong" />
        <div className="grid flex-1 grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-connect" />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "auto") {
    return (
      <div className="flex flex-col gap-[3px]">
        <StaticGrid slots={REJECTED_ROW_FULL} cols={9} size={16} />
        <div className="flex items-center justify-center gap-1 py-0.5 text-[9px] font-bold text-[#c98a1f]">↻ auto-sorting…</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1.5">
      {Array.from({ length: 4 }).map((_, row) => (
        <div key={row} className="flex gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-3 flex-1 rounded-[3px] border border-[#c4c4c4] bg-[#d9d9d9]" />
          ))}
        </div>
      ))}
    </div>
  );
}
