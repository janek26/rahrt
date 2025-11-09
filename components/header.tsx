"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function Header() {
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
      className="border-border/40 bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md transition-colors duration-300"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-end px-6 py-4">
        {mounted && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={toggleTheme}
            className="bg-secondary/50 hover:bg-secondary relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg p-2 transition-all duration-300 hover:shadow-lg"
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
    </motion.header>
  );
}
