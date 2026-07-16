export interface CvContact {
  label: string;
  href?: string;
}

export interface CvExperienceEntry {
  company: string;
  role: string;
  period: string;
  note?: string;
  nested?: boolean;
  bullets: string[];
}

export interface CvOpenSourceEntry {
  name: string;
  stat: string;
  description: string;
}

export interface CvSkillEntry {
  area: string;
  items: string;
}

export interface CvTalkEntry {
  title: string;
  meta: string;
}

export interface CvFooterColumn {
  label: string;
  talks?: CvTalkEntry[];
  lines?: string[];
}

export interface CvVariant {
  id: string;
  label: string;
  description: string;
}

export interface CvData {
  accent: string;
  role: string;
  domain: string;
  profile: string;
  experiences: CvExperienceEntry[];
  openSource: CvOpenSourceEntry[];
  skills: CvSkillEntry[];
  footer: [CvFooterColumn, CvFooterColumn, CvFooterColumn];
}

export const CV_VARIANT_LIST: CvVariant[] = [
  { id: "web3", label: "Web3", description: "Web3, crypto, and protocol engineering" },
  { id: "ai", label: "AI", description: "AI-native engineering, MCP infrastructure, agent-driven development" },
];

export const CV_VARIANTS: Record<string, CvData> = {
  web3: {
    accent: "#2563EB",
    role: "Staff Engineer",
    domain: "Product Engineering · Crypto · Open Source",
    profile:
      "Product-minded engineer with **8+ years** shipping user-facing products and developer infrastructure. Built **Argent X** from scratch to **300,000+ Chrome users**, lead **starknet.js** to **~115K weekly downloads**. Contributor to **Next.js** and **viem**. Bootstrapped **Vesu** to **$50M+ TVL** as founding engineer, shipped at **7M+ MAU** at Joyn. Strong in TypeScript, systems thinking, and 0-to-1 execution.",
    experiences: [
      {
        company: "Rainbow",
        role: "Staff Engineer",
        period: "Jul 2025 - Present",
        bullets: [
          "**Revived the Rainbow browser extension** after an extended period without an active maintainer — modernized the codebase and restored shipping velocity on **one of the most-used Ethereum wallet extensions**",
          "Shipped **EIP-7702** support — the upgrade that lets standard Ethereum wallets temporarily act as smart accounts, unlocking **batched transactions, gas sponsorship, and session keys** without forcing users to migrate accounts",
          "Shipped **EIP-5792** support — the dApp-to-wallet capability standard that collapses multi-step flows (*approve + swap*, *mint + stake*) into a **single confirmation**, a major UX shift for the wider ecosystem",
          "Owning the extension's transaction pipeline end-to-end: dApp connector APIs, signing infrastructure, and product UX across the wallet surface",
        ],
      },
      {
        company: "Argent (Ready X)",
        role: "Senior Engineer · Lead Engineer",
        period: "Aug 2021 - Jul 2025",
        bullets: [
          "Built Argent X from zero to **300,000+ Chrome users** with 5.0 stars across 89,500 ratings",
          "Owned full-stack delivery: React/TypeScript extension UI, background service workers, dApp connector APIs, and transaction pipelines",
          "Co-developed **starknet.js** as core contributor; authored major v3 architecture and modernization work; **~115K weekly downloads**",
          "Authored the wallet connection standards and built **@argent/get-starknet** (~8,200 weekly downloads)",
        ],
      },
      {
        company: "Vesu.xyz",
        role: "Founding Engineer",
        period: "2024",
        note: "via Argent Incubator",
        nested: true,
        bullets: [
          "Bootstrapped the full product from zero: lending/borrowing flows, real-time position tracking, and risk dashboards",
          "Scaled protocol usage to **$50M+ TVL**, becoming the largest lending protocol on Starknet",
        ],
      },
      {
        company: "Joyn",
        role: "Software Engineer",
        period: "Sep 2019 - Jul 2021",
        bullets: [
          "Built payment and user-management systems for the ProSiebenSat.1 / Discovery streaming JV",
          "Shipped production software at **7M+ monthly active users** and 10M+ app downloads",
        ],
      },
    ],
    openSource: [
      {
        name: "starknet.js",
        stat: "1,300 stars · 115K dl/wk",
        description:
          "Core contributor and v3 architecture author for Starknet JS",
      },
      {
        name: "Argent X",
        stat: "638 stars",
        description: "First Starknet browser wallet, built and scaled end-to-end",
      },
      {
        name: "Next.js",
        stat: "134K+ stars",
        description: "Contributor to Vercel's flagship React framework",
      },
    ],
    skills: [
      {
        area: "Engineering Core",
        items:
          "TypeScript - React - Next.js - Node.js - API design - product architecture",
      },
      {
        area: "Infrastructure",
        items: "PostgreSQL - WebSockets - REST - GraphQL - CI/CD - monitoring",
      },
      {
        area: "Protocol / Web3",
        items:
          "Ethereum - Starknet - JSON-RPC - account abstraction - smart wallet patterns",
      },
      {
        area: "AI-Native Delivery",
        items:
          "Cursor - Claude Code - custom automation harnesses - rapid iteration loops",
      },
      {
        area: "Leadership Style",
        items:
          "high ownership - cross-functional collaboration - developer empathy",
      },
    ],
    footer: [
      {
        label: "Speaking",
        talks: [
          {
            title: "Building Web3 Tools That Matter",
            meta: "StarknetCC - Paris - 2023",
          },
          {
            title: "Web3 for Mass Adoption with Starknet and React Native",
            meta: "App.js Conf - Europe - 2022 - Co-presented with Sean Han",
          },
        ],
      },
      {
        label: "Education",
        lines: [
          "Self-taught engineer",
          "CS College dropout",
          "Continuous learning through OSS, conferences, and production shipping",
        ],
      },
      {
        label: "More",
        lines: [
          "Led audit coordination with top-tier audit firms in the past",
          "Won **$10,000+** hackathon prizes (Ankh · DoraHacks)",
        ],
      },
    ],
  },
  ai: {
    accent: "#0D9488",
    role: "Staff Engineer, AI & Product",
    domain: "AI-Native Engineering · MCP Infrastructure · Product",
    profile:
      "Product-minded engineer with **8+ years** shipping at scale, now operating at the frontier of **AI-native development**. Built and published **AI infrastructure** — an MCP gateway (aimux), AI-powered invoice extraction agents, and a portfolio MCP server for AI agent integration. Drives agent-driven workflows with **Cursor, Claude Code, OpenCode, and OMP** as daily tools. Deep experience in **LLM integration** (Vercel AI SDK, TanStack AI, OpenAI-compatible APIs), **MCP protocol** (built servers, federation proxies, and tool schemas), and **browser automation + AI** (Playwright, browser-use, CDP bridges). Combines systems thinking from shipping at **7M+ MAU** and **$50M+ TVL** with the velocity of AI-native engineering.",
    experiences: [
      {
        company: "Rainbow",
        role: "Staff Engineer",
        period: "Jul 2025 - Present",
        bullets: [
          "**Revived the Rainbow browser extension** after an extended period without an active maintainer — modernized the codebase and restored shipping velocity using **AI-native workflows** on **one of the most-used Ethereum wallet extensions**",
          "Shipped **EIP-7702** and **EIP-5792** support — drove complex protocol implementations with agent-assisted development, collapsing multi-step dApp flows into single confirmations",
          "Owning the extension's transaction pipeline end-to-end: dApp connector APIs, signing infrastructure, and product UX — all developed within an **agent-driven engineering loop**",
        ],
      },
      {
        company: "Argent (Ready X)",
        role: "Senior Engineer · Lead Engineer",
        period: "Aug 2021 - Jul 2025",
        bullets: [
          "Built Argent X from zero to **300,000+ Chrome users** with 5.0 stars across 89,500 ratings — full-stack ownership of extension UI, service workers, and dApp connector APIs",
          "Co-developed **starknet.js** as core contributor; authored major v3 architecture; scaled to **~115K weekly downloads** — the ecosystem's standard TypeScript library",
          "Authored wallet connection standards and built **@argent/get-starknet** (~8,200 weekly downloads) — progressively adopted AI tooling as the workflow matured",
        ],
      },
      {
        company: "Vesu.xyz",
        role: "Founding Engineer",
        period: "2024",
        note: "via Argent Incubator",
        nested: true,
        bullets: [
          "Bootstrapped the full product from zero: lending/borrowing flows, real-time position tracking, and risk dashboards",
          "Scaled protocol usage to **$50M+ TVL**, becoming the largest lending protocol on Starknet",
        ],
      },
      {
        company: "Joyn",
        role: "Software Engineer",
        period: "Sep 2019 - Jul 2021",
        bullets: [
          "Built payment and user-management systems for the ProSiebenSat.1 / Discovery streaming JV",
          "Shipped production software at **7M+ monthly active users** and 10M+ app downloads",
        ],
      },
    ],
    openSource: [
      {
        name: "aimux",
        stat: "npm · @janek26/aimux",
        description:
          "AI model + MCP gateway — unifies LLM providers and MCP servers behind one OpenAI-compatible endpoint. macOS LaunchAgent, Linux systemd.",
      },
      {
        name: "Next.js",
        stat: "134K+ stars",
        description: "Contributor to Vercel's flagship React framework",
      },
      {
        name: "viem",
        stat: "3,400+ stars",
        description: "Contributor to a leading TypeScript Ethereum library",
      },
    ],
    skills: [
      {
        area: "LLM & AI Integration",
        items:
          "Vercel AI SDK - TanStack AI - OpenAI-compatible APIs - SSE streaming - RAG patterns - tool-use/invocation",
      },
      {
        area: "MCP Infrastructure",
        items:
          "MCP protocol - server & client SDKs - MCP federation/gateway - agent tool schemas - HTTP Stream transport",
      },
      {
        area: "AI-Native Delivery",
        items:
          "Cursor - Claude Code - OpenCode - OMP - agent-driven development - prompt engineering - agent skills",
      },
      {
        area: "Engineering Core",
        items:
          "TypeScript - React - Next.js - Node.js - Hono - oRPC - Bun - API design",
      },
      {
        area: "Infrastructure",
        items:
          "Cloudflare Workers - PostgreSQL - Drizzle - Docker - CI/CD - Railway - Playwright",
      },
    ],
    footer: [
      {
        label: "AI Projects",
        lines: [
          "Built **invoice-corp** — invoice automation monorepo with browser-use + Playwright agents, Effect-based plugin engine, and Cloudflare Workers infrastructure",
          "Built **holyway** — AI SaaS boilerplate with TanStack AI streaming chat, MCP tool integration, and Polar payments",
          "Built **travel planner prototype** — CopilotKit + A2UI component catalog with OpenRouter Responses API integration",
        ],
      },
      {
        label: "Education",
        lines: [
          "Self-taught engineer",
          "CS College dropout",
          "Continuous learning through OSS, agent-driven workflows, and production shipping",
        ],
      },
      {
        label: "Speaking",
        talks: [
          {
            title: "Building Web3 Tools That Matter",
            meta: "StarknetCC - Paris - 2023",
          },
          {
            title: "Web3 for Mass Adoption with Starknet and React Native",
            meta: "App.js Conf - Europe - 2022",
          },
        ],
      },
    ],
  },
};

export const CV_DATA: CvData = CV_VARIANTS.web3;

export const CV_CONTACTS: ReadonlyArray<CvContact> = [
  { label: "hello@rahrt.me", href: "mailto:hello@rahrt.me" },
  { label: "rahrt.me", href: "https://rahrt.me" },
  { label: "github.com/janek26", href: "https://github.com/janek26" },
  { label: "x.com/0xjanek", href: "https://x.com/0xjanek" },
] as const;
