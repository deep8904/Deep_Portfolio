import Image from "next/image";
import { Lock, ChevronLeft, ChevronRight, Home, Square, MoreVertical } from "lucide-react";
import clsx from "clsx";

/**
 * A phone-shaped device frame with a mobile Chrome browser's own chrome
 * (URL pill up top, back/forward/home/tabs/menu bar on the bottom) — the
 * mobile counterpart to ProductBrowserFrame. A portrait screenshot dropped
 * into a desktop browser window reads as pasted in; this reads as "the
 * actual phone screen," because it's framed the way a phone actually is.
 */
export function PhoneBrowserFrame({
  src,
  alt,
  url,
  caption,
  width = 300,
  aspect = "aspect-[860/1560]",
  dark = false,
}: {
  src: string;
  alt: string;
  url: string;
  caption?: string;
  width?: number;
  aspect?: string;
  dark?: boolean;
}) {
  return (
    <figure className="m-0 flex flex-col items-center gap-3">
      <div
        className="relative shrink-0 rounded-[36px] p-[9px] shadow-[0_30px_70px_-24px_rgba(20,16,12,0.4)]"
        style={{ width, background: dark ? "#141210" : "#1c1a17" }}
      >
        <div className="flex flex-col overflow-hidden rounded-[27px] ring-1 ring-inset ring-white/10">
          <div className={clsx("flex items-center gap-2 px-3 pb-2 pt-3.5", dark ? "bg-[#141210]" : "bg-[#1c1a17]")}>
            <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-white/[0.08] px-3 py-[7px]">
              <Lock size={9} strokeWidth={2} className="shrink-0 text-white/40" />
              <span className="truncate text-[10.5px] text-white/55">{url}</span>
            </div>
            <span className="flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-[5px] border border-white/25 text-[9px] font-semibold text-white/55">
              1
            </span>
          </div>
          <div className={clsx("relative w-full overflow-hidden", aspect)}>
            <Image src={src} alt={alt} fill sizes={`${width}px`} className="object-cover object-top" />
          </div>
          <div className={clsx("flex items-center justify-between px-4 py-2.5", dark ? "bg-[#141210]" : "bg-[#1c1a17]")}>
            <ChevronLeft size={15} strokeWidth={2} className="text-white/30" />
            <ChevronRight size={15} strokeWidth={2} className="text-white/20" />
            <Home size={13} strokeWidth={2} className="text-white/40" />
            <Square size={12} strokeWidth={2} className="text-white/40" />
            <MoreVertical size={14} strokeWidth={2} className="text-white/40" />
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="max-w-[320px] text-center text-[13px] leading-[1.5] text-ink-faint text-pretty">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
