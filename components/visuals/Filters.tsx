"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

export function Filters({
  active,
  categories,
  onChange,
}: {
  active: string;
  categories: string[];
  onChange: (category: string) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const CATEGORIES = ["All", ...categories];

  useEffect(() => {
    const active_ = rowRef.current?.querySelector<HTMLElement>('[aria-pressed="true"]');
    active_?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [active]);

  return (
    <div className="relative">
      <div
        ref={rowRef}
        className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-0.5 [mask-image:linear-gradient(to_right,transparent_0,black_12px,black_calc(100%-24px),transparent_100%)] tab:[mask-image:none]"
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onChange(cat)}
              aria-pressed={isActive}
              className={clsx(
                "flex h-11 flex-none items-center whitespace-nowrap rounded-full px-4 text-[12.5px] font-medium transition-colors duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]",
                isActive
                  ? "border border-accent bg-accent text-accent-cream"
                  : "border border-line-strong bg-transparent text-ink-muted hover:text-ink"
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
