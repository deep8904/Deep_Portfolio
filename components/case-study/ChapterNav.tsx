"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";

export type Chapter = { id: string; label: string };

/**
 * Sticky only at `tab:` (810px), which is exactly where this site's Sidebar
 * replaces MobileNav — MobileNav has its own sticky top bar below that, and
 * stacking two sticky bars there would fight each other. Below `tab:` this
 * renders as a plain, horizontally-scrollable pill row in normal flow.
 */
export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActive(topMost.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [chapters]);

  // A hash jump this far down a long case study can land past this page's
  // scroll-triggered [data-reveal] sections before GSAP ScrollTrigger (driven
  // by Lenis) reconciles with the new scroll position — leaving the target
  // section stuck at opacity 0 until the reader scrolls again by hand. Rather
  // than depend on that reconciliation, force every already-passed reveal
  // element to its finished state directly: correct regardless of how the
  // Lenis/ScrollTrigger sync behaves, and an instant reveal reads as more
  // intentional than a staggered fade-in for a jump the reader asked for.
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "auto", block: "start" });
    history.replaceState(null, "", `#${id}`);

    const passed = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => el.getBoundingClientRect().top < window.innerHeight
    );
    if (passed.length) gsap.set(passed, { opacity: 1, y: 0, clearProps: "transform" });
  }

  return (
    <nav
      aria-label="Case study sections"
      className="z-10 border-y border-line-soft bg-bg/93 backdrop-blur-[10px] tab:sticky tab:top-0"
    >
      <Container>
        <ul className="m-0 flex list-none gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] tab:py-3 [&::-webkit-scrollbar]:hidden">
          {chapters.map((c) => (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                onClick={(e) => handleClick(e, c.id)}
                aria-current={active === c.id ? "true" : undefined}
                className={clsx(
                  "inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-200",
                  active === c.id ? "bg-ink text-accent-cream" : "text-ink-secondary hover:text-ink"
                )}
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
