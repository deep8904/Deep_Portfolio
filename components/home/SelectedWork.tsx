import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/ui/Cta";
import { ProjectStatusBadge } from "@/components/work/ProjectStatusBadge";
import { WORK_PROJECTS, type WorkProject } from "@/lib/data";

const ease = "cubic-bezier(0.22,0.61,0.36,1)";

function HomeCard({ project }: { project: WorkProject }) {
  const hasCover = project.cover.kind === "image";

  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${project.title} case study`}
      className={[
        "group flex flex-col overflow-hidden rounded-[11px] border border-line",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2",
      ].join(" ")}
    >
      {/* Cover area */}
      {hasCover ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-raised">
          <Image
            src={(project.cover as { kind: "image"; src: string; alt: string }).src}
            alt={(project.cover as { kind: "image"; src: string; alt: string }).alt}
            fill
            sizes="(min-width: 1200px) 580px, (min-width: 810px) 46vw, 92vw"
            className={`object-cover object-top transition-transform duration-[380ms] [transition-timing-function:${ease}] motion-reduce:transition-none group-hover:scale-[1.025]`}
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 bg-surface-raised px-8 text-center">
          <span className="text-[11px] font-semibold tracking-[0.14em] text-ink-num">
            {project.category}
          </span>
          <p className="m-0 max-w-[38ch] text-[13px] leading-[1.65] text-ink-secondary text-pretty">
            {project.description}
          </p>
        </div>
      )}

      {/* Card footer */}
      <div className="flex flex-1 flex-col gap-2.5 px-[18px] py-4">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
          <span className="text-[13px] font-medium text-ink">{project.title}</span>
          <ProjectStatusBadge level={project.caseStudyStatus} />
        </div>
        {hasCover && (
          <p className="m-0 line-clamp-2 text-[13px] leading-[1.65] text-ink-secondary text-pretty">
            {project.description}
          </p>
        )}
        <span
          className={`inline-flex w-fit items-center gap-[6px] text-[12.5px] font-medium text-ink-secondary transition-[color,transform] duration-[240ms] [transition-timing-function:${ease}] motion-reduce:transition-none group-hover:text-ink`}
        >
          View Case Study
          <span
            className={`inline-flex items-center transition-transform duration-[240ms] [transition-timing-function:${ease}] motion-reduce:transition-none group-hover:translate-x-[3px]`}
          >
            <ArrowRight size={11} strokeWidth={2} />
          </span>
        </span>
      </div>
    </Link>
  );
}

export function SelectedWork() {
  return (
    <Section id="selected-work">
      <Reveal>
        <div className="flex flex-col items-center justify-center gap-3.5">
          <SectionLabel>Selected Work</SectionLabel>
          <h2 className="m-0 max-w-full text-center text-h2 font-medium tracking-[-0.028em] text-balance tab:max-w-[620px]">
            Products built from a problem to a working system.
          </h2>
        </div>

        <div className="mt-[34px] grid grid-cols-1 gap-3.5 tab:mt-11 tab:grid-cols-2">
          {WORK_PROJECTS.map((p) => (
            <HomeCard key={p.slug} project={p} />
          ))}
        </div>

        <div className="mt-[34px] flex justify-center">
          <Cta href="/work" className="group">
            View All Work{" "}
            <span
              className={`inline-flex items-center transition-transform duration-[240ms] [transition-timing-function:${ease}] motion-reduce:transition-none group-hover:translate-x-[3px]`}
            >
              <ArrowRight size={13} strokeWidth={2} />
            </span>
          </Cta>
        </div>
      </Reveal>
    </Section>
  );
}
