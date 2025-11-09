/**
 * Shared progress bar utilities for build scripts
 */
import cliProgress from "cli-progress";

/**
 * Creates a standardized progress bar with consistent styling
 */
export const createProgressBar = (label: string): cliProgress.SingleBar => {
  return new cliProgress.SingleBar(
    {
      format: `${label} | {bar} | {percentage}% | {step}`,
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic
  );
};

/**
 * Wrapper to run an async function with progress bar error handling
 */
export const withProgressBar = async <T>(
  label: string,
  totalSteps: number,
  fn: (bar: cliProgress.SingleBar) => Promise<T>
): Promise<T> => {
  const progressBar = createProgressBar(label);

  try {
    progressBar.start(totalSteps, 0, { step: "Initializing..." });
    const result = await fn(progressBar);
    progressBar.stop();
    return result;
  } catch (error) {
    progressBar.stop();
    throw error;
  }
};

/**
 * Helper to update progress bar with a step description
 * Updates the payload without changing the progress value
 */
export const updateStep = (bar: cliProgress.SingleBar, step: string): void => {
  bar.update({ step });
};

/**
 * Helper to increment progress bar with optional step description
 */
export const incrementStep = (
  bar: cliProgress.SingleBar,
  step?: string
): void => {
  if (step) {
    bar.increment(1, { step });
  } else {
    bar.increment(1);
  }
};
