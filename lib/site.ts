/**
 * Real production domain isn't known yet — set NEXT_PUBLIC_SITE_URL once it
 * is (see .env.example). Until then, Vercel's own build-time VERCEL_URL
 * (automatic, no config needed) keeps metadataBase/sitemap/robots.txt
 * pointing at whichever deployment actually produced them, instead of
 * baking in a stale localhost URL. True local dev (neither var set) still
 * falls back to localhost.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
