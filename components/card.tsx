"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variants?: any;
}

export function Card({ children, className = "", variants }: CardProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect if the device supports touch events
    setIsTouchDevice(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
    );
  }, []);

  return (
    <motion.div
      variants={variants}
      whileHover={isTouchDevice ? undefined : { y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group border-border/50 from-card/50 to-card/30 hover:from-card hover:to-card/50 hover:border-accent/50 hover:shadow-accent/10 rounded-lg border bg-linear-to-br p-6 transition-all duration-500 hover:shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
