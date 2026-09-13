import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A rhythm device for long case studies — marks a shift into a new major
 * beat of the narrative (not every section, just the big turns).
 */
export function PhaseDivider({ label }: { label: string }) {
  return (
    <div className="pt-[52px] tab:pt-[70px]">
      <Container>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-line-strong" />
            <span className="inline-flex h-8 shrink-0 items-center rounded-full bg-ink px-4 text-[11.5px] font-semibold tracking-[0.14em] text-accent-cream">
              {label}
            </span>
            <span className="h-px flex-1 bg-line-strong" />
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
