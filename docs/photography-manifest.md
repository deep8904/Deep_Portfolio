# Photography ingestion manifest (private — not built into the public site)

This file lives under `docs/`, which Next.js never serves publicly (only `app/`,
`components/`, `lib/`, and `public/` reach the built site). It exists so a
title/category/status can be corrected later without re-deriving which source
photo it came from.

Source library: private Google Drive folder supplied by the site owner.
Full Stage-1 inventory (all 141 originals inspected, including everything not
published) was delivered separately as `photography-manifest.csv` — this file
covers the 19 currently published, plus what's still pending recovery.

## Published (19) — original → web copy → title → category

| Original folder/file | Web filename | Title | Category | Public location | Featured |
|---|---|---|---|---|---|
| Architecture/IMG_7158.jpg | gilded.jpg | Gilded | Architecture | *(null — see note)* | Yes |
| Cars & Bikes/IMG_5876.jpg | teal-wheel.jpg | Teal Wheel | Automotive | Mesa, Arizona | Yes |
| Cars & Bikes/IMG_6939.jpg | desert-hauler.jpg | Desert Hauler | Places | Pinal County, Arizona | Yes |
| Animal/IMG_7314.jpg | watching-the-water.jpg | Watching the Water | Nature | Gilbert, Arizona | Yes |
| Cars & Bikes/IMG_0535.jpg | classic-blue.jpg | Classic Blue | Automotive | Scottsdale, Arizona | |
| Architecture/IMG_1528.jpg | mission-light.jpg | Mission Light | Architecture | Tempe, Arizona | |
| Cars & Bikes/IMG_8339.jpg | into-the-desert.jpg | Into the Desert | Places | *(null — unverified)* | |
| Architecture/IMG_4028.jpg | among-the-trees.jpg | Among the Trees | Nature | *(null — unverified)* | |
| Cars & Bikes/IMG_5608.jpg | red-in-the-lot.jpg | Red in the Lot | Automotive | Mesa, Arizona | |
| Architecture/IMG_0675.jpg | clock-tower.jpg | Clock Tower | Architecture | Phoenix, Arizona | |
| ASu/IMG_3674.jpg | dusk-walk.jpg | Dusk Walk | Places | Tempe, Arizona | |
| Architecture/IMG_4015.jpg | garden-pavilion.jpg | Garden Pavilion | Nature | *(null — unverified)* | |
| Cars & Bikes/IMG_5877.jpg | teal-taillight.jpg | Teal Taillight | Automotive | Mesa, Arizona | |
| Architecture/IMG_6551.jpg | spires-at-night.jpg | Spires at Night | Architecture | Chino Hills, California | |
| ASu/IMG_3338.jpg | storm-light.jpg | Storm Light | Places | *(null — unverified)* | |
| Cars & Bikes/IMG_5976.jpg | yellow-thing.jpg | Yellow Thing | Automotive | Tempe, Arizona | |
| Architecture/IMG_3664.jpg | switchback.jpg | Switchback | Architecture | Tempe, Arizona | |
| ASu/IMG_3678.jpg | blue-hour-building.jpg | Blue Hour Building | Places | Tempe, Arizona | |
| Architecture/IMG_5944.jpg | brick-and-glass.jpg | Brick and Glass | Architecture | Tempe, Arizona | |

**Note on `gilded.jpg` (IMG_7158):** GPS resolves to "San Xavier District,
Arizona" (near San Xavier del Bac Mission, not verified as within Tucson
proper). Per owner decision, this is kept private here rather than shown as
public `location` — do not publish it without the owner's own confirmation of
the right public phrasing.

**Note on Automotive/Places overlap:** `Classic Blue` and the held-back
`Blue Classic` (IMG_5554, same blue Porsche, different session) were judged
too similar to publish both — only `Classic Blue` is live. `Desert Hauler` and
`Into the Desert` are both live despite a similar "vehicle in desert
landscape" composition; kept both since they read as genuinely distinct
frames, not a burst duplicate.

## Held for privacy (not published, not deleted)

| Original | Reason |
|---|---|
| people/IMG_8427.jpg | Personal group photo, 6 identifiable people — owner said exclude |
| people/IMG_5885.jpg | Sleeping/vulnerable candid — owner said exclude |
| people/IMG_0731.jpg, IMG_0737.jpg | Posed portrait, identifiable — OWNER REVIEW REQUIRED, not published pending explicit confirmation |
| ASu/IMG_0665_jpg.jpg, IMG_0694.jpg, IMG_0705_jpg.jpg, IMG_0763_jpg.jpg, IMG_0770.jpg | "Form & Function Jam" workshop event set — OWNER REVIEW REQUIRED, Events category approved but held back until explicitly cleared |
| Food/IMG_7227.jpg, IMG_7250.jpg, IMG_7256.jpg | Excluded per owner decision — kept as unpublished alternates |

## Pending recovery — held back, NOT published, NOT dropped from curation

These were part of the intended ~24-28 image gallery (Places, Nature, Street,
Details) but Google Drive's anonymous-link download throttle would not clear
during this session even after ~1 hour and dozens of retries across two
separate strategies. Only Google's stripped preview (2000px cap, no camera
make/model, no GPS) was obtainable for these — per the owner's explicit
instruction, that is not good enough to publish, so they were left out rather
than shipped at reduced quality:

| Original | Intended category | Intended title |
|---|---|---|
| Skye/IMG_1337.jpg | Places | Moonrise |
| Skye/IMG_7029.jpg | Places | Waterfront Glow |
| loose/IMG_6930.jpg | Places | Superstition |
| Nature/IMG_0433.jpg | Nature | Stone Garden |
| Nature/IMG_3975.jpg | Nature | Pink Bloom |
| people/APC_0017.jpg | Street | Walking Alone |
| people/IMG_1571.jpg | Street | Commute |
| people/IMG_3504.jpg | Street | On Duty |
| people/IMG_3688.jpg | Street | Platform |
| people/DSC05551.jpg | Details | Setting the Time |
| ASu/IMG_1648.jpg | Details | 10:23 PM *(this one is actually already a full original — held back only to avoid shipping a 1-image Details category; safe to add whenever the Street/Nature/Places set above also comes in)* |

**Next step:** retry `gdown --folder` against the same shared link once the
owner confirms Google's throttle has likely cleared (commonly clears within
hours), or the owner can re-share a fresh link. Re-run `extract_metadata.py`
+ `reverse_geocode.py` on the recovered files, confirm no metadata surprises
versus what's listed above, then extend `lib/photography-data.ts` with the
additional entries (Places/Nature grow to their originally-planned size,
Street and Details become viable categories).

## Categories currently live vs. approved-but-empty

Live (has >=1 published photo): Architecture, Places, Nature, Automotive.
Approved but not yet rendered as a filter (0 published photos): Street,
Details, Events. `PHOTO_CATEGORIES` in `lib/photography-data.ts` is derived
from the published data, so these appear automatically once photos in those
categories are added — no code change needed then.

## Recommendations for Home / About (not applied — Visuals only this phase)

Two images stood out as strong candidates for Home or About once you're
ready to touch those pages: **Gilded** (the gold altarpiece) as a striking,
unusual hero-adjacent image, and **Watching the Water** (the egret) as a
calm, clean portrait-adjacent option for About's "Outside the Interface"
collage. Not applied — flagging only, per your instruction not to touch
Home/About in this phase.
