"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";

export type Chapter = { id: string; label: string };

/**
 * Sticky only at the `nav:` breakpoint (1200px), where the desktop Sidebar
 * replaces MobileNav — MobileNav has its own sticky top bar below that, and
 * stacking two sticky bars there would fight each other. Below `nav:` this
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

  return (
    <nav
      aria-label="Case study sections"
      className="z-10 border-y border-line-soft bg-bg/93 backdrop-blur-[10px] nav:sticky nav:top-0"
    >
      <Container>
        <ul className="m-0 flex list-none gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] tab:py-3 [&::-webkit-scrollbar]:hidden">
          {chapters.map((c) => (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
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
