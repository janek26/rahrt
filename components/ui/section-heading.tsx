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
    <motion.div {...FADE_IN_UP} className={`mb-16 ${className}`}>
      <h2 className={SECTION_HEADING_CLASSES} style={DISPLAY_FONT_STYLE}>
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
    </motion.div>
  );
}
