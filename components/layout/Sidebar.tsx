"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Camera, CircleUser, FileText } from "lucide-react";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/data";

const ICONS = { home: Home, work: Briefcase, visuals: Camera, about: CircleUser, resume: FileText };

function isActive(pathname: string, id: string) {
  if (id === "home") return pathname === "/";
  if (id === "work") return pathname.startsWith("/work");
  return pathname.startsWith(`/${id}`);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-[214px] flex-col justify-between gap-8 overflow-y-auto overflow-x-hidden bg-sidebar p-[26px_16px] tab:flex desk:w-[264px] desk:p-[30px_20px]">
      <div>
        <Link href="/" className="group mb-14 flex items-center gap-[11px]">
          <Image
            src="/images/profile/avatar.png"
            alt=""
            width={38}
            height={38}
            className="h-[38px] w-[38px] flex-none rounded-full bg-image-bg object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
          />
          <span className="flex flex-col gap-0.5">
            <span className="whitespace-nowrap text-[15px] font-semibold tracking-[-0.012em]">Deep Chadamiya</span>
            <span className="whitespace-nowrap text-[11px] font-medium tracking-[0.13em] text-ink-faint">
              PRODUCT · DESIGN · DEV
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.id];
            const active = isActive(pathname, item.id);
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex h-11 items-center gap-3 rounded-[11px] px-3.5 text-[14.5px] font-medium transition-all duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
                  "hover:translate-x-[3px] hover:bg-surface-hover hover:text-ink active:scale-[0.99]",
                  active ? "bg-surface-active text-ink shadow-[0_1px_2px_rgba(20,18,16,0.06)]" : "text-ink-tertiary",
                ].join(" ")}
              >
                <Icon size={17} strokeWidth={1.6} className="flex-none opacity-85" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <nav aria-label="Social" className="flex flex-col gap-[13px]">
        <span className="text-[13px] text-ink-faint">Follow me</span>
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener"
            aria-label={`${s.label} (opens in a new tab)`}
            className="w-fit whitespace-nowrap text-[13.5px] text-ink-secondary transition-all duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:translate-x-1 hover:text-ink"
          >
            {s.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
