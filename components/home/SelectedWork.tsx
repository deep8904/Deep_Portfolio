import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/ui/Cta";
import { HOME_PROJECTS } from "@/lib/data";

export function SelectedWork() {
  return (
    <Section>
      <Reveal>
        <div className="flex flex-col items-center justify-center gap-3.5">
          <SectionLabel>Selected Work</SectionLabel>
          <h2 className="m-0 max-w-full text-center text-h2 font-medium tracking-[-0.028em] text-balance tab:max-w-[620px]">
            Products built from a problem to a working system.
          </h2>
        </div>

        <div className="mt-[34px] grid grid-cols-1 gap-3.5 tab:mt-11 tab:grid-cols-2">
          {HOME_PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              aria-label={`${p.name} case study`}
              className="group relative block aspect-[16/10] cursor-pointer overflow-hidden rounded-[11px] border border-line"
            >
              <span
                data-img
                className="placeholder-stripe absolute inset-0 transition-transform duration-[380ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.028]"
              />
              <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-meta font-medium tracking-[0.09em] text-ink-num">
                {p.placeholder}
              </span>
              <span
                className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-x-3.5 gap-y-1 px-[18px] py-4 transition-[background] duration-[320ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                style={{
                  background: "linear-gradient(to top, rgba(20,18,16,0.68), rgba(20,18,16,0))",
                }}
              >
                <span className="inline-flex items-center gap-[7px] text-balance text-p2 font-medium text-accent-cream transition-transform duration-[320ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-translate-y-0.5">
                  {p.name}
                  <span className="text-xs opacity-0 transition-opacity duration-[320ms] group-hover:opacity-100">↗</span>
                </span>
                <span className="whitespace-nowrap text-meta font-medium tracking-[0.05em] text-accent-cream opacity-[0.66] transition-opacity duration-[320ms] group-hover:opacity-[0.92]">
                  {p.meta}
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-[34px] flex justify-center">
          <Cta href="/work" className="group">
            View All Work{" "}
            <span className="inline-flex items-center transition-transform duration-[240ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-x-[3px]">
              <ArrowRight size={13} strokeWidth={2} />
            </span>
          </Cta>
        </div>
      </Reveal>
    </Section>
  );
}
