"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.getBoundingClientRect().width + 14 : el.clientWidth;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const btnBase =
    "flex h-[34px] w-[34px] items-center justify-center rounded-full border border-line-strong bg-surface text-ink transition-[background,transform,opacity] duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] enabled:hover:bg-[#E6E4DF] enabled:active:scale-[0.94] disabled:opacity-40";

  return (
    <Section>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col items-start gap-4">
            <SectionLabel>Kind Words</SectionLabel>
            <h2 className="m-0 max-w-full text-[26px] font-medium leading-[1.16] tracking-[-0.028em] text-balance tab:max-w-[30ch] tab:text-[30px] desk:max-w-[46ch] desk:text-[34px]">
              What people I’ve worked with have said.
            </h2>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous testimonials" className={btnBase}>
              <ChevronLeft size={14} strokeWidth={2} />
            </button>
            <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next testimonials" className={btnBase}>
              <ChevronRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar mt-9 flex snap-x snap-mandatory gap-3.5 overflow-x-auto scroll-smooth p-1 tab:mt-11"
        >
          {TESTIMONIALS.map((q) => (
            <figure
              key={q.name}
              data-card
              className="group flex min-h-[210px] flex-none snap-start flex-col rounded-[10px] border border-line bg-surface p-[18px] transition-[transform,background,border-color] duration-[260ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-0.5 hover:border-line-hover hover:bg-surface-hover basis-full tab:basis-[calc((100%-14px)/2)] desk:basis-[calc((100%-28px)/3)]"
            >
              <blockquote className="m-0 mb-auto text-[13.5px] leading-[1.62] text-ink-secondary text-pretty">
                {q.text}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-[11px]">
                <Image
                  src={q.avatar}
                  alt=""
                  width={32}
                  height={32}
                  data-img
                  className="h-8 w-8 rounded-full bg-image-bg object-cover opacity-85 transition-[opacity,transform] duration-[260ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-100"
                />
                <span className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-medium">{q.name}</span>
                  <span className="text-[11.5px] text-ink-faint">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
