"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import { IconLink } from "@/components/ui/icon-link";
import {
  createContainerVariants,
  createItemVariants,
  HOVER_SCALE,
  SPRING_TRANSITION,
  TAP_SCALE,
} from "@/lib/animations";
import { AVATAR_BLUR_DATA_URL } from "@/lib/avatar-blur";
import { HERO_BADGES, SOCIAL_LINKS } from "@/lib/constants";
import {
  BUTTON_PRIMARY_CLASSES,
  BUTTON_SECONDARY_CLASSES,
  CONTAINER_CLASSES_MD,
} from "@/lib/styles";
import avatarImage from "@/public/images/avatar-source.jpg";

const containerVariants = createContainerVariants();
const itemVariants = createItemVariants(0.8);

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32 pb-20">
      <div className="absolute inset-0 -z-10">
        <div className="from-primary/5 to-accent/5 gradient-animate absolute inset-0 bg-linear-to-br via-transparent" />
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="bg-accent/10 absolute top-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
          className="bg-primary/10 absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`${CONTAINER_CLASSES_MD} w-full`}
      >
        <motion.div
          variants={itemVariants}
          className="mb-8 flex items-center gap-4"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Image
              src={avatarImage}
              alt="Janek"
              width={64}
              height={64}
              priority
              placeholder="blur"
              blurDataURL={AVATAR_BLUR_DATA_URL}
              className="border-accent/40 h-16 w-16 rounded-full border-2 shadow-lg"
            />
          </motion.div>
          <div>
            <p className="text-foreground text-lg font-semibold">janek26</p>
            <p className="text-muted-foreground text-sm">
              web3 • open source • building for impact
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12 space-y-6">
          <div className="space-y-3">
            <h1
              className="text-5xl leading-[1.1] font-bold tracking-tight text-balance md:text-7xl lg:text-8xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Building for a{" "}
              <span className="relative inline-block">
                <span className="from-primary via-accent to-primary relative z-10 bg-linear-to-r bg-clip-text text-transparent">
                  greater good
                </span>
                <motion.span
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.5,
                    ease: "easeInOut",
                  }}
                  className="from-primary via-accent absolute right-0 bottom-1 left-0 h-1 origin-left bg-linear-to-r to-transparent"
                />
              </span>
            </h1>
          </div>

          <motion.p className="text-muted-foreground max-w-2xl text-lg leading-relaxed tracking-tight md:text-xl">
            I build infrastructure and libraries for web3 and beyond. My focus
            is on{" "}
            <span className="text-foreground font-semibold">
              open source solutions
            </span>{" "}
            that empower developers and advance the ecosystem.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3"
        >
          {HERO_BADGES.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={HOVER_SCALE}
              whileTap={TAP_SCALE}
              transition={SPRING_TRANSITION}
              className="border-accent/20 bg-accent/5 hover:bg-accent/10 hover:border-accent/40 cursor-default rounded-lg border p-3 transition-all duration-300"
            >
              <p className="text-foreground text-sm font-medium">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-16 flex flex-wrap gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={TAP_SCALE}
            transition={SPRING_TRANSITION}
            className={BUTTON_PRIMARY_CLASSES}
          >
            explore work{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.email}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={TAP_SCALE}
            transition={SPRING_TRANSITION}
            className={BUTTON_SECONDARY_CLASSES}
          >
            let&apos;s talk
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="border-foreground/10 flex gap-6 border-t pt-8"
        >
          <IconLink href={SOCIAL_LINKS.github} icon={Github} label="GitHub" />
          <IconLink
            href={SOCIAL_LINKS.twitter}
            icon={Twitter}
            label="Twitter"
          />
          <IconLink href={SOCIAL_LINKS.email} icon={Mail} label="Email" />
        </motion.div>
      </motion.div>
    </section>
  );
}
