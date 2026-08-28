const COLORS = [
  { name: "Cream", hex: "#F5EFE6", swatch: "#F5EFE6" },
  { name: "Sand", hex: "#EBE1D3", swatch: "#EBE1D3" },
  { name: "Near-black", hex: "#171411", swatch: "#171411" },
  { name: "Body text (warm brown)", hex: "#5C3822", swatch: "#5C3822" },
];

export function CareVisualFoundation() {
  return (
    <div className="flex flex-col gap-9">
      <div className="grid grid-cols-2 gap-3.5 tab:grid-cols-4">
        {COLORS.map((c) => (
          <div key={c.name} className="overflow-hidden rounded-xl border border-line-soft">
            <div className="h-[64px] w-full border-b border-line-soft" style={{ backgroundColor: c.swatch }} />
            <div className="flex flex-col gap-0.5 px-3.5 py-3">
              <span className="text-[13.5px] font-medium tracking-[-0.01em]">{c.name}</span>
              <span className="text-[12px] font-mono text-ink-faint">{c.hex}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 tab:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-xl border border-line-soft px-5 py-5">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">TYPE</span>
          <span className="text-[40px] font-medium leading-[1.05] tracking-[-0.02em]">Aa</span>
          <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">
            Inter throughout, at a medium 520 weight for headlines rather than a heavier display cut — the same
            typeface for body and headings keeps the site feeling calm rather than “brochure.”
          </p>
        </div>
        <div className="flex flex-col gap-3 rounded-xl border border-line-soft px-5 py-5">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">CONTROLS</span>
          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex h-[38px] items-center rounded-full bg-[#171411] px-5 text-[13.5px] font-medium text-[#F5EFE6]">
              Donate
            </span>
            <span className="inline-flex h-[38px] items-center rounded-full border border-[#171411] px-5 text-[13.5px] font-medium">
              Learn more
            </span>
          </div>
          <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">
            Fully pill-shaped buttons (999px radius), a filled near-black primary and an outlined secondary — the
            same two-button pattern repeats on every page rather than introducing new button styles per section.
          </p>
        </div>
      </div>

      <p className="m-0 text-[13px] leading-[1.6] text-ink-faint text-pretty">
        Colors and type values above were read directly from the running redesign’s computed styles, not estimated
        from screenshots.
      </p>
    </div>
  );
}
