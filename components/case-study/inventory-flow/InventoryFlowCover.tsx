import clsx from "clsx";
import { ItemGlyph, type ItemId } from "./ItemGlyph";

// Lightweight, server-renderable cover art for the Work list and homepage —
// deliberately kept separate from the interactive prototype so this never
// pulls client-side prototype JS into pages that don't need it. Original
// composition, using the same light rounded game chrome as the live
// prototype and hero — not a screenshot of either.

const ROW_A: (ItemId | null)[] = [null, "oak-log", "stick", null, "coal", null, "oak-planks", null, null];
const ROW_B: (ItemId | null)[] = ["cobblestone", null, null, "iron-ingot", null, "wheat", null, "diamond", null];
const SELECTED = new Set([1, 2, 4]);

const slotShadow = { boxShadow: "inset 0 1px 2px rgba(0,0,0,0.25)" };

export function InventoryFlowCover({ className }: { className?: string }) {
  return (
    <div className={clsx("relative flex h-full w-full items-center justify-center bg-[#f2f2f0] p-6", className)}>
      <div className="flex w-full max-w-[420px] flex-col gap-2 rounded-2xl border border-[#d4d4d4] bg-[#e6e6e6] p-3" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}>
        <div className="flex items-center justify-between px-0.5">
          <span className="text-[11px] font-bold tracking-[0.1em] text-[#3a3a3a]">INVENTORY FLOW</span>
          <span className="inline-flex h-5 items-center gap-1 rounded-md bg-[#5b8a3f] px-2 text-[9.5px] font-semibold text-white">
            SMART SELECT
          </span>
        </div>
        <div className="grid grid-cols-9 gap-[3px]">
          {ROW_A.map((item, i) => (
            <div
              key={`a${i}`}
              className={clsx("relative flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#9a9a9a]", SELECTED.has(i) && "ring-2 ring-inset ring-[#f5b83d]")}
              style={SELECTED.has(i) ? undefined : slotShadow}
            >
              {item && <ItemGlyph id={item} size={17} />}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-9 gap-[3px]">
          {ROW_B.map((item, i) => (
            <div key={`b${i}`} className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#9a9a9a]" style={slotShadow}>
              {item && <ItemGlyph id={item} size={17} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
