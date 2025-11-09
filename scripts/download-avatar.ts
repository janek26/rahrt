#!/usr/bin/env bun

/**
 * Script to download GitHub avatar image and save it locally
 * Also generates a blur placeholder for Next.js Image component
 */
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import sharp from "sharp";

const GITHUB_AVATAR_URL =
  "https://avatars.githubusercontent.com/u/6831124?s=64&v=4";
const OUTPUT_PATH = "./public/images/avatar.jpg";
const OUTPUT_DIR = "./public/images";
const BLUR_DATA_FILE = "./lib/avatar-blur.ts";

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
    console.log("Downloading avatar from:", GITHUB_AVATAR_URL);

    // Create images directory if it doesn't exist
    if (!existsSync(OUTPUT_DIR)) {
      await mkdir(OUTPUT_DIR, { recursive: true });
      console.log("Created directory:", OUTPUT_DIR);
    }

    // Download the image
    const response = await fetch(GITHUB_AVATAR_URL);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to file
    await writeFile(OUTPUT_PATH, buffer);
    console.log("✅ Avatar downloaded successfully to:", OUTPUT_PATH);

    // Generate blur placeholder
    const blurDataURL = await generateBlurDataURL(buffer);
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
