import { PixelIcon, type PixelItemId } from "./PixelIcon";

// Item identity + display labels for the demo economy. Rendering itself is
// delegated to PixelIcon — original pixel-art item art, not portfolio
// (Lucide) iconography. See docs/minecraft-case-study-asset-provenance.md.
export type ItemId = PixelItemId;

export const ITEM_META: Record<ItemId, { label: string }> = {
  "oak-log": { label: "Oak Log" },
  "oak-planks": { label: "Oak Planks" },
  stick: { label: "Stick" },
  coal: { label: "Coal" },
  torch: { label: "Torch" },
  "crafting-table": { label: "Crafting Table" },
  cobblestone: { label: "Cobblestone" },
  "iron-ingot": { label: "Iron Ingot" },
  wheat: { label: "Wheat" },
  diamond: { label: "Diamond" },
};

export function ItemGlyph({ id, size = 20 }: { id: ItemId; size?: number }) {
  return <PixelIcon id={id} size={size} />;
}
