"use client";

import { MotionConfig } from "framer-motion";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Speakers } from "@/components/speakers";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="landing-surface bg-background text-foreground min-h-screen">
        <a
          href="#main-content"
          className="bg-background text-foreground focus-visible:ring-ring fixed top-4 left-4 z-[60] -translate-y-20 rounded-full border px-4 py-2 font-mono text-xs font-semibold tracking-[0.16em] uppercase transition-transform focus-visible:translate-y-0 focus-visible:ring-2"
        >
          Skip to Content
        </a>
        <Header
          sticky={false}
          leadingContent={
            <div className="flex min-w-0 items-center gap-4">
              <a
                href="#"
                className="text-foreground hover:text-accent inline-flex min-w-0 items-center font-mono text-[0.68rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-200 ease-out"
              >
                <span className="truncate">Janek Rahrt</span>
              </a>
              <div className="bg-foreground/15 hidden h-4 w-px sm:block" />
              <nav
                aria-label="Landing page"
                className="text-muted-foreground hidden items-center gap-4 font-mono text-[0.65rem] font-semibold tracking-[0.18em] uppercase sm:flex"
              >
                <a
                  className="hover:text-accent transition-colors duration-200 ease-out"
                  href="#projects"
                >
                  Work
                </a>
                <a
                  className="hover:text-accent transition-colors duration-200 ease-out"
                  href="#speaking"
                >
                  Speaking
                </a>
                <a
                  className="hover:text-accent transition-colors duration-200 ease-out"
                  href="#about"
                >
                  About
                </a>
                <a
                  className="hover:text-accent transition-colors duration-200 ease-out"
                  href="/cv"
                >
                  CV
                </a>
              </nav>
            </div>
          }
        />
        <main id="main-content" className="relative">
          <Hero />
          <Projects />
          <Speakers />
          <About />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
