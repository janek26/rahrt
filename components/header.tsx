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

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "pointer-events-none top-0 right-0 left-0 z-50 px-5 pt-4 sm:px-6",
        sticky ? "fixed" : "relative"
      )}
    >
      <div
        className={cn(
          "border-foreground/12 bg-background/[0.72] pointer-events-auto mx-auto flex max-w-7xl items-center border-b px-1 py-3 backdrop-blur-xl",
          leadingContent ? "justify-between" : "justify-end"
        )}
      >
        {leadingContent ? (
          <div className="min-w-0 text-sm font-medium">{leadingContent}</div>
        ) : null}
        <div className="flex items-center gap-2">
          {showPrintButton ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => window.print()}
              className="border-foreground/12 bg-background/40 hover:border-accent/45 hover:bg-accent/[0.1] dark:hover:border-accent/75 dark:hover:bg-accent/[0.22] flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border p-2 transition-[transform,border-color,background-color] duration-[160ms] ease-out active:scale-[0.97]"
              aria-label="Print CV"
              title="Print"
              type="button"
            >
              <Printer
                aria-hidden="true"
                className="text-primary dark:text-accent h-5 w-5"
              />
            </motion.button>
          ) : null}
          {downloadHref ? (
            <motion.a
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              href={downloadHref}
              download={downloadName}
              className="border-foreground/12 bg-background/40 hover:border-accent/45 hover:bg-accent/[0.1] dark:hover:border-accent/75 dark:hover:bg-accent/[0.22] flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border p-2 transition-[transform,border-color,background-color] duration-[160ms] ease-out active:scale-[0.97]"
              aria-label="Download CV PDF"
              title="Download PDF"
            >
              <Download
                aria-hidden="true"
                className="text-primary dark:text-accent h-5 w-5"
              />
            </motion.a>
          ) : null}
          <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={toggleTheme}
            className="border-foreground/12 bg-background/40 hover:border-accent/45 hover:bg-accent/[0.1] dark:hover:border-accent/75 dark:hover:bg-accent/[0.22] relative flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border p-2 transition-[transform,border-color,background-color] duration-[160ms] ease-out active:scale-[0.97]"
            aria-label="Toggle theme"
            type="button"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{
                  duration: 0.18,
                  ease: [0.23, 1, 0.32, 1],
                }}
                style={{ willChange: "transform" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {isDark ? (
                  <Sun aria-hidden="true" className="text-accent h-4 w-4" />
                ) : (
                  <Moon aria-hidden="true" className="text-primary h-4 w-4" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
