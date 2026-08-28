"use client";

import { useMemo, useReducer, useState } from "react";
import clsx from "clsx";
import { ArrowDownToLine, ArrowUpFromLine, ArrowRightLeft, Layers, Lock, Unlock, RotateCcw, X } from "lucide-react";
import { ItemGlyph, ITEM_META, type ItemId } from "./ItemGlyph";
import { MinecraftPanel, MinecraftInset, MinecraftLabel, MinecraftSlotGrid, MinecraftButton, MinecraftPlayerFrame, slotBevel } from "./MinecraftUI";

// ---------------------------------------------------------------------------
// Deterministic demo data. No persistence, no network — Reset Demo always
// returns to this exact state. Hotbar = slots 0-8, main grid = slots 9-35,
// matching real Minecraft's 9 + 27 slot counts so the layout reads true.
// ---------------------------------------------------------------------------

type Slot = { item: ItemId; qty: number } | null;

const MAX_STACK = 64;
const HOTBAR_SIZE = 9;
const MAIN_SIZE = 27;
const STORAGE_SIZE = 27;

function emptyGrid(size: number): Slot[] {
  return Array.from({ length: size }, () => null);
}

function makeInitialInventory(): Slot[] {
  const slots = emptyGrid(HOTBAR_SIZE + MAIN_SIZE);
  slots[0] = { item: "torch", qty: 8 };
  slots[4] = { item: "cobblestone", qty: 64 };
  slots[9] = { item: "oak-log", qty: 12 };
  slots[10] = { item: "stick", qty: 30 };
  slots[12] = { item: "oak-planks", qty: 20 };
  slots[13] = { item: "iron-ingot", qty: 5 };
  slots[15] = { item: "coal", qty: 6 };
  slots[18] = { item: "cobblestone", qty: 64 };
  slots[20] = { item: "oak-planks", qty: 14 };
  slots[22] = { item: "wheat", qty: 9 };
  slots[25] = { item: "cobblestone", qty: 22 };
  slots[30] = { item: "diamond", qty: 2 };
  return slots;
}

function makeInitialStorage(): Slot[] {
  const slots = emptyGrid(STORAGE_SIZE);
  slots[0] = { item: "cobblestone", qty: 64 };
  slots[3] = { item: "oak-planks", qty: 64 };
  slots[6] = { item: "iron-ingot", qty: 10 };
  return slots;
}

type Recipe = {
  id: string;
  label: string;
  output: { item: ItemId; qty: number };
  ingredients: { item: ItemId; qty: number }[];
  gridPositions: [number, number][]; // which of the 4 cells (0-3) each ingredient occupies
};

const RECIPES: Recipe[] = [
  {
    id: "oak-planks",
    label: "Oak Planks",
    output: { item: "oak-planks", qty: 4 },
    ingredients: [{ item: "oak-log", qty: 1 }],
    gridPositions: [[0, 0]],
  },
  {
    id: "stick",
    label: "Stick",
    output: { item: "stick", qty: 4 },
    ingredients: [{ item: "oak-planks", qty: 2 }],
    gridPositions: [
      [0, 0],
      [1, 0],
    ],
  },
  {
    id: "crafting-table",
    label: "Crafting Table",
    output: { item: "crafting-table", qty: 1 },
    ingredients: [{ item: "oak-planks", qty: 4 }],
    gridPositions: [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ],
  },
  {
    id: "torch",
    label: "Torch",
    output: { item: "torch", qty: 4 },
    ingredients: [
      { item: "coal", qty: 1 },
      { item: "stick", qty: 1 },
    ],
    gridPositions: [
      [0, 0],
      [0, 1],
    ],
  },
];

// ---------------------------------------------------------------------------
// State + reducer
// ---------------------------------------------------------------------------

type State = {
  inventory: Slot[];
  storage: Slot[];
  smartSelect: boolean;
  selected: number[]; // inventory indices
  hotbarProtected: boolean;
  recipeId: string;
  quantity: number;
  status: string;
};

function initialState(): State {
  return {
    inventory: makeInitialInventory(),
    storage: makeInitialStorage(),
    smartSelect: false,
    selected: [],
    hotbarProtected: true,
    recipeId: "torch",
    quantity: 1,
    status: "Demo ready.",
  };
}

type Action =
  | { type: "TOGGLE_SMART_SELECT" }
  | { type: "SELECT_SLOT"; index: number }
  | { type: "CANCEL_SELECTION" }
  | { type: "MOVE_SELECTION" }
  | { type: "DROP_SELECTION" }
  | { type: "SORT" }
  | { type: "STACK" }
  | { type: "DEPOSIT_MATCHING" }
  | { type: "TAKE_MATCHING" }
  | { type: "TOGGLE_HOTBAR_PROTECTION" }
  | { type: "SET_RECIPE"; id: string }
  | { type: "SET_QUANTITY"; qty: number }
  | { type: "CRAFT" }
  | { type: "RESET" };

function itemLabel(item: ItemId) {
  return ITEM_META[item].label;
}

function countItem(slots: Slot[], item: ItemId, range?: [number, number]) {
  const [from, to] = range ?? [0, slots.length];
  let total = 0;
  for (let i = from; i < to; i++) {
    const s = slots[i];
    if (s && s.item === item) total += s.qty;
  }
  return total;
}

function cloneSlots(slots: Slot[]) {
  return slots.map((s) => (s ? { ...s } : null));
}

/** Removes `qty` of `item` from slots, searching hotbar then main grid. */
function removeItem(slots: Slot[], item: ItemId, qty: number) {
  let remaining = qty;
  for (let i = 0; i < slots.length && remaining > 0; i++) {
    const s = slots[i];
    if (s && s.item === item) {
      const take = Math.min(s.qty, remaining);
      s.qty -= take;
      remaining -= take;
      if (s.qty === 0) slots[i] = null;
    }
  }
}

/** Adds `qty` of `item`, filling matching partial stacks first, then empty slots. */
function addItem(slots: Slot[], item: ItemId, qty: number, allowedRange: [number, number]) {
  let remaining = qty;
  const [from, to] = allowedRange;
  for (let i = from; i < to && remaining > 0; i++) {
    const s = slots[i];
    if (s && s.item === item && s.qty < MAX_STACK) {
      const room = MAX_STACK - s.qty;
      const add = Math.min(room, remaining);
      s.qty += add;
      remaining -= add;
    }
  }
  for (let i = from; i < to && remaining > 0; i++) {
    if (!slots[i]) {
      const add = Math.min(MAX_STACK, remaining);
      slots[i] = { item, qty: add };
      remaining -= add;
    }
  }
  return remaining; // leftover that didn't fit
}

function sortRange(slots: Slot[], from: number, to: number) {
  const items = slots.slice(from, to).filter((s): s is NonNullable<Slot> => s !== null);
  items.sort((a, b) => itemLabel(a.item).localeCompare(itemLabel(b.item)));
  for (let i = from; i < to; i++) {
    slots[i] = items[i - from] ?? null;
  }
}

function stackRange(slots: Slot[], from: number, to: number) {
  const totals = new Map<ItemId, number>();
  for (let i = from; i < to; i++) {
    const s = slots[i];
    if (s) totals.set(s.item, (totals.get(s.item) ?? 0) + s.qty);
  }
  for (let i = from; i < to; i++) slots[i] = null;
  let cursor = from;
  for (const [item, total] of totals) {
    let remaining = total;
    while (remaining > 0 && cursor < to) {
      const take = Math.min(MAX_STACK, remaining);
      slots[cursor] = { item, qty: take };
      remaining -= take;
      cursor++;
    }
  }
}

/** Moves stacks of any item type already present in `target` from `source` into `target`. */
function depositTake(source: Slot[], sourceRange: [number, number], target: Slot[]) {
  const targetItemTypes = new Set(target.filter((s): s is NonNullable<Slot> => s !== null).map((s) => s.item));
  const [from, to] = sourceRange;
  for (let i = from; i < to; i++) {
    const s = source[i];
    if (s && targetItemTypes.has(s.item)) {
      const leftover = addItem(target, s.item, s.qty, [0, target.length]);
      const moved = s.qty - leftover;
      if (moved > 0) {
        s.qty -= moved;
        if (s.qty === 0) source[i] = null;
      }
    }
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_SMART_SELECT":
      return { ...state, smartSelect: !state.smartSelect, selected: [], status: state.smartSelect ? "Smart Select off." : "Smart Select on — pick stacks to move together." };

    case "SELECT_SLOT": {
      if (!state.smartSelect) return state;
      if (!state.inventory[action.index]) return state;
      const already = state.selected.includes(action.index);
      const selected = already ? state.selected.filter((i) => i !== action.index) : [...state.selected, action.index];
      return { ...state, selected, status: `${selected.length} stack${selected.length === 1 ? "" : "s"} selected.` };
    }

    case "CANCEL_SELECTION":
      return { ...state, selected: [], status: "Selection cleared." };

    case "MOVE_SELECTION": {
      const inventory = cloneSlots(state.inventory);
      const storage = cloneSlots(state.storage);
      let movedAny = false;
      for (const index of state.selected) {
        const s = inventory[index];
        if (!s) continue;
        const leftover = addItem(storage, s.item, s.qty, [0, storage.length]);
        const moved = s.qty - leftover;
        if (moved > 0) {
          movedAny = true;
          inventory[index] = leftover > 0 ? { item: s.item, qty: leftover } : null;
        }
      }
      return {
        ...state,
        inventory,
        storage,
        selected: [],
        status: movedAny ? "Selection moved to storage." : "Storage is full — nothing moved.",
      };
    }

    case "DROP_SELECTION": {
      const inventory = cloneSlots(state.inventory);
      for (const index of state.selected) inventory[index] = null;
      return { ...state, inventory, selected: [], status: "Selected stacks dropped." };
    }

    case "SORT": {
      const inventory = cloneSlots(state.inventory);
      if (state.hotbarProtected) {
        sortRange(inventory, HOTBAR_SIZE, inventory.length);
      } else {
        sortRange(inventory, 0, inventory.length);
      }
      return { ...state, inventory, status: "Inventory sorted." };
    }

    case "STACK": {
      const inventory = cloneSlots(state.inventory);
      if (state.hotbarProtected) {
        stackRange(inventory, HOTBAR_SIZE, inventory.length);
      } else {
        stackRange(inventory, 0, inventory.length);
      }
      return { ...state, inventory, status: "Partial stacks consolidated." };
    }

    case "DEPOSIT_MATCHING": {
      const inventory = cloneSlots(state.inventory);
      const storage = cloneSlots(state.storage);
      depositTake(inventory, [state.hotbarProtected ? HOTBAR_SIZE : 0, inventory.length], storage);
      return { ...state, inventory, storage, status: "Matching items deposited into storage." };
    }

    case "TAKE_MATCHING": {
      const inventory = cloneSlots(state.inventory);
      const storage = cloneSlots(state.storage);
      const invItemTypes = new Set(inventory.filter((s): s is NonNullable<Slot> => s !== null).map((s) => s.item));
      for (let i = 0; i < storage.length; i++) {
        const s = storage[i];
        if (s && invItemTypes.has(s.item)) {
          const range: [number, number] = [state.hotbarProtected ? HOTBAR_SIZE : 0, inventory.length];
          const leftover = addItem(inventory, s.item, s.qty, range);
          const moved = s.qty - leftover;
          if (moved > 0) {
            s.qty -= moved;
            if (s.qty === 0) storage[i] = null;
          }
        }
      }
      return { ...state, inventory, storage, status: "Matching items taken from storage." };
    }

    case "TOGGLE_HOTBAR_PROTECTION":
      return { ...state, hotbarProtected: !state.hotbarProtected, status: state.hotbarProtected ? "Hotbar protection off." : "Hotbar protection on." };

    case "SET_RECIPE": {
      const recipe = RECIPES.find((r) => r.id === action.id);
      if (!recipe) return state;
      const maxCraftable = Math.max(
        1,
        Math.min(...recipe.ingredients.map((ing) => Math.floor(countItem(state.inventory, ing.item) / ing.qty) || 0), 10)
      );
      return { ...state, recipeId: action.id, quantity: Math.min(state.quantity, Math.max(maxCraftable, 1)) };
    }

    case "SET_QUANTITY":
      return { ...state, quantity: Math.max(1, Math.min(10, action.qty)) };

    case "CRAFT": {
      const recipe = RECIPES.find((r) => r.id === state.recipeId);
      if (!recipe) return state;
      const canCraft = recipe.ingredients.every((ing) => countItem(state.inventory, ing.item) >= ing.qty * state.quantity);
      if (!canCraft) return { ...state, status: "Missing ingredients — can't craft yet." };
      const inventory = cloneSlots(state.inventory);
      for (const ing of recipe.ingredients) removeItem(inventory, ing.item, ing.qty * state.quantity);
      const range: [number, number] = state.hotbarProtected ? [HOTBAR_SIZE, inventory.length] : [0, inventory.length];
      addItem(inventory, recipe.output.item, recipe.output.qty * state.quantity, range);
      return { ...state, inventory, status: `Crafted ${state.quantity * recipe.output.qty} ${itemLabel(recipe.output.item)}.` };
    }

    case "RESET":
      return initialState();

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Main component — presentational pieces (slots, panel, buttons) now live in
// ./MinecraftUI as a shared internal visual system, not duplicated here.
// ---------------------------------------------------------------------------

type Mode = "chest" | "personal";

export function InventoryFlowPrototype() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [mode, setMode] = useState<Mode>("chest");

  const recipe = useMemo(() => RECIPES.find((r) => r.id === state.recipeId)!, [state.recipeId]);
  const ingredientStatus = recipe.ingredients.map((ing) => ({
    ...ing,
    owned: countItem(state.inventory, ing.item),
    needed: ing.qty * state.quantity,
  }));
  const canCraft = ingredientStatus.every((i) => i.owned >= i.needed);
  const selectedQty = state.selected.reduce((sum, i) => sum + (state.inventory[i]?.qty ?? 0), 0);

  return (
    <div className="flex flex-col gap-4">
      {/* Portfolio-level demo switcher — intentionally outside the simulated
          game panel below, styled like the rest of the site, not Minecraft. */}
      <div role="tablist" aria-label="Prototype context" className="inline-flex w-fit gap-1 rounded-full border border-line-strong bg-surface p-1">
        {(["chest", "personal"] as Mode[]).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={clsx(
              "rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-150",
              mode === m ? "bg-ink text-accent-cream" : "text-ink-secondary hover:text-ink"
            )}
          >
            {m === "chest" ? "Chest" : "Personal Inventory"}
          </button>
        ))}
      </div>

      {/* Simulated Minecraft panel — dark backdrop + stone-gray chrome. */}
      <MinecraftPanel>
        <div aria-live="polite" className="sr-only">
          {state.status}
        </div>

        <div className="mx-auto flex max-w-[720px] flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className="text-[13px] font-bold tracking-[0.02em] text-[#dcdcd4]"
              style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.6)" }}
            >
              {mode === "chest" ? "Large Chest" : "Inventory & Crafting"}
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {mode === "chest" && (
                <MinecraftButton icon={ArrowRightLeft} label="Smart Select" active={state.smartSelect} onClick={() => dispatch({ type: "TOGGLE_SMART_SELECT" })} />
              )}
              <MinecraftButton
                icon={state.hotbarProtected ? Lock : Unlock}
                label={state.hotbarProtected ? "Hotbar Locked" : "Hotbar Unlocked"}
                active={state.hotbarProtected}
                onClick={() => dispatch({ type: "TOGGLE_HOTBAR_PROTECTION" })}
              />
              <button
                type="button"
                onClick={() => dispatch({ type: "RESET" })}
                className="inline-flex h-8 items-center gap-1.5 px-2 text-[11.5px] font-medium text-[#b9b9b0] hover:text-white"
              >
                <RotateCcw size={12} strokeWidth={2.25} />
                Reset
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <MinecraftButton icon={ArrowRightLeft} label="Sort" onClick={() => dispatch({ type: "SORT" })} />
            <MinecraftButton icon={Layers} label="Stack" onClick={() => dispatch({ type: "STACK" })} />
            {mode === "chest" && (
              <>
                <MinecraftButton icon={ArrowDownToLine} label="Deposit Matching" onClick={() => dispatch({ type: "DEPOSIT_MATCHING" })} />
                <MinecraftButton icon={ArrowUpFromLine} label="Take Matching" onClick={() => dispatch({ type: "TAKE_MATCHING" })} />
              </>
            )}
          </div>

          {mode === "chest" && state.smartSelect && (
            <div className="flex flex-wrap items-center justify-between gap-3 border border-[#fbd35c]/50 bg-black/25 px-3 py-2 text-[12.5px] text-[#e8e6df]">
              <span>
                {state.selected.length === 0
                  ? "Select stacks below to move them together."
                  : `${state.selected.length} stack${state.selected.length === 1 ? "" : "s"} selected · ${selectedQty} items total`}
              </span>
              <div className="flex items-center gap-1.5">
                <MinecraftButton icon={ArrowDownToLine} label="Move" onClick={() => dispatch({ type: "MOVE_SELECTION" })} disabled={state.selected.length === 0} />
                <MinecraftButton icon={X} label="Drop" onClick={() => dispatch({ type: "DROP_SELECTION" })} disabled={state.selected.length === 0} />
                <MinecraftButton icon={X} label="Cancel" onClick={() => dispatch({ type: "CANCEL_SELECTION" })} disabled={state.selected.length === 0} />
              </div>
            </div>
          )}

          {mode === "chest" ? (
            <>
              <div className="flex flex-col gap-1">
                <MinecraftLabel>STORAGE CHEST</MinecraftLabel>
                <MinecraftSlotGrid slots={state.storage} selectable={false} selected={[]} />
              </div>
              <div className="flex flex-col gap-1">
                <MinecraftLabel>
                  YOUR INVENTORY {state.hotbarProtected && <Lock size={9} className="ml-1 inline -translate-y-px" />}
                </MinecraftLabel>
                <MinecraftSlotGrid
                  slots={state.inventory.slice(HOTBAR_SIZE)}
                  selectable={state.smartSelect}
                  selected={state.selected.filter((i) => i >= HOTBAR_SIZE)}
                  onSelect={(i) => dispatch({ type: "SELECT_SLOT", index: i + HOTBAR_SIZE })}
                />
              </div>
              <MinecraftSlotGrid
                slots={state.inventory.slice(0, HOTBAR_SIZE)}
                selectable={state.smartSelect}
                selected={state.selected.filter((i) => i < HOTBAR_SIZE)}
                onSelect={(i) => dispatch({ type: "SELECT_SLOT", index: i })}
                statusFor={() => (state.hotbarProtected ? "Protected" : undefined)}
              />
            </>
          ) : (
            <div className="grid grid-cols-1 gap-4 desk:grid-cols-[minmax(0,220px)_1fr]">
              {/* Crafting Clarity panel */}
              <MinecraftInset className="flex flex-col gap-3">
                <MinecraftLabel>CRAFTING CLARITY</MinecraftLabel>
                <div className="flex flex-col gap-1" role="listbox" aria-label="Recipes">
                  {RECIPES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      role="option"
                      aria-selected={state.recipeId === r.id}
                      onClick={() => dispatch({ type: "SET_RECIPE", id: r.id })}
                      className={clsx(
                        "flex items-center gap-2 px-2 py-1.5 text-left text-[12.5px] font-medium transition-colors duration-150",
                        state.recipeId === r.id ? "bg-[#fbd35c] text-[#3a2f10]" : "bg-[#4d4d49] text-[#dcdcd4] hover:bg-[#5a5a55]"
                      )}
                    >
                      <ItemGlyph id={r.output.item} size={16} />
                      {r.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-center py-1">
                  <div className="grid grid-cols-2 grid-rows-2 gap-[3px] bg-[#545450] p-[6px]" style={{ boxShadow: "inset -1px -1px 0 rgba(255,255,255,0.08), inset 1px 1px 0 rgba(0,0,0,0.4)" }}>
                    {[0, 1, 2, 3].map((cell) => {
                      const col = cell % 2;
                      const row = Math.floor(cell / 2);
                      const ingredientIndex = recipe.gridPositions.findIndex(([c, r]) => c === col && r === row);
                      const ing = ingredientIndex >= 0 ? recipe.ingredients[ingredientIndex] : null;
                      return (
                        <div key={cell} className="flex h-10 w-10 items-center justify-center bg-[#8b8b8b]" style={slotBevel}>
                          {ing && <ItemGlyph id={ing.item} size={22} />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  {ingredientStatus.map((ing) => {
                    const ready = ing.owned >= ing.needed;
                    return (
                      <div
                        key={ing.item}
                        className={clsx(
                          "flex items-center justify-between gap-3 px-2 py-1 text-[12px] font-semibold",
                          ready ? "bg-[#3f5a26] text-[#c9e8a8]" : "bg-[#5a2a26] text-[#f0b6ac]"
                        )}
                      >
                        <span className="flex items-center gap-1.5">
                          <ItemGlyph id={ing.item} size={13} />
                          {itemLabel(ing.item)}
                        </span>
                        <span className="tabular-nums">
                          {ing.owned} / {ing.needed}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#a8a89f]">Qty</span>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "SET_QUANTITY", qty: state.quantity - 1 })}
                    aria-label="Decrease quantity"
                    className="flex h-6 w-6 items-center justify-center bg-[#4d4d49] text-[#dcdcd4] hover:bg-[#5a5a55]"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-[12.5px] font-bold tabular-nums text-white">{state.quantity}</span>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "SET_QUANTITY", qty: state.quantity + 1 })}
                    aria-label="Increase quantity"
                    className="flex h-6 w-6 items-center justify-center bg-[#4d4d49] text-[#dcdcd4] hover:bg-[#5a5a55]"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => dispatch({ type: "CRAFT" })}
                  disabled={!canCraft}
                  className={clsx(
                    "flex h-9 items-center justify-center text-[12.5px] font-bold tracking-[0.01em] transition-colors duration-150",
                    canCraft ? "bg-[#5b7a33] text-white hover:bg-[#6a8c3c]" : "cursor-not-allowed bg-[#4d4d49] text-[#8a8a82]"
                  )}
                >
                  Craft {recipe.output.qty * state.quantity} {itemLabel(recipe.output.item)}
                </button>
              </MinecraftInset>

              <div className="flex flex-col gap-3">
                <MinecraftPlayerFrame armor={[null, null, null, null]} offhand={null} />
                <div className="flex flex-col gap-1">
                  <MinecraftLabel>
                    BACKPACK {state.hotbarProtected && <Lock size={9} className="ml-1 inline -translate-y-px" />}
                  </MinecraftLabel>
                  <MinecraftSlotGrid slots={state.inventory.slice(HOTBAR_SIZE)} selectable={false} selected={[]} />
                </div>
                <MinecraftSlotGrid
                  slots={state.inventory.slice(0, HOTBAR_SIZE)}
                  selectable={false}
                  selected={[]}
                  statusFor={() => (state.hotbarProtected ? "Protected" : undefined)}
                />
              </div>
            </div>
          )}
        </div>
      </MinecraftPanel>

      <p className="text-[12.5px] leading-[1.6] text-ink-faint">{state.status}</p>
    </div>
  );
}
