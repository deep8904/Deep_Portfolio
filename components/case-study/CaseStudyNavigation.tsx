import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function CaseStudyNavigation({ nextSlug, nextTitle }: { nextSlug: string; nextTitle: string }) {
  return (
    <Section>
      <Reveal>
        <Link
          href={`/work/${nextSlug}`}
          className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl bg-surface px-6 py-8 transition-colors duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:bg-connect tab:px-8 tab:py-10"
        >
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">NEXT PROJECT</span>
          <span className="flex items-center gap-3 text-[26px] font-medium leading-[1.1] tracking-[-0.025em] tab:text-[34px]">
            {nextTitle}
            <ArrowRight
              size={22}
              strokeWidth={2}
              className="transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-x-1.5"
            />
          </span>
        </Link>
      </Reveal>
    </Section>
  );
}
