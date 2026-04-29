"use client";

import { Download, Moon, Printer, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

const ACTION_CLASSES =
  "flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-background/65 text-primary shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur transition-[transform,border-color,background-color] duration-[160ms] ease-out hover:border-accent/45 hover:bg-accent/[0.1] active:scale-[0.97] dark:text-accent dark:hover:border-accent/75 dark:hover:bg-accent/[0.22]";

export function CvToolbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
      return;
    }

    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="print:hidden">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-3 pt-5 sm:px-6 sm:pt-6">
        <Link
          href="/"
          className="border-foreground/10 bg-background/65 text-muted-foreground hover:border-accent/45 hover:bg-accent/[0.08] hover:text-foreground dark:hover:border-accent/75 dark:hover:bg-accent/[0.18] inline-flex h-9 items-center gap-2 rounded-full border px-4 font-mono text-[0.68rem] font-semibold tracking-[0.16em] uppercase shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur transition-colors duration-200 ease-out"
        >
          <span aria-hidden="true">←</span>
          <span>Back Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className={ACTION_CLASSES}
            aria-label="Print CV"
            title="Print CV"
          >
            <Printer aria-hidden="true" className="h-4 w-4" />
          </button>

          <a
            href="/cv.pdf"
            download="janek-rahrt-cv.pdf"
            className={ACTION_CLASSES}
            aria-label="Download CV PDF"
            title="Download PDF"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            className={ACTION_CLASSES}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {isDark ? (
              <Sun aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Moon aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
