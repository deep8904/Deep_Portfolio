"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    let already = true;
    try {
      already = window.sessionStorage.getItem("portfolioIntroPlayed") === "1";
    } catch {
      already = true;
    }

    if (already || prefersReducedMotion()) {
      overlay.style.display = "none";
      return;
    }

    try {
      window.sessionStorage.setItem("portfolioIntroPlayed", "1");
    } catch {
      /* ignore */
    }
    document.documentElement.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        overlay.style.display = "none";
        document.documentElement.style.overflow = "";
        window.dispatchEvent(new Event("intro:done"));
      },
    });
    tl.fromTo(nameRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.42, ease: "power3.out" })
      .fromTo(subRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=0.16")
      .fromTo(ruleRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.36, ease: "power2.out" }, "-=0.2")
      .to(
        overlay,
        {
          yPercent: -100,
          duration: 0.7,
          ease: "power3.inOut",
          onStart: () => {
            document.documentElement.style.overflow = "";
          },
        },
        "+=0.16"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <noscript>
        <style>{`[data-intro-overlay]{display:none}`}</style>
      </noscript>
      <div
        ref={overlayRef}
        data-intro-overlay
        className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
      >
        <div className="flex flex-col items-center gap-3">
          <span ref={nameRef} className="text-[26px] font-semibold tracking-[-0.02em] text-ink opacity-0">
            Deep Chadamiya
          </span>
          <span ref={subRef} className="text-[10px] font-medium tracking-[0.18em] text-ink-faint opacity-0">
            PRODUCT · DESIGN · DEV
          </span>
          <span ref={ruleRef} className="mt-1.5 h-px w-14 origin-center scale-x-0 bg-line-strong" />
        </div>
      </div>
    </>
  );
}
