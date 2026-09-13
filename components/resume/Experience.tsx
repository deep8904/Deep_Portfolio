import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { RESUME_EXPERIENCE } from "@/lib/data";

export function Experience() {
  return (
    <section className="pt-[50px] tab:pt-[68px]">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-4">
            <SectionLabel>Experience</SectionLabel>
            <h2 className="m-0 max-w-full text-h2 font-medium tracking-[-0.028em] text-balance tab:max-w-[13ch]">
              Where I’ve contributed.
            </h2>
          </div>
          <div className="mt-7">
            {RESUME_EXPERIENCE.map((x) => (
              <article
                key={x.id}
                className="group border-b border-line-soft py-5 transition-colors duration-[220ms] ease-linear tab:py-[26px] hover:border-line-hover"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <h3 className="m-0 mb-0.5 text-[17px] font-semibold tracking-[-0.01em]">{x.org}</h3>
                    <span className="block text-sm text-ink-muted transition-colors duration-[220ms] ease-linear group-hover:text-ink-secondary">
                      {x.role} · {x.location}
                    </span>
                  </div>
                  <span className="whitespace-nowrap text-[13px] text-ink-faint">{x.dates}</span>
                </div>
                <ul className="m-0 mt-3.5 flex flex-col gap-2 pl-4 tab:pl-[19px]">
                  {x.bullets.map((b) => (
                    <li key={b} className="text-[15px] leading-[1.62] text-ink-secondary">
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
