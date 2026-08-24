/**
 * Real production domain isn't known yet — set NEXT_PUBLIC_SITE_URL before
 * deploying (see .env.example). Falls back to localhost so metadataBase,
 * the sitemap, and robots.txt are never silently wrong in dev/preview.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
