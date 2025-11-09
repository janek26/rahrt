"use client";

import { motion } from "framer-motion";
import { ExternalLink, Youtube } from "lucide-react";
import { IconLink } from "@/components/ui/icon-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import {
  createContainerVariants,
  createItemVariants,
  SPRING_TRANSITION,
} from "@/lib/animations";
import { CONTAINER_CLASSES, SECTION_CLASSES } from "@/lib/styles";
import { Card } from "./card";

const talks = [
  {
    title: "Building Web3 Tools That Matter",
    conference: "StarknetCC",
    description:
      "StarknetCC is the largest community conference in the Starknet ecosystem, bringing together builders, developers, and enthusiasts to explore Cairo and Starknet innovation.",
    tags: ["Starknet", "Web3", "Cairo"],
    links: {
      external: "https://www.starknet.cc/",
    },
  },
  {
    title: "Web3 Development with Starknet.js",
    conference: "App.js",
    description:
      "App.js is the largest JavaScript event in Europe, bringing together thousands of developers. Sharing insights on modern web3 development and JavaScript tooling.",
    tags: ["JavaScript", "Web3", "TypeScript"],
    video: "https://www.youtube.com/watch?v=trgZ31OnvM8",
    links: {
      external: "https://appjs.co/",
    },
  },
];

const containerVariants = createContainerVariants();
const itemVariants = createItemVariants();

export function Speakers() {
  return (
    <section id="speaking" className={SECTION_CLASSES}>
      <div className={CONTAINER_CLASSES}>
        <SectionHeading
          title="Speaking & Events"
          subtitle="sharing knowledge at major web3 and developer conferences"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6"
        >
          {talks.map((talk, idx) => (
            <Card key={idx} variants={itemVariants}>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-bold">{talk.title}</h3>
                  <p className="text-accent text-sm font-medium">
                    {talk.conference}
                  </p>
                </div>
                <div className="flex gap-2">
                  {talk.video && (
                    <motion.a
                      href={talk.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={SPRING_TRANSITION}
                      className="hover:bg-secondary/50 group/link rounded-lg p-2 transition-all duration-300"
                      title="Watch talk"
                    >
                      <Youtube className="text-accent h-5 w-5 transition-transform group-hover/link:scale-110" />
                    </motion.a>
                  )}
                  {talk.links.external && (
                    <IconLink
                      href={talk.links.external}
                      icon={ExternalLink}
                      label="Visit site"
                      variant="secondary"
                    />
                  )}
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {talk.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {talk.tags.map((tag) => (
                  <Tag key={tag} variant="small">
                    {tag}
                  </Tag>
                ))}
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
