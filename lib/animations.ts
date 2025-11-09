import type { Transition, Variants } from "framer-motion";

// Common easing curve
export const EASE_CURVE = [0.16, 1, 0.3, 1] as const;

// Common spring transition
export const SPRING_TRANSITION: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 17,
};

// Common fade-in transition
export const FADE_IN_TRANSITION: Transition = {
  duration: 0.6,
  ease: EASE_CURVE,
  type: "tween", // Ensure smooth completion without jumps
};

// Viewport configuration for scroll animations - optimized for performance
export const VIEWPORT_CONFIG = {
  once: true,
  margin: "-100px",
  amount: 0.2, // Trigger when 20% visible for better performance
} as const;

// Container variants for staggered animations
export const createContainerVariants = (
  staggerChildren = 0.15,
  delayChildren = 0.2
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
      // Ensure smooth completion without jumps
      when: "beforeChildren",
    },
  },
});

// Item variants for fade-in-up animations - optimized to prevent jumps
export const createItemVariants = (duration = 0.6, y = 30): Variants => ({
  hidden: {
    opacity: 0,
    y,
    // Use will-change hint for better performance
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: EASE_CURVE,
      // Ensure final state is maintained smoothly
      type: "tween",
    },
  },
});

// Common hover animations
export const HOVER_SCALE = { scale: 1.05, y: -2 };
export const HOVER_ICON = { scale: 1.2, y: -5, rotate: 5 };
export const HOVER_CARD = { y: -8, scale: 1.01 };
export const TAP_SCALE = { scale: 0.98 };

// Common initial animations
export const FADE_IN_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: FADE_IN_TRANSITION,
  viewport: VIEWPORT_CONFIG,
};
