# Inventory Flow — Asset Provenance

Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.

This document records the origin of every visual asset used in the "Inventory Flow" case study at `/work/inventory-flow`, organized by how each one was actually used.

## Final asset strategy

1. **Real Minecraft screenshots** for current-state evidence.
2. **Figma community files** inspected as visual/geometry reference only — never shipped, for the reasoning below.
3. **Original Inventory Flow UI**, built in React (`MinecraftUI.tsx`, `InventoryFlowPrototype.tsx`).
4. **Original pixel-art item assets** (`PixelIcon.tsx`) for in-prototype item art.

Owning a copy of Minecraft doesn't change this — the constraint is redistribution rights over Mojang's copyrighted assets, not access to the game.

## Category: USED DIRECTLY — real gameplay screenshot

| Asset | Source | Creator | How it affected the design |
|---|---|---|---|
| `vanilla/creative-inventory-tooltip.png` | Provided by Deep; filename matches Minecraft's native auto-screenshot convention `yyyy-MM-dd_HH.mm.ss` (originally captured by Jay Han for his own case study) | Jay Han (in-game capture of Mojang's software) | Anchors the hero as a real screenshot, not an illustration — sets the "this is grounded in the real game" tone before any concept UI appears. Also the source for confirming the item-tooltip's info hierarchy (name, enchantment, effect, "From: Minecraft") referenced when designing the prototype's own hover tooltip. |
| `vanilla/survival-inventory-wiki.png` | `minecraft.wiki/images/Inventory.png` | Minecraft Wiki contributors (in-game capture) | The direct source for this case study's slot/hotbar/2×2-grid layout claims in "Current Experience" — confirmed equipment sits left of the player model, crafting sits right, hotbar is visually separated below. |
| `vanilla/recipe-book-wiki.png` | `minecraft.wiki/images/thumb/Crafting_Recipe_Book_(inventory).png/1200px-...` | Minecraft Wiki contributors (in-game capture) | The direct source for the claim that search, category tabs, a craftable filter, and a red missing-material highlight already exist — used to keep Crafting Clarity's copy honest about what's new versus already-vanilla. |

## Category: USED DIRECTLY — original asset (built for this case study)

| Asset | Creator | How it was built |
|---|---|---|
| `PixelIcon.tsx` | Deep Chadamiya, this codebase | 12×12 original pixel grids, hand-authored per item. Shape/color choices (e.g. the oak log's concentric-ring cross-section) were sanity-checked against a real Minecraft texture viewed via Figma (see below) for silhouette accuracy, then redrawn from scratch — no pixels copied. |
| `MinecraftUI.tsx` | Deep Chadamiya, this codebase | The shared internal visual system for the simulated game UI: `MinecraftPanel` (square window, two-tone pixel bevel), `MinecraftSlot` (beveled slot + hover tooltip), `MinecraftSlotGrid`, `MinecraftButton`, `MinecraftInset`, `MinecraftLabel`. One system, reused by the prototype, the hero preview, and the Work-list cover instead of three separate approximations. |
| `InventoryFlowPrototype.tsx` | Deep Chadamiya, this codebase | Chest mode and Personal Inventory mode, built on `MinecraftUI.tsx` |
| `StaticPanels.tsx` (`HeroConceptPreview`, `RejectedSketch`) | Deep Chadamiya, this codebase | Frozen hero preview and rejected-concept mini-sketches, same visual system |
| `InventoryFlowCover.tsx` | Deep Chadamiya, this codebase | Work-list/home cover, same visual system |
| `StateGallery.tsx` | Deep Chadamiya, this codebase | Real-sized slot-state crops, same visual system |

## Category: VISUAL REFERENCE ONLY — not shipped

Four Figma community files were opened and inspected in full (components, frames, layer names, proportions) — not just thumbnails.

| Resource | URL | What it actually is | Why it wasn't shipped | What it did affect |
|---|---|---|---|---|
| "Minecraft Assets — Community" | figma.com/design/2dk5Qczu2hiZlP9sIlyVGE | A sprite sheet of Mojang's own item/block textures (128×128 each). Layer names match Minecraft's real texture filenames exactly (`acacia_log`, `Grass_Block_(top_texture)_JE4_BE2`). | Mojang's copyrighted texture art, re-hosted by a community account with no visible redistribution license — the same legal position as sourcing the raw textures directly. | Inspected one texture (`acacia_log`, node `2018:3757`) purely to check silhouette/color accuracy against this project's own hand-drawn oak-log pixel icon. Nothing exported. |
| "MINECRAFT UI KIT — Community" | figma.com/design/IYzGa2yw2rqjYu67Wjv96H | Same situation: the cover reads "MINECRAFT UI" over Mojang's dirt texture and a Steve render; the inspected canvas is another Mojang-texture sprite sheet with Wiki version-tagged filenames, not an original UI redesign. | Same reasoning as above. | Confirmed (via the file's own cover art) that this is a texture library, not original UI chrome — informed the decision to build `MinecraftUI.tsx` from scratch, cross-checked against the real Wiki screenshots above, rather than against this file. |
| "Minecraft Inventory Template — Community" | figma.com/design/2boFyMI8C71kcr3pXh8iWo | A small, generic gray-slot inventory/hotbar/crafting-grid template. No texture/attribution concerns. | Added nothing beyond what the real Wiki screenshots already confirmed about vanilla layout — grid-hotbar-crafting arrangement matched what was already verified. | Cross-check only; no direct effect on the final design. |
| "Redesign: Minecraft inventory UI — Community" | figma.com/design/bYHdcBCXZ49dzajEgfYISu | Another independent designer's own original redesign concept (wireframe → palette → warm rounded-panel final screen over blurred gameplay) — not vanilla Minecraft, not Deep's work. | Adopting it as a structural foundation would repeat the exact uncredited-reuse problem this case study explicitly avoids with Jay Han and Barbara Franco. This case study cites two research references, not three. | Not used, and deliberately excluded from the public case study rather than added as a third reference study. |

## Category: REFERENCE CASE STUDY — Jay Han and Barbara Franco's own work

Shown only inside "Two Design Studies," always labeled **REFERENCE STUDY**, credited by name with an outbound link, never appearing in the hero, "The System," the interactive prototype, states gallery, or any cover.

| Asset | Source | Creator | How it affected the design |
|---|---|---|---|
| `reference/jay-han/smart-select-active.png` | jayhan.me/minecraft-inventory (file provided by Deep) | Jay Han | Source for the "What He Explored" / "What Testing Exposed" framing — the multi-stack-selection idea it demonstrates became this concept's Smart Select; the compartments-complexity concern his own testing surfaced became a guardrail. |
| `reference/barbara-franco/final-concept.png` | barbarafranco.design (file provided by Deep) | Barbara Franco | Source for the "What She Protected" / "What She Improved" framing — her ready/missing color treatment and preserved 2×2 grid directly informed Crafting Clarity's owned-vs-required states in this concept. |
| `reference/jay-han/smart-select-idle.png`, `compartments-grid.png`, `custom-compartments.png` | jayhan.me/minecraft-inventory | Jay Han | Held in reserve; not currently placed on the page (kept the section to one frame per designer rather than exhaustive). |
| `reference/barbara-franco/hero-cover.png`, `wireframe-exploration.png` | barbarafranco.design | Barbara Franco | Held in reserve, same reasoning. |
