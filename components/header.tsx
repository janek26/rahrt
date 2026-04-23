"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Moon, Printer, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type HeaderProps = {
  sticky?: boolean;
  leadingContent?: ReactNode;
  showPrintButton?: boolean;
  downloadHref?: string;
  downloadName?: string;
};

export function Header({
  sticky = true,
  leadingContent,
  showPrintButton = false,
  downloadHref,
  downloadName,
}: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const isDark = resolvedTheme === "dark";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "border-border/40 bg-background/85 top-0 right-0 left-0 z-50 border-b transition-colors duration-300",
        sticky ? "fixed backdrop-blur-md" : "relative backdrop-blur-sm"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center px-6 py-4",
          leadingContent ? "justify-between" : "justify-end"
        )}
      >
        {leadingContent ? (
          <div className="text-sm font-medium">{leadingContent}</div>
        ) : null}
        <div className="flex items-center gap-2">
          {showPrintButton ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => window.print()}
              className="bg-secondary/50 hover:bg-secondary flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg p-2 hover:shadow-lg"
              aria-label="Print CV"
              title="Print"
              type="button"
            >
              <Printer className="text-primary dark:text-accent h-5 w-5" />
            </motion.button>
          ) : null}
          {downloadHref ? (
            <motion.a
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              href={downloadHref}
              download={downloadName}
              className="bg-secondary/50 hover:bg-secondary flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg p-2 hover:shadow-lg"
              aria-label="Download CV PDF"
              title="Download PDF"
            >
              <Download className="text-primary dark:text-accent h-5 w-5" />
            </motion.a>
          ) : null}
          {mounted && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={toggleTheme}
              className="bg-secondary/50 hover:bg-secondary relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg p-2 hover:shadow-lg"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? "dark" : "light"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ willChange: "transform" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {isDark ? (
                    <Sun className="text-accent h-5 w-5" />
                  ) : (
                    <Moon className="text-primary h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
