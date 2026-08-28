// Static/narrative content for the Inventory Flow case study. Kept separate
// from the interactive prototype's state (see prototypeData.ts) since this
// content is read-only copy, not runtime demo state.

export const EVIDENCE_SCOPE = {
  have: [
    "Secondary research — Minecraft Feedback threads, inventory-management mods",
    "Two design-reference case studies, read in full",
    "A current-state audit of vanilla Java Edition",
    "A heuristic review of this concept against known risks",
  ],
  dontHave: ["Primary usability testing — see Next Test for the plan to get it"],
};

export type AuditRow = {
  area: string;
  observation: string;
  friction: string;
  consequence: string;
  opportunity: string;
};

export const AUDIT_ROWS: AuditRow[] = [
  {
    area: "Inventory grid → chest transfer",
    observation:
      "Shift+click moves one full stack per click; shift+double-click gathers every matching stack of that item from the other side into the first available slots.",
    friction:
      "Moving a mixed haul of a dozen different item types into a chest is still a dozen individual shift+clicks — the shortcut speeds up one item type at a time, not a mixed selection.",
    consequence: "Return-from-exploration cleanup becomes repetitive, low-attention clicking rather than a decision.",
    opportunity: "A way to act on several different stacks as one selection, without adding a new item slot type.",
  },
  {
    area: "Hotbar during quick actions",
    observation: "Shift-click and the recipe book insert items into the first empty or matching slot, hotbar included.",
    friction:
      "A quick sort or a recipe-book auto-fill can quietly consume a hotbar slot a player deliberately arranged (torch in slot 1, sword in slot 2), especially the moment before combat or a build.",
    consequence: "Players avoid quick actions near danger, or re-check the hotbar out of habit after every transfer.",
    opportunity: "Let bulk actions default to leaving intentionally placed hotbar slots alone.",
  },
  {
    area: "Recipe Book",
    observation:
      "The book already has a search field, category tabs, a Show Craftable / Show All toggle, and highlights an item red when a material is missing.",
    friction:
      "That state lives inside the book's own list view — reading \"why is this red\" still means opening the recipe and visually comparing the grid against inventory contents yourself.",
    consequence: "Newer players can see *that* something is missing without being told *what* or *how many* at a glance.",
    opportunity:
      "Make owned-vs-required legible next to the grid itself, without duplicating the search/filter/craftable system that already works.",
  },
  {
    area: "Chest / shulker box contents",
    observation: "A shulker box preview shows a handful of icons plus \"and N more\"; full contents require opening it.",
    friction: "Confirming whether a specific item is inside a labeled box still often means opening it.",
    consequence: "Players keep box contents memorized externally (naming conventions, external notes) rather than trusting the UI.",
    opportunity: "Out of scope for this concept — flagged under What I Did Not Change; it's a container/UI-chrome problem, not an interaction-cost problem this study targets.",
  },
];

export type EvidenceRow = { evidence: string; principle: string; response: string };

export const EVIDENCE_TRACE: EvidenceRow[] = [
  {
    evidence: "Repeated Minecraft Feedback requests for inventory/chest sorting and an auto-sort button.",
    principle: "Reduce repetitive organization work.",
    response: "A Sort action in the contextual utility bar — one click, not a redesign of storage.",
  },
  {
    evidence: "Jay Han's testing: organizing benefits were liked, but some players felt persistent compartments no longer felt like Minecraft, and others found the system's rules hard to hold in their head.",
    principle: "Advanced structure should be optional, not load-bearing for basic use.",
    response: "Contextual filters and one-shot actions instead of a persistent, always-visible compartment layer.",
  },
  {
    evidence: "Barbara Franco deliberately preserved the 2×2 crafting grid as core to Minecraft's identity, and rejected an extra inventory row as a game-balance change, not a UI fix.",
    principle: "Preserve the crafting mental model; don't solve UI friction by changing what the game gives the player.",
    response: "The grid, hotbar, and slot count are unchanged. Crafting gets clearer feedback, not a new grid shape.",
  },
  {
    evidence: "Mojang's own Bundle solves *mixed-item* storage density inside the existing slot system, rather than adding slots.",
    principle: "Don't solve every capacity problem in this UI — some are already Mojang's to solve, and they already have.",
    response: "This concept stays scoped to interaction cost (selecting, moving, sorting, crafting feedback), not slot count or stack size.",
  },
  {
    evidence: "The vanilla Recipe Book already has search, category tabs, a craftable filter, and red-highlights missing materials.",
    principle: "Don't rebuild what already works — clarify what's genuinely ambiguous.",
    response: "Crafting Clarity leaves search/filter/tabs alone and adds an explicit owned-vs-required readout next to the grid.",
  },
  {
    evidence: "Community threads ask for easier shulker-box content checks without placing the box.",
    principle: "Some friction is a container/UI-chrome problem, not an interaction-cost problem.",
    response: "Explicitly out of scope — listed under What I Did Not Change rather than folded in to inflate this concept's reach.",
  },
];

export const GUARDRAILS = [
  { title: "Keep the existing grid", body: "36 inventory slots, 9-slot hotbar, 2×2 crafting grid, armor and offhand — unchanged in count and layout." },
  { title: "No new inventory capacity", body: "Nothing here adds slots or increases stack sizes. Capacity is a game-balance lever, not a UI fix." },
  { title: "Manual control stays the default", body: "Bulk actions run once, when a player asks for them. Nothing reorganizes automatically in the background." },
  { title: "Hotbar is protected by default", body: "Sort, Stack, and Deposit Matching skip hotbar slots unless a player turns protection off." },
  { title: "Advanced tools stay optional", body: "Smart Select and quick actions live in a utility bar a player can ignore entirely and still play exactly like vanilla Minecraft." },
  { title: "Don't rebuild what already works", body: "Recipe Book search, tabs, and the craftable filter are left alone; the concept adds clarity around the grid, not a parallel system." },
];

export type Scenario = { tag: string; title: string; body: string; steps: string[] };

export const SCENARIOS: Scenario[] = [
  {
    tag: "Build restock",
    title: "Stocking up for a large build",
    body: "A player is mid-build and needs blocks, scaffolding, and tools pulled from a storage room of chests, without derailing into ten minutes of manual transfers.",
    steps: [
      "Open the relevant chest and enter Smart Select.",
      "Select the block stacks and scaffolding needed for this trip.",
      "Selection feedback shows combined quantity and confirms the inventory has room.",
      "Move — the selection transfers in one action; the hotbar loadout is untouched.",
    ],
  },
  {
    tag: "Adventure cleanup",
    title: "Sorting a mixed haul after exploring",
    body: "A player returns with a backpack of unsorted ore, food, and junk and wants storage organized again before it fills up their hotbar by accident.",
    steps: [
      "Open the destination chest and run Deposit Matching to send anything the chest already stores.",
      "Run Sort on what's left in the inventory to group the remainder.",
      "Hotbar Protection (on by default) keeps the prepared hotbar loadout untouched throughout.",
    ],
  },
  {
    tag: "Crafting",
    title: "Crafting a known recipe under uncertainty",
    body: "A player knows what they want to build but isn't sure they're carrying enough of every ingredient.",
    steps: [
      "Select the recipe from the Recipe Book as usual.",
      "The clarity panel shows owned vs. required per ingredient next to the grid, missing amounts called out directly.",
      "Adjust quantity; Craft stays disabled until requirements are met, then confirms the result.",
    ],
  },
];

export type RejectedConcept = { title: string; body: string; reason: string };

export const REJECTED_CONCEPTS: RejectedConcept[] = [
  {
    title: "An extra inventory row",
    body: "The single fastest way to reduce \"I'm out of space\" friction.",
    reason: "Capacity is a survival/building balance lever, not a UI problem — the same reasoning Barbara Franco used to reject it. Bundles and Shulker Boxes are Mojang's own answer in that space.",
  },
  {
    title: "Permanent, color-coded compartments",
    body: "Jay Han's compartments, applied wholesale: every chest divided into persistent, labeled zones.",
    reason: "His own testing surfaced two real costs — some players felt it stopped feeling like Minecraft, and others found the rule system hard to hold in their head. Adopting it unmodified would import both risks.",
  },
  {
    title: "A full-screen, modernized inventory",
    body: "Redesign the inventory as a larger, app-like panel with richer layout and typography.",
    reason: "Breaks the thesis. The grid's compactness and pixel rhythm are part of why it reads as Minecraft; a bigger, softer panel stops feeling like the game it's for.",
  },
  {
    title: "Automatic organization with no confirmation",
    body: "Sort/stack running continuously in the background, no player action required.",
    reason: "Removes manual control by default, which this concept treats as a guardrail, not a nice-to-have — a background process silently moving items is also a support cost (\"where did my item go\") current Minecraft doesn't have.",
  },
  {
    title: "A large permanent utility panel",
    body: "Keep every quick action, filter, and status readout visible at all times as a persistent HUD element.",
    reason: "Constant on-screen chrome fights \"keep the player in the world.\" The utility bar is contextual — it appears with an open inventory or container, not layered over gameplay.",
  },
];

export const WHAT_DID_NOT_CHANGE = [
  "Inventory slot count (36) and hotbar slot count (9)",
  "Armor and offhand slot layout",
  "The 2×2 personal crafting grid and the 3×3 crafting-table grid",
  "Stack sizes and item stacking rules",
  "Recipe Book search, category tabs, and the craftable filter",
  "Storage progression — Bundles and Shulker Boxes remain Mojang's answer to capacity/density",
  "Underlying survival balance — nothing here makes a player carry more or work less for materials",
];

export const KNOWN_RISKS = [
  {
    title: "Smart Select could compete with existing shift-click muscle memory",
    body: "Experienced players already have shift+click and shift+double-click wired into their hands. Smart Select needs to feel additive, not like a second system fighting the first — this needs direct comparison testing against shift-click for the same tasks.",
  },
  {
    title: "\"Matching\" is ambiguous without a definition on-screen",
    body: "Deposit Matching / Take Matching only work if a player can predict what counts as a match (exact item vs. category). The demo defines match as exact item type; a real build would need this stated in-product, not just in documentation.",
  },
  {
    title: "Hotbar Protection needs to be legible, not just present",
    body: "A protection toggle that's easy to miss is worse than no toggle — players need to be able to tell, at a glance, whether it's currently on.",
  },
  {
    title: "No primary usability data yet",
    body: "Everything above is a heuristic review and a design argument, not a tested result. See Next Test for what real validation would need to look like.",
  },
];

export const NEXT_TEST_TASKS = [
  "Organize a mixed chest using Sort, Stack, and Deposit Matching.",
  "Restock a hotbar for a build without disturbing prepared slots.",
  "Move several different stack types from inventory to storage in one action.",
  "Craft a known recipe while missing one ingredient, and recover from that state.",
];

export const NEXT_TEST_METRICS = [
  "Task completion (did they finish without external help)",
  "Click / action count versus the vanilla baseline for the same task",
  "Time on task",
  "Errors (wrong item moved, hotbar slot disturbed unintentionally, missed missing-ingredient state)",
  "Self-reported \"this still feels like Minecraft\" (1–5), given Jay Han's testing flagged that exact risk",
];
