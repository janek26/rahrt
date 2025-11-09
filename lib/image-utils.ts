/**
 * Shared image processing utilities for build scripts
 */
import sharp from "sharp";

/**
 * Creates a circular icon from an image buffer
 */
export const createCircularIcon = async (
  imageBuffer: Buffer,
  size: number
): Promise<Buffer> => {
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
};

/**
 * Creates a square icon from an image buffer (for app icons)
 */
export const createSquareIcon = async (
  imageBuffer: Buffer,
  size: number
): Promise<Buffer> => {
  // Resize image to target size with square aspect ratio
  return await sharp(imageBuffer)
    .resize(size, size, { fit: "cover" })
    .png()
    .toBuffer();
};

/**
 * Generates a blur placeholder data URL from an image buffer
 */
export const generateBlurDataURL = async (
  imageBuffer: Buffer
): Promise<string> => {
  // Resize to 10x10 and convert to base64
  const resized = await sharp(imageBuffer)
    .resize(10, 10, { fit: "cover" })
    .jpeg({ quality: 20 })
    .toBuffer();

  const base64 = resized.toString("base64");
  return `data:image/jpeg;base64,${base64}`;
};

