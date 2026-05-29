#!/usr/bin/env bun

/**
 * Script to generate Open Graph and Twitter preview images at build time.
 * Creates preview images matching the site's warm, modern design with
 * amber/teal accents, grid background, and Newsreader-style typography.
 *
 * Usage:
 *   bun scripts/generate-og-images.ts                    # Generate default OG images
 *   bun scripts/generate-og-images.ts -o path/to/file.png # Generate to specific path
 */
import { writeFile } from "fs/promises";
import { dirname } from "path";
import type cliProgress from "cli-progress";
import sharp from "sharp";
import { runScript } from "../lib/error-handler";
import { ensureDirectory } from "../lib/fs-utils";
import { AVATAR_SOURCE_PATH, OG_IMAGE_PATH } from "../lib/paths";
import { incrementStep, updateStep, withProgressBar } from "../lib/progress";

// ── Design tokens (matching app/globals.css) ──────────────────────────────
const BG = "#f6f2e8"; // --background: oklch(0.972 0.01 72)
const ACCENT = "#c2852c"; // --accent: oklch(0.58 0.14 47)
const PRIMARY = "#2d6a5a"; // --primary: oklch(0.43 0.1 177)
const FOREGROUND = "#2d2a26"; // --foreground: oklch(0.18 0.02 61)
const MUTED = "#6b6560"; // --muted-foreground

const WIDTH = 1200;
const HEIGHT = 630;

/**
 * Generates a preview image matching the site's visual identity.
 */
async function generatePreviewImage(
  outputPath: string,
  progressBar: cliProgress.SingleBar
): Promise<void> {
  const outputDir = dirname(outputPath);
  await ensureDirectory(outputDir);

  // Load and prepare avatar (circular, 140x140)
  updateStep(progressBar, "Loading avatar...");
  const avatarSize = 140;
  const avatar = await sharp(AVATAR_SOURCE_PATH)
    .resize(avatarSize, avatarSize, { fit: "cover" })
    .toBuffer();
  incrementStep(progressBar);

  // Circular mask
  updateStep(progressBar, "Creating mask...");
  const avatarMask = Buffer.from(
    `<svg width="${avatarSize}" height="${avatarSize}">
      <circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${avatarSize / 2}" fill="white"/>
    </svg>`
  );
  const roundedAvatar = await sharp(avatar)
    .composite([{ input: avatarMask, blend: "dest-in" }])
    .png()
    .toBuffer();
  incrementStep(progressBar);

  // Build the full SVG artwork
  updateStep(progressBar, "Creating artwork...");
  const artworkSvg = buildArtworkSvg();
  const artwork = await sharp(artworkSvg).png().toBuffer();
  incrementStep(progressBar);

  // Composite avatar onto artwork
  updateStep(progressBar, "Compositing...");
  const avatarX = (WIDTH - avatarSize) / 2;
  const avatarY = 70;
  const finalImage = await sharp(artwork)
    .composite([{ input: roundedAvatar, top: avatarY, left: avatarX }])
    .png()
    .toBuffer();
  incrementStep(progressBar);

  updateStep(progressBar, "Saving...");
  await writeFile(outputPath, finalImage);
  updateStep(progressBar, "Complete!");
}

/** Build the full SVG with background, text, tags, and accent bar. */
function buildArtworkSvg(): Buffer {
  const centerX = WIDTH / 2;
  const nameY = 300;
  const domainY = 375;
  const tagsY = 440;
  const tagHeight = 38;

  // Pre-compute tag positions for horizontal centering
  const tags = [
    { label: "TypeScript", width: 130 },
    { label: "Web3", width: 76 },
    { label: "Open Source", width: 148 },
  ];
  const tagGap = 16;
  const totalTagsWidth =
    tags.reduce((sum, t) => sum + t.width, 0) + tagGap * (tags.length - 1);
  let tagCursorX = centerX - totalTagsWidth / 2;

  const tagRects = tags
    .map((tag) => {
      const x = tagCursorX;
      tagCursorX += tag.width + tagGap;
      return {
        x,
        label: tag.label,
        width: tag.width,
        textX: x + tag.width / 2,
      };
    })
    .map(
      (t) => `
        <rect x="${t.x}" y="${tagsY}" width="${t.width}" height="${tagHeight}" rx="8"
              fill="${BG}" stroke="${ACCENT}" stroke-width="1.5" stroke-opacity="0.5"/>
        <text x="${t.textX}" y="${tagsY + 26}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
              font-size="18" font-weight="500" text-anchor="middle" fill="${FOREGROUND}">${t.label}</text>`
    )
    .join("");

  return Buffer.from(
    `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Accent gradient (amber → teal) -->
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${ACCENT}"/>
          <stop offset="100%" stop-color="${PRIMARY}"/>
        </linearGradient>

        <!-- Amber glow -->
        <radialGradient id="glowAccent" cx="15%" cy="10%" r="50%">
          <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
        </radialGradient>

        <!-- Teal glow -->
        <radialGradient id="glowPrimary" cx="85%" cy="8%" r="50%">
          <stop offset="0%" stop-color="${PRIMARY}" stop-opacity="0.10"/>
          <stop offset="100%" stop-color="${PRIMARY}" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Background -->
      <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>

      <!-- Grid pattern (64px, matching the site) -->
      <defs>
        <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <line x1="64" y1="0" x2="64" y2="64" stroke="${FOREGROUND}" stroke-opacity="0.04" stroke-width="1"/>
          <line x1="0" y1="64" x2="64" y2="64" stroke="${FOREGROUND}" stroke-opacity="0.03" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>

      <!-- Ambient glows -->
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowAccent)"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowPrimary)"/>

      <!-- Name -->
      <text x="${centerX}" y="${nameY}" font-family="Georgia, 'Times New Roman', serif"
            font-size="64" font-weight="700" text-anchor="middle"
            fill="${FOREGROUND}" letter-spacing="-0.02em" dominant-baseline="middle">Janek Rahrt</text>

      <!-- Domain -->
      <text x="${centerX}" y="${domainY}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
            font-size="20" font-weight="400" text-anchor="middle"
            fill="${MUTED}" dominant-baseline="middle">Product Engineering · Crypto · Open Source</text>

      <!-- Tags -->
      <g>${tagRects}</g>

      <!-- Bottom accent bar -->
      <rect x="0" y="${HEIGHT - 4}" width="${WIDTH}" height="4" fill="url(#accentGrad)"/>
    </svg>`
  );
}

async function main() {
  await runScript("generate-og-images", async () => {
    const args = process.argv.slice(2);
    const outputIndex = args.findIndex(
      (arg) => arg === "-o" || arg === "--output"
    );

    await withProgressBar("OG Image Generation", 5, async (bar) => {
      if (outputIndex !== -1 && args[outputIndex + 1]) {
        const outputPath = args[outputIndex + 1];
        await generatePreviewImage(outputPath, bar);
      } else {
        await generatePreviewImage(OG_IMAGE_PATH, bar);
      }
    });

    console.log("\n✅ Preview image generated successfully!");
  });
}

main();
