import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkCard } from "@/components/work/WorkCard";
import { MoreWork } from "@/components/work/MoreWork";
import { WORK_PROJECTS } from "@/lib/data";

const description = "Products, interfaces, and systems across product design, UX, software engineering, and research.";

export const metadata: Metadata = {
  title: "Work",
  description,
  alternates: { canonical: "/work" },
  openGraph: { title: "Work — Deep Chadamiya", description, url: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="pt-[34px] tab:pt-[46px]">
        <Container>
          <div className="flex max-w-[680px] flex-col items-start gap-4">
            <SectionLabel>Work</SectionLabel>
            <h1 className="m-0 text-[34px] font-medium leading-[1.1] tracking-[-0.03em] tab:text-[42px] desk:text-[48px]">
              Products shaped from problem to working system.
            </h1>
            <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
              A selection of products, interfaces, and systems I’ve worked on across product design, UX, software
              engineering, research, and interactive technology.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="flex flex-col">
          {WORK_PROJECTS.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <MoreWork />
    </>
  );
}
