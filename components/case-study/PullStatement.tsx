import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A full-width, borderless, large-type "moment" — for the one or two ideas
 * in a case study that are the actual design thesis, not another card in
 * the usual rhythm of eyebrow → heading → body.
 */
export function PullStatement({ eyebrow, children }: { eyebrow?: string; children: ReactNode }) {
  return (
    <div className="py-[52px] tab:py-[70px]">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4">
            {eyebrow && (
              <span className="text-[12px] font-semibold tracking-[0.12em] text-ink-num">{eyebrow.toUpperCase()}</span>
            )}
            <p className="m-0 max-w-[780px] text-[24px] font-medium leading-[1.3] tracking-[-0.02em] text-ink text-pretty tab:text-[29px] desk:text-[33px]">
              {children}
            </p>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
