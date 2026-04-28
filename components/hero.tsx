"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import { IconLink } from "@/components/ui/icon-link";
import {
  createContainerVariants,
  createItemVariants,
  SPRING_TRANSITION,
  TAP_SCALE,
} from "@/lib/animations";
import { AVATAR_BLUR_DATA_URL } from "@/lib/avatar-blur";
import { SOCIAL_LINKS } from "@/lib/constants";
import {
  BUTTON_PRIMARY_CLASSES,
  BUTTON_SECONDARY_CLASSES,
  CONTAINER_CLASSES_MD,
} from "@/lib/styles";
import avatarImage from "@/public/images/avatar-source.jpg";

const containerVariants = createContainerVariants();
const itemVariants = createItemVariants(0.8);

const impactMetrics = [
  {
    value: "300K+",
    label: "Chrome users",
    detail: "Built Argent X from zero",
  },
  {
    value: "~115K",
    label: "weekly downloads",
    detail: "Co-developed starknet.js",
  },
  {
    value: "$50M+",
    label: "TVL",
    detail: "Bootstrapped Vesu as founding engineer",
  },
  {
    value: "7M+",
    label: "MAU scale",
    detail: "Shipped production systems at Joyn",
  },
] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-5 pt-12 pb-20 sm:px-6 md:pt-20">
      <div className="border-foreground/[0.08] bg-background/[0.35] pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-[38rem] max-w-6xl rounded-[4rem] border shadow-[0_40px_120px_rgba(0,0,0,0.08)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`${CONTAINER_CLASSES_MD} w-full`}
      >
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_24rem]">
          <div>
            <motion.div
              variants={itemVariants}
              className="border-foreground/[0.12] bg-background/70 mb-10 inline-flex items-center gap-4 rounded-full border p-2 pr-5 shadow-[0_14px_60px_rgba(0,0,0,0.06)] backdrop-blur"
            >
              <Image
                src={avatarImage}
                alt="Janek"
                width={64}
                height={64}
                placeholder="blur"
                blurDataURL={AVATAR_BLUR_DATA_URL}
                className="border-foreground/[0.15] h-14 w-14 rounded-full border object-cover grayscale-[20%]"
              />
              <div>
                <p className="text-foreground font-mono text-sm font-semibold tracking-[0.12em] uppercase">
                  janek26
                </p>
                <p className="text-muted-foreground text-sm">
                  Staff Engineer • product infrastructure • open source
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10 space-y-7">
              <h1
                className="max-w-4xl overflow-visible py-2 text-6xl leading-[0.94] font-medium tracking-[-0.055em] text-balance md:text-8xl lg:text-[8.75rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                I build infrastructure{" "}
                <span className="relative -mx-2 inline-block px-2">
                  <span className="text-accent relative z-10 italic">
                    people rely on
                  </span>
                  <span className="bg-accent/[0.14] absolute right-0 bottom-2 left-2 -z-0 h-5 -rotate-1 md:h-8" />
                </span>
              </h1>

              <motion.p className="text-muted-foreground max-w-2xl text-xl leading-relaxed tracking-tight md:text-2xl">
                I build user-facing products and developer infrastructure
                end-to-end. The work has reached{" "}
                <span className="text-foreground font-semibold">
                  300,000+ wallet users
                </span>{" "}
                and{" "}
                <span className="text-foreground font-semibold">
                  ~115K weekly library downloads
                </span>
                .
              </motion.p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mb-12 flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                whileTap={TAP_SCALE}
                transition={SPRING_TRANSITION}
                className={BUTTON_PRIMARY_CLASSES}
              >
                Explore Work{" "}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.email}
                whileTap={TAP_SCALE}
                transition={SPRING_TRANSITION}
                className={BUTTON_SECONDARY_CLASSES}
              >
                Let&apos;s Talk
              </motion.a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="border-foreground/10 flex gap-5 border-t pt-7"
            >
              <IconLink
                href={SOCIAL_LINKS.github}
                icon={Github}
                label="GitHub"
              />
              <IconLink
                href={SOCIAL_LINKS.twitter}
                icon={Twitter}
                label="Twitter"
              />
              <IconLink href={SOCIAL_LINKS.email} icon={Mail} label="Email" />
            </motion.div>
          </div>

          <motion.aside
            variants={itemVariants}
            className="border-foreground/[0.12] bg-background/75 relative rounded-[2.5rem] border p-5 shadow-[0_22px_90px_rgba(0,0,0,0.09)] backdrop-blur"
          >
            <div className="border-foreground/10 mb-4 flex items-center justify-between border-b pb-4">
              <p className="text-accent font-mono text-[0.68rem] font-semibold tracking-[0.22em] uppercase">
                Shipped Proof
              </p>
              <span className="text-muted-foreground font-mono text-[0.62rem] tracking-[0.18em] uppercase">
                Selected
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {impactMetrics.map((item) => (
                <div
                  key={item.value}
                  className="group/badge border-foreground/10 bg-background/80 hover:border-accent/45 hover:bg-accent/[0.08] dark:hover:border-accent/75 dark:hover:bg-accent/[0.22] flex cursor-default items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition-colors duration-200 ease-out"
                >
                  <div>
                    <p className="text-foreground text-2xl leading-none font-semibold tracking-[-0.04em]">
                      {item.value}
                    </p>
                    <p className="text-primary mt-1 text-sm font-semibold">
                      {item.label}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
}
