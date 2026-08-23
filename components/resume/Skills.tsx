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
                <h3 className="m-0 mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                  {s.category}
                </h3>
                <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-surface px-2.5 py-1 text-[12.5px] leading-[1.4] text-ink-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
