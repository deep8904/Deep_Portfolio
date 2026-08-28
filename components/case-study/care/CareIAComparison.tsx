const CURRENT = ["Home", "About", "Mission", "Meet Our Horses ▾", "Events", "Updates", "Giving", "Contact"];
const PROPOSED = ["Home", "Our Horses", "Get Involved", "Stories & Events", "Donate", "About", "Contact"];

export function CareIAComparison() {
  return (
    <div className="grid grid-cols-1 gap-6 tab:grid-cols-2">
      <div className="flex flex-col gap-3 rounded-xl border border-line-soft px-5 py-5">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">CURRENT — 8 ITEMS</span>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {CURRENT.map((item) => (
            <li key={item} className="text-[14.5px] leading-[1.5] text-ink-faint">{item}</li>
          ))}
        </ul>
        <p className="m-0 mt-1 text-[13px] leading-[1.6] text-ink-faint text-pretty">
          Events and Updates are split into separate, thin pages. Mission duplicates part of About. Giving covers
          both donating and volunteering without distinguishing them.
        </p>
      </div>
      <div className="flex flex-col gap-3 rounded-xl border border-line-strong px-5 py-5">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">PROPOSED — 7 ITEMS</span>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {PROPOSED.map((item) => (
            <li key={item} className="text-[14.5px] leading-[1.5] text-ink">{item}</li>
          ))}
        </ul>
        <p className="m-0 mt-1 text-[13px] leading-[1.6] text-ink-faint text-pretty">
          Events and Updates merge into one Stories & Events destination with real tabs. Mission folds into About.
          Our Horses becomes a real, browsable page instead of a nav dropdown. Get Involved separates volunteering,
          visiting, and adoption from Donate.
        </p>
      </div>
    </div>
  );
}
