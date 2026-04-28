"use client";

import { motion } from "framer-motion";
import { FADE_IN_UP } from "@/lib/animations";
import { DISPLAY_FONT_STYLE, SECTION_HEADING_CLASSES } from "@/lib/styles";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      {...FADE_IN_UP}
      className={`border-foreground/[0.12] mb-14 border-t pt-6 ${className}`}
    >
      <p className="text-accent mb-5 font-mono text-xs font-semibold tracking-[0.28em] uppercase">
        Field Note
      </p>
      <h2 className={SECTION_HEADING_CLASSES} style={DISPLAY_FONT_STYLE}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
