"use client";

import { motion } from "framer-motion";
import { ExternalLink, Youtube } from "lucide-react";
import { IconLink } from "@/components/ui/icon-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { SPRING_TRANSITION } from "@/lib/animations";
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

export function Speakers() {
  return (
    <section id="speaking" className={SECTION_CLASSES}>
      <div className={CONTAINER_CLASSES}>
        <SectionHeading
          title="Speaking & Events"
          subtitle="Public technical work, not the main proof, but useful signal"
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {talks.map((talk, idx) => (
            <motion.div
              key={talk.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Card className="flex h-full flex-col p-0">
                <div className="flex h-full flex-col p-6">
                  <div className="mb-8 flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-accent mb-4 font-mono text-xs font-semibold tracking-[0.26em] uppercase">
                        Talk 0{idx + 1}
                      </p>
                      <h3
                        className="mb-3 text-4xl leading-none font-medium tracking-[-0.045em] break-words"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {talk.title}
                      </h3>
                      <p className="text-primary text-sm font-semibold">
                        {talk.conference}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {talk.video && (
                        <motion.a
                          href={talk.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.95 }}
                          transition={SPRING_TRANSITION}
                          className="group hover:border-accent/45 hover:bg-accent/[0.1] dark:hover:border-accent/75 dark:hover:bg-accent/[0.22] rounded-full border border-transparent p-2 transition-colors duration-200 ease-out"
                          aria-label="Watch talk"
                          title="Watch talk"
                        >
                          <Youtube
                            aria-hidden="true"
                            className="text-accent h-5 w-5"
                          />
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

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {talk.description}
                  </p>

                  <div className="border-foreground/10 mt-auto flex flex-wrap gap-2 border-t pt-6">
                    {talk.tags.map((tag) => (
                      <Tag key={tag} variant="small">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
