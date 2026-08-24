"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/lib/photography-data";

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (!photo) return;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();

      if (e.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
      if (!focusable || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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
      ref={dialogRef}
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
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="90vw"
            priority
            className="object-contain"
          />
        </div>
        <div className="flex max-w-[560px] flex-col items-center gap-1 text-center text-accent-cream">
          <span className="text-sm font-medium">{photo.title}</span>
          {(photo.location || photo.date) && (
            <span className="text-[11px] tracking-[0.04em] text-ink-faint">
              {[photo.location, photo.date].filter(Boolean).join(" — ")}
            </span>
          )}
          {photo.description && (
            <p className="mt-1 max-w-[46ch] text-[12.5px] leading-[1.6] text-ink-faint">{photo.description}</p>
          )}
          <span className="mt-1 text-[11px] tracking-[0.06em] text-ink-faint">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
