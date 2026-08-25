import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { INTERESTS } from "@/lib/data";

const COLLAGE = [
  { area: "a", src: "/images/about/collage-a.jpg", alt: "Wooden garden pavilion roofline framed by tree branches" },
  { area: "b", src: "/images/about/collage-b.jpg", alt: "Stadium floodlight glowing against a dark night sky" },
  { area: "c", src: "/images/about/collage-c.jpg", alt: "Backlit collage wall of photographs at night, with a viewer standing before it" },
];

export function Interests() {
  return (
    <Section>
      <Reveal>
        <div className="grid grid-cols-1 items-start gap-[34px] desk:grid-cols-2 desk:gap-12">
          <div className="flex flex-col items-start gap-4">
            <SectionLabel>Outside the Interface</SectionLabel>
            <h2 className="m-0 max-w-full text-[26px] font-medium leading-[1.16] tracking-[-0.028em] text-balance tab:max-w-[13ch] tab:text-[30px] desk:text-[34px]">
              Things that keep me curious.
            </h2>
            <div className="mt-2.5 w-full">
              {INTERESTS.map((i) => (
                <div key={i.title} className="flex flex-col gap-1.5 border-t border-line-soft py-[18px]">
                  <span className="text-[14.5px] font-medium tracking-[-0.01em]">{i.title}</span>
                  <span className="text-[13.5px] leading-[1.6] text-ink-muted text-pretty">{i.body}</span>
                </div>
              ))}
            </div>
            <Link
              href="/after-hours"
              className="group mt-1 inline-flex w-fit items-center gap-1.5 text-[13.5px] font-medium text-ink-secondary transition-colors duration-200 hover:text-ink"
            >
              Enter After Hours
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div
            className="grid grid-cols-2 grid-rows-[180px_180px] gap-3 tab:grid-rows-[230px_190px]"
            style={{ gridTemplateAreas: '"a c" "b c"' }}
          >
            {COLLAGE.map((c) => (
              <div key={c.area} className="group overflow-hidden rounded-xl bg-image-bg" style={{ gridArea: c.area }}>
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={800}
                  height={800}
                  data-img
                  className="h-full w-full object-cover transition-transform duration-[480ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
