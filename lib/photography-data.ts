export type Photo = {
  id: string;
  slug: string;
  title: string;
  src: string;
  category: string;
  location: string | null;
  date: string | null;
  description: string | null;
  alt: string;
  width: number;
  height: number;
  featured: boolean;
  sortOrder: number;
  /** Traceability only — never rendered in the UI. */
  originalFilename: string;
};

/**
 * First published pass of real photography (19 of a planned ~24-28). The
 * remainder is held back — not cut — because Google Drive's anonymous-link
 * download throttle hasn't cleared for those specific files yet, and shipping
 * them as low-res previews would mean publishing images we can't verify at
 * full quality. See docs/photography-manifest.md for the complete inventory,
 * including everything still pending recovery.
 *
 * Sequenced editorially (orientation/color/mood alternation), not grouped by
 * category, so "All" reads as one considered sequence rather than clusters.
 */
const RAW_PHOTOS: Omit<Photo, "sortOrder">[] = [
  {
    id: "gilded", slug: "gilded", title: "Gilded", src: "/photography/gilded.jpg",
    category: "Architecture", location: null, date: "January 2026", description: null,
    alt: "Ornate gold-leaf altarpiece inside a historic mission church.",
    width: 1350, height: 2400, featured: true, originalFilename: "IMG_7158.jpg",
  },
  {
    id: "teal-wheel", slug: "teal-wheel", title: "Teal Wheel", src: "/photography/teal-wheel.jpg",
    category: "Automotive", location: "Mesa, Arizona", date: "March 2024", description: null,
    alt: "Close-up of a bright teal sports car's wheel and brake caliper.",
    width: 2400, height: 2400, featured: true, originalFilename: "IMG_5876.jpg",
  },
  {
    id: "desert-hauler", slug: "desert-hauler", title: "Desert Hauler", src: "/photography/desert-hauler.jpg",
    category: "Places", location: "Pinal County, Arizona", date: "November 2025", description: null,
    alt: "Vintage red pickup truck parked on a desert roadside under a cloudy sky.",
    width: 1800, height: 2400, featured: true, originalFilename: "IMG_6939.jpg",
  },
  {
    id: "watching-the-water", slug: "watching-the-water", title: "Watching the Water", src: "/photography/watching-the-water.jpg",
    category: "Nature", location: "Gilbert, Arizona", date: "March 2025", description: null,
    alt: "White egret standing on a railing overlooking rippling blue water.",
    width: 1350, height: 2400, featured: true, originalFilename: "IMG_7314.jpg",
  },
  {
    id: "classic-blue", slug: "classic-blue", title: "Classic Blue", src: "/photography/classic-blue.jpg",
    category: "Automotive", location: "Scottsdale, Arizona", date: "December 2024", description: null,
    alt: "Vintage blue Porsche 911 parked at a car meet.",
    width: 2400, height: 1800, featured: false, originalFilename: "IMG_0535.jpg",
  },
  {
    id: "mission-light", slug: "mission-light", title: "Mission Light", src: "/photography/mission-light.jpg",
    category: "Architecture", location: "Tempe, Arizona", date: "January 2025", description: null,
    alt: "Mission-style church facade lit warmly at dusk with a stained glass window.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_1528.jpg",
  },
  {
    id: "into-the-desert", slug: "into-the-desert", title: "Into the Desert", src: "/photography/into-the-desert.jpg",
    category: "Places", location: null, date: "October 2024", description: null,
    alt: "Off-road SUV parked on a desert road with red rock formations in the distance.",
    width: 2400, height: 1800, featured: false, originalFilename: "IMG_8339.jpg",
  },
  {
    id: "among-the-trees", slug: "among-the-trees", title: "Among the Trees", src: "/photography/among-the-trees.jpg",
    category: "Nature", location: null, date: "May 2025", description: null,
    alt: "Multi-tiered pagoda tower rising through surrounding green trees.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_4028.jpg",
  },
  {
    id: "red-in-the-lot", slug: "red-in-the-lot", title: "Red in the Lot", src: "/photography/red-in-the-lot.jpg",
    category: "Automotive", location: "Mesa, Arizona", date: "March 2024", description: null,
    alt: "Red sports car parked in a lot with mountains in the background.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_5608.jpg",
  },
  {
    id: "clock-tower", slug: "clock-tower", title: "Clock Tower", src: "/photography/clock-tower.jpg",
    category: "Architecture", location: "Phoenix, Arizona", date: "December 2024", description: null,
    alt: "Bell tower of a brick building against a dramatic cloudy sky.",
    width: 1920, height: 2400, featured: false, originalFilename: "IMG_0675.jpg",
  },
  {
    id: "dusk-walk", slug: "dusk-walk", title: "Dusk Walk", src: "/photography/dusk-walk.jpg",
    category: "Places", location: "Tempe, Arizona", date: "February 2024", description: null,
    alt: "Campus street at dusk lined with palm trees and lit buildings.",
    width: 2400, height: 1350, featured: false, originalFilename: "IMG_3674.jpg",
  },
  {
    id: "garden-pavilion", slug: "garden-pavilion", title: "Garden Pavilion", src: "/photography/garden-pavilion.jpg",
    category: "Nature", location: null, date: "May 2025", description: null,
    alt: "Traditional wooden pavilion surrounded by manicured garden trees.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_4015.jpg",
  },
  {
    id: "teal-taillight", slug: "teal-taillight", title: "Teal Taillight", src: "/photography/teal-taillight.jpg",
    category: "Automotive", location: "Mesa, Arizona", date: "March 2024", description: null,
    alt: "Close-up of a bright teal sports car's taillight.",
    width: 2400, height: 1714, featured: false, originalFilename: "IMG_5877.jpg",
  },
  {
    id: "spires-at-night", slug: "spires-at-night", title: "Spires at Night", src: "/photography/spires-at-night.jpg",
    category: "Architecture", location: "Chino Hills, California", date: "October 2025", description: null,
    alt: "Ornately carved temple spires illuminated at night.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_6551.jpg",
  },
  {
    id: "storm-light", slug: "storm-light", title: "Storm Light", src: "/photography/storm-light.jpg",
    category: "Places", location: null, date: "March 2024", description: null,
    alt: "Streetlight against a dramatic dark storm cloud at dusk.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_3338.jpg",
  },
  {
    id: "yellow-thing", slug: "yellow-thing", title: "Yellow Thing", src: "/photography/yellow-thing.jpg",
    category: "Automotive", location: "Tempe, Arizona", date: "March 2024", description: null,
    alt: "Small yellow vintage utility vehicle parked on a street corner.",
    width: 1600, height: 2400, featured: false, originalFilename: "IMG_5976.jpg",
  },
  {
    id: "switchback", slug: "switchback", title: "Switchback", src: "/photography/switchback.jpg",
    category: "Architecture", location: "Tempe, Arizona", date: "February 2024", description: null,
    alt: "Exterior metal staircase zigzagging up a brick building beside a tree.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_3664.jpg",
  },
  {
    id: "blue-hour-building", slug: "blue-hour-building", title: "Blue Hour Building", src: "/photography/blue-hour-building.jpg",
    category: "Places", location: "Tempe, Arizona", date: "February 2024", description: null,
    alt: "Modern building illuminated at dusk under a deep blue sky.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_3678.jpg",
  },
  {
    id: "brick-and-glass", slug: "brick-and-glass", title: "Brick and Glass", src: "/photography/brick-and-glass.jpg",
    category: "Architecture", location: "Tempe, Arizona", date: "March 2024", description: null,
    alt: "Brutalist brick building corner with narrow windows against a blue sky.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_5944.jpg",
  },
];

export const PHOTOS: Photo[] = RAW_PHOTOS.map((p, i) => ({ ...p, sortOrder: i }));

const CATEGORY_ORDER = ["Architecture", "Places", "Nature", "Details", "Automotive", "Street", "Events"];

/** Filters are generated only from categories that actually have published photos. */
export const PHOTO_CATEGORIES = CATEGORY_ORDER.filter((cat) => PHOTOS.some((p) => p.category === cat));
