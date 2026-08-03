#!/usr/bin/env node
/**
 * Uploads the site's Teams / Events / Gallery images to Cloudflare R2.
 *
 * The R2 bucket mirrors the relative layout of aceweb/public/ exactly for the
 * files it covers (e.g. public/events/completed/2024-25/x.jpg -> key
 * "events/completed/2024-25/x.jpg"), so the client-side assetUrl() helper can
 * just prepend the public base URL to an existing local path with no rewriting.
 *
 * Asset list is derived from the source files themselves (teams.ts, events.ts,
 * Gallery.tsx, and the completed-events directory tree) rather than hardcoded,
 * so re-running this after adding a new year/team member/gallery photo picks
 * up the new file automatically.
 *
 * Usage:
 *   node scripts/upload-to-r2.mjs           # uploads everything
 *   node scripts/upload-to-r2.mjs --dry-run  # lists what would be uploaded, uploads nothing
 */
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, existsSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const DRY_RUN = process.argv.includes("--dry-run");

// ---- Load .env.r2.local (simple KEY=value parser, no dependency needed) ----
function loadEnvFile(filePath) {
  const env = {};
  const content = readFileSync(filePath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

const envPath = path.join(ROOT, ".env.r2.local");
if (!existsSync(envPath)) {
  console.error(`Missing ${envPath}. Fill it in first (see the R2 migration walkthrough).`);
  process.exit(1);
}
const env = loadEnvFile(envPath);
const required = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET_NAME", "R2_PUBLIC_URL"];
const missing = required.filter((k) => !env[k]);
if (missing.length > 0) {
  console.error(`.env.r2.local is missing values for: ${missing.join(", ")}`);
  process.exit(1);
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

// ---- Figure out which files to upload, by reading the source files that reference them ----

function extractQuotedPaths(source, pattern) {
  const paths = new Set();
  let match;
  while ((match = pattern.exec(source)) !== null) {
    paths.add(match[1]);
  }
  return paths;
}

async function walkDir(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walkDir(full)));
    else out.push(full);
  }
  return out;
}

async function buildAssetList() {
  const relPaths = new Set();

  // Team member photos: image: "/xxx.webp" in teams.ts
  const teamsSrc = readFileSync(path.join(ROOT, "src/data/teams.ts"), "utf-8");
  for (const p of extractQuotedPaths(teamsSrc, /image:\s*"(\/[^"]+)"/g)) relPaths.add(p);

  // Flagship event images: image: "/xxx.webp" in events.ts
  const eventsSrc = readFileSync(path.join(ROOT, "src/data/events.ts"), "utf-8");
  for (const p of extractQuotedPaths(eventsSrc, /image:\s*"(\/[^"]+)"/g)) relPaths.add(p);

  // Gallery carousel images: src: "/xxx.webp" in Gallery.tsx
  const gallerySrc = readFileSync(path.join(ROOT, "src/pages/Gallery.tsx"), "utf-8");
  for (const p of extractQuotedPaths(gallerySrc, /src:\s*"(\/[^"]+)"/g)) relPaths.add(p);

  // All completed-event photos (recursive)
  const completedDir = path.join(PUBLIC_DIR, "events", "completed");
  if (existsSync(completedDir)) {
    for (const abs of await walkDir(completedDir)) {
      relPaths.add("/" + path.relative(PUBLIC_DIR, abs).split(path.sep).join("/"));
    }
  }

  // Resolve to absolute paths, dropping anything that isn't actually on disk
  // (e.g. stale references) rather than failing the whole run.
  const assets = [];
  for (const rel of relPaths) {
    const abs = path.join(PUBLIC_DIR, rel.slice(1));
    if (existsSync(abs) && statSync(abs).isFile()) {
      assets.push({ rel, abs });
    } else {
      console.warn(`  (skipping ${rel} — referenced but not found on disk)`);
    }
  }
  return assets.sort((a, b) => a.rel.localeCompare(b.rel));
}

const CONTENT_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

async function main() {
  const assets = await buildAssetList();
  console.log(`Found ${assets.length} files to upload to bucket "${env.R2_BUCKET_NAME}"\n`);

  let uploaded = 0;
  let totalBytes = 0;
  const failures = [];

  for (const { rel, abs } of assets) {
    const key = rel.slice(1); // strip leading "/"
    const size = statSync(abs).size;
    const ext = path.extname(abs).toLowerCase();
    const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";

    if (DRY_RUN) {
      console.log(`  [dry-run] ${key}  (${(size / 1024).toFixed(0)} KB, ${contentType})`);
      totalBytes += size;
      continue;
    }

    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: env.R2_BUCKET_NAME,
          Key: key,
          Body: readFileSync(abs),
          ContentType: contentType,
          CacheControl: "public, max-age=31536000, immutable",
        }),
      );
      uploaded++;
      totalBytes += size;
      console.log(`  uploaded ${key}  (${(size / 1024).toFixed(0)} KB)`);
    } catch (err) {
      failures.push({ key, error: err.message });
      console.error(`  FAILED ${key}: ${err.message}`);
    }
  }

  console.log(`\n${DRY_RUN ? "Would upload" : "Uploaded"} ${DRY_RUN ? assets.length : uploaded}/${assets.length} files, ${(totalBytes / 1024 / 1024).toFixed(2)} MB total.`);

  if (!DRY_RUN && assets.length > 0) {
    const sample = assets[0].rel;
    console.log(`\nSpot-check a sample URL: ${env.R2_PUBLIC_URL}${sample}`);
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} file(s) failed:`);
    for (const f of failures) console.error(`  ${f.key}: ${f.error}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
