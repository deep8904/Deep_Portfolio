# Photography ingestion manifest (private — not built into the public site)

This file lives under `docs/`, which Next.js never serves publicly (only `app/`,
`components/`, `lib/`, and `public/` reach the built site). It exists so a
title/category/status can be corrected later without re-deriving which source
photo it came from.

Source library: the owner's own full-resolution copy at
`/Users/deeppatel/Documents/photos/` (not committed to this repo — raw
originals never leave the owner's machine). All 141 files there are verified
genuine full-resolution originals (real camera `Make`/`Model` EXIF, no size
cap). 21 of those 141 are exact re-listings of another file in a different
folder (the owner's own folder organization cross-referenced some photos into
more than one category folder) — those aren't given a second published entry.
That leaves **120 distinct photographs, all of them published.**

Reusable web-copy pipeline: `scripts/photography/optimize-photos.mjs` (checked
into this repo). Give it a selection JSON (`[{ src, slug, rotate180? }, ...]`)
and it applies EXIF rotation, resizes to a 2400px long edge, encodes JPEG
quality 85 with mozjpeg, and strips all EXIF/GPS by omitting
`.withMetadata()`.

## Curation correction: portfolio vs. archive (2026-08-24)

After the full 120-image publish, the owner asked for an editorial correction:
`/visuals` should not render all 120 photographs as one long wall on load. The
underlying library, all metadata, titles, alt text, and categories from the
full-publish pass are unchanged — this only changes what's shown by default.

`Photo.visibility` is now `"portfolio" | "archive"`. **34 photographs** are
tagged `portfolio` and are what `/visuals` shows by default, hand-sequenced
for visual rhythm (orientation, color, subject) rather than sorted
mechanically. The other **86** are `archive` — reachable via the "Explore
full archive" control at the bottom of the curated gallery, which reveals
them in batches of 40 then +24 per "Load more" click rather than all at once.
Filters show only portfolio categories by default; once archive mode is
open, all 8 categories (including Food) become selectable. Lightbox
navigation always follows whatever set is currently rendered — the curated
34, a filtered subset, or the currently-revealed archive batch.

Selection for the 34: started from the 32 photos Stage 1 had marked `KEEP`
after real visual review (the original best-of curation), dropped `Blue
Classic` as a near-duplicate of the already-included `Classic Blue`, and
added the 3 strongest Events photos (`Wall of Faces`, `Stage Light`, `On
Stage` — chosen for the most distinctive lighting/color among the 7; the
other 4 Events photos are archive-only). Food (3 images) did not make the
portfolio — all three read as casual iPhone snapshots next to the rest of
the deliberate photography, so the category doesn't appear on the default
view at all; it's still selectable once "Explore full archive" is open.

## Owner decision: full publish (2026-08-24)

Earlier in this project, several images were held back from the public
gallery pending explicit owner sign-off: a personal group photo, a
sleeping/vulnerable candid, a handful of shots where a person is visible and
identifiable, the "Form & Function Jam" workshop event set, and three food
photos (the last excluded for editorial reasons, not privacy). When asked
directly — "publish everything, including the held ones?" — the owner chose
**"Publish everything, including the held ones."** That decision is what
unlocked the change described in this file: all of the above are now public.
Neutral, non-identifying language (no names, no guessed relationships) is
still used for every title and alt text describing a person, per the
project's standing "do not identify people" rule — that rule wasn't lifted by
this decision, only the earlier publish/hold status was.

## Taxonomy changes that came with the full publish

- **Food** is now a real category (3 images: Late Night Bowl, Small Plates,
  Shared Table) — previously excluded by owner decision to keep the gallery
  tighter; that decision no longer applies now everything is published.
- **Events** is now populated (7 images from the "Form & Function Jam"
  workshop) rather than sitting empty pending approval.
- **Portraits** was never allowed as a category (per earlier owner decision).
  The three photos Stage 1 had proposed under "Portraits" were recategorized
  on real subject-matter grounds: `Dockside` (IMG_4840, person on a dock by
  water) → **Places**; `String Lights` and `String Lights, Black and White`
  (IMG_0731/IMG_0737, close portrait-style shots) → **Details**.
- The five images Stage 1 had labeled `EXCLUDED` (never a real category, just
  an admin bucket) got real categories too: `Resting` (IMG_5885) → **Details**;
  `Group, Black and White` (IMG_8427) → **Street**; the three Food photos →
  **Food**.

## Title corrections made after full-resolution recovery

Two Stage 1 proposed titles were misread from low-resolution thumbnails.
(1) The transit-sign photo was proposed as "10:23 PM" — at full resolution
the sign actually reads "#10023" (a route number) over "8:02 PM"; retitled to
**8:02 PM**. (2) The sun-behind-mountain photo was proposed as "Moonrise" —
its EXIF timestamp is 9:19 AM, which rules out a moonrise at that brightness;
retitled to **Sunrise**.

## Notable location/metadata notes

- **`gilded.jpg` (IMG_7158):** GPS resolves to "San Xavier District,
  Arizona" (near San Xavier del Bac Mission, not verified as within Tucson
  proper) — kept private here rather than shown as public `location`, per
  earlier owner decision that this specific label was too imprecise for
  visitors. Do not publish it without the owner's own confirmation of the
  right public phrasing.
- `among-the-trees.jpg` (IMG_4028) and `garden-pavilion.jpg` (IMG_4015)
  resolve to Fort Worth, Texas — along with two new entries from the same
  visit, `framed-by-branches` (IMG_4020) and `garden-roofline` (IMG_4022).
  Four Nature/Details entries in total come from that one Fort Worth garden
  visit; they're spread apart in the sequence rather than presented as a set.
- `Classic Blue` (IMG_0535) and `Blue Classic` (IMG_5554) are the same blue
  Porsche photographed in different sessions — both are now published since
  the full-publish decision covers near-duplicates too, not just privacy
  holds.
- `Desert Hauler` and `Superstition` were taken 8 minutes apart at the same
  Pinal County location (same outing) but are compositionally distinct
  (vehicle vs. landscape).
- Locations ending in ", United States" from the geocoder are trimmed to just
  city/county + state for a cleaner visitor-facing label (verified data, not
  a guess — just a formatting normalization).

## Files not given a separate published entry (same image, listed twice by the owner)

These are exact re-listings of a file already published under a different
folder — same photo, not a second distinct image, so no second gallery entry:

| Duplicate copy | Same as (published) |
|---|---|
| `./IMG_0675.jpg`, `Architecture/IMG_0675.jpg` (one is canonical) | `clock-tower` |
| `./IMG_0681.jpg` / `Architecture/IMG_0681.jpg` | `line-of-light` |
| `./IMG_2039.jpg` / `Skye/IMG_2039.jpg` | `deep-sky` |
| `./IMG_3066.jpg` / `Skye/IMG_3066.jpg` / `Architecture/IMG_3066.jpg` | `contrail-sky` |
| `./IMG_4073.jpg` / `Cars & Bikes/IMG_4073.jpg` | `old-town-carriage` |
| `./IMG_6538.jpg` / `Cars & Bikes/IMG_6538.jpg` | `california-sky` |
| `./IMG_6565.jpg` / `Architecture/IMG_6565.jpg` | `wide-temple-view` |
| `Cars & Bikes/IMG_5554-2.jpg` | `blue-classic` (IMG_5554) |
| `Nature/APC_0009.jpg` / `Skye/APC_0009.jpg` | `palm-silhouettes` |
| `Architecture/IMG_4015.jpg` / `Nature/IMG_4015.jpg` | `garden-pavilion` |
| `Architecture/IMG_4028.jpg` / `Nature/IMG_4028.jpg` | `among-the-trees` |
| `ASu/IMG_1528.jpg` / `Architecture/IMG_1528.jpg` | `mission-light` |
| `ASu/IMG_3338.jpg` / `Skye/IMG_3338.jpg` | `storm-light` |
| `ASu/IMG_3664.jpg` / `Architecture/IMG_3664.jpg` | `switchback` |
| `ASu/IMG_5944.jpg` / `Architecture/IMG_5944.jpg` | `brick-and-glass` |
| `ASu/IMG_5962.jpg` / `Architecture/IMG_5962.jpg` | `fire-escape` |
| `ASu/IMG_8186.jpg` / `Skye/IMG_8186.jpg` | `stadium-lights` |
| `people/IMG_0665_jpg.jpg` / `ASu/IMG_0665_jpg.jpg` | `form-and-function` |
| `people/IMG_0694.jpg` / `ASu/IMG_0694.jpg` | `workshop-table` |
| `people/IMG_0763_jpg.jpg` / `ASu/IMG_0763_jpg.jpg` | `at-the-podium` |

Note: `Skye/IMG_3674.jpg` ("Purple Dusk") and `ASu/IMG_3674.jpg` ("Dusk
Walk") share a filename purely by coincidence — they are two genuinely
different photographs and are both published separately.

## Category totals

Full library (120): Places 31, Automotive 29, Architecture 20, Nature 11,
Street 10, Details 9, Events 7, Food 3.

Portfolio tier (34, shown by default): Places 10, Architecture 7, Automotive
6, Nature 4, Street 3, Events 3, Details 1, Food 0. `PHOTO_CATEGORIES` in
`lib/photography-data.ts` derives from the portfolio tier only;
`ARCHIVE_CATEGORIES` derives from the full 120 and is used once the visitor
opens the archive.

## Featured set (unchanged from the prior curated pass)

Gilded, Teal Wheel, Desert Hauler, Watching the Water, Sunrise, Waterfront
Glow — chosen from the smaller curated set on technical quality/composition
grounds, all 6 also in the portfolio tier. Not re-evaluated against the rest
of the library; re-visit if a broader featured set is wanted later.

## Recommendations for Home / About (not applied — Visuals only this phase)

Three images stand out as strong candidates for Home or About once you're
ready to touch those pages: **Gilded** (the gold altarpiece) as a striking,
unusual hero-adjacent image, **Watching the Water** (the egret) as a calm,
clean portrait-adjacent option for About's "Outside the Interface" collage,
and **Waterfront Glow** (the sunset/skyline) as a strong wide-format option if
either page ever wants a full-bleed banner image. Not applied — flagging
only, per your instruction not to touch Home/About in this phase.
