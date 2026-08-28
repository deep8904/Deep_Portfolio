// Original 12x12 pixel-art item icons, authored from scratch for this case
// study — not Minecraft's own textures. Each icon is a grid of palette-key
// characters; "." is transparent. Rendered as crisp <rect> blocks so they
// read as game item art rather than outline icons. See
// docs/minecraft-case-study-asset-provenance.md.

type Grid = string[];

const OAK_LOG: Grid = [
  "............",
  "............",
  ".111111111..",
  ".122222221..",
  ".123333321..",
  ".123443321..",
  ".123434321..",
  ".123333321..",
  ".122222221..",
  ".111111111..",
  "............",
  "............",
];

const OAK_PLANKS: Grid = [
  "............",
  "............",
  ".222222222..",
  ".222222222..",
  ".111111111..",
  ".333333333..",
  ".333333333..",
  ".111111111..",
  ".222222222..",
  ".222222222..",
  "............",
  "............",
];

const STICK: Grid = [
  "............",
  ".........1..",
  "........11..",
  "........2...",
  ".......22...",
  "......22....",
  ".....22.....",
  "....22......",
  "...22.......",
  "..11........",
  "..1.........",
  "............",
];

const COAL: Grid = [
  "............",
  "............",
  "...11111....",
  "..1222221...",
  ".122232221..",
  ".123232321..",
  ".122232221..",
  "..1222321...",
  "...11121....",
  "....111.....",
  "............",
  "............",
];

const TORCH: Grid = [
  "............",
  ".....44.....",
  "....4554....",
  "....4554....",
  ".....44.....",
  ".....11.....",
  ".....11.....",
  ".....11.....",
  ".....11.....",
  ".....11.....",
  "............",
  "............",
];

const CRAFTING_TABLE: Grid = [
  "............",
  ".222222222..",
  ".233333332..",
  ".231111132..",
  ".231441132..",
  ".231411132..",
  ".231111132..",
  ".233333332..",
  ".222222222..",
  ".111111111..",
  "............",
  "............",
];

const COBBLESTONE: Grid = [
  "............",
  ".111.22.11..",
  ".111.22.11..",
  ".22.111.22..",
  ".22.111.22..",
  ".111.22.11..",
  ".111.22.11..",
  ".22.111.22..",
  ".22.111.22..",
  ".111111111..",
  "............",
  "............",
];

const IRON_INGOT: Grid = [
  "............",
  "............",
  "...111111...",
  "..12222221..",
  "..12222221..",
  "..12222221..",
  "..12222221..",
  "...111111...",
  "............",
  "............",
  "............",
  "............",
];

const WHEAT: Grid = [
  "............",
  "....1..1....",
  "...111.111..",
  "....1..1....",
  "....2..2....",
  "...222.222..",
  "....2..2....",
  "....2..2....",
  ".....33.....",
  ".....33.....",
  ".....3......",
  "............",
];

const DIAMOND: Grid = [
  "............",
  "...111111...",
  "..12222221..",
  ".1222222221.",
  ".1222222221.",
  "..12222221..",
  "...122221...",
  "....1221....",
  ".....11.....",
  "............",
  "............",
  "............",
];

export const ITEM_GRIDS = {
  "oak-log": OAK_LOG,
  "oak-planks": OAK_PLANKS,
  stick: STICK,
  coal: COAL,
  torch: TORCH,
  "crafting-table": CRAFTING_TABLE,
  cobblestone: COBBLESTONE,
  "iron-ingot": IRON_INGOT,
  wheat: WHEAT,
  diamond: DIAMOND,
} as const;

export type PixelItemId = keyof typeof ITEM_GRIDS;

const PALETTES: Record<PixelItemId, Record<string, string>> = {
  "oak-log": { "1": "#6b4a2e", "2": "#8a6a45", "3": "#c9a367", "4": "#dab77e" },
  "oak-planks": { "1": "#7a5433", "2": "#b98a4f", "3": "#c9a05f" },
  stick: { "1": "#8a6a45", "2": "#6b4a2e" },
  coal: { "1": "#57534a", "2": "#38352f", "3": "#1c1a17" },
  torch: { "1": "#7a5433", "4": "#e8791f", "5": "#ffd35c" },
  "crafting-table": { "1": "#8a6a45", "2": "#6b4a2e", "3": "#a9835a", "4": "#4a3826" },
  cobblestone: { "1": "#8f8f8a", "2": "#6f6f6a" },
  "iron-ingot": { "1": "#8a8478", "2": "#e3ddce" },
  wheat: { "1": "#3f7a3a", "2": "#c9a83a", "3": "#8a6a2e" },
  diamond: { "1": "#3f9e97", "2": "#7fe0d6" },
};

export function PixelIcon({ id, size = 22 }: { id: PixelItemId; size?: number }) {
  const grid = ITEM_GRIDS[id];
  const palette = PALETTES[id];
  const cols = grid[0].length;
  const rows = grid.length;

  return (
    <svg
      width={size}
      height={size * (rows / cols)}
      viewBox={`0 0 ${cols} ${rows}`}
      shapeRendering="crispEdges"
      aria-hidden
      style={{ display: "block" }}
    >
      {grid.map((row, y) =>
        Array.from(row).map((ch, x) =>
          ch === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[ch]} />
        )
      )}
    </svg>
  );
}
