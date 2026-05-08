// One-shot image optimizer. Reads sources from public/images/ with the
// names below, writes AVIF + WebP versions at the right sizes, and
// emits a 16x10 blur-placeholder data URL string for next/image use.
//
// Run: node scripts/optimize-images.mjs

import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("public/images");

const JOBS = [
  { src: "hero-1.jpg.jpg",   out: "hero-1",   w: 2400, h: 1600, blur: true  },
  { src: "hero-2.jpg.jpg",   out: "hero-2",   w: 2400, h: 1600, blur: false },
  { src: "hero-3.jpg.jpg",   out: "hero-3",   w: 2400, h: 1600, blur: false },
  { src: "about-1.jpg.jpg",  out: "about",    w: 2100, h: 900,  blur: true  },
  { src: "missed-2.jpg.jpg", out: "missed",   w: 1600, h: 900,  blur: true  },
];

async function processOne({ src, out, w, h, blur }) {
  const input = path.join(ROOT, src);
  const base = sharp(input).resize(w, h, { fit: "cover", position: "attention" }).rotate();

  const avifPath = path.join(ROOT, `${out}.avif`);
  const webpPath = path.join(ROOT, `${out}.webp`);

  const avifInfo = await base.clone().avif({ quality: 55, effort: 6 }).toFile(avifPath);
  const webpInfo = await base.clone().webp({ quality: 78 }).toFile(webpPath);

  let blurDataURL = null;
  if (blur) {
    const buf = await sharp(input)
      .resize(16, Math.round((16 * h) / w), { fit: "cover" })
      .jpeg({ quality: 40 })
      .toBuffer();
    blurDataURL = `data:image/jpeg;base64,${buf.toString("base64")}`;
  }

  return {
    out,
    avifKB: Math.round(avifInfo.size / 1024),
    webpKB: Math.round(webpInfo.size / 1024),
    width: avifInfo.width,
    height: avifInfo.height,
    blurDataURL,
  };
}

async function main() {
  await mkdir(ROOT, { recursive: true });
  const results = [];
  for (const job of JOBS) {
    const r = await processOne(job);
    results.push(r);
    console.log(`✓ ${r.out}.{avif,webp}  ${r.width}×${r.height}  AVIF=${r.avifKB}KB  WebP=${r.webpKB}KB`);
  }
  const blurMap = Object.fromEntries(
    results.filter((r) => r.blurDataURL).map((r) => [r.out, r.blurDataURL]),
  );
  await writeFile(path.join(ROOT, "_blur-data.json"), JSON.stringify(blurMap, null, 2));
  console.log("✓ wrote public/images/_blur-data.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
