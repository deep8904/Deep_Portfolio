import { Section } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { PILLARS } from "@/lib/data";

export function WhatIBring() {
  return (
    <Section>
      <Reveal>
        <div className="flex flex-col items-center gap-3.5">
          <SectionLabel>What I Bring</SectionLabel>
          <h2 className="m-0 max-w-full text-center text-h2 font-medium tracking-[-0.028em] text-balance tab:max-w-[620px]">
            One product. Three perspectives.
          </h2>
        </div>
        <div className="mt-[34px] grid grid-cols-1 gap-3.5 tab:mt-11 desk:grid-cols-3">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col rounded-[10px] border border-line bg-surface p-[18px_18px_16px] transition-[transform,border-color,background] duration-[240ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-0.5 hover:border-line-hover hover:bg-surface-hover"
            >
              <h3 className="m-0 mb-3.5 text-h3 font-medium tracking-[-0.01em]">
                <span className="text-ink-num transition-colors duration-[240ms] ease-linear group-hover:text-accent">
                  {p.num}
                </span>{" "}
                {p.title}
              </h3>
              <div className="mb-auto h-px bg-line transition-colors duration-[240ms] ease-linear group-hover:bg-line-hover" />
              <p className="my-[22px] mb-4 text-p2 text-ink-tertiary text-pretty">{p.body}</p>
              <span className="text-label font-medium tracking-[0.07em] text-ink">{p.meta}</span>
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
