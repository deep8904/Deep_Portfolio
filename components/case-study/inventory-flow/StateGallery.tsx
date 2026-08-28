import { Lock, Info, Check } from "lucide-react";
import { ItemGlyph } from "./ItemGlyph";

const slotBevel = { boxShadow: "inset -2px -2px 0 rgba(0,0,0,0.35), inset 2px 2px 0 rgba(255,255,255,0.18)" };

type StateSample = { label: string; render: () => React.ReactNode; note: string };

const STATES: StateSample[] = [
  {
    label: "Default",
    render: () => (
      <div className="flex h-11 w-11 items-center justify-center bg-[#8b8b8b]" style={slotBevel}>
        <ItemGlyph id="oak-planks" size={26} />
      </div>
    ),
    note: "An occupied slot at rest.",
  },
  {
    label: "Hover / focus",
    render: () => (
      <div className="flex h-11 w-11 items-center justify-center bg-[#a3a39c] brightness-110" style={slotBevel}>
        <ItemGlyph id="oak-planks" size={26} />
      </div>
    ),
    note: "Same treatment for mouse hover and keyboard focus.",
  },
  {
    label: "Selected",
    render: () => (
      <div className="relative flex h-11 w-11 items-center justify-center bg-[#8b8b8b] ring-2 ring-inset ring-[#fbd35c]">
        <ItemGlyph id="oak-planks" size={26} />
        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#fbd35c] text-[#3a2f10]">
          <Check size={10} strokeWidth={3} />
        </span>
      </div>
    ),
    note: "A filled badge plus a gold ring — not color alone.",
  },
  {
    label: "Hotbar locked",
    render: () => (
      <div className="relative flex h-11 w-11 items-center justify-center bg-[#8b8b8b]" style={slotBevel}>
        <ItemGlyph id="torch" size={26} />
        <Lock size={10} className="absolute -right-1 -top-1 rounded-full bg-ink p-[3px] text-accent-cream" />
      </div>
    ),
    note: "Quick actions skip this slot while locked.",
  },
  {
    label: "Missing ingredient",
    render: () => (
      <div className="flex items-center gap-2 bg-[#5a2a26] px-2.5 py-1.5 text-[12px] font-bold text-[#f0b6ac]">1 / 4</div>
    ),
    note: "Owned-vs-required stated as a number, not just a color.",
  },
  {
    label: "Ready to craft",
    render: () => (
      <div className="flex items-center gap-2 bg-[#3f5a26] px-2.5 py-1.5 text-[12px] font-bold text-[#c9e8a8]">4 / 4</div>
    ),
    note: "Same layout as missing — only tone and number change.",
  },
  {
    label: "Disabled",
    render: () => (
      <div className="flex h-11 w-11 items-center justify-center bg-[#8b8b8b] opacity-45" style={slotBevel}>
        <ItemGlyph id="oak-planks" size={26} />
      </div>
    ),
    note: "Not selectable in the current mode.",
  },
  {
    label: "Hotkey / tooltip",
    render: () => (
      <div className="flex items-center gap-2 bg-[#1c2b1c] px-2.5 py-1.5 text-[11.5px] text-[#e8e6df]">
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
        <div key={s.label} className="flex flex-col items-start gap-2.5 border border-black/40 bg-gradient-to-b from-[#0f1a12] to-[#1c2b1c] p-4">
          <div className="flex h-11 items-center">{s.render()}</div>
          <span className="text-[12.5px] font-medium tracking-[-0.01em] text-white">{s.label}</span>
          <p className="m-0 text-[12px] leading-[1.5] text-[#a8a89f] text-pretty">{s.note}</p>
        </div>
      ))}
    </div>
  );
}
