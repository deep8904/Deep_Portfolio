"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";

// Alt is "" for all three: the H1 + subhead already convey everything
// meaningful here, and these photos are a purely atmospheric mood collage
// with no adjacent caption or independent informational role.
const HERO_PHOTOS = [
  { src: "/photography/purple-dusk.jpg", alt: "", w: 2400, h: 1350, objectPosition: "center 55%" },
  { src: "/photography/behind-the-lights.jpg", alt: "", w: 2400, h: 1800, objectPosition: "center" },
  { src: "/photography/palms-and-stone.jpg", alt: "", w: 2400, h: 1800, objectPosition: "center" },
];

export function Hero() {
  const metaRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const stripRef = useRef<HTMLImageElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const photoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cueRef = useRef<HTMLDivElement>(null);
  const cueLineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGsap();
    const reduce = prefersReducedMotion();
    const photos = photoRefs.current.filter(Boolean) as HTMLDivElement[];
    const els = {
      meta: metaRef.current,
      head: headRef.current,
      strip: stripRef.current,
      sub: subRef.current,
      cta: ctaRef.current,
      cue: cueRef.current,
    };

    if (reduce) {
      gsap.set(
        [els.meta, els.head, els.strip, els.sub, els.cta, els.cue, ...photos].filter(Boolean),
        { clearProps: "all" }
      );
      return;
    }

    gsap.set(els.meta, { opacity: 0, y: 8 });
    gsap.set(els.head, { yPercent: 100, opacity: 0 });
    gsap.set(els.strip, { opacity: 0, scale: 0.9, rotate: -2 });
    gsap.set(els.sub, { opacity: 0, y: 10 });
    gsap.set(els.cta, { opacity: 0, y: 8 });
    gsap.set(els.cue, { opacity: 0 });
    photos.forEach((p) => gsap.set(p, { clipPath: "inset(100% 0% 0% 0%)" }));
    photos.forEach((p) => {
      const img = p.querySelector("[data-img]");
      if (img) gsap.set(img, { scale: 1.06 });
    });

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
    tl.to(els.meta, { opacity: 1, y: 0, duration: 0.45 })
      .to(els.head, { yPercent: 0, opacity: 1, duration: 0.75 }, "-=0.25")
      .to(els.strip, { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: "power2.out" }, "-=0.42")
      .to(els.sub, { opacity: 1, y: 0, duration: 0.45 }, "-=0.3")
      .to(els.cta, { opacity: 1, y: 0, duration: 0.4 }, "-=0.28")
      .to(photos, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, stagger: 0.1 }, "-=0.25")
      .to(
        photos.map((p) => p.querySelector("[data-img]")).filter(Boolean),
        { scale: 1, duration: 0.9, stagger: 0.1 },
        "<"
      )
      .to(els.cue, { opacity: 1, duration: 0.4 }, "-=0.3");

    gsap.fromTo(cueLineRef.current, { scaleY: 0.3 }, { scaleY: 1, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut" });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      tl.play();
    };

    let introAlready = true;
    try {
      introAlready = window.sessionStorage.getItem("portfolioIntroPlayed") === "1";
    } catch {
      introAlready = true;
    }

    if (introAlready) {
      play();
    } else {
      window.addEventListener("intro:done", play, { once: true });
    }
    const safety = window.setTimeout(play, 2200);

    return () => {
      window.removeEventListener("intro:done", play);
      window.clearTimeout(safety);
      tl.kill();
    };
  }, []);

  return (
    <div className="flex min-h-[100svh] flex-col tab:min-h-0">
      <div className="mx-auto flex w-full max-w-[1240px] flex-none items-center justify-between gap-4 px-5 pt-[18px] text-[12.5px] tab:max-w-[1260px] tab:px-[30px] desk:max-w-[1268px] desk:px-[34px]">
        <div ref={metaRef} className="flex w-full items-center justify-between gap-4">
          <span className="inline-flex items-center gap-[7px] whitespace-nowrap text-ink-tertiary">
            <span className="h-1.5 w-1.5 flex-none rounded-full bg-ink" />
            Open to opportunities
          </span>
          <span className="whitespace-nowrap text-ink-tertiary">Based in Tempe · AZ</span>
        </div>
      </div>

      <section className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col items-center justify-center gap-5 px-5 py-[52px] tab:max-w-[1260px] tab:gap-[26px] tab:px-[30px] tab:py-10 desk:max-w-[1268px] desk:px-[34px]">
        <h1 className="m-0 max-w-full text-center text-[32px] font-medium leading-[1.24] tracking-[-0.03em] text-balance tab:max-w-[880px] tab:text-[42px] desk:text-[52px]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span ref={headRef} className="block">
              Hey, Deep here{" "}
              <Image
                ref={stripRef}
                src="/images/hero/strip-architecture.png"
                alt="Deep Chadamiya"
                width={626}
                height={626}
                className="inline-block h-7 w-[72px] rounded-[13px] bg-image-bg align-[-0.18em] object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:scale-[1.06] tab:h-10 tab:w-[106px] tab:rounded-[17px]"
              />{" "}
              I design and build thoughtful digital experiences.
            </span>
          </span>
        </h1>
        <p ref={subRef} className="m-0 max-w-full text-center text-[16.5px] leading-[1.66] text-ink-muted text-pretty tab:max-w-[560px]">
          I work across software, product design, UX, and interactive technology, taking ideas from early systems
          thinking to working products.
        </p>
        <Link
          ref={ctaRef}
          href="/about"
          className="group inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-[9px] bg-accent px-[22px] text-[13.5px] font-medium text-accent-cream transition-[background,transform] duration-[220ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:bg-accent-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.985]"
        >
          About Me
        </Link>
      </section>

      <section className="mx-auto w-full max-w-[1240px] flex-none px-5 pb-0 tab:max-w-[1260px] tab:px-[30px] tab:pb-8 desk:max-w-[1268px] desk:px-[34px]">
        {/*
          Mobile: one wide primary shot + two small supporting shots, to keep
          the photography without it consuming most of the viewport height.
          Tablet+ restores the original even 3-column row, untouched.
        */}
        <div className="grid grid-cols-2 gap-3 [grid-template-areas:'a_a'_'b_c'] tab:grid-cols-3 tab:gap-3.5 tab:[grid-template-areas:none]">
          {HERO_PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              ref={(el) => {
                photoRefs.current[i] = el;
              }}
              className={[
                "group max-h-none overflow-hidden rounded-xl bg-image-bg tab:aspect-[3/2] tab:max-h-[250px] tab:[grid-area:auto]",
                i === 0 ? "aspect-[16/9] [grid-area:a]" : "aspect-square",
                i === 1 ? "[grid-area:b]" : "",
                i === 2 ? "[grid-area:c]" : "",
              ].join(" ")}
            >
              <Image
                data-img
                src={photo.src}
                alt={photo.alt}
                width={photo.w}
                height={photo.h}
                priority={i === 0}
                sizes={i === 0 ? "(min-width: 810px) 33vw, 100vw" : "(min-width: 810px) 33vw, 50vw"}
                style={{ objectPosition: photo.objectPosition }}
                className="block h-full w-full object-cover transition-transform duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.022]"
              />
            </div>
          ))}
        </div>
        <div ref={cueRef} className="hidden flex-col items-center gap-2 pt-[26px] tab:flex">
          <span className="text-[11px] font-medium tracking-[0.2em] text-ink-num">SCROLL</span>
          <span ref={cueLineRef} className="h-[22px] w-px origin-top bg-line-strong" />
        </div>
      </section>
    </div>
  );
}
