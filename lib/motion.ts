import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const EASE = "cubic-bezier(0.22,0.61,0.36,1)";
export const EASE_STD = "power2.out";
export const EASE_REVEAL = "power3.out";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Reveals every [data-reveal] element currently in the DOM as it scrolls
 * into view, batched + staggered like the source prototype. Call again
 * (via a pathname-keyed effect) after each route's content has painted.
 */
export function buildRevealScene(root: ParentNode = document): () => void {
  registerGsap();
  const reduce = prefersReducedMotion();
  const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
    (el) => !el.dataset.revealBound
  );
  els.forEach((el) => {
    el.dataset.revealBound = "1";
  });
  if (!els.length) return () => {};

  if (reduce) {
    gsap.set(els, { opacity: 1, y: 0, clearProps: "transform" });
    return () => {};
  }

  gsap.set(els, { opacity: 0, y: 22 });
  const triggers = ScrollTrigger.batch(els, {
    start: "top 86%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: EASE_REVEAL,
        stagger: 0.08,
        overwrite: true,
      }),
  });

  return () => triggers.forEach((t) => t.kill());
}
