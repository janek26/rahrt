"use client";

import { motion } from "framer-motion";
import { FADE_IN_UP } from "@/lib/animations";
import {
  CONTAINER_CLASSES,
  DISPLAY_FONT_STYLE,
  SECTION_CLASSES,
} from "@/lib/styles";

export function About() {
  return (
    <section id="about" className={SECTION_CLASSES}>
      <div className={CONTAINER_CLASSES}>
        <motion.div
          {...FADE_IN_UP}
          className="grid gap-8 lg:grid-cols-[1fr_24rem]"
        >
          <motion.div
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="border-foreground/10 bg-background/70 rounded-[2.5rem] border p-7 shadow-[0_22px_90px_rgba(0,0,0,0.08)] backdrop-blur md:p-10"
          >
            <p className="text-accent mb-5 font-mono text-xs font-semibold tracking-[0.28em] uppercase">
              Working Model
            </p>
            <h2
              className="mb-8 max-w-2xl text-5xl leading-[0.95] font-medium tracking-[-0.06em] md:text-7xl"
              style={DISPLAY_FONT_STYLE}
            >
              About Me
            </h2>
            <div className="text-muted-foreground space-y-5 text-lg leading-relaxed md:text-xl">
              <p>
                I’m a product-minded staff engineer with 8+ years shipping
                user-facing products and developer infrastructure end-to-end.
                The work spans browser extensions, TypeScript libraries,
                protocol integrations, and full-stack systems.
              </p>
              <p>
                I’m strongest where product quality and deep technical systems
                meet: wallet transaction flows, dApp connector APIs, library
                architecture, account abstraction, and fast 0-to-1 execution.
              </p>
              <p>
                Currently available for freelance work and consulting. I
                specialize in Web3 architecture, TypeScript libraries, smart
                contract integration, and full-stack development.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-foreground/[0.12] bg-foreground text-background relative rounded-[2.5rem] border p-6 shadow-[0_28px_110px_rgba(0,0,0,0.18)] md:p-7"
          >
            <div className="space-y-5">
              <div className="border-background/10 flex items-center justify-between border-b pb-4">
                <p className="text-accent font-mono text-[0.68rem] font-semibold tracking-[0.22em] uppercase">
                  Available
                </p>
                <span className="text-background/55 font-mono text-[0.62rem] tracking-[0.18em] uppercase">
                  Freelance / Consulting
                </span>
              </div>

              <div className="border-background/[0.15] bg-background/[0.08] rounded-[1.5rem] border p-5">
                <h4 className="text-accent mb-4 font-mono text-xs font-semibold tracking-[0.22em] uppercase">
                  Proven Scope
                </h4>
                <ul className="text-background/[0.78] space-y-3 text-sm">
                  <li className="border-background/10 border-t pt-3">
                    ✓ Browser extensions used by hundreds of thousands
                  </li>
                  <li className="border-background/10 border-t pt-3">
                    ✓ TypeScript libraries with six-figure weekly downloads
                  </li>
                  <li className="border-background/10 border-t pt-3">
                    ✓ Protocol products scaled from zero to meaningful TVL
                  </li>
                  <li className="border-background/10 border-t pt-3">
                    ✓ Production systems at 7M+ MAU scale
                  </li>
                </ul>
              </div>

              <div className="border-background/[0.15] bg-background/[0.08] rounded-[1.5rem] border p-5">
                <h4 className="text-accent mb-4 font-mono text-xs font-semibold tracking-[0.22em] uppercase">
                  Useful For
                </h4>
                <ul className="text-background/[0.78] space-y-3 text-sm">
                  <li className="border-background/10 border-t pt-3">
                    ✓ Product engineering for crypto and developer tools
                  </li>
                  <li className="border-background/10 border-t pt-3">
                    ✓ Wallet architecture and transaction pipelines
                  </li>
                  <li className="border-background/10 border-t pt-3">
                    ✓ TypeScript library design and modernization
                  </li>
                  <li className="border-background/10 border-t pt-3">
                    ✓ Technical leadership for 0-to-1 execution
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
