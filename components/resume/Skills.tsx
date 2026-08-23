import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { RESUME_SKILLS } from "@/lib/data";

export function Skills() {
  return (
    <section className="pt-[50px] tab:pt-[68px]">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-4">
            <SectionLabel>Technical Skills</SectionLabel>
            <h2 className="m-0 max-w-full text-[26px] font-medium leading-[1.16] tracking-[-0.028em] text-balance tab:max-w-[13ch] tab:text-[30px] desk:text-[34px]">
              Skills and tools.
            </h2>
          </div>
          <div className="mt-7 grid grid-cols-1 gap-6 tab:grid-cols-2 tab:gap-8">
            {RESUME_SKILLS.map((s) => (
              <div key={s.category}>
                <h3 className="m-0 mb-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                  {s.category}
                </h3>
                <p className="m-0 text-[13.5px] leading-[1.7] text-ink-secondary">{s.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
