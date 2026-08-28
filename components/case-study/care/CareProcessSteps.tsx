const STEPS = [
  { n: "01", label: "Existing Website Review", body: "Went through every major page of the live site as a first-time visitor would." },
  { n: "02", label: "Heuristic Evaluation", body: "Assessed the current site against Nielsen's usability heuristics." },
  { n: "03", label: "Survey", body: "39 responses on how visitors currently experience the site and what they wish it did." },
  { n: "04", label: "Accessibility Audit", body: "Evaluated ~9 pages against the four POUR principles." },
  { n: "05", label: "Research Synthesis", body: "Grouped findings into the priorities that shaped the redesign." },
  { n: "06", label: "Information Architecture", body: "Reworked navigation and page structure around what research surfaced." },
  { n: "07", label: "Wireframes", body: "Low-fidelity layouts for the pages research flagged as highest priority." },
  { n: "08", label: "Visual Design & Prototype", body: "A working, high-fidelity redesign built from the wireframes." },
];

export function CareProcessSteps() {
  return (
    <div className="grid grid-cols-2 gap-3.5 tab:grid-cols-4">
      {STEPS.map((s) => (
        <div key={s.n} className="flex flex-col gap-2 rounded-xl border border-line-soft px-4 py-4">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">{s.n}</span>
          <span className="text-[14px] font-medium tracking-[-0.01em]">{s.label}</span>
          <p className="m-0 text-[13.5px] leading-[1.55] text-ink-faint text-pretty">{s.body}</p>
        </div>
      ))}
    </div>
  );
}
