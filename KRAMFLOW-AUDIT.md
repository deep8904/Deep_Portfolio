# KramFlow Case Study — Visual & Content Audit

Scope: `app/work/kramflow/page.tsx` and everything it renders (`components/case-study/**`, `public/work/kramflow/*.png`). Done by reading every line of the page, every custom component it imports, and by loading the live page in a real browser and inspecting the rendered output pixel-by-pixel (not just the source images).

**Headline finding:** the 7 screenshots are each captioned/alt-texted correctly and placed in the right section — that part is fine. The real problems are (1) one component silently **crops real content off two of the seven screenshots**, and (2) the case study **calls one surface by two different names** depending on which component you're reading, which is exactly the kind of thing that makes a reviewer think you don't know your own product. Neither is visible by looking at the PNG files in isolation — both only show up when the page actually renders.

---

## 1. MAJOR — `ProductBrowserFrame` crops real UI off the AV Waiting Room and Speaker Ready screenshots

**File:** [components/case-study/ProductBrowserFrame.tsx:16](components/case-study/ProductBrowserFrame.tsx#L16) (`aspect = "aspect-[16/10]"` default, `object-cover object-top`)
**Used at:** [app/work/kramflow/page.tsx:170](app/work/kramflow/page.tsx#L170) (`av-waiting-room.png`) and [app/work/kramflow/page.tsx:191](app/work/kramflow/page.tsx#L191) (`speaker-ready.png`)

### What's actually wrong
Every `ProductBrowserFrame` call in this case study uses the component's **default 16:10 aspect ratio**, and the image is displayed with `object-cover` (crop-to-fill), not `object-contain`. That's invisible as long as the screenshot's native ratio is close to 16:10 and the important content sits away from the edges — true for 5 of the 7 shots. It breaks for the two TV-display shots:

| File | Native size | Native ratio | Frame ratio | Result |
|---|---|---|---|---|
| `av-waiting-room.png` | 3840×2160 | 16:9 (1.78) | 16:10 (1.60) | ~10% of width cropped, split ~5% off each side |
| `speaker-ready.png` | 3840×2160 | 16:9 (1.78) | 16:10 (1.60) | same |

Both of these screens put real content flush to the left and right edges (page title top-left, the live clock + "LIVE" badge top-right, a full-width data table). A 5%-per-side crop lands right on top of that content. **Confirmed by rendering the live page and screenshotting it** — this is not a theoretical calculation:

- The header reads **"V Waiting Room"** — the leading "A" of "AV Waiting Room" is cut off.
- The countdown reads **".2:51"** — the leading "1" of "12:51" is cut off.
- Every left-hand row label in the prep checklist loses its first 1–2 characters: "P REQUIREMENTS" (was "PREP REQUIREMENTS"), "crophone / Track" (was "Microphone / Track"), "eo / Presentation" (was "Video / Presentation"), "hting" (was "Lighting"), "rtains" (was "Curtains").
- The **"LIVE" badge** next to the clock, top-right, is cut off to just "LI".

This is on the *AV Waiting Room* shot; `speaker-ready.png` shares the exact same 3840×2160 dimensions and the same left-title/right-clock layout, so it will crop identically once it renders (it failed to load during this audit due to a dev-server hiccup unrelated to the case study itself — re-check it after the fix below, but budget for it having the same issue).

### Why it happened
Screenshots were captured at whatever native resolution each surface happened to render at (5 different aspect ratios across 7 files — see the table in §3), and the case study code never overrides the frame's aspect ratio per-image. For the desktop app screens (Console, Cue Sheet, Displays, Broadcast) this coincidentally works because their content is top-heavy and there's empty space below to sacrifice. For the two TV displays, content is edge-to-edge, so the same crop takes a bite out of real text.

### Fix (pick one)
1. **Cheapest, no re-capture needed:** pass `aspect="aspect-[16/9]"` explicitly on the two `ProductBrowserFrame` calls for `av-waiting-room.png` and `speaker-ready.png` (page.tsx lines ~170 and ~191), matching their true native ratio. Zero cropping, no asset work.
2. **More correct long-term:** re-capture all 7 screenshots at one consistent resolution/ratio so every image in the case study behaves the same way inside the frame instead of "coincidentally fine" vs. "broken" depending on layout. If you do this, re-verify the crop math in §3 for whichever ratio you standardize on.

Do this before anything else in this document — it's the one item an actual visitor will see as an obvious defect, not just wrong wording.

---

## 2. MAJOR — "Green Room" vs "Speaker Ready": the case study names one surface two different things

The product's real UI title for this surface is **"Speaker Ready"** (confirmed on the live screen — see `speaker-ready.png`, header text "Speaker Ready", and the Displays fleet list, which shows the registered device as "Speaker Ready Room"). That's also the name used everywhere in the page's own prose: the section screenshot is `speaker-ready.png`, its caption says "Speaker Ready," and the alt text says "The KramFlow Speaker Ready display."

But five other components in the same case study call the identical surface **"Green Room"** instead, with no cross-reference tying the two names together:

- [components/case-study/kramflow/SurfaceMap.tsx:9](components/case-study/kramflow/SurfaceMap.tsx#L9) — the 6-surface diagram lists it as "Green Room."
- [components/case-study/kramflow/RehearsalComparison.tsx:9](components/case-study/kramflow/RehearsalComparison.tsx#L9) — "Reaches AV, Green Room, General, Presenter..."
- [components/case-study/kramflow/CapabilityMap.tsx:6](components/case-study/kramflow/CapabilityMap.tsx#L6) — "AV, Green Room, General displays."
- [components/case-study/kramflow/KramflowStatusMatrix.tsx:20](components/case-study/kramflow/KramflowStatusMatrix.tsx#L20) — "6-surface role picker, AV / Green Room / Presenter displays."
- [components/case-study/kramflow/FailureStatesTable.tsx:6](components/case-study/kramflow/FailureStatesTable.tsx#L6) — "Green Room and AV kept showing a countdown..."
- Also in prose: [app/work/kramflow/page.tsx:139](app/work/kramflow/page.tsx#L139) FeatureNote — "AV, Green Room, General, and Presenter are public."

### Why this matters
A reader who looks at the "Six Surfaces" diagram (which says Green Room), then scrolls down a few hundred pixels to the actual screenshot (titled Speaker Ready), has no way to know these are the same screen. Best case, they're confused; worst case, they conclude the writer doesn't actually know the product they're presenting — which is the opposite of what a case study about "verified, not assumed" engineering (a phrase this very page uses) should communicate.

### Fix
Pick one name and use it everywhere. Recommend **"Speaker Ready"** since that's the string that actually appears in the shipped product's UI — everything else in this case study is scored on matching the real deployment, so the copy should too. Update all 6 locations above.

---

## 3. Screenshot-by-screenshot placement check

Every image file was opened directly and compared against its caption, alt text, and surrounding section copy. All seven are in the **correct section and correctly captioned** — there is no case of a screenshot showing the wrong screen. The only defect is the crop in §1.

| # | File | Section | Caption says | Screenshot actually shows | Placement correct? | Crop-safe? |
|---|---|---|---|---|---|---|
| 1 | `console.png` | Hero | Operator Console, mid-show | Operator Console, "Product Launch Demo" live, controls on right | ✅ | ✅ (3360×2100 = exactly 16:10) |
| 2 | `cue-sheet.png` | Surfaces | Cue Sheet editor | Cue Sheet, 7 items, Day 1 Morning | ✅ | ✅ (crops empty space below the list, not content) |
| 3 | `displays.png` | Surfaces | Displays panel, 4 registered displays | Displays page, 4 online (Stage Confidence Monitor, Speaker Ready Room, AV Booth, Lobby Display) | ✅ | ✅ (crops empty space below the list) |
| 4 | `remote.png` | Surfaces | Remote phone controls | Phone UI, countdown + Next/Previous/Hold | ✅ | ✅ (860×1864 ≈ matches `PhoneMockupFrame`'s 9:19.5 default almost exactly — no crop) |
| 5 | `av-waiting-room.png` | The 1-Second Read | AV Waiting Room, countdown + prep checklist | Matches caption, but **see §1 — left/right edges are cropped off** | ✅ (content) / ❌ (crop) | ❌ |
| 6 | `speaker-ready.png` | The 1-Second Read | Speaker Ready, countdown + operator notes | Matches caption; same crop risk as #5 (native 3840×2160, identical layout pattern) | ✅ (content) / ⚠️ untested live due to a dev-server hiccup, but the math is identical to #5 | ❌ (expected) |
| 7 | `broadcast.png` | Control | Broadcast Center, alerts + compose panel | Matches caption | ✅ | ⚠️ minor — see below |

### Minor note on `broadcast.png`
Native size is 2560×1880 (1.36:1) against the 16:10 frame, so the bottom ~15% gets cropped. Low risk on its own, **except** the raw screenshot already has its last field ("Icon (optional)") sitting right at the bottom pixel edge of the source file, i.e. it was already tight before any component crop. Recommend re-capturing this one with a bit more headroom below the "Severity" row, or scrolling up slightly before the shot, so there's a safety margin under the frame crop.

---

## 4. Minor content items

1. **Unillustrated claim: "Live timeline (AV only)"** — [components/case-study/kramflow/ReadHierarchy.tsx:16](components/case-study/kramflow/ReadHierarchy.tsx#L16) lists a "Live timeline (AV only)" as a Secondary-tier element, directly above the AV Waiting Room screenshot. The actual screenshot shown right below it doesn't display anything resembling a timeline — it shows a "Next / On Deck" panel and a prep checklist. Either the copy should describe what's actually visible in the adjacent screenshot, or if "timeline" refers to something not captured in any screenshot, that's a claim with no visual proof sitting directly next to the one place a reader would look for proof.

2. **Aspect-ratio spread across the asset set** — for future reference, the 7 screenshots were captured at 5 different native ratios (16:10, 16:9, 1.44:1, 1.36:1, 1.31:1, plus the phone shot). It only caused a visible problem in the two 16:9 TV shots (§1), but it's worth standardizing capture resolution going forward so this class of bug doesn't recur when new screenshots get added.

3. **`speaker-ready.png` failed to load during this audit** — a `net::ERR_CONNECTION_REFUSED` on the Next.js image optimizer mid-session, most likely just the dev server restarting (another process was also bound to the same port during this review). Not a code bug, but re-check that this image renders correctly after the aspect-ratio fix in §1, since it couldn't be visually re-confirmed after the fix.

---

## 5. What's already correct — don't touch

- All 7 image files exist, are referenced correctly, and are captioned/alt-texted accurately.
- Section ordering matches the chapter nav (`Problem → Surfaces → The 1-Second Read → Control → Hold & Resume → Realtime → Rehearsal → Failure States → Evolution → Status → Outcome`).
- Cross-references between prose and diagrams are internally consistent everywhere *except* the Green Room/Speaker Ready naming split in §2 (e.g., the "~40 commits since" in `ArchitectureEvolutionDiagram` matches the "~forty commits" claim in the page's own Evolution section prose; the 2-behind-login / 4-public surface count matches across `SurfaceMap`, the FeatureNote pair, and `CapabilityMap`).
- `remote.png`'s dimensions happen to almost exactly match `PhoneMockupFrame`'s default device ratio — no action needed there.
- Work-listing metadata (`lib/data.ts`) numbering ("PROJECT 02") matches the case study hero's own "CASE STUDY 02" eyebrow.

---

## 6. Priority checklist

- [ ] **Fix the crop** — add `aspect="aspect-[16/9]"` to the two `ProductBrowserFrame` calls for `av-waiting-room.png` and `speaker-ready.png` in `app/work/kramflow/page.tsx`. (§1)
- [ ] **Re-render and re-screenshot** both TV surfaces after the fix to confirm no more clipped text/badges.
- [ ] **Pick one name — "Speaker Ready" — and replace every "Green Room" reference** in `SurfaceMap.tsx`, `RehearsalComparison.tsx`, `CapabilityMap.tsx`, `KramflowStatusMatrix.tsx`, `FailureStatesTable.tsx`, and the FeatureNote in `page.tsx`. (§2)
- [ ] Re-capture or reframe `broadcast.png` with extra bottom margin so the "Icon (optional)" field isn't flush with the image edge. (§3)
- [ ] Either illustrate or rename the "Live timeline (AV only)" claim in `ReadHierarchy.tsx` so it matches what the adjacent screenshot actually shows. (§4.1)
- [ ] Standardize the capture resolution/ratio for any new KramFlow screenshots going forward. (§4.2)
