/**
 * Shared error handling utilities for build scripts
 */

/**
 * Handles script errors with consistent logging and exit behavior
 */
export const handleScriptError = (
  scriptName: string,
  error: unknown
): never => {
  console.error(`\n❌ Error in ${scriptName}:`, error);
  process.exit(1);
};

/**
 * Wraps a script execution with error handling
 */
export const runScript = async (
  scriptName: string,
  fn: () => Promise<void>
): Promise<void> => {
  try {
    await fn();
  } catch (error) {
    handleScriptError(scriptName, error);
  }
};
