"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function IntroOverlay() {
  const [show, setShow] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);

  // Decide *after* mount whether this first visit should play the intro.
  // Deliberately not rendered during SSR or the first hydration pass (kept
  // out of the very first paint entirely): a fixed, full-screen splash that
  // gets server-rendered and then hidden client-side was found — via
  // PerformanceObserver testing — to null out Largest Contentful Paint
  // reporting for the real hero content underneath on every load. No-JS
  // visitors never see this at all now, since it only ever mounts from a
  // client-side effect.
  useEffect(() => {
    let already = true;
    try {
      already = window.sessionStorage.getItem("portfolioIntroPlayed") === "1";
    } catch {
      already = true;
    }
    if (already || prefersReducedMotion()) return;
    // Deliberate one-time "should this client render the intro" flip, not
    // state derived from props/other state — sessionStorage and matchMedia
    // aren't readable during SSR, so this can't be computed during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    try {
      window.sessionStorage.setItem("portfolioIntroPlayed", "1");
    } catch {
      /* ignore */
    }
    document.documentElement.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        setShow(false);
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
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
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
  );
}
