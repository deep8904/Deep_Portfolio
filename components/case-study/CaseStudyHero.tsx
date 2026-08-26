import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

type MetaItem = { label: string; value: string };

export function CaseStudyHero({
  eyebrow,
  title,
  statement,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  statement: string;
  meta: MetaItem[];
  children?: ReactNode;
}) {
  return (
    <section className="pt-[34px] tab:pt-[46px]">
      <Container>
        <Reveal>
          <Link
            href="/work"
            className="group mb-6 inline-flex items-center gap-2 text-[13px] font-medium text-ink-secondary transition-colors duration-200 hover:text-ink"
          >
            <ArrowLeft
              size={14}
              strokeWidth={2}
              className="transition-transform duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-translate-x-0.5"
            />
            Back to Work
          </Link>

          <div className="flex flex-col items-start gap-[18px]">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h1 className="m-0 text-[40px] font-medium leading-[1.05] tracking-[-0.03em] tab:text-[56px] desk:text-[68px]">
              {title}
            </h1>
            <p className="m-0 max-w-[600px] text-[16px] leading-[1.72] text-ink-secondary text-pretty">
              {statement}
            </p>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line-soft pt-6 tab:mt-11 tab:grid-cols-4 tab:pt-7">
            {meta.map((item) => (
              <div key={item.label} className="flex flex-col gap-1.5">
                <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">{item.label}</span>
                <span className="text-[14px] leading-[1.4] text-ink-secondary">{item.value}</span>
              </div>
            ))}
          </div>

          {children}
        </Reveal>
      </Container>
    </section>
  );
}
