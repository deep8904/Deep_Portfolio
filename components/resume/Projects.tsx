import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { RESUME_PROJECTS } from "@/lib/data";

export function Projects() {
  return (
    <section className="pt-[50px] tab:pt-[68px]">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-4">
            <SectionLabel>Selected Projects</SectionLabel>
            <h2 className="m-0 max-w-full text-h2 font-medium tracking-[-0.028em] text-balance tab:max-w-[13ch]">
              Selected product work.
            </h2>
          </div>
          <div className="mt-7">
            {RESUME_PROJECTS.map((p) => (
              <div key={p.title} className="border-b border-line-soft py-5 tab:py-[26px]">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  {p.route ? (
                    <Link
                      href={`/work/${p.route}`}
                      className="group inline-flex w-fit items-center gap-[7px] text-base font-semibold text-ink"
                    >
                      <h3 className="m-0 text-inherit font-inherit">{p.title}</h3>
                      <span className="inline-flex items-center transition-transform duration-[240ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-x-1">
                        <ArrowRight size={13} strokeWidth={2} />
                      </span>
                    </Link>
                  ) : (
                    <h3 className="m-0 text-base font-semibold text-ink">{p.title}</h3>
                  )}
                  <span className="whitespace-nowrap text-xs text-ink-faint">{p.tagline}</span>
                </div>
                <p className="m-0 mt-1.5 text-[11.5px] font-medium uppercase tracking-[0.04em] text-ink-faint">
                  {p.stack}
                </p>
                <ul className="m-0 mt-3 flex flex-col gap-1.5 pl-4 tab:pl-[19px]">
                  {p.bullets.map((b) => (
                    <li key={b} className="text-[13.5px] leading-[1.6] text-ink-secondary">
                      {b}
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
