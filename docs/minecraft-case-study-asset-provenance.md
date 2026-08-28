# Inventory Flow — Asset Provenance

Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.

This document records the origin of every visual asset used in the "Inventory Flow" case study at `/work/inventory-flow`.

## Current state: zero raster/vector image assets on this route

As of this revision, `/work/inventory-flow` loads **no image files at all** — no screenshots, no reference-designer images, no photography. Every visible pixel on the page is code-rendered: React components, Tailwind, and inline SVG (`PixelIcon.tsx`). Confirmed by asset audit:

```
$ grep -rn "Image\b|<img|url(|\.png|\.jpg|\.jpeg|\.svg|\.webp" app/work/inventory-flow components/case-study/inventory-flow
(no matches)

$ find public/work -type f
(no files — public/work/inventory-flow was removed entirely)
```

This is a deliberate change from an earlier revision, which did use real screenshots (a genuine Java Edition capture, two Minecraft Wiki images) and attributed frames from Jay Han's and Barbara Franco's own work. All of that was removed on request — see "Removed in this revision" below.

## Classification system

| Category | Meaning |
|---|---|
| **DIRECT FIGMA ASSET** | An asset exported from one of the two supplied Figma files and used as-is. |
| **FIGMA-REFERENCED RECREATION** | Built from scratch in this codebase, informed by inspecting the Figma files' proportions/structure, but not exported from them. |
| **ORIGINAL INVENTORY FLOW EXTENSION** | Original interaction design with no Figma counterpart to reference. |
| **PORTFOLIO CHROME** | Deep's existing site-wide design system (sidebar, nav, footer, typography) — untouched by this case study. |

## DIRECT FIGMA ASSET — none

Zero assets were exported from either supplied Figma file. Both were inspected at the raw metadata/node level (not just their thumbnails), specifically to find a reusable inventory/GUI layout template or licensable UI components:

- **"Minecraft Assets — Community"** (`figma.com/design/2dk5Qczu2hiZlP9sIlyVGE`): one canvas, literally named `"images"`, containing only `Image=<texture_name>` symbols — e.g. `acacia_planks`, `amethyst_block`, `crafting_table_(front_texture)_JE4`. These are Mojang's own item/block textures, extracted and re-hosted in Figma with layer names matching Minecraft's real texture filenames exactly. No frame named anything resembling inventory, GUI, HUD, hotbar, or crafting exists in the file.
- **"MINECRAFT UI KIT — Community"** (`figma.com/design/IYzGa2yw2rqjYu67Wjv96H`): same situation, and more directly confirmed — the file contains a text node reading `https://minecraft.fandom.com/wiki/List_of_block_textures`, i.e. it is a Figma re-hosting of the Minecraft Wiki's own block-texture list page, not an original UI kit. Searched the full node tree for "hotbar," "craft," "inventory," "slot," "armor," "recipe," "HUD," "panel," "layout" — no matches outside individual item/block texture names.

**Conclusion:** neither file contains an inventory/GUI layout to extend, and both are Mojang's copyrighted texture art with no visible redistribution license. Nothing was exported. This is a factual finding from inspecting the files directly, not a guess from their titles.

Two additional community files were also reviewed and found not to change this conclusion: "Minecraft Inventory Template — Community" (a small generic gray-slot mockup, added nothing not already known) and "Redesign: Minecraft inventory UI — Community" (another independent designer's own original redesign concept — not vanilla Minecraft, not adopted as a foundation, since doing so would repeat the uncredited-reuse problem this case study avoids with Jay Han and Barbara Franco).

## FIGMA-REFERENCED RECREATION

| Asset | Built in | Notes |
|---|---|---|
| Item pixel art | `PixelIcon.tsx` | 12×12 original pixel grids, hand-authored per item. Silhouette/color choices (e.g. the oak log's concentric-ring cross-section) were checked against one real Minecraft texture viewed via Figma (`acacia_log`, node `2018:3757` in the Assets file) for shape accuracy, then redrawn from scratch — no pixels copied, nothing exported. |
| Minecraft UI system | `MinecraftUI.tsx` | `MinecraftPanel`, `MinecraftSlot`, `MinecraftSlotGrid`, `MinecraftButton`, `MinecraftInset`, `MinecraftLabel`. Square geometry, two-tone pixel bevels, stone-gray surfaces — built to match Java Edition's general slot/window construction (verified independently against Minecraft's documented UI, since neither Figma file contained a usable template), not against the Figma files directly. |
| Vanilla baseline recreation | `StaticPanels.tsx` → `VanillaBaselineRecreation` | Plain, unaugmented inventory/hotbar/2×2-crafting layout — no Smart Select, no color-coded states — used in "Current Experience" in place of a screenshot. Explicitly labeled as a recreation, not a capture. |

## ORIGINAL INVENTORY FLOW EXTENSION

| Asset | Built in |
|---|---|
| Chest mode (Smart Select, Sort, Stack, Deposit/Take Matching, Hotbar Protection) | `InventoryFlowPrototype.tsx` |
| Personal Inventory / Crafting Clarity mode | `InventoryFlowPrototype.tsx` |
| Hero composition (large Chest preview + small Crafting preview) | `StaticPanels.tsx` → `HeroConceptPreview`, `HeroCraftingPreview` |
| Rejected-concept mini-sketches | `StaticPanels.tsx` → `RejectedSketch` |
| States gallery | `StateGallery.tsx` |
| Work-list / home cover art | `InventoryFlowCover.tsx` |

## PORTFOLIO CHROME

Sidebar, nav, footer, section labels, typography — Deep's existing site-wide design system, untouched. Lucide icons are used only here (back arrow, external-link, reset, lock/unlock) — never for in-game item art.

## Removed in this revision

At an earlier stage this case study used real imagery: a genuine Java Edition screenshot, two Minecraft Wiki captures, and one attributed reference frame each from Jay Han and Barbara Franco (with credit and outbound links). All of it has been removed on request, so that every visual on the page traces to either the supplied Figma files (as reference only — see above) or this codebase's own original work. Jay Han and Barbara Franco are still cited by name in "Two Design Studies," now as text-only citations with an outbound link to their original work — no images from either designer are hosted or displayed.
