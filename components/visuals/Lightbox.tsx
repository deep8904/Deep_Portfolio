"use client";

import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/lib/data";

const btnBase =
  "absolute flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-accent-cream transition-colors duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:bg-white/[0.14]";

export function Lightbox({
  photo,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  photo: Photo | null;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (!photo) return;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [photo, onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photograph viewer"
      tabIndex={-1}
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(10,10,10,0.78)] p-5 backdrop-blur-[22px] tab:p-10"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className={`${btnBase} right-4 top-4 tab:right-[26px] tab:top-[26px]`}
      >
        <X size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photograph"
        className={`${btnBase} left-2.5 top-1/2 -translate-y-1/2 tab:left-[26px]`}
      >
        <ChevronLeft size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photograph"
        className={`${btnBase} right-2.5 top-1/2 -translate-y-1/2 tab:right-[26px]`}
      >
        <ChevronRight size={16} strokeWidth={2} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 44) (dx < 0 ? onNext : onPrev)();
          touchX.current = null;
        }}
        className="flex max-w-[94vw] flex-col items-center gap-4"
      >
        <div
          className="relative max-h-[68vh] max-w-[94vw] overflow-hidden rounded-[10px] bg-[#1c1b19] tab:max-h-[82vh] tab:max-w-[90vw]"
          style={{
            aspectRatio: `${photo.width}/${photo.height}`,
            width: `min(90vw, calc(75vh * ${(photo.width / photo.height).toFixed(4)}))`,
          }}
        >
          <span
            className="absolute inset-0"
            style={{ background: "repeating-linear-gradient(135deg,#2b2a28 0 11px,#242322 11px 22px)" }}
          />
          <span className="absolute inset-0 flex items-center justify-center px-5 text-center text-[11px] tracking-[0.08em] text-ink-faint">
            {photo.placeholderLabel}
          </span>
        </div>
        <div className="flex max-w-[560px] flex-col items-center gap-1 text-center text-accent-cream">
          <span className="text-sm font-medium">{photo.title}</span>
          <span className="mt-1 text-[11px] tracking-[0.06em] text-ink-faint">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
