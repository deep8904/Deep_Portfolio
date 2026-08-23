import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ResumeHeader } from "@/components/resume/ResumeHeader";
import { Skills } from "@/components/resume/Skills";
import { Experience } from "@/components/resume/Experience";
import { Projects } from "@/components/resume/Projects";
import { ResumeEducation } from "@/components/resume/ResumeEducation";
import { RESUME_SUMMARY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume",
  description: "Product Designer, Design Engineer, and Front-End Developer — full resume.",
};

export default function ResumePage() {
  return (
    <>
      <section className="pt-[34px] tab:pt-[46px]">
        <Container>
          <ResumeHeader />
        </Container>
      </section>

      <section className="pt-[50px] tab:pt-[68px]">
        <Container>
          <Reveal className="max-w-[760px]">
            <SectionLabel>Summary</SectionLabel>
            <p className="m-0 mt-4 text-[15px] leading-[1.72] text-ink-secondary text-pretty">{RESUME_SUMMARY}</p>
          </Reveal>
        </Container>
      </section>

      <Skills />
      <Experience />
      <Projects />
      <ResumeEducation />
    </>
  );
}
