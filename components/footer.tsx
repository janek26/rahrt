"use client";

import { motion } from "framer-motion";
import { FADE_IN_TRANSITION, VIEWPORT_CONFIG } from "@/lib/animations";
import { CONTAINER_CLASSES } from "@/lib/styles";

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
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-muted-foreground/70 text-xs"
        >
          © {currentYear} Janek. Built with Next.js, React, and Framer Motion.
        </motion.p>
      </div>
    </motion.footer>
  );
}
