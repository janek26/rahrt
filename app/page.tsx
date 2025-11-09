"use client";

import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Speakers } from "@/components/speakers";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <Header />
      <main className="relative">
        <Hero />
        <Projects />
        <Speakers />
        <About />
      </main>
      <Footer />
    </div>
  );
}
