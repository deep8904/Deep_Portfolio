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
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  useEffect(() => {
    updateEdges();
    // Scroll-snap can settle a frame or two after mount (observed resting at
    // ~4px instead of 0), which briefly left "Previous" wrongly enabled.
    const raf = requestAnimationFrame(updateEdges);
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      cancelAnimationFrame(raf);
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

  // Outer button is a full 44x44 hit target (WCAG 2.5.5); the visible circle
  // inside it stays the original 34px so the design doesn't visually change.
  const btnBase =
    "group flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] enabled:active:scale-[0.94] disabled:opacity-40";
  const btnCircle =
    "flex h-[34px] w-[34px] items-center justify-center rounded-full border border-line-strong bg-surface text-ink transition-colors duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-enabled:group-hover:bg-[#E6E4DF]";

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
            <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous testimonial" className={btnBase}>
              <span className={btnCircle}>
                <ChevronLeft size={14} strokeWidth={2} />
              </span>
            </button>
            <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next testimonial" className={btnBase}>
              <span className={btnCircle}>
                <ChevronRight size={14} strokeWidth={2} />
              </span>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-label="Testimonials"
          tabIndex={0}
          className="no-scrollbar mt-9 flex snap-x snap-mandatory gap-3.5 overflow-x-auto scroll-smooth p-1 tab:mt-11"
        >
          {TESTIMONIALS.map((q) => (
            <figure
              key={q.name}
              data-card
              className="group flex min-h-[210px] flex-none snap-start flex-col rounded-[10px] border border-line bg-surface p-[18px] transition-[transform,background,border-color] duration-[260ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-0.5 hover:border-line-hover hover:bg-surface-hover basis-full tab:basis-[calc((100%-14px)/2)] desk:basis-[calc((100%-28px)/3)]"
            >
              <blockquote className="m-0 mb-auto text-[16px] leading-[1.6] text-ink-secondary text-pretty">
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
