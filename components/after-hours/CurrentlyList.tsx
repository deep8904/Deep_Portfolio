import { CURRENTLY } from "@/lib/after-hours-data";

export function CurrentlyList() {
  if (CURRENTLY.length === 0) return null;

  return (
    <div className="mb-16 flex flex-col gap-3">
      <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num">CURRENTLY</span>
      <div className="grid grid-cols-2 gap-3 tab:grid-cols-4">
        {CURRENTLY.map((item) => (
          <div key={item.label} className="flex flex-col gap-1 rounded-lg border border-line-strong bg-surface px-4 py-3">
            <span className="text-[11px] font-medium tracking-[0.05em] text-ink-faint">{item.label}</span>
            <span className="text-[13.5px] font-medium text-ink">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
