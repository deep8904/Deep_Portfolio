# Email Signature — Deep Chadamiya

## Design Decisions

This signature is a distilled version of the portfolio's visual identity, not a miniature webpage. Key choices:

- **Accent divider**: The 2px `#4a3b33` bottom border on the name block mirrors the portfolio's `--color-accent`, the warmest, most intentional color in the system. It separates identity from links without adding visual weight.
- **Typography**: The portfolio uses General Sans (Fontshare). Since custom web fonts are unreliable in email clients, the signature uses `'Helvetica Neue', Helvetica, Arial, sans-serif` — the closest safe match to General Sans's clean geometric character.
- **Name treatment**: 16px semibold, tight tracking (`-0.01em`), matching the sidebar's name presentation at `font-semibold tracking-[-0.012em]`.
- **Subtitle**: 12px medium weight, widened tracking (`0.08em`), all-caps — directly mirroring the portfolio's `PRODUCT · DESIGN · DEV` label style but adapted to the job-search context: `SOFTWARE ENGINEER · PRODUCT & UI/UX`.
- **Colors**: All colors are taken directly from the portfolio's design tokens:
  - Ink: `#131210` (`--color-ink`)
  - Secondary: `#4b4a46` (`--color-ink-secondary`)
  - Muted: `#62615d` (`--color-ink-muted`)
  - Accent: `#4a3b33` (`--color-accent`)
- **Avatar**: Optional 48px circular image, matching the sidebar's `rounded-full` avatar pattern.
- **Link style**: Text links (no icons, no underlines), matching the portfolio's restrained link treatment. Link color uses the accent `#4a3b33`.
- **No background color**: The signature has no background so it adapts to whatever email client background is present.

## Portfolio Elements Reused

| Element | Portfolio Source | Signature Application |
|---------|----------------|----------------------|
| `--color-ink` `#131210` | Primary text | Name color |
| `--color-ink-secondary` `#4b4a46` | Secondary text | Subtitle, link descriptions |
| `--color-ink-muted` `#62615d` | Muted text | Location text |
| `--color-accent` `#4a3b33` | Accent/CTA color | Divider line, link color |
| Name: "Deep Chadamiya" | Sidebar, footer, JSON-LD | Name block |
| Subtitle pattern: caps + tracked + dot-separated | Sidebar `PRODUCT · DESIGN · DEV` | `SOFTWARE ENGINEER · PRODUCT & UI/UX` |
| Avatar `rounded-full` | Sidebar 38px circle | 48px circle |
| No-underline link style | Sitewide `a { text-decoration: none }` | Link row |

## Professional Details Included

All sourced from `lib/data.ts`:

- **Name**: Deepkumar Chadamiya (displayed as "Deep Chadamiya" per portfolio convention)
- **Title**: Software Engineer | Product & UI/UX (adapted from portfolio positioning for job-search context)
- **Portfolio**: `https://deepchadamiya.com` (derived from `SITE_URL` / the intended production domain)
- **LinkedIn**: `https://www.linkedin.com/in/deepchadamiya`
- **GitHub**: `https://github.com/deep8904`
- **Location**: Tempe, AZ (from `SITE.location`)

## External Image Assets

The avatar references the deployed portfolio at `https://deepchadamiya.com/images/profile/avatar.png`. If the portfolio domain differs, update the URL in `signature.html`.

**To use the signature without images**: Remove the entire `<td>` containing the `<img>` tag and its `padding-right`. The signature works cleanly without it.

## Files

| File | Purpose | Production-ready? |
|------|---------|-------------------|
| `signature.html` | Gmail-compatible HTML signature | Yes (after replacing image URL) |
| `signature-preview.html` | Browser preview on light/dark/email contexts | No (preview only) |
| `signature.txt` | Plain-text fallback | Yes |
| `README.md` | Documentation | N/A |

## How to Install in Gmail

1. Open Gmail → Settings (gear icon) → "See all settings"
2. In the "General" tab, scroll to "Signature"
3. Click "Create new" and name it (e.g., "Professional")
4. Open `signature.html` in a browser
5. Select all (`Cmd+A` / `Ctrl+A`) and copy (`Cmd+C` / `Ctrl+C`)
6. Paste directly into the Gmail signature editor
7. Check that the formatting transferred correctly
8. If the avatar doesn't appear, add it manually using Gmail's image insert (URL option)
9. Save changes

**Alternative (HTML paste)**:
- Some browser extensions (e.g., "Gmail HTML Signature") let you paste raw HTML directly

## Gmail Compatibility Notes

- **No custom fonts**: General Sans replaced with system font stack
- **No CSS variables**: All values inlined as hex colors
- **No flexbox/grid**: Pure table layout
- **No SVG icons**: Text-only links (more reliable than icon images)
- **No background-image**: Transparent background adapts to client
- **No JavaScript**: Static HTML only
- **No external stylesheets**: All CSS inline
- **Dark mode**: Gmail may invert colors in dark mode. The dark ink colors (`#131210`, `#4a3b33`) will be lightened by Gmail's dark mode algorithm. The accent divider line will remain visible. Text remains readable because Gmail auto-adjusts contrast.
- **Outlook**: Table layout ensures Outlook compatibility. The `border-radius` on the avatar may render as a square in older Outlook versions (2016 and earlier).
- **Mobile**: Single-column layout with no width dependencies. Links stack naturally if the viewport is very narrow.
