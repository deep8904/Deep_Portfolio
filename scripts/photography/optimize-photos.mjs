// Builds public/photography web copies from a selection JSON: [{ src, slug, rotate180? }, ...].
// src points at a full-resolution original (never committed to this repo).
// No .withMetadata() call -> strips all EXIF/GPS by default.
//
// Usage: node scripts/photography/optimize-photos.mjs <selection.json>

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const selectionPath = process.argv[2];
if (!selectionPath) {
  console.error("Usage: node optimize-photos.mjs <selection.json>");
  process.exit(1);
}

const SELECTION = JSON.parse(fs.readFileSync(selectionPath, "utf8"));
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT_DIR = path.join(REPO_ROOT, "public", "photography");
fs.mkdirSync(OUT_DIR, { recursive: true });

const MAX_DIM = 2400; // long-edge cap; next/image handles responsive sizing from here

const results = [];

for (const item of SELECTION) {
  const meta = await sharp(item.src).metadata();
  const isPortrait = meta.height >= meta.width;
  const resizeOpts = isPortrait ? { height: MAX_DIM } : { width: MAX_DIM };

  const outPath = path.join(OUT_DIR, `${item.slug}.jpg`);
  let pipeline = sharp(item.src).rotate(); // apply EXIF orientation
  if (item.rotate180) pipeline = pipeline.rotate(180);
  await pipeline
    .resize({ ...resizeOpts, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(outPath);

  const outMeta = await sharp(outPath).metadata();
  const stat = fs.statSync(outPath);

  results.push({ ...item, width: outMeta.width, height: outMeta.height, fileSizeKB: Math.round(stat.size / 1024) });
  console.log(`${item.slug}.jpg  ${outMeta.width}x${outMeta.height}  ${Math.round(stat.size / 1024)}KB`);
}

console.log(`\nDone: ${results.length} web copies written to ${OUT_DIR}`);
console.log(JSON.stringify(results, null, 2));
