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

## Not used, and why

- **Jay Han's and Barbara Franco's full mockups beyond the one frame each currently placed** — kept in the asset folder in reserve but not placed on the page, to keep the reference section tight rather than exhaustive.
- **Mojang's actual item textures/sprites** — not used anywhere. All item art in the prototype, states gallery, and covers is original pixel art authored for this project.
- **AI-generated "fake Minecraft" renders for the hero** — deliberately avoided. The hero pairs a real, unmodified vanilla screenshot against the original concept, not a synthetic image.
