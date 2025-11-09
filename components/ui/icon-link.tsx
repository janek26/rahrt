"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { HOVER_ICON, SPRING_TRANSITION } from "@/lib/animations";
import {
  ICON_LINK_CLASSES,
  ICON_LINK_CLASSES_ACCENT,
  ICON_LINK_CLASSES_SECONDARY,
} from "@/lib/styles";

interface IconLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  variant?: "default" | "secondary" | "accent";
  className?: string;
  iconClassName?: string;
}

export function IconLink({
  href,
  icon: Icon,
  label,
  variant = "default",
  className = "",
  iconClassName = "",
}: IconLinkProps) {
  const baseClasses =
    variant === "secondary"
      ? ICON_LINK_CLASSES_SECONDARY
      : variant === "accent"
        ? ICON_LINK_CLASSES_ACCENT
        : ICON_LINK_CLASSES;

  const isExternal = !href.startsWith("mailto") && !href.startsWith("#");

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      whileHover={HOVER_ICON}
      whileTap={{ scale: 0.9 }}
      transition={SPRING_TRANSITION}
      className={`${baseClasses} ${className}`}
      title={label}
    >
      <Icon
        className={`text-foreground/70 group-hover:text-accent h-5 w-5 ${iconClassName}`}
      />
    </motion.a>
  );
}
