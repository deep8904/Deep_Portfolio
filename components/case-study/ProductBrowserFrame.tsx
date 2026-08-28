import Image from "next/image";
import { Lock, ChevronLeft, ChevronRight, RotateCw, MoreVertical, X, Plus } from "lucide-react";
import clsx from "clsx";

/**
 * A restrained browser-chrome presentation for a real product screenshot,
 * so the screen itself reads as "the actual live product" without needing
 * any overlay on the UI. The screenshot stays completely untouched; every
 * annotation lives outside this frame, in prose beside or below it.
 *
 * `chrome="browser"` (default) is a full desktop-browser chrome — tab strip
 * plus a nav/address row — for regular in-content screenshots. `chrome="mac"`
 * is the minimal macOS traffic-light + address-bar treatment, reserved for a
 * single full-bleed desktop hero shot per case study.
 */
export function ProductBrowserFrame({
  src,
  alt,
  url,
  title,
  caption,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1200px) 1160px, 100vw",
  dark = false,
  chrome = "browser",
}: {
  src: string;
  alt: string;
  url: string;
  title?: string;
  caption?: string;
  aspect?: string;
  sizes?: string;
  dark?: boolean;
  chrome?: "mac" | "browser";
}) {
  return (
    <figure className="m-0 min-w-0">
      <div
        className={clsx(
          "overflow-hidden rounded-2xl border shadow-[0_30px_70px_-24px_rgba(20,16,12,0.35)]",
          dark ? "border-white/10 bg-[#1c1a18]" : "border-line-strong bg-surface-raised"
        )}
      >
        {chrome === "mac" ? (
          <>
            <div className="flex items-center gap-3 px-4 pt-3">
              <div className="flex shrink-0 gap-[6px]">
                <span className="h-[10px] w-[10px] rounded-full bg-[#ed6a5e]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#f4bf4f]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#61c454]" />
              </div>
              {title && (
                <div
                  className={clsx(
                    "ml-2 flex h-[24px] max-w-[220px] items-center truncate rounded-t-[6px] px-3 text-[11.5px] font-medium",
                    dark ? "bg-white/[0.06] text-white/70" : "bg-bg text-ink-secondary"
                  )}
                >
                  {title}
                </div>
              )}
            </div>
            <div className="px-3 pb-3 pt-2.5">
              <div
                className={clsx(
                  "flex items-center gap-2 rounded-[7px] px-3 py-[7px]",
                  dark ? "bg-white/[0.06]" : "bg-bg"
                )}
              >
                <Lock size={10} strokeWidth={2} className={dark ? "text-white/40" : "text-ink-faint"} />
                <span className={clsx("truncate text-[11.5px]", dark ? "text-white/55" : "text-ink-faint")}>{url}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={clsx("flex items-center gap-1 px-2 pt-2", dark ? "bg-white/[0.03]" : "bg-bg")}>
              <div
                className={clsx(
                  "flex h-[30px] max-w-[200px] items-center gap-2 truncate rounded-t-[8px] px-3 text-[12px] font-medium",
                  dark ? "bg-[#1c1a18] text-white/75" : "bg-surface-raised text-ink-secondary"
                )}
              >
                <span className={clsx("h-[7px] w-[7px] shrink-0 rounded-full", dark ? "bg-white/30" : "bg-ink-faint/40")} />
                <span className="truncate">{title ?? url}</span>
                <X size={12} strokeWidth={2} className={clsx("ml-1 shrink-0", dark ? "text-white/40" : "text-ink-faint")} />
              </div>
              <Plus size={13} strokeWidth={2} className={clsx("ml-1 shrink-0", dark ? "text-white/30" : "text-ink-faint/70")} />
            </div>
            <div className="flex items-center gap-3 px-3.5 pb-2.5 pt-2">
              <div className="flex shrink-0 items-center gap-2.5">
                <ChevronLeft size={15} strokeWidth={2.25} className={dark ? "text-white/30" : "text-ink-faint/60"} />
                <ChevronRight size={15} strokeWidth={2.25} className={dark ? "text-white/20" : "text-ink-faint/35"} />
                <RotateCw size={12.5} strokeWidth={2.25} className={dark ? "text-white/40" : "text-ink-faint"} />
              </div>
              <div
                className={clsx(
                  "flex min-w-0 flex-1 items-center gap-2 rounded-full px-3.5 py-[7px]",
                  dark ? "bg-white/[0.06]" : "bg-bg"
                )}
              >
                <Lock size={10} strokeWidth={2} className={dark ? "text-white/40" : "text-ink-faint"} />
                <span className={clsx("truncate text-[11.5px]", dark ? "text-white/55" : "text-ink-faint")}>{url}</span>
              </div>
              <MoreVertical size={15} strokeWidth={2.25} className={clsx("shrink-0", dark ? "text-white/30" : "text-ink-faint/60")} />
            </div>
          </>
        )}
        <div className={clsx("relative w-full overflow-hidden", aspect)}>
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-[13px] leading-[1.5] text-ink-faint">{caption}</figcaption>}
    </figure>
  );
}
