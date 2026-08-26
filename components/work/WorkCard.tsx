import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { WorkCover } from "@/components/work/WorkCover";
import { WORK_STUBS, type WorkProject } from "@/lib/data";

const COVER_RATIO: Record<WorkProject["layout"], string> = {
  landscape: "aspect-[4/3] desk:aspect-[16/9]",
  split: "aspect-[4/3] desk:aspect-[4/5]",
  wide: "aspect-[4/3] desk:aspect-[21/7]",
};

const titleClass =
  "m-0 text-[23px] font-medium tracking-[-0.02em] transition-transform duration-[320ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-translate-y-0.5 tab:text-[26px] desk:text-[30px]";
const categoryClass = "text-[12px] font-medium tracking-[0.07em] text-ink-faint";
const yearClass = "whitespace-nowrap text-[13px] text-ink-faint";

/**
 * Mobile always renders one consistent hierarchy — number, title + year,
 * discipline/status, description, CTA — regardless of desktop variant.
 * Tablet/desktop keep each project's approved bespoke arrangement.
 */
function TitleBlock({ project }: { project: WorkProject }) {
  const title = <h2 data-title className={titleClass}>{project.title}</h2>;
  const category = <span className={categoryClass}>{project.category}</span>;
  const year = <span className={yearClass}>{project.year}</span>;

  const mobile = (
    <div className="flex flex-col gap-3 tab:hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        {title}
        {year}
      </div>
      {category}
    </div>
  );

  let desktop: ReactNode;
  switch (project.titleBlock) {
    case "title-year_category":
      desktop = (
        <>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            {title}
            {year}
          </div>
          {category}
        </>
      );
      break;
    case "category-year_title":
      desktop = (
        <>
          <div className="flex flex-wrap items-center gap-2.5">
            {category}
            {year}
          </div>
          {title}
        </>
      );
      break;
    case "title_category-year":
      desktop = (
        <>
          {title}
          <div className="flex flex-wrap items-center gap-2.5">
            {category}
            {year}
          </div>
        </>
      );
      break;
    case "title-category-year":
      desktop = (
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          {title}
          <div className="flex items-center gap-2.5">
            {category}
            {year}
          </div>
        </div>
      );
      break;
  }

  return (
    <>
      {mobile}
      <div className="hidden flex-col gap-3 tab:flex">{desktop}</div>
    </>
  );
}

const PlaceholderFill = () => (
  <span
    data-img
    className="placeholder-stripe absolute inset-0 transition-transform duration-[380ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.025]"
  />
);

export function WorkCard({ project }: { project: WorkProject }) {
  const isStub = !!WORK_STUBS[project.slug];
  const cover = (
    <WorkCover className={COVER_RATIO[project.layout]}>
      <PlaceholderFill />
      <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-[12px] font-medium tracking-[0.09em] text-ink-num">
        {project.coverLabel}
      </span>
    </WorkCover>
  );

  const text = (
    <div className="flex flex-col gap-3">
      <span className="text-[12px] font-semibold tracking-[0.14em] text-ink-num">{project.num}</span>
      <TitleBlock project={project} />
      <p className="m-0 max-w-[64ch] text-[15px] leading-[1.7] text-ink-secondary text-pretty">
        {project.description}
      </p>
      <div className="flex flex-wrap items-center gap-3.5">
        <span
          className={
            isStub
              ? "inline-flex w-fit items-center gap-[7px] text-[13.5px] font-medium text-ink-faint"
              : "inline-flex w-fit items-center gap-[7px] text-[13.5px] font-medium text-ink"
          }
        >
          {isStub ? "Case study in progress" : "View Case Study"}
          <span className="inline-flex items-center transition-transform duration-[240ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-x-1">
            <ArrowRight size={13} strokeWidth={2} />
          </span>
        </span>
        {project.status && (
          <span className="inline-flex h-[22px] w-fit items-center rounded-[6px] bg-surface px-[9px] text-[12px] font-medium tracking-[0.06em] text-ink-faint">
            {project.status}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={isStub ? `${project.title} — case study in progress` : `${project.title} case study`}
      className="group block border-b border-line-soft pb-[52px] tab:pb-[74px]"
    >
      {project.layout === "split" ? (
        <div className="grid grid-cols-1 items-start gap-6 desk:grid-cols-[minmax(0,56%)_minmax(0,38%)] desk:gap-10">
          {cover}
          {text}
        </div>
      ) : (
        <div className="flex flex-col gap-[18px] tab:gap-[22px]">
          {cover}
          {text}
        </div>
      )}
    </Link>
  );
}
