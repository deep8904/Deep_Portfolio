import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AfterHoursHero() {
  return (
    <div className="flex flex-col items-start gap-[18px]">
      <Link
        data-ah-intro
        href="/"
        className="group inline-flex items-center gap-2 text-[13px] font-medium text-ink-secondary transition-colors duration-200 hover:text-ink"
      >
        <ArrowLeft
          size={14}
          strokeWidth={2}
          className="transition-transform duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-translate-x-0.5"
        />
        Back to portfolio
      </Link>

      <span
        data-ah-intro
        className="inline-flex h-7 items-center rounded-lg bg-surface px-[13px] text-[12.5px] font-medium tracking-[0.08em] text-ink-secondary"
      >
        AFTER HOURS
      </span>

      <h1
        data-ah-intro
        className="m-0 text-[32px] font-medium leading-[1.15] tracking-[-0.03em] text-balance tab:text-[42px] desk:text-[48px]"
      >
        Things I make when
        <br className="hidden tab:block" />
        {" "}nobody asked me to.
      </h1>

      <p data-ah-intro className="m-0 max-w-[520px] text-[15px] leading-[1.7] text-ink-muted text-pretty">
        A small corner for cameras, games, signals, experiments, and whatever I’m curious about next.
      </p>
    </div>
  );
}
