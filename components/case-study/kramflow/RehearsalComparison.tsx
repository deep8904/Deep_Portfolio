const COLUMNS = [
  {
    heading: "Production",
    items: [
      "Writes to the real live_state row",
      "Opens a Realtime channel every display subscribes to",
      "Reaches AV, Green Room, General, Presenter, and any open share link",
      "State: shared, persisted, multi-operator",
    ],
  },
  {
    heading: "Rehearsal",
    items: [
      "Never calls the live API — no write path to live_state exists on this page",
      "Opens no Realtime channel other pages could subscribe to",
      "Reaches nothing outside the tab it's running in",
      "State: local to one browser tab, disposable on refresh",
    ],
  },
];

export function RehearsalComparison() {
  return (
    <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-2">
      {COLUMNS.map((col) => (
        <div key={col.heading} className="flex flex-col gap-4 rounded-xl border border-line-soft px-5 py-5">
          <span className="text-[13.5px] font-medium tracking-[-0.01em]">{col.heading}</span>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {col.items.map((item) => (
              <li key={item} className="text-[14.5px] leading-[1.55] text-ink-faint text-pretty">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
