"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FADE_IN_TRANSITION, VIEWPORT_CONFIG } from "@/lib/animations";
import { CONTAINER_CLASSES, ICON_LINK_CLASSES } from "@/lib/styles";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={FADE_IN_TRANSITION}
      viewport={VIEWPORT_CONFIG}
      className="border-border/50 border-t px-6 py-12"
    >
      <div className={`${CONTAINER_CLASSES} text-center`}>
        <div className="mb-6 flex items-center justify-center gap-3">
          <TooltipProvider delayDuration={400}>
            <TooltipPrimitive.Root>
              <TooltipTrigger asChild>
                <motion.a
                  href="https://github.com/janek26/rahrt"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  className={`${ICON_LINK_CLASSES} border-border/50 bg-background/50 group relative inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2`}
                  aria-label="Open Source"
                >
                  <Github
                    aria-hidden="true"
                    className="text-foreground/70 group-hover:text-accent h-4 w-4 transition-colors duration-200 ease-out"
                  />
                  <span className="text-muted-foreground/70 group-hover:text-foreground text-xs font-medium transition-colors duration-200 ease-out">
                    Open Source
                  </span>
                </motion.a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={2}
                className="border-border/20 bg-foreground text-background px-4 py-2 text-xs font-medium shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden="true">✨</span>
                  <span>Of course this is open source</span>
                </div>
              </TooltipContent>
            </TooltipPrimitive.Root>
          </TooltipProvider>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-muted-foreground/70 text-xs"
        >
          © {currentYear} Janek. Built with Next.js, React, and Framer Motion.
        </motion.p>
      </div>
    </motion.footer>
  );
}
