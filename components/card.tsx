"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variants?: any;
}

export function Card({ children, className = "", variants }: CardProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group border-border/50 from-card/50 to-card/30 hover:from-card hover:to-card/50 hover:border-accent/50 hover:shadow-accent/10 rounded-lg border bg-linear-to-br p-6 transition-all duration-500 hover:shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
