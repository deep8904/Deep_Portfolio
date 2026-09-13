import { ArrowDown } from "lucide-react";

const SCATTERED = ["Sponsorship emails", "A spreadsheet", "Random docs", "Group chats", "Whatever app was closest"];

export function FragmentationDiagram() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap justify-center gap-2.5">
        {SCATTERED.map((s) => (
          <span
            key={s}
            className="inline-flex h-9 items-center rounded-full border border-dashed border-line-strong px-3.5 text-[13px] font-medium text-ink-faint"
          >
            {s}
          </span>
        ))}
      </div>
      <ArrowDown size={16} strokeWidth={2} className="text-ink-faint" />
      <span className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-accent-cream">
        CreatorFlow
      </span>
    </div>
  );
}
