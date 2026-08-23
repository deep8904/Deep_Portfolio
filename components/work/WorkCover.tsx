"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";

export function WorkCover({ className, children }: { className?: string; children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const wrap = wrapRef.current;
    const img = wrap?.querySelector<HTMLElement>("[data-img]");
    if (!wrap || prefersReducedMotion()) return;

    gsap.set(wrap, { clipPath: "inset(100% 0% 0% 0%)" });
    if (img) gsap.set(img, { scale: 1.05 });

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(wrap, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power3.out" });
        if (img) gsap.to(img, { scale: 1, duration: 0.9, ease: "power3.out" });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div ref={wrapRef} className={clsx("group relative w-full overflow-hidden rounded-xl bg-image-bg", className)}>
      {children}
    </div>
  );
}
