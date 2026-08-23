import clsx from "clsx";
import { PHOTO_CATEGORIES } from "@/lib/data";

const CATEGORIES = ["All", ...PHOTO_CATEGORIES] as const;

export function Filters({
  active,
  onChange,
}: {
  active: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-0.5">
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            aria-pressed={isActive}
            className={clsx(
              "h-[34px] flex-none whitespace-nowrap rounded-full px-4 text-[12.5px] font-medium transition-colors duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]",
              isActive ? "border border-accent bg-accent text-accent-cream" : "border border-line-strong bg-transparent text-ink-muted hover:text-ink"
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
