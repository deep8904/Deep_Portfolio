import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { EDUCATION } from "@/lib/data";

export function ResumeEducation() {
  return (
    <section className="pt-[50px] tab:pt-[68px]">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-4">
            <SectionLabel>Education</SectionLabel>
            <h2 className="m-0 max-w-full text-h2 font-medium tracking-[-0.028em] text-balance tab:max-w-[13ch]">
              Academic background.
            </h2>
          </div>
          <div className="mt-7 flex flex-col">
            {EDUCATION.map((e) => (
              <div
                key={e.school}
                className="grid grid-cols-1 items-baseline gap-1 border-b border-line-soft py-4 tab:grid-cols-[1fr_1fr_auto] tab:gap-7"
              >
                <span className="text-sm font-medium">{e.school}</span>
                <span className="text-[13.5px] text-ink-muted">{e.degree}</span>
                <span className="whitespace-nowrap text-[13px] text-ink-faint">{e.year}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
