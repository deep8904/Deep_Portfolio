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

## Visual style correction

An earlier revision styled `MinecraftUI.tsx` as a dark, stone-gray, square-cornered panel — an assumption about "authentic pixel Minecraft," not a match to the supplied Figma template. Sent a rendered crop of the "Minecraft Inventory Template" file's actual appearance: light gray panel, rounded corners throughout (panel and slots alike), a black character-preview rectangle, and a green Recipe Book button. The whole system (`MinecraftPanel`, `MinecraftSlot`, `MinecraftSlotGrid`, `MinecraftButton`, `MinecraftInset`, `MinecraftPlayerFrame`) was re-skinned to match that reference directly — light gray (`#e6e6e6`) panels with soft drop shadows instead of dark bevels, `rounded-[6px]` slots instead of square ones, and a green recipe-book button in `MinecraftPlayerFrame` (at the time, a placeholder Lucide `BookOpen` icon — portfolio chrome standing in for missing reference data; later replaced with a real pixel-built book icon once the UI KIT canvas was found, see below). This propagated to every consumer: the live prototype, the hero previews, the vanilla-baseline recreation, the states gallery, and the Work-list cover.

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
- **"MINECRAFT UI KIT — Community"** (`figma.com/design/IYzGa2yw2rqjYu67Wjv96H`) — its **"Blocks"** and **"Special blocks"** canvases are the same situation as above, and more directly confirmed: the file contains a text node reading `https://minecraft.fandom.com/wiki/List_of_block_textures`, i.e. those canvases are a Figma re-hosting of the Minecraft Wiki's own block-texture list page, not original UI work. Re-checked again at a specific node (`1:4`) on request — it's a canvas named "Special blocks," empty of content, consistent with the rest of those canvases being a Wiki texture library organized by category, not GUI chrome.

**However** — this file also has a genuinely different canvas, **"UI KIT"** (`node-id=2-554`, frame "UI KIT" at `5:1397`), not discoverable through the page-listing tool call and only found after the user pointed to it directly with screenshots of their own Figma sidebar. Unlike every other canvas in this file, its node tree is built entirely from `rounded-rectangle`, `vector`, `text`, and `instance` (component-reference) node types — never a single raster `Image=<texture_name>` symbol. Pulled full design context (fills, layered structure, exact proportions) for its `Inventory` frame (`5:234`), which contains: an `Armor Slots` column (4×, 31.8px each), a black-backed character-preview area, an `Offhand` slot, a `Crafting 4x4` frame that is actually a true 2×2 (matching vanilla Minecraft's personal-inventory crafting grid, and this case study's own recipe system), a `Recipe Button` — a beveled button component (flat center fill + a 4-strip "Shadow Outline": light top/left edges, dark bottom/right edges — a classic emboss, achievable in plain CSS, not a texture) with a genuinely pixel-built green book icon layered on top (28 solid-color rectangles forming a small green book with a near-black spine and gray page edge — a real, first-party pixel icon, not Mojang art), and a 9-wide `Inventory Slots` grid with 4 rows where the gap before the last row is visibly larger than the gaps between the other rows — i.e. main inventory + hotbar, confirming a detail this case study had already inferred independently from the Inventory Template file (see the measurements table below).

**Conclusion:** the two primary files' "Blocks"/"Special blocks"/"images" canvases contain no inventory/GUI layout to extend and are Mojang's copyrighted texture art with no visible redistribution license — nothing was exported from them. But the UI KIT file's separate "UI KIT" canvas is real, original, vector-built interface work, and its Recipe Button/Recipe Book icon construction was used as a direct structural and color reference (see "Adopted from the UI KIT canvas" below). This is a correction to an earlier pass in this same document, which checked only the "Blocks"/"Special blocks" canvases of this file and (reasonably, from what was visible then) filed the whole file alongside the texture dumps.

A third community file, **"Minecraft Inventory Template — Community"** (`figma.com/design/2boFyMI8C71kcr3pXh8iWo`), turned out to be genuinely different on closer inspection (an initial pass had wrongly filed it alongside the texture libraries). Its node tree contains real, named, componentized structure — `Armor Slots` (4 stacked instances), `Offhand`, `Inventory Slots` (9×4 grid of `Item Slot` instances), `Crafting 4x4` (a true 2×2), `Crafting Result`, `Recipe Button` with a separate `Hovered Recipe Button` state, and a `Tool Tips` frame with four differently-sized tooltip variants. Screenshotting the individual components (`Inventory Window`, `Tool Tips`) confirmed they're flat, abstract placeholder shapes — solid gray fills, a plain black square standing in for the character-preview area, rounded dark tooltip boxes with a cyan accent border — not Mojang texture art. This one **was** used as a measurements source; see the table below. Still not exported directly (its shapes are placeholder-plain, not styled to match this case study), but its proportions are real and now reflected in the implementation.

A fourth file, **"Redesign: Minecraft inventory UI — Community,"** is another independent designer's own original redesign concept — not vanilla Minecraft, not adopted as a foundation, since doing so would repeat the uncredited-reuse problem this case study avoids with Jay Han and Barbara Franco.

### Measurements taken from the Inventory Template file (node `0:1`)

| Structure | What was measured | Where it's now reflected |
|---|---|---|
| Armor column | 4 slots, 18px each, zero gap between them (contiguous) | `MinecraftUI.tsx` → `MinecraftPlayerFrame` |
| Character-preview area | A distinct square region beside the armor column, separate from the offhand slot | `MinecraftPlayerFrame` |
| Offhand slot | Single slot, positioned below-right of the preview area | `MinecraftPlayerFrame` |
| Main inventory grid | 9 columns × 3 rows, contiguous (zero gap) | `MinecraftSlotGrid` (existing) |
| Gap before hotbar | A visibly larger gap between the 3-row main grid and the 1-row hotbar than between rows within the main grid | Reflected via the existing `gap-4` separation between the two `MinecraftSlotGrid` calls in `InventoryFlowPrototype.tsx` |
| Crafting grid | True 2×2, contiguous, with a directional arrow to a single offset result slot | Existing crafting-grid markup (unchanged, already matched) |
| Recipe button | Two distinct states (default / hovered) | Not yet built — the prototype doesn't have a Recipe Book entry point; noted for a future pass |
| Tooltip | Rounded corners (~3px), dark flat fill, one variant with a cyan accent border | `MinecraftSlot`'s tooltip now has `rounded-[3px]` corners (added this revision) |

This was the first supplied Figma resource that functioned as genuine structural reference rather than a texture dump — later joined by the UI KIT canvas below. Recorded separately from the pure texture-dump files rather than lumped in with them.

### Adopted from the "MINECRAFT UI KIT" file's UI KIT canvas (node `2:554`, frame `5:1397`)

Pulled with `get_design_context` on the `Inventory` frame (`5:234`) per the `figma-design-to-code` skill's required workflow. Two concrete pieces were adopted; everything else in that frame (the Inventory Window background image, the raw Item Slot texture, the arrow icon) was left as reference only, consistent with this project's zero-raster-asset rule — this file's `get_design_context` response explicitly returns those as downloadable `<img>` assets, and they were deliberately **not** downloaded.

| Structure | What was measured/extracted | Where it's now reflected |
|---|---|---|
| Recipe Button | A beveled button: flat center fill + a 4-strip "Shadow Outline" (light top/left edges, dark bottom/right edges) — confirmed vector-built (rounded-rectangle + solid-fill vectors), not a texture | `MinecraftUI.tsx` → `MinecraftPlayerFrame`'s Recipe Book button, now `boxShadow: inset 1px 1px 0 rgba(255,255,255,.45), inset -1px -1px 0 rgba(0,0,0,.35)` in place of a single flat inset shadow |
| Recipe Book icon | A 16×14 pixel-built green book (near-black spine, layered green shading, gray page-edge stripe) — 28 solid-color rectangles, genuinely original pixel art, not Mojang texture art. Exact hex values read off its fills: `#161005`, `#1b361b`, `#2a592a`, `#3d7a3d`, `#478e47`, `#56ad56`, `#d6d6d6`, `#999999`, `#5b5b5b` | `PixelIcon.tsx` → `RecipeBookIcon` — same nine hex values, redrawn at this case study's own 9×8 pixel resolution (not a pixel-for-pixel export). Replaces the earlier placeholder Lucide `BookOpen` icon, which was portfolio chrome standing in for missing reference data |
| Crafting grid | Confirmed a true 2×2 despite being named "Crafting 4x4" in the Figma layer tree | Already matched (no change) — cross-check only |
| Inventory grid row gap | Confirmed the same "bigger gap before the last row" pattern (main grid + hotbar) independently found in the Inventory Template file | Already matched (no change) — cross-check only |

## FIGMA-REFERENCED RECREATION

| Asset | Built in | Notes |
|---|---|---|
| Item pixel art | `PixelIcon.tsx` | 12×12 original pixel grids, hand-authored per item. Silhouette/color choices (e.g. the oak log's concentric-ring cross-section) were checked against one real Minecraft texture viewed via Figma (`acacia_log`, node `2018:3757` in the Assets file) for shape accuracy, then redrawn from scratch — no pixels copied, nothing exported. |
| Minecraft UI system | `MinecraftUI.tsx` | `MinecraftPanel`, `MinecraftSlot`, `MinecraftSlotGrid`, `MinecraftButton`, `MinecraftInset`, `MinecraftLabel`, `MinecraftPlayerFrame`. Light gray, rounded surfaces with soft drop shadows — matched directly against the Inventory Template file's actual rendered appearance (see "Visual style correction" above), not an assumed "authentic pixel Minecraft" look. `MinecraftPlayerFrame` (armor column + preview + offhand + Recipe Book button) is built from that file's measurements and layout, with the Recipe Button itself now also informed by the UI KIT canvas's real button/icon construction (see "Adopted from the UI KIT canvas" above). |
| Recipe Book icon | `PixelIcon.tsx` → `RecipeBookIcon` | 9×8 original pixel grid using the exact fill colors read from the UI KIT canvas's real Recipe Book icon, redrawn at this project's own resolution — not exported. |
| Vanilla baseline recreation | `StaticPanels.tsx` → `VanillaBaselineRecreation` | Plain, unaugmented inventory/hotbar/2×2-crafting layout, now including the armor/preview/offhand column — no Smart Select, no color-coded states — used in "Current Experience" in place of a screenshot. Explicitly labeled as a recreation, not a capture. |

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

## Not used: Mojang's official Minecraft icon/logo

The "MINECRAFT UI KIT" file's cover art displays Mojang's actual "MINECRAFT" wordmark/logo treatment and a Steve character render. This wasn't adopted anywhere on the page — using Mojang's own brand icon in this case study would cut directly against the "Not an official Minecraft product" positioning stated at the top of this page and in the hero. An unofficial concept study using the actual brand mark risks implying official endorsement, which is the opposite of what the disclaimer says. Deep's own "Inventory Flow" wordmark (plain text, portfolio typography) is the only project identity mark used.

## Removed in this revision

At an earlier stage this case study used real imagery: a genuine Java Edition screenshot, two Minecraft Wiki captures, and one attributed reference frame each from Jay Han and Barbara Franco (with credit and outbound links). All of it has been removed on request, so that every visual on the page traces to either the supplied Figma files (as reference only — see above) or this codebase's own original work. Jay Han and Barbara Franco are still cited by name in "Two Design Studies," now as text-only citations with an outbound link to their original work — no images from either designer are hosted or displayed.
