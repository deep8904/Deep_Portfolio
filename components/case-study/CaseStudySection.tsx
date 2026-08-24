import { ReactNode } from "react";
import clsx from "clsx";
import { Section } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function CaseStudySection({
  eyebrow,
  title,
  intro,
  children,
  tight = false,
  contentClassName,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  tight?: boolean;
  contentClassName?: string;
}) {
  return (
    <Section tight={tight}>
      <Reveal as="article">
        <div className="flex flex-col items-start gap-3.5">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2 className="m-0 max-w-[640px] text-[26px] font-medium leading-[1.18] tracking-[-0.025em] text-pretty tab:text-[31px] desk:text-[35px]">
            {title}
          </h2>
          {intro && (
            <div className="max-w-[600px] text-[15px] leading-[1.72] text-ink-secondary text-pretty">{intro}</div>
          )}
        </div>
        {children && <div className={clsx("mt-9 tab:mt-11", contentClassName)}>{children}</div>}
      </Reveal>
    </Section>
  );
}
