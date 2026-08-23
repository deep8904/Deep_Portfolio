"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";

export function AboutPortrait() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    registerGsap();
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img || prefersReducedMotion()) return;

    gsap.set(wrap, { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(img, { scale: 1.04 });

    const reveal = ScrollTrigger.create({
      trigger: wrap,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(wrap, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out" });
        gsap.to(img, { scale: 1, duration: 0.95, ease: "power3.out" });
      },
    });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1200px)", () => {
      const parallax = ScrollTrigger.create({
        trigger: wrap,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        animation: gsap.fromTo(img, { yPercent: -1.6 }, { yPercent: 1.6, ease: "none" }),
      });
      return () => parallax.kill();
    });

    return () => {
      reveal.kill();
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="group relative rounded-[14px] overflow-hidden bg-image-bg"
    >
      <Image
        ref={imgRef}
        src="/images/profile/avatar.png"
        alt="Portrait of Deep Chadamiya"
        width={1122}
        height={1213}
        priority
        className="block w-full object-cover"
        style={{ aspectRatio: "1122/1000" }}
      />
    </div>
  );
}
