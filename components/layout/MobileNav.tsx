"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS } from "@/lib/data";

function isActive(pathname: string, id: string) {
  if (id === "home") return pathname === "/";
  if (id === "work") return pathname.startsWith("/work");
  return pathname.startsWith(`/${id}`);
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
            <span className="whitespace-nowrap text-[8.5px] font-medium tracking-[0.13em] text-ink-faint">
              PRODUCT · DESIGN · DEV
            </span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="h-10 rounded-full border border-line-strong bg-surface px-4 text-xs font-medium tracking-[0.06em] text-ink transition-colors duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] active:scale-[0.97]"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      {open && (
        <div className="sticky top-[71px] z-29 border-b border-line-soft bg-sidebar">
          <nav className="flex flex-col px-5 pb-[18px] pt-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.id);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="flex h-[52px] items-center justify-between border-b border-line-soft px-1 text-[17px] font-medium transition-colors duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] active:opacity-60"
                  style={{ color: active ? "#131210" : "#5D5C58" }}
                >
                  <span>{item.label}</span>
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-colors duration-200"
                    style={{ background: active ? "#131210" : "transparent" }}
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
