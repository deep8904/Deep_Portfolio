import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkCover } from "@/components/work/WorkCover";
import { SELECTED_PROJECTS, type SelectedProject } from "@/lib/data";

function SelectedProjectCard({ project }: { project: SelectedProject }) {
  const hasCover = project.cover.kind === "image";

  return (
    <div className="flex flex-col gap-5">
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
        <span className="text-[15px] font-medium tracking-[-0.01em]">{project.name}</span>
        <p className="m-0 text-[14px] leading-[1.65] text-ink-secondary text-pretty">{project.description}</p>
        <span className="text-[12.5px] leading-[1.6] text-ink-faint">{project.stack}</span>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[13px] font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
            >
              {link.label}
              <ExternalLink size={11} strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MoreWork() {
  return (
    <Section>
      <Reveal>
        <div className="flex flex-col items-start gap-4">
          <SectionLabel>Selected Projects</SectionLabel>
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
