import Image from "next/image";
import { WorkCover } from "@/components/work/WorkCover";

export type Hotspot = { index: number; x: number; y: number };
export type Annotation = { index: number; title: string; body: string };

/**
 * x/y are percentages measured directly against the source image (not the
 * rendered box), so hotspots stay correctly placed at any width as long as
 * `aspect` matches the image's real ratio — no cropping to drift against.
 */
export function AnnotatedScreen({
  src,
  alt,
  caption,
  tag,
  aspect = "aspect-[16/10]",
  hotspots,
  annotations,
}: {
  src: string;
  alt: string;
  caption: string;
  tag?: string;
  aspect?: string;
  hotspots: Hotspot[];
  annotations: Annotation[];
}) {
  return (
    <figure className="m-0 flex flex-col gap-6">
      <div className="relative">
        <WorkCover className={aspect}>
          <Image data-img src={src} alt={alt} fill sizes="(min-width: 1200px) 1160px, 100vw" className="object-cover object-top" />
          {tag && (
            <span className="absolute left-3.5 top-3.5 inline-flex h-[26px] items-center rounded-md bg-ink/85 px-2.5 text-[12px] font-medium tracking-[0.03em] text-accent-cream backdrop-blur-sm">
              {tag}
            </span>
          )}
        </WorkCover>
        {hotspots.map((h) => (
          <span
            key={h.index}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            aria-hidden
            className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent-cream bg-accent text-[12px] font-semibold text-accent-cream shadow-[0_1px_6px_rgba(0,0,0,0.35)]"
          >
            {h.index}
          </span>
        ))}
      </div>
      <figcaption className="text-[13px] leading-[1.5] text-ink-faint">{caption}</figcaption>
      <div className="grid grid-cols-1 gap-5 tab:grid-cols-2">
        {annotations.map((a) => (
          <div key={a.index} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong text-[11.5px] font-semibold text-ink-secondary">
              {a.index}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-[13.5px] font-medium tracking-[-0.01em]">{a.title}</span>
              <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">{a.body}</p>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
