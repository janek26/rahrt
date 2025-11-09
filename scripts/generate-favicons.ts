#!/usr/bin/env bun

/**
 * Script to generate favicons from avatar image
 */
import { existsSync } from "fs";
import { writeFile } from "fs/promises";
import sharp from "sharp";
import { runScript } from "../lib/error-handler";
import { ensureDirectory } from "../lib/fs-utils";
import { createCircularIcon, createSquareIcon } from "../lib/image-utils";
import {
  APPLE_TOUCH_ICON_PATH,
  AVATAR_SOURCE_PATH,
  FAVICON_ICO_PATH,
  ICONS_DIR,
  PUBLIC_DIR,
  WEBMANIFEST_PATH,
} from "../lib/paths";
import { incrementStep, updateStep, withProgressBar } from "../lib/progress";

const SIZES = [16, 32, 96, 192, 512];

async function generateFavicons() {
  // Total steps: 1 favicon.ico + 5 png favicons + 2 apple icons + 2 android icons + 1 manifest = 11
  const totalSteps = 1 + SIZES.length + 2 + 2 + 1;

  await runScript("generate-favicons", async () => {
    if (!existsSync(AVATAR_SOURCE_PATH)) {
      throw new Error(
        `Avatar not found at ${AVATAR_SOURCE_PATH}. Run 'bun run download-avatar' first.`
      );
    }

    await withProgressBar("Favicon Generation", totalSteps, async (bar) => {
      // Create icons directory if it doesn't exist
      await ensureDirectory(ICONS_DIR);

      const imageBuffer = await sharp(AVATAR_SOURCE_PATH)
        .resize(512, 512)
        .toBuffer();

      // Generate favicon.ico (must stay at root for browser compatibility)
      updateStep(bar, "favicon.ico");
      const faviconIco = await createCircularIcon(imageBuffer, 32);
      await writeFile(FAVICON_ICO_PATH, faviconIco);
      incrementStep(bar);

      // Generate PNG favicons for different sizes (in icons directory, all circular)
      for (const size of SIZES) {
        updateStep(bar, `favicon-${size}px`);
        const circularIcon = await createCircularIcon(imageBuffer, size);
        await writeFile(
          `${ICONS_DIR}/favicon-${size}x${size}.png`,
          circularIcon
        );
        incrementStep(bar);
      }

      // Generate apple-touch-icon (square, in icons directory)
      updateStep(bar, "apple-touch-icon");
      const appleIcon = await createSquareIcon(imageBuffer, 180);
      await writeFile(`${ICONS_DIR}/apple-touch-icon.png`, appleIcon);
      incrementStep(bar);

      // Also save apple-touch-icon at root for iOS Safari fallback
      updateStep(bar, "apple-touch-icon (root)");
      await writeFile(APPLE_TOUCH_ICON_PATH, appleIcon);
      incrementStep(bar);

      // Generate android-chrome icons (square, in icons directory)
      for (const size of [192, 512]) {
        updateStep(bar, `android-${size}px`);
        const squareIcon = await createSquareIcon(imageBuffer, size);
        await writeFile(
          `${ICONS_DIR}/android-chrome-${size}x${size}.png`,
          squareIcon
        );
        incrementStep(bar);
      }

      // Generate site.webmanifest (must stay at root, but references icons in /icons/)
      updateStep(bar, "webmanifest");
      const manifest = {
        name: "rahrt.me - Janek's Portfolio",
        short_name: "rahrt.me",
        icons: [
          {
            src: "/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
      };

      await writeFile(WEBMANIFEST_PATH, JSON.stringify(manifest, null, 2));
      updateStep(bar, "Complete!");
    });

    console.log("\n✅ All favicons generated successfully!");
  });
}

generateFavicons();
