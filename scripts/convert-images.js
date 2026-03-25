// scripts/convert-images.js
// Converts all JPEG/PNG images in public/images to WebP and AVIF.
// Run: node scripts/convert-images.js

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const INPUT_DIR = path.join(__dirname, "..", "public", "images");
const INPUT_EXTS = new Set([".jpg", ".jpeg", ".png"]);

const WEBP_QUALITY = 82;   // good quality, ~30% smaller than JPEG
const AVIF_QUALITY = 60;   // visually similar, ~50% smaller than WebP
const AVIF_EFFORT = 4;     // 0–9, higher = smaller file but slower encode

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const base = filePath.slice(0, -ext.length);
  const name = path.basename(filePath);
  const tasks = [];

  const webpOut = `${base}.webp`;
  if (!fs.existsSync(webpOut)) {
    tasks.push(
      sharp(filePath)
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpOut)
        .then(() => console.log(`  [webp]  ${name}`))
    );
  } else {
    console.log(`  [skip]  ${name} -> .webp already exists`);
  }

  const avifOut = `${base}.avif`;
  if (!fs.existsSync(avifOut)) {
    tasks.push(
      sharp(filePath)
        .avif({ quality: AVIF_QUALITY, effort: AVIF_EFFORT })
        .toFile(avifOut)
        .then(() => console.log(`  [avif]  ${name}`))
    );
  } else {
    console.log(`  [skip]  ${name} -> .avif already exists`);
  }

  await Promise.all(tasks);
}

async function main() {
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`Directory not found: ${INPUT_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(INPUT_DIR)
    .filter((f) => INPUT_EXTS.has(path.extname(f).toLowerCase()))
    .map((f) => path.join(INPUT_DIR, f));

  if (files.length === 0) {
    console.log("No JPEG or PNG files found.");
    return;
  }

  console.log(`\nConverting ${files.length} image(s) in ${INPUT_DIR}\n`);

  let failed = 0;
  for (const file of files) {
    try {
      await convertFile(file);
    } catch (err) {
      console.error(`  [error] ${path.basename(file)}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. ${files.length - failed} converted, ${failed} failed.`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
