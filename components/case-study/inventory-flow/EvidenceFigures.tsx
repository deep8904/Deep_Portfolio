import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { WorkCover } from "@/components/work/WorkCover";

const TAG_STYLES = {
  vanilla: "bg-ink/85 text-accent-cream",
  reference: "bg-[#4a3b33]/90 text-accent-cream",
  concept: "bg-[#3f5a26]/90 text-white",
} as const;

/** A real, attributed screenshot — vanilla Minecraft or another designer's
 * reference work. Never used for Deep's own solution screens. */
export function EvidenceFigure({
  src,
  alt,
  caption,
  tag,
  tagKind = "vanilla",
  aspect = "aspect-[16/10]",
  credit,
  href,
}: {
  src: string;
  alt: string;
  caption: string;
  tag: string;
  tagKind?: keyof typeof TAG_STYLES;
  aspect?: string;
  credit?: string;
  href?: string;
}) {
  return (
    <figure className="m-0 flex flex-col gap-2.5">
      <div className="relative">
        <WorkCover className={aspect}>
          <Image data-img src={src} alt={alt} fill sizes="(min-width: 1200px) 1160px, 100vw" className="object-contain bg-[#101010]" />
        </WorkCover>
        <span className={`absolute left-3 top-3 inline-flex h-6 items-center px-2.5 text-[11px] font-semibold tracking-[0.04em] backdrop-blur-sm ${TAG_STYLES[tagKind]}`}>
          {tag}
        </span>
      </div>
      <figcaption className="flex flex-col gap-1">
        <span className="text-[13px] leading-[1.5] text-ink-faint">{caption}</span>
        {credit && (
          <span className="flex items-center gap-1.5 text-[12px] font-medium text-ink-secondary">
            {credit}
            {href && (
              <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ink-faint hover:text-ink">
                View original <ExternalLink size={11} strokeWidth={2} />
              </a>
            )}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
