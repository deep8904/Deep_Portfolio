import Image from "next/image";
import { WorkCover } from "@/components/work/WorkCover";

export function CaseStudyFigure({
  src,
  alt,
  caption,
  tag,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1200px) 1160px, 100vw",
}: {
  src: string;
  alt: string;
  caption: string;
  tag?: string;
  aspect?: string;
  sizes?: string;
}) {
  return (
    <figure className="m-0">
      <WorkCover className={aspect}>
        <Image data-img src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
        {tag && (
          <span className="absolute left-3.5 top-3.5 inline-flex h-[26px] items-center rounded-md bg-ink/85 px-2.5 text-[11px] font-medium tracking-[0.03em] text-accent-cream backdrop-blur-sm">
            {tag}
          </span>
        )}
      </WorkCover>
      <figcaption className="mt-3 text-[13px] leading-[1.5] text-ink-faint">{caption}</figcaption>
    </figure>
  );
}
