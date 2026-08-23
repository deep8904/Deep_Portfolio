import Image from "next/image";
import { Section } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { JOURNEY, EDUCATION } from "@/lib/data";

export function Journey() {
  return (
    <Section>
      <Reveal>
        <div className="flex flex-col items-center gap-3.5">
          <SectionLabel>My Journey</SectionLabel>
          <h2 className="m-0 max-w-full text-center text-[27px] font-medium leading-[1.16] tracking-[-0.028em] text-balance tab:max-w-[620px] tab:text-[32px] desk:text-[37px]">
            How I got here.
          </h2>
        </div>

        <div className="mt-10 flex flex-col">
          {JOURNEY.map((j) => (
            <div
              key={j.org}
              className="grid grid-cols-1 items-center gap-2 border-b border-line-soft py-[18px] tab:grid-cols-[150px_1fr_auto] tab:gap-7 tab:py-4"
            >
              <Image src={j.logo} alt={j.org} height={31} width={120} className="h-[31px] w-[120px] max-w-[120px] object-contain object-left" />
              <span className="text-[13.5px] text-ink-muted">{j.role}</span>
              <span className="whitespace-nowrap text-[13px] text-ink-faint">{j.years}</span>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <span className="text-[12.5px] text-ink-faint">Education</span>
          <div className="mt-3.5 flex flex-col">
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
        </div>
      </Reveal>
    </Section>
  );
}
