import { Section } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS } from "@/lib/data";

export function Process() {
  return (
    <Section>
      <Reveal>
        <div className="grid grid-cols-1 items-start gap-8 tab:grid-cols-[minmax(0,38%)_minmax(0,58%)] tab:justify-between tab:gap-10 desk:grid-cols-[minmax(0,36%)_minmax(0,60%)] desk:gap-12">
          <div className="flex flex-col items-start gap-4">
            <SectionLabel>My Process</SectionLabel>
            <h2 className="m-0 max-w-full text-[26px] font-medium leading-[1.16] tracking-[-0.028em] text-balance tab:max-w-[13ch] tab:text-[30px] desk:text-[34px]">
              From problem to shipped product.
            </h2>
          </div>
          <div className="flex flex-col">
            {PROCESS.map((step) => (
              <div
                key={step.num}
                tabIndex={0}
                className="group flex flex-col gap-3 border-b border-line-soft pb-[26px] mb-[26px] transition-[border-color] duration-[260ms] ease-linear hover:border-line-hover focus-visible:border-line-hover"
              >
                <span className="flex items-start gap-[5px] text-[16px] font-medium tracking-[-0.01em]">
                  {step.title}
                  <span className="pt-0.5 text-[11px] text-ink-num transition-colors duration-[260ms] ease-linear group-hover:text-accent group-focus-visible:text-accent">
                    {step.num}
                  </span>
                </span>
                <p className="m-0 max-w-[68ch] text-[16px] leading-[1.6] text-ink-muted text-pretty transition-colors duration-[260ms] ease-linear group-hover:text-ink-secondary group-focus-visible:text-ink-secondary">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
