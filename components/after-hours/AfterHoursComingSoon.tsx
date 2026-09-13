"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowLeft, HardHat } from "lucide-react";
import gsap from "gsap";
import { registerGsap, prefersReducedMotion, EASE_REVEAL } from "@/lib/motion";

const WORDS = ["Something's", "being", "built", "back", "here."];

export function AfterHoursComingSoon() {
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const hatRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGsap();
    const reduce = prefersReducedMotion();
    const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    const els = [badgeRef.current, ...words, subRef.current, backRef.current].filter(Boolean);

    if (reduce) {
      gsap.set(els, { clearProps: "all" });
      return;
    }

    gsap.set(badgeRef.current, { opacity: 0, y: 8 });
    gsap.set(words, { opacity: 0, yPercent: 100 });
    gsap.set(subRef.current, { opacity: 0, y: 10 });
    gsap.set(backRef.current, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: EASE_REVEAL } });
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5 })
      .to(words, { opacity: 1, yPercent: 0, duration: 0.7, stagger: 0.06 }, "-=0.25")
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
      .to(backRef.current, { opacity: 1, duration: 0.4 }, "-=0.3");

    gsap.to(hatRef.current, {
      rotate: -8,
      duration: 0.9,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      transformOrigin: "50% 90%",
    });
  }, []);

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="ah-soon-blob ah-soon-blob-a" />
        <div className="ah-soon-blob ah-soon-blob-b" />
      </div>

      <div
        aria-hidden="true"
        className="ah-soon-ticker pointer-events-none absolute inset-x-0 top-[14%] -z-10 -rotate-2 border-y border-line-strong py-2 text-[12px] font-semibold tracking-[0.2em] text-ink-secondary tab:top-[18%]"
      >
        <div className="ah-soon-ticker-track">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="mx-4 whitespace-nowrap">
              BUILDING IN PROGRESS •
            </span>
          ))}
        </div>
      </div>

      <div ref={badgeRef} className="mb-7 inline-flex h-8 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-[12.5px] font-medium text-ink-secondary">
        <span ref={hatRef} className="inline-flex">
          <HardHat size={15} strokeWidth={2} className="text-ink-faint" />
        </span>
        After Hours
      </div>

      <h1 className="m-0 max-w-[15ch] text-center text-h1 font-medium leading-[1.1] tracking-[-0.03em] text-balance">
        <span className="sr-only">{WORDS.join(" ")}</span>
        <span aria-hidden="true">
          {WORDS.map((word, i) => (
            <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-bottom last:mr-0">
              <span
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className="inline-block"
              >
                {word}
              </span>
            </span>
          ))}
        </span>
      </h1>

      <p ref={subRef} className="m-0 mt-5 max-w-[52ch] text-center text-p1 text-ink-muted text-pretty">
        Photography, games, and a few interface experiments live in this corner of the site, and none of it is
        public yet. Come back later.
      </p>

      <div ref={backRef} className="mt-9">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-ink-secondary transition-colors duration-200 hover:text-ink"
        >
          <ArrowLeft
            size={15}
            strokeWidth={2}
            className="transition-transform duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-translate-x-0.5"
          />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
