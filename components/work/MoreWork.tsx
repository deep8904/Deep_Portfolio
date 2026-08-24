import { Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MORE_WORK } from "@/lib/data";

export function MoreWork() {
  return (
    <Section>
      <Reveal>
        <div className="flex flex-col items-start gap-4">
          <SectionLabel>More Work</SectionLabel>
          <h2 className="m-0 max-w-full text-[26px] font-medium leading-[1.16] tracking-[-0.028em] text-balance tab:max-w-[13ch] tab:text-[30px] desk:text-[34px]">
            Smaller builds, collaborations, and experiments.
          </h2>
        </div>
        <div className="mt-[34px] grid grid-cols-1 gap-5 tab:mt-11 tab:grid-cols-2 desk:grid-cols-3">
          {MORE_WORK.map((m) => (
            <div key={m.name} className="flex flex-col gap-3">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-image-bg">
                <span className="placeholder-stripe absolute inset-0" />
                <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-[11.5px] font-medium tracking-[0.09em] text-ink-num">
                  [ {m.name} ]
                </span>
              </div>
              <span className="text-[14.5px] font-medium tracking-[-0.01em]">{m.name}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
