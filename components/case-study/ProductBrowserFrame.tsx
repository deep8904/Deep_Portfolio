import Image from "next/image";
import { Lock } from "lucide-react";
import clsx from "clsx";

/**
 * A restrained browser-chrome presentation for a real product screenshot —
 * traffic-light dots, a tab, an address bar — so the screen itself reads as
 * "the actual live product" without needing any overlay on the UI. The
 * screenshot stays completely untouched; every annotation lives outside
 * this frame, in prose beside or below it.
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
}: {
  src: string;
  alt: string;
  url: string;
  title?: string;
  caption?: string;
  aspect?: string;
  sizes?: string;
  dark?: boolean;
}) {
  return (
    <figure className="m-0">
      <div
        className={clsx(
          "overflow-hidden rounded-2xl border shadow-[0_30px_70px_-24px_rgba(20,16,12,0.35)]",
          dark ? "border-white/10 bg-[#1c1a18]" : "border-line-strong bg-surface-raised"
        )}
      >
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
        <div className={clsx("relative w-full overflow-hidden", aspect)}>
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-[13px] leading-[1.5] text-ink-faint">{caption}</figcaption>}
    </figure>
  );
}
