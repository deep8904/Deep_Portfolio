"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "@/lib/data";

function isActive(pathname: string, id: string) {
  if (id === "home") return pathname === "/";
  if (id === "work") return pathname.startsWith("/work");
  return pathname.startsWith(`/${id}`);
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(65);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  // Measured rather than hardcoded so the drawer still lines up exactly under
  // the header if its height ever shifts (font swap, text wrap at an edge width).
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = () => setHeaderHeight(header.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    const firstLink = menu?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    // Fixed overlay, so this only stops the page behind it from scrolling —
    // it does not affect the panel's own layout the way the old in-flow
    // sticky panel did (that pushed page content down when opened).
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = [
        toggleRef.current,
        ...(menu ? Array.from(menu.querySelectorAll<HTMLElement>("a")) : []),
      ].filter(Boolean) as HTMLElement[];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div className="nav:hidden">
      <header
        ref={headerRef}
        className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-line-soft bg-bg/93 px-[18px] py-3 backdrop-blur-[10px]"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative h-[34px] w-[34px] flex-none overflow-hidden rounded-full bg-image-bg">
            <Image src="/images/profile/avatar.png" alt="" fill sizes="34px" priority className="object-cover" />
          </span>
          <span className="flex flex-col gap-px">
            <span className="text-[14.5px] font-semibold tracking-[-0.01em]">Deep Chadamiya</span>
            <span className="whitespace-nowrap text-[12px] font-medium tracking-[0.13em] text-ink-faint">
              PRODUCT · DESIGN · DEV
            </span>
          </span>
        </Link>
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          className="h-10 rounded-full border border-line-strong bg-surface px-4 text-xs font-medium tracking-[0.06em] text-ink transition-colors duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] active:scale-[0.97]"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      {open && (
        <>
          {/* Sits below the (opaque, higher z-index) header, so it visually
              starts right under it without needing to know its height. */}
          <div
            className="fixed inset-0 z-20 bg-ink/25 backdrop-blur-[2px]"
            style={{ animation: "enterSoft 200ms ease-out" }}
            aria-hidden="true"
            onClick={close}
          />
          <div
            id="mobile-nav-menu"
            ref={menuRef}
            className="fixed inset-x-0 z-25 max-h-[calc(100dvh-var(--mnav-h))] overflow-y-auto border-b border-line-soft bg-sidebar shadow-[0_16px_32px_rgba(20,18,16,0.14)]"
            style={{ top: headerHeight, "--mnav-h": `${headerHeight}px` } as React.CSSProperties}
          >
            <nav aria-label="Primary" className="flex flex-col px-5 pb-[calc(18px+env(safe-area-inset-bottom))] pt-1.5">
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item.id);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex h-[52px] items-center justify-between border-b border-line-soft px-1 text-[17px] font-medium transition-colors duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] active:opacity-60",
                      active ? "text-ink" : "text-ink-tertiary",
                    ].join(" ")}
                  >
                    <span>{item.label}</span>
                    <span
                      className={[
                        "h-1.5 w-1.5 rounded-full transition-colors duration-200",
                        active ? "bg-ink" : "bg-transparent",
                      ].join(" ")}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
