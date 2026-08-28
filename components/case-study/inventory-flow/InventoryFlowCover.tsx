import clsx from "clsx";
import { ItemGlyph, type ItemId } from "./ItemGlyph";

// Lightweight, server-renderable cover art for the Work list and homepage —
// deliberately kept separate from the interactive prototype so this never
// pulls client-side prototype JS into pages that don't need it. Original
// composition, using the same dark stone-panel game chrome as the live
// prototype and hero — not a screenshot of either.

const ROW_A: (ItemId | null)[] = [null, "oak-log", "stick", null, "coal", null, "oak-planks", null, null];
const ROW_B: (ItemId | null)[] = ["cobblestone", null, null, "iron-ingot", null, "wheat", null, "diamond", null];
const SELECTED = new Set([1, 2, 4]);

const slotBevel = { boxShadow: "inset -2px -2px 0 rgba(0,0,0,0.35), inset 2px 2px 0 rgba(255,255,255,0.18)" };

export function InventoryFlowCover({ className }: { className?: string }) {
  return (
    <div className={clsx("relative flex h-full w-full items-center justify-center bg-gradient-to-b from-[#0f1a12] to-[#1c2b1c] p-6", className)}>
      <div className="flex w-full max-w-[420px] flex-col gap-2">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-[11px] font-bold tracking-[0.1em] text-[#dcdcd4]" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.6)" }}>
            INVENTORY FLOW
          </span>
          <span className="inline-flex h-5 items-center gap-1 border border-[#fbd35c]/60 bg-[#5b7a33] px-2 text-[9.5px] font-semibold text-white">
            SMART SELECT
          </span>
        </div>
        <div className="grid grid-cols-9 gap-[3px] bg-[#545450] p-[6px]" style={{ boxShadow: "inset -2px -2px 0 rgba(255,255,255,0.08), inset 2px 2px 0 rgba(0,0,0,0.4)" }}>
          {ROW_A.map((item, i) => (
            <div
              key={`a${i}`}
              className={clsx("relative flex h-7 w-7 items-center justify-center bg-[#8b8b8b]", SELECTED.has(i) && "ring-2 ring-inset ring-[#fbd35c]")}
              style={SELECTED.has(i) ? undefined : slotBevel}
            >
              {item && <ItemGlyph id={item} size={17} />}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-9 gap-[3px] bg-[#545450] p-[6px]" style={{ boxShadow: "inset -2px -2px 0 rgba(255,255,255,0.08), inset 2px 2px 0 rgba(0,0,0,0.4)" }}>
          {ROW_B.map((item, i) => (
            <div key={`b${i}`} className="flex h-7 w-7 items-center justify-center bg-[#8b8b8b]" style={slotBevel}>
              {item && <ItemGlyph id={item} size={17} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
