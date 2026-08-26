"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Filters } from "@/components/visuals/Filters";
import { Gallery } from "@/components/visuals/Gallery";
import { Lightbox } from "@/components/visuals/Lightbox";
import { PHOTOS, PORTFOLIO_PHOTOS, PHOTO_CATEGORIES, ARCHIVE_CATEGORIES } from "@/lib/photography-data";

const INITIAL_ARCHIVE_BATCH = 40;
const ARCHIVE_BATCH_STEP = 24;

// The 34-photo curated set is fine to render in full on tablet/desktop's
// multi-column grid, but on a single mobile column it's an extremely long
// initial scroll. This is a separate reveal step from the archive below it —
// it only ever shows more of the *curated* set, never archive photos.
const MOBILE_CURATED_INITIAL = 16;
const MOBILE_CURATED_STEP = 16;

export function VisualsExperience() {
  const [category, setCategory] = useState("All");
  const [archiveMode, setArchiveMode] = useState(false);
  const [archiveBatch, setArchiveBatch] = useState(INITIAL_ARCHIVE_BATCH);
  const [curatedMobileBatch, setCuratedMobileBatch] = useState(MOBILE_CURATED_INITIAL);
  // Defaults to true (mobile-first) so the smaller batch is what SSR renders —
  // the common case, and it avoids over-fetching if JS is slow to hydrate.
  const [isMobile, setIsMobile] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 810px)");
    const update = () => setIsMobile(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const library = archiveMode ? PHOTOS : PORTFOLIO_PHOTOS;
  const categories = archiveMode ? ARCHIVE_CATEGORIES : PHOTO_CATEGORIES;

  const filtered = useMemo(
    () => (category === "All" ? library : library.filter((p) => p.category === category)),
    [library, category]
  );

  // Only the unfiltered "All" view is ever batched — a single category never has enough
  // photos to justify it (largest is 31), so filtering already keeps the render small.
  const isArchiveBatched = archiveMode && category === "All";
  const isCuratedBatched = !archiveMode && category === "All" && isMobile;

  const photos = isArchiveBatched
    ? filtered.slice(0, archiveBatch)
    : isCuratedBatched
      ? filtered.slice(0, curatedMobileBatch)
      : filtered;

  const hasMoreArchive = isArchiveBatched && archiveBatch < filtered.length;
  const hasMoreCurated = isCuratedBatched && curatedMobileBatch < filtered.length;

  const activePhoto = lightboxIndex !== null ? photos[lightboxIndex] ?? null : null;

  const step = (dir: 1 | -1) => {
    setLightboxIndex((idx) => {
      if (idx === null || !photos.length) return idx;
      return (idx + dir + photos.length) % photos.length;
    });
  };

  return (
    <>
      <div data-filter-row="">
        <Filters
          active={category}
          categories={categories}
          onChange={(cat) => {
            setCategory(cat);
            setLightboxIndex(null);
          }}
        />
      </div>
      <Gallery
        photos={photos}
        onOpen={(index, trigger) => {
          openerRef.current = trigger;
          setLightboxIndex(index);
        }}
      />
      <div className="mt-8 flex justify-center tab:mt-10">
        {!archiveMode ? (
          hasMoreCurated ? (
            <button
              type="button"
              onClick={() => setCuratedMobileBatch((n) => n + MOBILE_CURATED_STEP)}
              className="text-[13px] font-medium text-ink-muted underline decoration-line-strong decoration-1 underline-offset-4 transition-colors duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:text-ink"
            >
              Show {Math.min(MOBILE_CURATED_STEP, filtered.length - curatedMobileBatch)} more
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setArchiveMode(true)}
              className="text-[13px] font-medium text-ink-muted underline decoration-line-strong decoration-1 underline-offset-4 transition-colors duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:text-ink"
            >
              Explore full archive
            </button>
          )
        ) : (
          hasMoreArchive && (
            <button
              type="button"
              onClick={() => setArchiveBatch((n) => n + ARCHIVE_BATCH_STEP)}
              className="text-[13px] font-medium text-ink-muted underline decoration-line-strong decoration-1 underline-offset-4 transition-colors duration-[180ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:text-ink"
            >
              Load more
            </button>
          )
        )}
      </div>
      <Lightbox
        photo={activePhoto}
        index={lightboxIndex ?? 0}
        total={photos.length}
        onClose={() => {
          setLightboxIndex(null);
          openerRef.current?.focus();
          openerRef.current = null;
        }}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </>
  );
}
