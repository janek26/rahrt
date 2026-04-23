#!/usr/bin/env bun

/**
 * Generate a printable CV PDF from /cv and place it in public/cv.pdf.
 */
import { spawn } from "node:child_process";
import { dirname } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "playwright";
import { runScript } from "../lib/error-handler";
import { ensureDirectory } from "../lib/fs-utils";
import { CV_PDF_PATH } from "../lib/paths";

const EXTERNAL_BASE_URL =
  process.env.CV_PDF_BASE_URL ?? "http://127.0.0.1:3000";
const DEV_PORT = Number(process.env.CV_PDF_PORT ?? "4173");
const INTERNAL_BASE_URL = `http://127.0.0.1:${DEV_PORT}`;

const waitForServer = async (url: string, timeoutMs: number): Promise<void> => {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Retry until timeout.
    }

    await delay(500);
  }

  throw new Error(`Timed out waiting for dev server at ${url}`);
};

const canReach = async (url: string): Promise<boolean> => {
  try {
    await waitForServer(url, 2_500);
    return true;
  } catch {
    return false;
  }
};

const stopServer = async (server: ReturnType<typeof spawn>): Promise<void> => {
  if (server.killed || server.exitCode !== null) {
    return;
  }

  server.kill("SIGTERM");

  await Promise.race([
    new Promise<void>((resolve) => {
      server.once("exit", () => resolve());
    }),
    delay(5000),
  ]);

  if (!server.killed && server.exitCode === null) {
    server.kill("SIGKILL");
  }
};

const runCommand = async (command: string, args: string[]): Promise<void> => {
  const child = spawn(command, args, {
    env: process.env,
    stdio: "inherit",
  });

  const exitCode = await new Promise<number>((resolve) => {
    child.once("close", (code) => resolve(code ?? 1));
  });

  if (exitCode !== 0) {
    throw new Error(
      `${command} ${args.join(" ")} failed with exit code ${exitCode}`
    );
  }
};

const launchBrowser = async () => {
  try {
    return await chromium.launch({
      channel: "chrome",
      headless: true,
    });
  } catch {
    try {
      return await chromium.launch({ headless: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (!message.includes("Executable doesn't exist")) {
        throw error;
      }

      console.log("Installing Playwright Chromium...");
      await runCommand("bunx", ["playwright", "install", "chromium"]);
      return chromium.launch({ headless: true });
    }
  }
};

async function main() {
  await runScript("generate-cv", async () => {
    await ensureDirectory(dirname(CV_PDF_PATH));

    const externalCvUrl = `${EXTERNAL_BASE_URL}/cv`;
    const canUseExternalServer = await canReach(externalCvUrl);
    const cvUrl = canUseExternalServer
      ? externalCvUrl
      : `${INTERNAL_BASE_URL}/cv`;

    const server = canUseExternalServer
      ? null
      : spawn("bun", ["run", "dev", "--port", String(DEV_PORT)], {
          env: {
            ...process.env,
            NEXT_TELEMETRY_DISABLED: "1",
          },
          stdio: "pipe",
        });

    if (server) {
      server.stdout.on("data", (chunk) => {
        const text = chunk.toString();
        if (text.trim()) {
          console.log(`[next] ${text.trimEnd()}`);
        }
      });

      server.stderr.on("data", (chunk) => {
        const text = chunk.toString();
        if (text.trim()) {
          console.error(`[next] ${text.trimEnd()}`);
        }
      });
    }

    let browser: Awaited<ReturnType<typeof chromium.launch>> | null = null;

    try {
      if (server) {
        await waitForServer(cvUrl, 120_000);
      }

      browser = await launchBrowser();
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto(cvUrl, { waitUntil: "networkidle", timeout: 120_000 });
      await page.emulateMedia({ media: "print" });
      await page.pdf({
        path: CV_PDF_PATH,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
      });

      console.log(`\n✅ CV generated at ${CV_PDF_PATH}`);
    } finally {
      if (browser) {
        await browser.close();
      }
      if (server) {
        await stopServer(server);
      }
    }
  });
}

main();
