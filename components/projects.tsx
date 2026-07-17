"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { IconLink } from "@/components/ui/icon-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { PROJECT_URLS } from "@/lib/constants";
import { CONTAINER_CLASSES, SECTION_CLASSES } from "@/lib/styles";
import { Card } from "./card";

const projects = [
  {
    title: "Argent X",
    description:
      "Built the first Starknet browser wallet from zero, owning extension UI, background service workers, dApp connector APIs, and transaction pipelines.",
    role: "Senior Engineer · Lead Engineer",
    focus: "Wallet Infrastructure",
    impact: "300,000+ Chrome users · 5.0 stars across 89,500 ratings",
    links: PROJECT_URLS.argentX,
    tags: ["Starknet", "TypeScript", "React", "Open Source"],
  },
  {
    title: "Vesu.xyz",
    description:
      "Bootstrapped the lending product from zero: borrowing flows, real-time position tracking, and risk dashboards.",
    role: "Founding Engineer",
    focus: "DeFi Protocol",
    impact: "$50M+ TVL · largest lending protocol on Starknet",
    links: PROJECT_URLS.vesu,
    tags: ["DeFi", "Starknet", "Smart Contracts", "Full Stack"],
  },
  {
    title: "starknet.js",
    description:
      "Co-developed the ecosystem's core JavaScript library, authored major v3 architecture and modernization work.",
    role: "Maintainer & Core Contributor",
    focus: "Core Library",
    impact: "~115K weekly downloads · standard Starknet developer tooling",
    links: PROJECT_URLS.starknetJs,
    tags: ["Starknet", "TypeScript", "Library", "Open Source"],
  },
  {
    title: "viem",
    description:
      "Contributed to a leading modular Ethereum library for modern TypeScript applications.",
    role: "Contributor",
    focus: "Web3 Library",
    impact: "3,400+ stars · used across modern Ethereum apps",
    links: PROJECT_URLS.viem,
    tags: ["Ethereum", "TypeScript", "Web3", "Open Source"],
  },
  {
    title: "Rainbow Browser Extension",
    description:
      "Revived the browser extension, restored shipping velocity, and shipped EIP-7702 and EIP-5792 support.",
    role: "Staff Engineer",
    focus: "Browser Extension",
    impact: "Modernized one of the most-used Ethereum wallet extensions",
    links: PROJECT_URLS.rainbow,
    tags: ["Extension", "Web3", "UX", "Browser API", "Open Source"],
  },
];

export function Projects() {
  return (
    <section id="projects" className={`${SECTION_CLASSES} relative`}>
      <div className={CONTAINER_CLASSES}>
        <SectionHeading
          title="Selected Impact"
          subtitle="Outcomes, scale, and shipped infrastructure that are easy to evaluate"
        />

        <div className="relative">
          <div className="bg-foreground/[0.12] absolute top-0 bottom-0 left-3 hidden w-px md:block" />
          <div className="grid gap-5">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative md:pl-16"
              >
                <div className="border-foreground/[0.15] bg-background absolute top-8 left-0 hidden h-6 w-6 rounded-full border shadow-[0_0_0_8px_var(--background)] md:block">
                  <span className="bg-accent absolute inset-1 rounded-full" />
                </div>
                <Card className="p-0">
                  <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="p-6 lg:p-8">
                      <div className="mb-8 flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-accent mb-4 font-mono text-xs font-semibold tracking-[0.26em] uppercase">
                            Proof 0{idx + 1}
                          </p>
                          <h3
                            className="mb-3 text-4xl leading-none font-medium tracking-[-0.045em] break-words md:text-5xl"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {project.title}
                          </h3>
                          <p className="text-primary text-sm font-semibold">
                            {project.role}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
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

                      <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="border-foreground/10 flex flex-col justify-between gap-8 p-6 lg:border-l lg:p-8">
                      <div>
                        <p className="text-muted-foreground mb-3 font-mono text-[0.65rem] font-semibold tracking-[0.24em] uppercase">
                          Impact
                        </p>
                        <p className="text-foreground text-xl leading-tight font-semibold tracking-[-0.03em]">
                          {project.impact}
                        </p>
                        <p className="text-primary mt-4 font-mono text-[0.68rem] font-semibold tracking-[0.18em] uppercase">
                          {project.focus}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
