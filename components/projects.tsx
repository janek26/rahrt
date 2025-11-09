"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { IconLink } from "@/components/ui/icon-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { createContainerVariants, createItemVariants } from "@/lib/animations";
import { PROJECT_URLS } from "@/lib/constants";
import { CONTAINER_CLASSES, SECTION_CLASSES } from "@/lib/styles";
import { Card } from "./card";

const projects = [
  {
    title: "Argent X",
    description:
      "Self-custody wallet for Starknet with advanced security and user-friendly interface.",
    role: "Core Developer & Contributor",
    focus: "Wallet Infrastructure",
    links: PROJECT_URLS.argentX,
    tags: ["Starknet", "TypeScript", "React", "Open Source"],
  },
  {
    title: "Vesu.xyz",
    description:
      "Innovative DeFi infrastructure powering the Starknet ecosystem.",
    role: "First Developer & Full-Stack Engineer",
    focus: "DeFi Protocol",
    links: PROJECT_URLS.vesu,
    tags: ["DeFi", "Starknet", "Smart Contracts", "Full Stack"],
  },
  {
    title: "starknet.js",
    description:
      "The JavaScript/TypeScript standard library for interacting with Starknet. Used by thousands of developers.",
    role: "Maintainer & Core Contributor",
    focus: "Core Library",
    links: PROJECT_URLS.starknetJs,
    tags: ["Starknet", "TypeScript", "Library", "Open Source"],
  },
  {
    title: "viem",
    description:
      "Contributing to the modular and performant Ethereum library for modern TypeScript development.",
    role: "Contributor",
    focus: "Web3 Library",
    links: PROJECT_URLS.viem,
    tags: ["Ethereum", "TypeScript", "Web3", "Open Source"],
  },
  {
    title: "Rainbow Browser Extension",
    description:
      "Browser extension providing seamless wallet integration and blockchain interaction.",
    role: "Developer",
    focus: "Browser Extension",
    links: PROJECT_URLS.rainbow,
    tags: ["Extension", "Web3", "UX", "Browser API", "Open Source"],
  },
];

const containerVariants = createContainerVariants(0.1, 0.1);
const itemVariants = createItemVariants();

export function Projects() {
  return (
    <section id="projects" className={`${SECTION_CLASSES} relative`}>
      <div className={CONTAINER_CLASSES}>
        <SectionHeading
          title="Featured Work"
          subtitle="Projects I've initiated, developed, and contributed to"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6"
        >
          {projects.map((project, idx) => (
            <Card key={idx} variants={itemVariants}>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="mb-1 text-xl font-bold">{project.title}</h3>
                  <div className="flex items-center gap-3">
                    <p className="text-primary text-sm font-medium">
                      {project.role}
                    </p>
                    <span className="bg-accent/20 text-accent rounded-md px-2 py-1 text-xs font-semibold">
                      {project.focus}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {project.links.github && (
                    <IconLink
                      href={project.links.github}
                      icon={Github}
                      label="GitHub"
                      variant="accent"
                      iconClassName="w-4 h-4"
                    />
                  )}
                  {project.links.external && (
                    <IconLink
                      href={project.links.external}
                      icon={ExternalLink}
                      label="Visit site"
                      variant="accent"
                      iconClassName="w-4 h-4"
                    />
                  )}
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
