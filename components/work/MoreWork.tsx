import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WorkCover } from "@/components/work/WorkCover";
import { SELECTED_PROJECTS, type SelectedProject } from "@/lib/data";

function SelectedProjectCard({ project }: { project: SelectedProject }) {
  const hasCover = project.cover.kind === "image";

  return (
    <Link href={`/work/${project.slug}`} aria-label={`${project.name} case study`} className="group flex flex-col gap-5">
      {hasCover && (
        <WorkCover className="aspect-[4/3] tab:aspect-[16/10]">
          <Image
            data-img
            src={project.cover.kind === "image" ? project.cover.src : ""}
            alt={project.cover.kind === "image" ? project.cover.alt : ""}
            fill
            sizes="(min-width: 1200px) 380px, (min-width: 810px) 46vw, 92vw"
            className="object-cover object-top transition-transform duration-[380ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.025]"
          />
        </WorkCover>
      )}
      <div className="flex flex-col gap-2.5">
        <span className="text-[15px] font-medium tracking-[-0.01em] transition-transform duration-[320ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-translate-y-0.5">
          {project.name}
        </span>
        <p className="m-0 text-[14px] leading-[1.65] text-ink-secondary text-pretty">{project.description}</p>
        <span className="inline-flex w-fit items-center gap-[7px] text-[13.5px] font-medium text-ink">
          View Project
          <span className="inline-flex items-center transition-transform duration-[240ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-x-1">
            <ArrowRight size={13} strokeWidth={2} />
          </span>
        </span>
      </div>
    </Link>
  );
}

export function MoreWork() {
  if (SELECTED_PROJECTS.length === 0) return null;

  return (
    <Section>
      <Reveal>
        <div className="flex flex-col items-start gap-4">
          <h2 className="m-0 max-w-full text-h2 font-medium tracking-[-0.028em] text-balance tab:max-w-[13ch]">
            A smaller system, built the same way.
          </h2>
        </div>
        <div className="mt-[34px] grid grid-cols-1 gap-10 tab:mt-11 tab:grid-cols-2 desk:grid-cols-3">
          {SELECTED_PROJECTS.map((p) => (
            <SelectedProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
