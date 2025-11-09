/**
 * Shared file system utilities for build scripts
 */
import { existsSync } from "fs";
import { mkdir } from "fs/promises";

/**
 * Ensures a directory exists, creating it recursively if needed
 */
export const ensureDirectory = async (dirPath: string): Promise<void> => {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }
};

/**
 * Ensures multiple directories exist
 */
export const ensureDirectories = async (
  ...dirPaths: string[]
): Promise<void> => {
  await Promise.all(dirPaths.map((dir) => ensureDirectory(dir)));
};

