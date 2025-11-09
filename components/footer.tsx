"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useState } from "react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FADE_IN_TRANSITION, VIEWPORT_CONFIG } from "@/lib/animations";
import { CONTAINER_CLASSES, ICON_LINK_CLASSES } from "@/lib/styles";

// ============================================================================
// BEHAVIOR SPECIFICATION
// ============================================================================

/**
 * INITIAL VIEW ANIMATION (one-time, when button enters viewport):
 *
 * Phase 1 (0.3s): Button scales up from 1.0 to 1.18, color fades in
 *   - Scale: 1.0 → 1.18
 *   - Color opacity: 0 → 1
 *   - Background opacity: 0 → 0.4
 *
 * Phase 2 (1.0s): Icon wiggles (rotates), button stays scaled and colorful
 *   - Scale: stays at 1.25
 *   - Color opacity: stays at 1
 *   - Background opacity: stays at 0.4
 *   - Icon rotation: wiggles through keyframes
 *
 * Phase 3 (0.4s): Button scales down, color fades out
 *   - Scale: 1.25 → 1.0
 *   - Color opacity: 1 → 0
 *   - Background opacity: 0.4 → 0
 *
 * HOVER ANIMATION (after initial animation completes):
 *   - Scale: 1.0 → 1.08
 *   - Color: handled by CSS classes (no animation)
 *   - No wiggle
 */

// ============================================================================
// SIMPLEST FRAMER MOTION IMPLEMENTATION
// ============================================================================

/**
 * Use `whileInView` on the button to trigger all animations simultaneously.
 * All child elements use `animate` prop with keyframe arrays synchronized by timing.
 * No state changes during animation - everything is declarative.
 * Use `viewport={{ once: true }}` to ensure animation only runs once.
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  phases: {
    startDelay: 0.2,
    growAndColor: 0.3,
    wiggle: 1.0,
    shrinkAndUncolor: 0.4,
  },
  scale: {
    peak: 1.18,
    hover: 1.08,
    tap: 0.98,
  },
  color: {
    backgroundOpacity: 0.4,
    overlayOpacity: 1,
  },
  rotation: {
    icon: [0, -12, 12, -10, 8, -6, 4, -2, 0] as const,
  },
  ease: [0.16, 1, 0.3, 1] as const,
  hover: {
    duration: 0.15,
  },
  tooltip: {
    delay: 400,
  },
} as const;

// Calculate total duration and phase timings
const TOTAL_DURATION =
  CONFIG.phases.growAndColor +
  CONFIG.phases.wiggle +
  CONFIG.phases.shrinkAndUncolor;

const PHASE1_END = CONFIG.phases.growAndColor / TOTAL_DURATION;
const PHASE2_END =
  (CONFIG.phases.growAndColor + CONFIG.phases.wiggle) / TOTAL_DURATION;

// ============================================================================
// COMPONENT
// ============================================================================

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [hasCompletedInitialAnimation, setHasCompletedInitialAnimation] =
    useState(false);

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
          <TooltipProvider delayDuration={CONFIG.tooltip.delay}>
            <TooltipPrimitive.Root>
              <TooltipTrigger asChild>
                <motion.a
                  href="https://github.com/janek26/rahrt"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 1 }}
                  whileInView={{
                    scale: [1, CONFIG.scale.peak, CONFIG.scale.peak, 1],
                  }}
                  viewport={VIEWPORT_CONFIG}
                  animate={
                    hasCompletedInitialAnimation ? { scale: 1 } : undefined
                  }
                  transition={
                    hasCompletedInitialAnimation
                      ? {
                          type: "tween",
                          duration: CONFIG.hover.duration,
                          ease: CONFIG.ease,
                        }
                      : {
                          delay: CONFIG.phases.startDelay,
                          duration: TOTAL_DURATION,
                          times: [0, PHASE1_END, PHASE2_END, 1],
                          ease: CONFIG.ease,
                        }
                  }
                  onAnimationComplete={() => {
                    setHasCompletedInitialAnimation(true);
                  }}
                  whileHover={
                    hasCompletedInitialAnimation
                      ? {
                          scale: CONFIG.scale.hover,
                          transition: {
                            duration: CONFIG.hover.duration,
                            ease: CONFIG.ease,
                          },
                        }
                      : undefined
                  }
                  whileTap={{ scale: CONFIG.scale.tap }}
                  className={`${ICON_LINK_CLASSES} border-border/50 hover:border-accent/50 bg-background/50 hover:bg-accent/10 group relative inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 transition-all duration-200`}
                >
                  {/* Background color overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{
                      opacity: [
                        0,
                        CONFIG.color.backgroundOpacity,
                        CONFIG.color.backgroundOpacity,
                        CONFIG.color.backgroundOpacity,
                        0,
                      ],
                    }}
                    viewport={VIEWPORT_CONFIG}
                    transition={{
                      delay: CONFIG.phases.startDelay,
                      duration: TOTAL_DURATION,
                      times: [0, PHASE1_END * 0.9, PHASE1_END, PHASE2_END, 1],
                      ease: [CONFIG.ease, "linear", "linear", CONFIG.ease],
                    }}
                    className="bg-accent/20 border-accent/50 pointer-events-none absolute inset-0 rounded-lg border"
                  />

                  {/* Icon container with wiggle */}
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileInView={{
                      rotate: [...CONFIG.rotation.icon],
                    }}
                    viewport={VIEWPORT_CONFIG}
                    transition={{
                      delay:
                        CONFIG.phases.startDelay + CONFIG.phases.growAndColor,
                      duration: CONFIG.phases.wiggle,
                      ease: CONFIG.ease,
                    }}
                    className="relative"
                  >
                    {/* Base icon */}
                    <Github className="text-foreground/70 group-hover:text-accent relative z-10 h-4 w-4 transition-colors duration-200" />

                    {/* Colored icon overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{
                        opacity: [
                          0,
                          CONFIG.color.overlayOpacity,
                          CONFIG.color.overlayOpacity,
                          CONFIG.color.overlayOpacity,
                          0,
                        ],
                      }}
                      viewport={VIEWPORT_CONFIG}
                      transition={{
                        delay: CONFIG.phases.startDelay,
                        duration: TOTAL_DURATION,
                        times: [0, PHASE1_END * 0.9, PHASE1_END, PHASE2_END, 1],
                        ease: [CONFIG.ease, "linear", "linear", CONFIG.ease],
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Github className="text-accent h-4 w-4" />
                    </motion.div>
                  </motion.div>

                  {/* Text */}
                  <span className="text-muted-foreground/70 group-hover:text-foreground relative text-xs font-medium transition-colors duration-200">
                    <span className="relative z-10">Open Source</span>
                    {/* Colored text overlay */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{
                        opacity: [
                          0,
                          CONFIG.color.overlayOpacity,
                          CONFIG.color.overlayOpacity,
                          CONFIG.color.overlayOpacity,
                          0,
                        ],
                      }}
                      viewport={VIEWPORT_CONFIG}
                      transition={{
                        delay: CONFIG.phases.startDelay,
                        duration: TOTAL_DURATION,
                        times: [0, PHASE1_END * 0.9, PHASE1_END, PHASE2_END, 1],
                        ease: [CONFIG.ease, "linear", "linear", CONFIG.ease],
                      }}
                      className="text-foreground absolute inset-0"
                    >
                      Open Source
                    </motion.span>
                  </span>
                </motion.a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={2}
                className="border-border/20 bg-foreground text-background px-4 py-2 text-xs font-medium shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span>✨</span>
                  <span>Of course this is open source</span>
                </div>
              </TooltipContent>
            </TooltipPrimitive.Root>
          </TooltipProvider>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, type: "tween" }}
          viewport={VIEWPORT_CONFIG}
          className="text-muted-foreground/70 text-xs"
        >
          © {currentYear} Janek. Built with Next.js, React, and Framer Motion.
        </motion.p>
      </div>
    </motion.footer>
  );
}
