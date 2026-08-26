import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mx-auto mt-[90px] w-full max-w-[1240px] px-5 pb-6 tab:mt-[130px] tab:max-w-[1260px] tab:px-[30px] tab:pb-[26px] desk:max-w-[1268px] desk:px-[34px]">
      <div className="flex flex-col gap-2.5 pb-[22px] tab:flex-row tab:items-center tab:justify-between tab:gap-4 tab:pb-[26px]">
        <a
          href={`mailto:${SITE.email}`}
          className="-my-1.5 inline-flex w-fit items-center py-1.5 text-[13.5px] text-ink-secondary transition-colors duration-200 hover:text-ink"
        >
          {SITE.email}
        </a>
        <a
          href={`tel:${SITE.phone}`}
          className="-my-1.5 inline-flex w-fit items-center py-1.5 text-[13.5px] text-ink-secondary transition-colors duration-200 hover:text-ink"
        >
          {SITE.phoneDisplay}
        </a>
        <span className="inline-flex items-center text-[13.5px] text-ink-secondary">
          {SITE.location}
        </span>
        <a
          href={`mailto:${SITE.email}`}
          className="-my-1.5 inline-flex items-center py-1.5 text-[13.5px] text-ink-secondary transition-colors duration-200 hover:text-ink"
        >
          Have a question
        </a>
      </div>

      <a
        href={`mailto:${SITE.email}`}
        aria-label="Email Deep Chadamiya"
        className="group relative flex items-center justify-center overflow-hidden rounded-2xl bg-surface px-4 py-[34px] transition-colors duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:bg-connect tab:px-6 tab:py-[46px]"
      >
        <h2 className="m-0 whitespace-nowrap text-[37px] font-medium leading-[1.02] tracking-[-0.045em] text-ink tab:text-[69px] desk:text-[110px]">
          Let’s Connect
        </h2>
        <span className="absolute right-4 top-3.5 text-base text-ink-num transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1 tab:right-6 tab:top-5 tab:text-xl">
          <ArrowUpRight size="1em" strokeWidth={2} />
        </span>
      </a>

      <div className="flex flex-wrap items-center justify-between gap-3.5 pt-[18px]">
        <span className="text-[12.5px] text-ink-faint">© 2026 Deep Chadamiya</span>
        <Link
          href="/after-hours"
          className="group -my-1.5 inline-flex items-center py-1.5 text-[12.5px] text-ink-faint transition-colors duration-200 hover:text-ink-secondary"
          aria-label="Built by Deep — open After Hours, an optional personal corner of this site"
        >
          Built by Deep
          <span className="footer-built-hint" aria-hidden="true">
            {" "}
            · After Hours
          </span>
        </Link>
      </div>
    </footer>
  );
}
