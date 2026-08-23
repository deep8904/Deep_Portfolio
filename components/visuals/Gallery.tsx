import type { Photo } from "@/lib/data";

export function Gallery({ photos, onOpen }: { photos: Photo[]; onOpen: (index: number) => void }) {
  if (photos.length === 0) {
    return <p className="py-10 text-center text-sm text-ink-faint">No photographs in this collection yet.</p>;
  }

  return (
    <div className="mt-[22px] columns-1 gap-2.5 tab:mt-7 tab:columns-2 tab:gap-3.5 desk:columns-3 desk:gap-4">
      {photos.map((photo, i) => (
        <button
          key={photo.id}
          type="button"
          onClick={() => onOpen(i)}
          aria-label={photo.alt}
          style={{ aspectRatio: `${photo.width}/${photo.height}`, animationDelay: `${Math.min(i, 8) * 40}ms` }}
          className="group relative mb-2.5 block w-full break-inside-avoid animate-[enter_460ms_var(--ease-std)_both] overflow-hidden rounded-[10px] border-0 bg-transparent p-0 tab:mb-3.5 desk:mb-4"
        >
          <span
            className="absolute inset-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.02]"
            style={{ background: "repeating-linear-gradient(135deg,#E6E4DF 0 11px,#E0DED8 11px 22px)" }}
          />
          <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-[10px] font-medium tracking-[0.08em] text-ink-num">
            {photo.placeholderLabel}
          </span>
          <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 px-3.5 py-3 opacity-0 transition-opacity duration-[280ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(20,18,16,0.66), rgba(20,18,16,0))" }}>
            <span className="text-xs font-medium text-accent-cream">{photo.title}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
