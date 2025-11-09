"use client";

import { motion } from "framer-motion";
import { HOVER_SCALE, SPRING_TRANSITION, TAP_SCALE } from "@/lib/animations";
import { TAG_CLASSES, TAG_CLASSES_SM, TECH_TAG_CLASSES } from "@/lib/styles";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "small" | "tech";
  className?: string;
}

export function Tag({
  children,
  variant = "default",
  className = "",
}: TagProps) {
  const baseClasses =
    variant === "tech"
      ? TECH_TAG_CLASSES
      : variant === "small"
        ? TAG_CLASSES_SM
        : TAG_CLASSES;

  return (
    <motion.span
      whileHover={HOVER_SCALE}
      whileTap={TAP_SCALE}
      transition={SPRING_TRANSITION}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </motion.span>
  );
}
