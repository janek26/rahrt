#!/usr/bin/env bun

/**
 * Script to generate favicons from avatar image
 */
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import sharp from "sharp";

const AVATAR_PATH = "./public/images/avatar-source.jpg";
const OUTPUT_DIR = "./public";
const ICONS_DIR = "./public/icons";
const SIZES = [16, 32, 96, 192, 512];

/**
 * Creates a circular icon from an image buffer
 */
async function createCircularIcon(
  imageBuffer: Buffer,
  size: number
): Promise<Buffer> {
  // Resize image to target size
  const resized = await sharp(imageBuffer)
    .resize(size, size, { fit: "cover" })
    .toBuffer();

  // Create circular mask
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
    </svg>`
  );

  // Apply circular mask
  return await sharp(resized)
    .composite([
      {
        input: mask,
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();
}

/**
 * Creates a square icon from an image buffer (for app icons)
 */
async function createSquareIcon(
  imageBuffer: Buffer,
  size: number
): Promise<Buffer> {
  // Resize image to target size with square aspect ratio
  return await sharp(imageBuffer)
    .resize(size, size, { fit: "cover" })
    .png()
    .toBuffer();
}

async function generateFavicons() {
  try {
    if (!existsSync(AVATAR_PATH)) {
      throw new Error(
        `Avatar not found at ${AVATAR_PATH}. Run 'bun run download-avatar' first.`
      );
    }

    console.log("Generating favicons from:", AVATAR_PATH);

    // Create icons directory if it doesn't exist
    if (!existsSync(ICONS_DIR)) {
      await mkdir(ICONS_DIR, { recursive: true });
      console.log("Created directory:", ICONS_DIR);
    }

    const imageBuffer = await sharp(AVATAR_PATH).resize(512, 512).toBuffer();

    // Generate favicon.ico (must stay at root for browser compatibility)
    // Using 32x32 circular icon (circular works well for small browser favicons)
    const faviconIco = await createCircularIcon(imageBuffer, 32);
    await writeFile(`${OUTPUT_DIR}/favicon.ico`, faviconIco);
    console.log("✅ Generated favicon.ico (circular, at root)");

    // Generate PNG favicons for different sizes (in icons directory, all circular)
    // Circular favicons work well for small browser tab icons
    for (const size of SIZES) {
      const circularIcon = await createCircularIcon(imageBuffer, size);
      await writeFile(`${ICONS_DIR}/favicon-${size}x${size}.png`, circularIcon);
      console.log(`✅ Generated icons/favicon-${size}x${size}.png (circular)`);
    }

    // Generate apple-touch-icon (square, in icons directory)
    // iOS automatically adds rounded corners, so square is the standard format
    const appleIcon = await createSquareIcon(imageBuffer, 180);
    await writeFile(`${ICONS_DIR}/apple-touch-icon.png`, appleIcon);
    console.log("✅ Generated icons/apple-touch-icon.png (square)");

    // Generate android-chrome icons (square, in icons directory)
    // PWA/home screen icons are typically square for better platform consistency
    for (const size of [192, 512]) {
      const squareIcon = await createSquareIcon(imageBuffer, size);
      await writeFile(
        `${ICONS_DIR}/android-chrome-${size}x${size}.png`,
        squareIcon
      );
      console.log(
        `✅ Generated icons/android-chrome-${size}x${size}.png (square)`
      );
    }

    // Generate site.webmanifest (must stay at root, but references icons in /icons/)
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

    await writeFile(
      `${OUTPUT_DIR}/site.webmanifest`,
      JSON.stringify(manifest, null, 2)
    );
    console.log("✅ Generated site.webmanifest (at root)");

    console.log("\n✅ All favicons generated successfully!");
  } catch (error) {
    console.error("❌ Error generating favicons:", error);
    process.exit(1);
  }
}

generateFavicons();
