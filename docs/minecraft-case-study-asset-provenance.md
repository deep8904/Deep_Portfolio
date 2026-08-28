# Inventory Flow — Asset Provenance

Independent concept project. Not affiliated with or endorsed by Mojang Studios or Microsoft.

This document records the origin of every visual asset used in the "Inventory Flow" case study at `/work/inventory-flow`.

## Vanilla Minecraft (real, unmodified captures)

| Asset | Source | Creator | Usage basis | Modified | Used in |
|---|---|---|---|---|---|
| `public/work/inventory-flow/vanilla/creative-inventory-tooltip.png` | Provided by Deep (originally captured by Jay Han for his own case study's evidence section, filename matches Minecraft's native auto-screenshot convention `yyyy-MM-dd_HH.mm.ss`) | Jay Han (in-game capture of Mojang's software) | Real, unmodified gameplay screenshot used as current-baseline evidence; labeled "VANILLA MINECRAFT," never presented as Deep's work | Not modified | Hero (paired against the original concept) and "Current Experience" |
| `public/work/inventory-flow/vanilla/survival-inventory-wiki.png` | `https://minecraft.wiki/images/Inventory.png` | Minecraft Wiki contributors (in-game capture of Mojang's software) | Wiki reference screenshot of the survival inventory (equipment, 2×2 crafting grid, hotbar), used to accurately ground the current-state audit | Not modified | "Current Experience" |
| `public/work/inventory-flow/vanilla/recipe-book-wiki.png` | `https://minecraft.wiki/images/thumb/Crafting_Recipe_Book_%28inventory%29.png/1200px-Crafting_Recipe_Book_%28inventory%29.png` | Minecraft Wiki contributors (in-game capture of Mojang's software) | Wiki reference screenshot of the Recipe Book, showing search, category tabs, and the red missing-material highlight — directly supports this case study's claims about the current baseline | Not modified | "Current Experience" |

## Reference study imagery (Jay Han and Barbara Franco's own work)

These belong to the two designers. They are shown only inside the "Two Design Studies" section, always labeled **REFERENCE STUDY**, always attributed by name with an outbound link to the source, and never appear in the hero, "The System," the interactive prototype, states gallery, or the Work-page/home cover.

| Asset | Source | Creator | Usage basis | Modified | Used in |
|---|---|---|---|---|---|
| `reference/jay-han/smart-select-active.png` | jayhan.me/minecraft-inventory (file provided directly by Deep) | Jay Han | Editorial/research commentary — attributed, linked, labeled REFERENCE STUDY | Not modified | "Two Design Studies" |
| `reference/jay-han/smart-select-idle.png` | jayhan.me/minecraft-inventory | Jay Han | Same as above (held in reserve; not currently placed on the page) | Not modified | — |
| `reference/jay-han/compartments-grid.png` | jayhan.me/minecraft-inventory | Jay Han | Same as above (held in reserve) | Not modified | — |
| `reference/jay-han/custom-compartments.png` | jayhan.me/minecraft-inventory | Jay Han | Same as above (held in reserve) | Not modified | — |
| `reference/barbara-franco/final-concept.png` | barbarafranco.design (Wix-hosted image, file provided directly by Deep) | Barbara Franco | Editorial/research commentary — attributed, linked, labeled REFERENCE STUDY | Not modified | "Two Design Studies" |
| `reference/barbara-franco/hero-cover.png` | barbarafranco.design | Barbara Franco | Same as above (held in reserve) | Not modified | — |
| `reference/barbara-franco/wireframe-exploration.png` | barbarafranco.design | Barbara Franco | Same as above (held in reserve) | Not modified | — |

## Original assets (built for this case study)

| Asset | Creator | Notes |
|---|---|---|
| Item pixel art (`PixelIcon.tsx`) | Deep Chadamiya, this codebase | 12×12 original pixel grids, hand-authored per item (oak log, planks, stick, coal, torch, crafting table, cobblestone, iron ingot, wheat, diamond) — not Minecraft's own textures |
| Interactive prototype UI (`InventoryFlowPrototype.tsx`) | Deep Chadamiya, this codebase | Original stone-panel game chrome (slot bevels, hotbar separation, selection/ready/missing states) |
| Hero concept preview (`StaticPanels.tsx` → `HeroConceptPreview`) | Deep Chadamiya, this codebase | Frozen preview of the Chest-mode panel, same visual language as the live prototype |
| Rejected-concept sketches (`StaticPanels.tsx` → `RejectedSketch`) | Deep Chadamiya, this codebase | Small mini-wireframes, deliberately rough |
| Work-list / home cover art (`InventoryFlowCover.tsx`) | Deep Chadamiya, this codebase | Same dark stone-panel language as the prototype |
| State gallery (`StateGallery.tsx`) | Deep Chadamiya, this codebase | Real-sized slot crops using the redesigned system, not Storybook-style documentation |

## Figma community resources — inspected, not shipped

Four Figma community files were reviewed as candidate visual foundations for the prototype's game chrome:

| Resource | URL | What it actually is | Decision |
|---|---|---|---|
| "Minecraft Assets — Community" | figma.com/design/2dk5Qczu2hiZlP9sIlyVGE | A sprite sheet of Mojang's own item/block textures (128×128 each), extracted and re-hosted in Figma. Layer names match Minecraft's real texture filenames exactly (e.g. `acacia_log`, `Grass_Block_(top_texture)_JE4_BE2`). | **Not shipped.** This is Mojang's copyrighted texture art republished by a community account with no visible redistribution license. Inspected only (e.g. `acacia_log`, node `2018:3757`) to sanity-check the color/shape of this project's own original pixel icons — nothing was exported into the repo. |
| "MINECRAFT UI KIT — Community" | figma.com/design/IYzGa2yw2rqjYu67Wjv96H | Same situation as above: the file's own cover reads "MINECRAFT UI" over Mojang's dirt texture and Steve render, and the inspected canvas (`Blocks`) is another Mojang-texture sprite sheet with Wiki-style version-tagged filenames. Not an original UI redesign. | **Not shipped**, same reasoning. |
| "Minecraft Inventory Template — Community" | figma.com/design/2boFyMI8C71kcr3pXh8iWo | A small, generic gray-slot inventory/hotbar/crafting-grid template. Low detail, no texture or attribution concerns, but adds nothing beyond what the real Minecraft Wiki screenshots already confirmed about vanilla layout. | Reviewed; not a meaningful upgrade over the Wiki screenshots already in use, so not adopted. |
| "Redesign: Minecraft inventory UI — Community" | figma.com/design/bYHdcBCXZ49dzajEgfYISu | Another independent designer's **own original redesign concept** (wireframe → palette → warm rounded-panel final screen over blurred gameplay) — not vanilla Minecraft, and not Deep's work. | **Not used as a foundation.** Treating an uncredited third designer's original redesign as "the template to extend" would be the same problem this case study explicitly avoids with Jay Han and Barbara Franco — using someone else's design without attribution. If it were adopted, it would need the same REFERENCE STUDY treatment as the other two, and the case study is intentionally scoped to two research references, not three. |

Per this project's own asset policy — use a resource directly only when reuse rights are clear, otherwise treat it as reference and recreate — the two texture-sprite files were inspected for accuracy and then set aside, and the interactive prototype's item art and game-chrome styling remain the original system in `PixelIcon.tsx` and `InventoryFlowPrototype.tsx`, cross-checked against the real vanilla Java Edition screenshots above rather than rebuilt from Mojang's extracted textures.

## Not used, and why

- **Jay Han's and Barbara Franco's full mockups beyond the one frame each currently placed** — kept in the asset folder in reserve but not placed on the page, to keep the reference section tight rather than exhaustive.
- **Mojang's actual item textures/sprites**, including the two Figma community files packaging them — not used anywhere. All item art in the prototype, states gallery, and covers is original pixel art authored for this project.
- **AI-generated "fake Minecraft" renders for the hero** — deliberately avoided. The hero pairs a real, unmodified vanilla screenshot against the original concept, not a synthetic image.
