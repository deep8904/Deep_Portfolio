const TIERS = [
  {
    tier: "Dominant",
    size: "text-[22px] tab:text-[26px]",
    items: [
      { label: "Time remaining", note: "The single number a performer or AV tech needs from across a room." },
      { label: "Current item", note: "What's live right now — the other half of the two questions this exists to answer." },
    ],
  },
  {
    tier: "Secondary",
    size: "text-[16px]",
    items: [
      { label: "Standby / live status", note: "A short state word, not a paragraph — glanceable, not read." },
      { label: "Live timeline (AV only)", note: "Detail for the crew that needs it; other displays don't carry this weight." },
    ],
  },
  {
    tier: "Operator-only — never on a public display",
    size: "text-[16px]",
    items: [
      { label: "Control ownership", note: "Only the person with the lock needs to know who has it." },
      { label: "Hold status control", note: "A toggle, not a readout — the public displays show the effect (a Hold screen), not the control." },
    ],
  },
];

export function ReadHierarchy() {
  return (
    <div className="flex flex-col gap-5">
      {TIERS.map((t) => (
        <div key={t.tier} className="flex flex-col gap-3 rounded-xl border border-line-soft px-5 py-5">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">{t.tier.toUpperCase()}</span>
          <div className="flex flex-col gap-3">
            {t.items.map((item) => (
              <div key={item.label} className="flex flex-col gap-1 border-t border-line-soft pt-3 first:border-t-0 first:pt-0">
                <span className={`font-medium tracking-[-0.01em] ${t.size}`}>{item.label}</span>
                <span className="text-[14px] leading-[1.55] text-ink-faint text-pretty">{item.note}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
