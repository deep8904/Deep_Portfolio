import { Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CAPABILITIES } from "@/lib/data";

export function Capabilities() {
  return (
    <Section>
      <Reveal>
        <div className="grid grid-cols-2 gap-x-[18px] gap-y-[22px] tab:grid-cols-4 tab:gap-x-7 tab:gap-y-0">
          {CAPABILITIES.map((c) => (
            <div key={c.label} className="flex flex-col gap-2 border-t border-line-hairline pt-5">
              <span className="text-[12px] font-semibold tracking-[0.11em] text-ink-faint">{c.label}</span>
              <span className="text-base font-medium tracking-[-0.015em]">{c.value}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
