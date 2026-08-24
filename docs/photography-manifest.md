# Photography ingestion manifest (private — not built into the public site)

This file lives under `docs/`, which Next.js never serves publicly (only `app/`,
`components/`, `lib/`, and `public/` reach the built site). It exists so a
title/category/status can be corrected later without re-deriving which source
photo it came from.

Source library: the owner's own full-resolution copy at
`/Users/deeppatel/Documents/photos/` (not committed to this repo — raw
originals never leave the owner's machine). An earlier pass of this project
worked from anonymous Google Drive links that Google throttled after ~79 of
141 files; that throttle is now moot since the owner supplied the complete
library directly. All 141 files have been verified as genuine full-resolution
originals (real camera `Make`/`Model` EXIF, no size cap).

Reusable web-copy pipeline: `scripts/photography/optimize-photos.mjs` (checked
into this repo). Give it a selection JSON (`[{ src, slug, rotate180? }, ...]`)
and it applies EXIF rotation, resizes to a 2400px long edge, encodes JPEG
quality 85 with mozjpeg, and strips all EXIF/GPS by omitting
`.withMetadata()`. Run it again whenever more images are cleared for
publication (e.g. once the owner clears the images below, or approves the
ASU event set).

## Published (27) — original → web copy → title → category

| Original folder/file | Web filename | Title | Category | Public location | Featured |
|---|---|---|---|---|---|
| Architecture/IMG_7158.jpg | gilded.jpg | Gilded | Architecture | *(null — see note)* | Yes |
| Cars & Bikes/IMG_5608.jpg | red-in-the-lot.jpg | Red in the Lot | Automotive | Mesa, Arizona | |
| ASu/IMG_3338.jpg | storm-light.jpg | Storm Light | Places | *(null — unverified)* | |
| Nature/IMG_0433.jpg | stone-garden.jpg | Stone Garden | Nature | Phoenix, Arizona | |
| Architecture/IMG_3664.jpg | switchback.jpg | Switchback | Architecture | Tempe, Arizona | |
| Cars & Bikes/IMG_5876.jpg | teal-wheel.jpg | Teal Wheel | Automotive | Mesa, Arizona | Yes |
| Skye/IMG_7029.jpg | waterfront-glow.jpg | Waterfront Glow | Places | *(null — no GPS on file)* | Yes |
| people/APC_0017.jpg | walking-alone.jpg | Walking Alone | Street | Mesa, Arizona | |
| Architecture/IMG_1528.jpg | mission-light.jpg | Mission Light | Architecture | Tempe, Arizona | |
| Cars & Bikes/IMG_5976.jpg | yellow-thing.jpg | Yellow Thing | Automotive | Tempe, Arizona | |
| Cars & Bikes/IMG_6939.jpg | desert-hauler.jpg | Desert Hauler | Places | Pinal County, Arizona | Yes |
| Nature/IMG_3975.jpg | pink-bloom.jpg | Pink Bloom | Nature | Fort Worth, Texas | |
| Architecture/IMG_0675.jpg | clock-tower.jpg | Clock Tower | Architecture | Phoenix, Arizona | |
| Cars & Bikes/IMG_0535.jpg | classic-blue.jpg | Classic Blue | Automotive | Scottsdale, Arizona | |
| Skye/IMG_1337.jpg | sunrise.jpg | Sunrise | Places | Yavapai County, Arizona | Yes |
| Animal/IMG_7314.jpg | watching-the-water.jpg | Watching the Water | Nature | Gilbert, Arizona | Yes |
| Architecture/IMG_5944.jpg | brick-and-glass.jpg | Brick and Glass | Architecture | Tempe, Arizona | |
| Cars & Bikes/IMG_5877.jpg | teal-taillight.jpg | Teal Taillight | Automotive | Mesa, Arizona | |
| Cars & Bikes/IMG_8339.jpg | into-the-desert.jpg | Into the Desert | Places | *(null — unverified)* | |
| Architecture/IMG_4028.jpg | among-the-trees.jpg | Among the Trees | Nature | Fort Worth, Texas | |
| ASu/IMG_3678.jpg | blue-hour-building.jpg | Blue Hour Building | Places | Tempe, Arizona | |
| ASu/IMG_1648.jpg | 8-02-pm.jpg | 8:02 PM | Details | Tempe, Arizona | |
| IMG_6930.jpg | superstition.jpg | Superstition | Places | Pinal County, Arizona | |
| Architecture/IMG_4015.jpg | garden-pavilion.jpg | Garden Pavilion | Nature | Fort Worth, Texas | |
| people/DSC05551.jpg | setting-the-time.jpg | Setting the Time | Details | *(null — no GPS on file)* | |
| ASu/IMG_3674.jpg | dusk-walk.jpg | Dusk Walk | Places | Tempe, Arizona | |
| Architecture/IMG_6551.jpg | spires-at-night.jpg | Spires at Night | Architecture | Chino Hills, California | |

Category totals: Places 8, Architecture 6, Automotive 5, Nature 5, Details 2,
Street 1. Events = 0 published (approved category, held pending owner
sign-off on the ASU set — see below).

**Note on `gilded.jpg` (IMG_7158):** GPS resolves to "San Xavier District,
Arizona" (near San Xavier del Bac Mission, not verified as within Tucson
proper). Per owner decision, this is kept private here rather than shown as
public `location` — do not publish it without the owner's own confirmation of
the right public phrasing.

**Title corrections made after full-resolution recovery:** two Stage 1
proposed titles were misread from low-resolution thumbnails and are corrected
here. (1) The transit-sign photo was proposed as "10:23 PM" — at full
resolution the sign actually reads "#10023" (a route number) over "8:02 PM";
retitled to **8:02 PM** to match what's actually on the sign. (2) The
sun-behind-mountain photo was proposed as "Moonrise" — its EXIF timestamp is
9:19 AM, which rules out a moonrise at that brightness; retitled to
**Sunrise**.

**Metadata gained on recovery:** `among-the-trees.jpg` (IMG_4028) and
`garden-pavilion.jpg` (IMG_4015) previously published with `location: null`
because the throttled preview had stripped GPS. The full-resolution originals
carry GPS resolving to Fort Worth, Texas — now reflected publicly since it's
verified, not guessed.

**Note on the Fort Worth garden cluster:** four published Nature images
(`among-the-trees`, `garden-pavilion`, `stone-garden`, `pink-bloom`) all come
from the same Fort Worth Japanese garden visit (May 2025 / December 2024 —
two separate trips to the same garden, per EXIF dates). Each is a distinct
subject (pagoda tower, pavilion, pond + stone lantern, rose macro) rather than
a burst duplicate, so all four were kept, but they're deliberately spread far
apart in the editorial sequence rather than presented as a set.

**Note on Automotive/Places overlap:** `Classic Blue` and the held-back
`Blue Classic` (IMG_5554, same blue Porsche, different session) were judged
too similar to publish both — only `Classic Blue` is live. `Desert Hauler`
and `Superstition` were taken 8 minutes apart at the same Pinal County
location (same outing) but are compositionally distinct (vehicle vs.
landscape) and are placed far apart in the sequence. `Desert Hauler` and
`Into the Desert` are both live despite a similar "vehicle in desert
landscape" composition; kept both since they read as genuinely distinct
frames, not a burst duplicate.

## Held for privacy — owner review required (not published, not deleted)

All of these now have full-resolution originals available; publication is
withheld solely pending the owner's explicit go/no-go, not for any technical
reason.

| Original | Reason |
|---|---|
| people/IMG_8427.jpg | Personal group photo, 6 identifiable people — owner said exclude |
| people/IMG_5885.jpg | Sleeping/vulnerable candid — owner said exclude |
| people/IMG_0731.jpg, IMG_0737.jpg | Posed portrait, identifiable — OWNER REVIEW REQUIRED, not published pending explicit confirmation |
| people/IMG_5418.jpg ("Canyon Edge") | Person visible on a canyon rim, flagged `owner_review_required` in the Stage 1 screen — held even though recovered |
| people/IMG_1571.jpg ("Commute") | Person visible, flagged `owner_review_required` in Stage 1 — held |
| people/IMG_3504.jpg ("On Duty") | Person visible, flagged `owner_review_required` in Stage 1 — held |
| people/IMG_3688.jpg ("Platform") | Person visible, flagged `owner_review_required` in Stage 1 — held |
| ASu/IMG_0665_jpg.jpg, IMG_0694.jpg, IMG_0705_jpg.jpg, IMG_0763_jpg.jpg, IMG_0770.jpg | "Form & Function Jam" workshop event set — OWNER REVIEW REQUIRED, Events category approved but held back until explicitly cleared |
| Food/IMG_7227.jpg, IMG_7250.jpg, IMG_7256.jpg | Excluded per owner decision — kept as unpublished alternates |

If any of the four Street/Places candidates above (Canyon Edge, Commute, On
Duty, Platform) are cleared later, Street would grow from 1 to as many as 4
images, and Places would gain Canyon Edge. Re-run
`scripts/photography/optimize-photos.mjs` against a new selection JSON to
produce their web copies — no other pipeline work is needed.

## Categories currently live vs. approved-but-empty

Live (has >=1 published photo): Architecture, Places, Nature, Automotive,
Details, Street. Approved but not yet rendered as a filter (0 published
photos): Events — pending owner sign-off on the ASU workshop set.
`PHOTO_CATEGORIES` in `lib/photography-data.ts` is derived from the published
data, so Events appears automatically once photos in that category are
added — no code change needed then.

## Recommendations for Home / About (not applied — Visuals only this phase)

Three images stand out as strong candidates for Home or About once you're
ready to touch those pages: **Gilded** (the gold altarpiece) as a striking,
unusual hero-adjacent image, **Watching the Water** (the egret) as a calm,
clean portrait-adjacent option for About's "Outside the Interface" collage,
and **Waterfront Glow** (the sunset/skyline) as a strong wide-format option if
either page ever wants a full-bleed banner image. Not applied — flagging
only, per your instruction not to touch Home/About in this phase.
