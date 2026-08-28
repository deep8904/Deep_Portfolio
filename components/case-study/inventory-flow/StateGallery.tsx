import { Lock, Info, Check } from "lucide-react";
import { ItemGlyph } from "./ItemGlyph";

const slotShadow = { boxShadow: "inset 0 1px 2px rgba(0,0,0,0.25)" };

type StateSample = { label: string; render: () => React.ReactNode; note: string };

const STATES: StateSample[] = [
  {
    label: "Default",
    render: () => (
      <div className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-[#9a9a9a]" style={slotShadow}>
        <ItemGlyph id="oak-planks" size={26} />
      </div>
    ),
    note: "An occupied slot at rest.",
  },
  {
    label: "Hover / focus",
    render: () => (
      <div className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-[#a8a8a8] brightness-105" style={slotShadow}>
        <ItemGlyph id="oak-planks" size={26} />
      </div>
    ),
    note: "Same treatment for mouse hover and keyboard focus.",
  },
  {
    label: "Selected",
    render: () => (
      <div className="relative flex h-11 w-11 items-center justify-center rounded-[6px] bg-[#9a9a9a] ring-2 ring-inset ring-[#f5b83d]">
        <ItemGlyph id="oak-planks" size={26} />
        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#f5b83d] text-[#4a3410]">
          <Check size={10} strokeWidth={3} />
        </span>
      </div>
    ),
    note: "A filled badge plus a gold ring — not color alone.",
  },
  {
    label: "Hotbar locked",
    render: () => (
      <div className="relative flex h-11 w-11 items-center justify-center rounded-[6px] bg-[#9a9a9a]" style={slotShadow}>
        <ItemGlyph id="torch" size={26} />
        <Lock size={10} className="absolute -right-1 -top-1 rounded-full bg-[#3a3a3a] p-[3px] text-white" />
      </div>
    ),
    note: "Quick actions skip this slot while locked.",
  },
  {
    label: "Missing ingredient",
    render: () => (
      <div className="flex items-center gap-2 rounded-md bg-[#f5d6d0] px-2.5 py-1.5 text-[12px] font-bold text-[#7a2a20]">1 / 4</div>
    ),
    note: "Owned-vs-required stated as a number, not just a color.",
  },
  {
    label: "Ready to craft",
    render: () => (
      <div className="flex items-center gap-2 rounded-md bg-[#dbedc9] px-2.5 py-1.5 text-[12px] font-bold text-[#3f5a26]">4 / 4</div>
    ),
    note: "Same layout as missing — only tone and number change.",
  },
  {
    label: "Disabled",
    render: () => (
      <div className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-[#9a9a9a] opacity-45" style={slotShadow}>
        <ItemGlyph id="oak-planks" size={26} />
      </div>
    ),
    note: "Not selectable in the current mode.",
  },
  {
    label: "Hotkey / tooltip",
    render: () => (
      <div className="flex items-center gap-2 rounded-md bg-[#2a2a2a] px-2.5 py-1.5 text-[11.5px] text-white">
        <Info size={11} strokeWidth={2} />
        Shift+click still works
      </div>
    ),
    note: "Every new action is additive to existing shortcuts.",
  },
];

export function StateGallery() {
  return (
    <div className="grid grid-cols-2 gap-3 tab:grid-cols-4">
      {STATES.map((s) => (
        <div key={s.label} className="flex flex-col items-start gap-2.5 rounded-xl border border-[#d4d4d4] bg-[#e6e6e6] p-4">
          <div className="flex h-11 items-center">{s.render()}</div>
          <span className="text-[12.5px] font-medium tracking-[-0.01em] text-[#2a2a2a]">{s.label}</span>
          <p className="m-0 text-[12px] leading-[1.5] text-[#6b6b6b] text-pretty">{s.note}</p>
        </div>
      ))}
    </div>
  );
}
