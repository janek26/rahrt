"use client";

import { motion } from "framer-motion";
import { Tag } from "@/components/ui/tag";
import { FADE_IN_UP } from "@/lib/animations";
import { TECH_STACK } from "@/lib/constants";
import {
  CONTAINER_CLASSES,
  DISPLAY_FONT_STYLE,
  SECTION_CLASSES,
} from "@/lib/styles";

export function About() {
  return (
    <section className={SECTION_CLASSES}>
      <div className={CONTAINER_CLASSES}>
        <motion.div
          {...FADE_IN_UP}
          className="grid items-center gap-12 md:grid-cols-2"
        >
          <motion.div
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2
              className="mb-6 text-4xl font-bold tracking-tight md:text-5xl"
              style={DISPLAY_FONT_STYLE}
            >
              About Me
            </h2>
            <div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
              <p>
                I'm a senior developer passionate about building open-source
                infrastructure and products for the web3 ecosystem. With
                expertise spanning full-stack development, extension
                development, and library design, I focus on creating developer
                tools that are both powerful and delightful to use.
              </p>
              <p>
                My journey in web3 started early, and I've been fortunate to
                work on foundational projects like Argent X, Vesu, and
                starknet.js. I believe in the power of open-source and
                contributing to projects that push the boundaries of what's
                possible.
              </p>
              <p>
                Currently available for freelance work and consulting. I
                specialize in Web3 architecture, TypeScript libraries, smart
                contract integration, and full-stack development.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="border-border/50 mt-8 space-y-3 border-t pt-8"
            >
              <h3 className="text-foreground font-semibold">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => (
                  <Tag key={tech} variant="tech">
                    {tech}
                  </Tag>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="from-primary/10 via-accent/5 border-border/50 rounded-lg border bg-linear-to-br to-transparent p-8"
          >
            <div className="space-y-6">
              <div className="bg-background/50 border-border/50 rounded-lg border p-4">
                <h4 className="text-primary mb-2 font-semibold">Focus Areas</h4>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>✓ Web3 & Blockchain Development</li>
                  <li>✓ TypeScript Libraries & Frameworks</li>
                  <li>✓ Full-Stack Engineering</li>
                  <li>✓ Browser Extension Development</li>
                </ul>
              </div>

              <div className="bg-background/50 border-border/50 rounded-lg border p-4">
                <h4 className="text-accent mb-2 font-semibold">
                  Available For
                </h4>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>✓ Freelance Projects</li>
                  <li>✓ Consulting & Architecture</li>
                  <li>✓ Open Source Contributions</li>
                  <li>✓ Technical Mentoring</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
