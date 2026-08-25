"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "@/lib/data";

function isActive(pathname: string, id: string) {
  if (id === "home") return pathname === "/";
  if (id === "work") return pathname.startsWith("/work");
  return pathname.startsWith(`/${id}`);
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    const firstLink = menu?.querySelector<HTMLElement>("a");
    firstLink?.focus();

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
    <div className="tab:hidden">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3.5 border-b border-line-soft bg-bg/93 px-[18px] py-3 backdrop-blur-[10px]">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/profile/avatar.png"
            alt=""
            width={34}
            height={34}
            className="h-[34px] w-[34px] rounded-full bg-image-bg object-cover"
          />
          <span className="flex flex-col gap-px">
            <span className="text-[14.5px] font-semibold tracking-[-0.01em]">Deep Chadamiya</span>
            <span className="whitespace-nowrap text-[11px] font-medium tracking-[0.13em] text-ink-faint">
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
        <div
          id="mobile-nav-menu"
          ref={menuRef}
          className="sticky top-[71px] z-29 border-b border-line-soft bg-sidebar"
        >
          <nav aria-label="Primary" className="flex flex-col px-5 pb-[18px] pt-1.5">
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
      )}
    </div>
  );
}
