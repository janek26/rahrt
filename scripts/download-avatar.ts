#!/usr/bin/env bun

/**
 * Script to download GitHub avatar image and save it locally
 * Downloads high-resolution source and generates optimized web versions with retina support
 */
import { writeFile } from "fs/promises";
import sharp from "sharp";
import { withProgressBar, incrementStep, updateStep } from "../lib/progress";
import {
  AVATAR_SOURCE_PATH,
  AVATAR_1X_PATH,
  AVATAR_2X_PATH,
  IMAGES_DIR,
  LIB_DIR,
  BLUR_DATA_PATH,
} from "../lib/paths";
import { ensureDirectories } from "../lib/fs-utils";
import { generateBlurDataURL } from "../lib/image-utils";
import { runScript } from "../lib/error-handler";

// Download high-resolution source (512x512 for best quality)
const GITHUB_AVATAR_URL =
  "https://avatars.githubusercontent.com/u/6831124?s=512&v=4";

// Web display size (1x = 128px, 2x = 256px for retina)
// Displayed at 64px, so we need 2x for retina
const AVATAR_SIZE_1X = 128;
const AVATAR_SIZE_2X = 256;

async function downloadAvatar() {
  await runScript("download-avatar", async () => {
    await withProgressBar("Avatar Processing", 5, async (bar) => {
      // Create directories if they don't exist
      await ensureDirectories(IMAGES_DIR, LIB_DIR);

      // Download the high-resolution image
      updateStep(bar, "Downloading avatar...");
      const response = await fetch(GITHUB_AVATAR_URL);
      if (!response.ok) {
        throw new Error(`Failed to download image: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const sourceBuffer = Buffer.from(arrayBuffer);
      incrementStep(bar, "Downloaded");

      // Save high-resolution source
      updateStep(bar, "Saving source...");
      await writeFile(AVATAR_SOURCE_PATH, sourceBuffer);
      incrementStep(bar, "Source saved");

      // Generate optimized web versions
      // 1x version (128x128) - for standard displays
      updateStep(bar, "Generating 1x...");
      const avatar1x = await sharp(sourceBuffer)
        .resize(AVATAR_SIZE_1X, AVATAR_SIZE_1X, { fit: "cover" })
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer();
      await writeFile(AVATAR_1X_PATH, avatar1x);
      incrementStep(bar, `Generated 1x (${AVATAR_SIZE_1X}px)`);

      // 2x version (256x256) - for retina displays
      updateStep(bar, "Generating 2x...");
      const avatar2x = await sharp(sourceBuffer)
        .resize(AVATAR_SIZE_2X, AVATAR_SIZE_2X, { fit: "cover" })
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer();
      await writeFile(AVATAR_2X_PATH, avatar2x);
      incrementStep(bar, `Generated 2x (${AVATAR_SIZE_2X}px)`);

      // Generate blur placeholder from 1x version
      updateStep(bar, "Generating blur...");
      const blurDataURL = await generateBlurDataURL(avatar1x);
      const blurDataContent = `// Auto-generated blur placeholder for avatar image
// Run 'bun run download-avatar' to regenerate

export const AVATAR_BLUR_DATA_URL = "${blurDataURL}" as const;
`;

      await writeFile(BLUR_DATA_PATH, blurDataContent);
      updateStep(bar, "Complete!");
    });

    console.log("\n✅ Avatar processing complete!");
  });
}

downloadAvatar();
