#!/usr/bin/env bun

/**
 * Script to generate Open Graph and Twitter preview images at build time
 * Creates beautiful preview images with avatar, name, and theme matching the site
 *
 * Usage:
 *   bun scripts/generate-og-images.ts                    # Generate default OG images
 *   bun scripts/generate-og-images.ts -o path/to/file.png # Generate to specific path
 */
import { writeFile } from "fs/promises";
import { dirname } from "path";
import sharp from "sharp";
import type cliProgress from "cli-progress";
import { withProgressBar, incrementStep, updateStep } from "../lib/progress";
import { AVATAR_SOURCE_PATH, OG_IMAGE_PATH } from "../lib/paths";
import { ensureDirectory } from "../lib/fs-utils";
import { runScript } from "../lib/error-handler";

/**
 * Generates a preview image with avatar, name, and tags
 */
async function generatePreviewImage(
  outputPath: string,
  progressBar: cliProgress.SingleBar,
  width: number = 1200,
  height: number = 630
): Promise<void> {
  // Ensure output directory exists
  const outputDir = dirname(outputPath);
  await ensureDirectory(outputDir);

  // Load and prepare avatar (180x180, rounded)
  updateStep(progressBar, "Loading avatar...");
  const avatarSize = 180;
  const avatar = await sharp(AVATAR_SOURCE_PATH)
    .resize(avatarSize, avatarSize, { fit: "cover" })
    .toBuffer();
  incrementStep(progressBar);

  // Create circular mask for avatar
  updateStep(progressBar, "Creating mask...");
  const avatarMask = Buffer.from(
    `<svg width="${avatarSize}" height="${avatarSize}">
      <circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${avatarSize / 2}" fill="white"/>
    </svg>`
  );

  // Apply circular mask to avatar
  const roundedAvatar = await sharp(avatar)
    .composite([
      {
        input: avatarMask,
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();
  incrementStep(progressBar);

  // Create background gradient
  updateStep(progressBar, "Creating background...");
  const backgroundSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="glow1" cx="25%" cy="25%" r="40%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.12" />
          <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0" />
        </radialGradient>
        <radialGradient id="glow2" cx="75%" cy="75%" r="40%">
          <stop offset="0%" style="stop-color:#a855f7;stop-opacity:0.12" />
          <stop offset="100%" style="stop-color:#a855f7;stop-opacity:0" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      <rect width="${width}" height="${height}" fill="url(#glow1)"/>
      <rect width="${width}" height="${height}" fill="url(#glow2)"/>
    </svg>`
  );

  const background = await sharp(backgroundSvg).png().toBuffer();
  incrementStep(progressBar);

  // Create text overlay SVG with balanced spacing
  updateStep(progressBar, "Creating text...");
  const avatarY = 100;
  const nameY = 350;
  const subtitleY = 410;
  const tagsY = 475;
  const tagHeight = 36;

  const textSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#a855f7;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Name with gradient -->
      <text x="600" y="${nameY}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" 
            font-size="72" font-weight="700" text-anchor="middle" 
            fill="url(#textGrad)" letter-spacing="-0.02em" dominant-baseline="middle">janek26</text>
      
      <!-- Subtitle -->
      <text x="600" y="${subtitleY}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" 
            font-size="28" font-weight="400" text-anchor="middle" 
            fill="rgba(255, 255, 255, 0.7)" dominant-baseline="middle">Web3 &amp; Full-Stack Developer</text>
      
      <!-- Tags -->
      <g>
        <!-- Open Source tag -->
        <rect x="420" y="${tagsY}" width="140" height="${tagHeight}" rx="8" 
              fill="rgba(255, 255, 255, 0.05)" 
              stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
        <text x="490" y="${tagsY + 24}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" 
              font-size="18" font-weight="500" text-anchor="middle" fill="rgba(255, 255, 255, 0.6)">Open Source</text>
        
        <!-- Web3 tag -->
        <rect x="580" y="${tagsY}" width="80" height="${tagHeight}" rx="8" 
              fill="rgba(255, 255, 255, 0.05)" 
              stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
        <text x="620" y="${tagsY + 24}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" 
              font-size="18" font-weight="500" text-anchor="middle" fill="rgba(255, 255, 255, 0.6)">Web3</text>
        
        <!-- TypeScript tag -->
        <rect x="680" y="${tagsY}" width="120" height="${tagHeight}" rx="8" 
              fill="rgba(255, 255, 255, 0.05)" 
              stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
        <text x="740" y="${tagsY + 24}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" 
              font-size="18" font-weight="500" text-anchor="middle" fill="rgba(255, 255, 255, 0.6)">TypeScript</text>
      </g>
      
      <!-- Bottom accent bar -->
      <rect x="0" y="${height - 4}" width="${width}" height="4" fill="url(#textGrad)"/>
    </svg>`
  );
  incrementStep(progressBar);

  // Composite everything together
  updateStep(progressBar, "Compositing...");
  const finalImage = await sharp(background)
    .composite([
      // Avatar (no background box, just the circular image)
      {
        input: roundedAvatar,
        top: avatarY,
        left: (width - avatarSize) / 2,
      },
      // Text overlay
      {
        input: textSvg,
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();
  incrementStep(progressBar);

  updateStep(progressBar, "Saving...");
  await writeFile(outputPath, finalImage);
  updateStep(progressBar, "Complete!");
}

async function main() {
  await runScript("generate-og-images", async () => {
    // Parse command-line arguments
    const args = process.argv.slice(2);
    const outputIndex = args.findIndex(
      (arg) => arg === "-o" || arg === "--output"
    );

    // Total steps: 1=avatar, 2=mask, 3=background, 4=text, 5=composite, 6=save
    await withProgressBar("OG Image Generation", 6, async (bar) => {
      if (outputIndex !== -1 && args[outputIndex + 1]) {
        // Custom output path provided
        const outputPath = args[outputIndex + 1];
        await generatePreviewImage(outputPath, bar);
      } else {
        // Default: generate OG images for public directory
        await generatePreviewImage(OG_IMAGE_PATH, bar);
      }
    });

    console.log("\n✅ Preview image generated successfully!");
  });
}

main();
