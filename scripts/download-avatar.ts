#!/usr/bin/env bun

/**
 * Script to download GitHub avatar image and save it locally
 * Downloads high-resolution source and generates optimized web versions with retina support
 */
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import sharp from "sharp";

// Download high-resolution source (512x512 for best quality)
const GITHUB_AVATAR_URL =
  "https://avatars.githubusercontent.com/u/6831124?s=512&v=4";
const SOURCE_PATH = "./public/images/avatar-source.jpg";
const OUTPUT_PATH = "./public/images/avatar.jpg";
const OUTPUT_RETINA_PATH = "./public/images/avatar@2x.jpg";
const OUTPUT_DIR = "./public/images";
const LIB_DIR = "./lib";
const BLUR_DATA_FILE = "./lib/avatar-blur.ts";

// Web display size (1x = 128px, 2x = 256px for retina)
// Displayed at 64px, so we need 2x for retina
const AVATAR_SIZE_1X = 128;
const AVATAR_SIZE_2X = 256;

async function generateBlurDataURL(imageBuffer: Buffer): Promise<string> {
  // Resize to 10x10 and convert to base64
  const resized = await sharp(imageBuffer)
    .resize(10, 10, { fit: "cover" })
    .jpeg({ quality: 20 })
    .toBuffer();

  const base64 = resized.toString("base64");
  return `data:image/jpeg;base64,${base64}`;
}

async function downloadAvatar() {
  try {
    console.log("Downloading high-resolution avatar from:", GITHUB_AVATAR_URL);

    // Create directories if they don't exist
    if (!existsSync(OUTPUT_DIR)) {
      await mkdir(OUTPUT_DIR, { recursive: true });
      console.log("Created directory:", OUTPUT_DIR);
    }
    if (!existsSync(LIB_DIR)) {
      await mkdir(LIB_DIR, { recursive: true });
      console.log("Created directory:", LIB_DIR);
    }

    // Download the high-resolution image
    const response = await fetch(GITHUB_AVATAR_URL);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const sourceBuffer = Buffer.from(arrayBuffer);

    // Save high-resolution source
    await writeFile(SOURCE_PATH, sourceBuffer);
    console.log("✅ High-resolution source saved to:", SOURCE_PATH);

    // Generate optimized web versions
    // 1x version (200x200) - for standard displays
    const avatar1x = await sharp(sourceBuffer)
      .resize(AVATAR_SIZE_1X, AVATAR_SIZE_1X, { fit: "cover" })
      .jpeg({ quality: 85, mozjpeg: true })
      .toBuffer();
    await writeFile(OUTPUT_PATH, avatar1x);
    console.log(
      `✅ Generated optimized avatar (${AVATAR_SIZE_1X}x${AVATAR_SIZE_1X}) at:`,
      OUTPUT_PATH
    );

    // 2x version (400x400) - for retina displays
    const avatar2x = await sharp(sourceBuffer)
      .resize(AVATAR_SIZE_2X, AVATAR_SIZE_2X, { fit: "cover" })
      .jpeg({ quality: 85, mozjpeg: true })
      .toBuffer();
    await writeFile(OUTPUT_RETINA_PATH, avatar2x);
    console.log(
      `✅ Generated retina avatar (${AVATAR_SIZE_2X}x${AVATAR_SIZE_2X}) at:`,
      OUTPUT_RETINA_PATH
    );

    // Generate blur placeholder from 1x version
    const blurDataURL = await generateBlurDataURL(avatar1x);
    const blurDataContent = `// Auto-generated blur placeholder for avatar image
// Run 'bun run download-avatar' to regenerate

export const AVATAR_BLUR_DATA_URL = "${blurDataURL}" as const;
`;

    await writeFile(BLUR_DATA_FILE, blurDataContent);
    console.log("✅ Blur placeholder generated:", BLUR_DATA_FILE);
  } catch (error) {
    console.error("❌ Error downloading avatar:", error);
    process.exit(1);
  }
}

downloadAvatar();
