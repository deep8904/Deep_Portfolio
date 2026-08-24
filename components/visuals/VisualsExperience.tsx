"use client";

import { useMemo, useRef, useState } from "react";
import { Filters } from "@/components/visuals/Filters";
import { Gallery } from "@/components/visuals/Gallery";
import { Lightbox } from "@/components/visuals/Lightbox";
import { PHOTOS } from "@/lib/photography-data";

export function VisualsExperience() {
  const [category, setCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const photos = useMemo(
    () => (category === "All" ? PHOTOS : PHOTOS.filter((p) => p.category === category)),
    [category]
  );

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
