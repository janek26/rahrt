export type LinkSet = {
  readonly github?: string;
  readonly external?: string;
};

export type FeaturedProject = {
  readonly title: string;
  readonly description: string;
  readonly role: string;
  readonly focus: string;
  readonly links: LinkSet;
  readonly tags: readonly string[];
  readonly highlights: readonly string[];
};

export type Experience = {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly note?: string;
  readonly bullets: readonly string[];
};

export type OpenSourceProject = {
  readonly name: string;
  readonly stat: string;
  readonly description: string;
};

export type SkillArea = {
  readonly area: string;
  readonly items: readonly string[];
};

export type ContactInfo = {
  readonly email: string;
  readonly website: string;
  readonly github: string;
  readonly twitter: string;
};

export type Language = {
  readonly language: string;
  readonly level: "native" | "fluent" | "intermediate" | "basic";
};

export type PortfolioProfile = {
  readonly name: string;
  readonly handle: string;
  readonly headline: string;
  readonly role: string;
  readonly domain: string;
  readonly location: string;
  readonly languages: readonly Language[];
  readonly availability: string;
  readonly summary: string;
  readonly proofPoints: readonly string[];
  readonly focusAreas: readonly string[];
  readonly availableFor: readonly string[];
};

export type PortfolioData = {
  readonly profile: PortfolioProfile;
  readonly contact: ContactInfo;
  readonly featuredProjects: readonly FeaturedProject[];
  readonly experiences: readonly Experience[];
  readonly openSource: readonly OpenSourceProject[];
  readonly skills: readonly SkillArea[];
  readonly speaking: readonly {
    readonly title: string;
    readonly meta: string;
  }[];
  readonly education: readonly string[];
  readonly extras: readonly string[];
};

export const PORTFOLIO: PortfolioData = {
  profile: {
    name: "Janek",
    handle: "janek26",
    headline: "Building for a greater good",
    role: "Staff Engineer",
    domain: "Product Engineering, Crypto, Open Source, AI-Native Tooling",
    location: "Germany",
    languages: [
      { language: "German", level: "native" },
      { language: "English", level: "fluent" },
    ],
    availability:
      "Available for selective freelance projects, consulting, and architecture reviews. Open to compelling full-time permanent roles when the mutual fit is strong.",
    summary:
      "Product-minded engineer with 8+ years shipping user-facing products and developer infrastructure end-to-end. German native, based in Germany. Built Argent X from scratch to 300,000+ Chrome users and developed and led starknet.js to ~115K weekly downloads. Contributor to Next.js and viem. Bootstrapped Vesu to $50M+ TVL as founding engineer and previously shipped at 7M+ MAU scale at Joyn. Strong in TypeScript, systems thinking, and 0-to-1 execution across AI-native workflows, enterprise-grade quality, and protocol-heavy environments.",
    proofPoints: [
      "Built Argent X from zero to 300,000+ Chrome users with 5.0 stars across 89,500 ratings.",
      "Co-developed starknet.js as core contributor and authored major v3 architecture work for ~115K weekly downloads.",
      "Bootstrapped Vesu to $50M+ TVL as founding engineer.",
      "Shipped production systems at 7M+ monthly active user scale at Joyn.",
      "Contributor to widely used TypeScript and web infrastructure projects including Next.js and viem.",
      "Built and published AI infrastructure including an MCP gateway (aimux) and AI-powered automation tooling.",
    ],
    focusAreas: [
      "Web3 and blockchain product architecture",
      "TypeScript libraries and developer tooling",
      "Browser extension architecture",
      "Full-stack product engineering",
      "Smart wallet, account abstraction, and protocol-heavy UX",
      "AI-native engineering workflows and MCP infrastructure",
    ],
    availableFor: [
      "Freelance product builds and consulting",
      "Full-time permanent roles, especially Staff / Principal Engineer positions with strong ownership and AI-native culture",
      "Architecture review and technical strategy",
      "Open-source strategy and delivery",
      "Technical mentoring and team enablement",
      "Wallet, protocol, and developer-tooling work",
    ],
  },
  contact: {
    email: "hello@rahrt.me",
    website: "https://rahrt.me",
    github: "https://github.com/janek26",
    twitter: "https://x.com/0xjanek",
  },
  featuredProjects: [
    {
      title: "Argent X",
      description:
        "Self-custody wallet for Starknet with advanced security and a user-friendly interface.",
      role: "Core Developer & Contributor",
      focus: "Wallet Infrastructure",
      links: {
        github: "https://github.com/argentlabs/argent-x",
        external: "https://www.argent.xyz/argent-x",
      },
      tags: ["Starknet", "TypeScript", "React", "Open Source"],
      highlights: [
        "Built from zero to 300,000+ Chrome users.",
        "Owned React/TypeScript extension UI, background service workers, dApp connector APIs, and transaction pipelines.",
        "Helped shape Starknet wallet connection standards.",
      ],
    },
    {
      title: "Vesu.xyz",
      description:
        "DeFi lending infrastructure powering the Starknet ecosystem.",
      role: "First Developer & Full-Stack Engineer",
      focus: "DeFi Protocol",
      links: {
        external: "https://vesu.xyz",
      },
      tags: ["DeFi", "Starknet", "Smart Contracts", "Full Stack"],
      highlights: [
        "Bootstrapped product from zero as founding engineer.",
        "Built lending/borrowing flows, real-time position tracking, and risk dashboards.",
        "Scaled to $50M+ TVL and became the largest lending protocol on Starknet.",
      ],
    },
    {
      title: "starknet.js",
      description:
        "The JavaScript/TypeScript standard library for interacting with Starknet.",
      role: "Maintainer & Core Contributor",
      focus: "Core Library",
      links: {
        github: "https://github.com/starknet-io/starknet.js",
        external: "https://docs.starknetjs.com",
      },
      tags: ["Starknet", "TypeScript", "Library", "Open Source"],
      highlights: [
        "Core contributor and v3 architecture author.",
        "Supports thousands of developers across the Starknet ecosystem.",
        "Reached roughly 115K weekly downloads.",
      ],
    },
    {
      title: "viem",
      description:
        "Contributions to the modular and performant Ethereum library for modern TypeScript development.",
      role: "Contributor",
      focus: "Web3 Library",
      links: {
        github: "https://github.com/wevm/viem",
        external: "https://viem.sh",
      },
      tags: ["Ethereum", "TypeScript", "Web3", "Open Source"],
      highlights: [
        "Contributor to one of the leading TypeScript Ethereum libraries.",
        "Demonstrates ability to work in high-standard open-source codebases.",
      ],
    },
    {
      title: "Rainbow Browser Extension",
      description:
        "Browser extension providing seamless wallet integration and blockchain interaction.",
      role: "Staff Engineer",
      focus: "Browser Extension",
      links: {
        github: "https://github.com/rainbow-me/browser-extension",
        external: "https://rainbow.me",
      },
      tags: ["Extension", "Web3", "UX", "Browser API", "Open Source"],
      highlights: [
        "Revived the extension after an extended period without an active maintainer.",
        "Shipped EIP-7702 and EIP-5792 support for improved Ethereum wallet UX.",
        "Owns transaction pipeline work across connector APIs, signing infrastructure, and wallet UX.",
      ],
    },
  ],
  experiences: [
    {
      company: "Rainbow",
      role: "Staff Engineer",
      period: "Jul 2025 - Present",
      bullets: [
        "Revived the Rainbow browser extension after an extended period without an active maintainer, modernized the codebase, and restored shipping velocity on one of the most-used Ethereum wallet extensions.",
        "Shipped EIP-7702 support, enabling standard Ethereum wallets to temporarily act as smart accounts for batched transactions, gas sponsorship, and session keys.",
        "Shipped EIP-5792 support, collapsing multi-step dApp flows such as approve plus swap into a single confirmation.",
        "Owns the extension transaction pipeline end-to-end: dApp connector APIs, signing infrastructure, and product UX.",
      ],
    },
    {
      company: "Argent (Ready X)",
      role: "Senior Engineer, Lead Engineer",
      period: "Aug 2021 - Jul 2025",
      bullets: [
        "Built Argent X from zero to 300,000+ Chrome users with 5.0 stars across 89,500 ratings.",
        "Owned full-stack delivery: React/TypeScript extension UI, background service workers, dApp connector APIs, and transaction pipelines.",
        "Co-developed starknet.js as core contributor, authored major v3 architecture and modernization work, and scaled usage to ~115K weekly downloads.",
        "Authored wallet connection standards and built @argent/get-starknet, an ecosystem-standard dApp-to-wallet SDK.",
      ],
    },
    {
      company: "Vesu.xyz",
      role: "Founding Engineer",
      period: "2024",
      note: "via Argent Incubator",
      bullets: [
        "Bootstrapped the full product from zero: lending and borrowing flows, real-time position tracking, and risk dashboards.",
        "Scaled protocol usage to $50M+ TVL, becoming the largest lending protocol on Starknet.",
      ],
    },
    {
      company: "Joyn",
      role: "Software Engineer",
      period: "Sep 2019 - Jul 2021",
      bullets: [
        "Built payment and user-management systems for the ProSiebenSat.1 / Discovery streaming joint venture.",
        "Shipped production software at 7M+ monthly active user scale and 10M+ app downloads.",
      ],
    },
  ],
  openSource: [
    {
      name: "starknet.js",
      stat: "1,300 stars, 115K downloads/week",
      description:
        "Core contributor and v3 architecture author for the Starknet JavaScript library.",
    },
    {
      name: "Argent X",
      stat: "638 stars",
      description:
        "First Starknet browser wallet, built and scaled end-to-end.",
    },
    {
      name: "get-starknet",
      stat: "8,234 downloads/week",
      description: "Ecosystem-standard dApp-to-wallet integration SDK.",
    },
    {
      name: "Next.js",
      stat: "134K+ stars",
      description: "Contributor to Vercel's flagship React framework.",
    },
    {
      name: "viem",
      stat: "3,400+ stars",
      description: "Contributor to a leading TypeScript Ethereum library.",
    },
    {
      name: "trpc-browser",
      stat: "47 stars",
      description: "Type-safe RPC over browser extension message channels.",
    },
  ],
  skills: [
    {
      area: "Engineering Core",
      items: [
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "API design",
        "Product architecture",
      ],
    },
    {
      area: "Infrastructure",
      items: [
        "PostgreSQL",
        "WebSockets",
        "REST",
        "GraphQL",
        "CI/CD",
        "Monitoring",
      ],
    },
    {
      area: "Protocol / Web3",
      items: [
        "Ethereum",
        "Starknet",
        "JSON-RPC",
        "Account abstraction",
        "Smart wallet patterns",
      ],
    },
    {
      area: "AI-Native Delivery",
      items: [
        "Cursor",
        "Claude Code",
        "Custom automation harnesses",
        "Rapid iteration loops",
      ],
    },
    {
      area: "Leadership Style",
      items: [
        "High ownership",
        "Cross-functional collaboration",
        "Developer empathy",
      ],
    },
  ],
  speaking: [
    {
      title: "Building Web3 Tools That Matter",
      meta: "StarknetCC, Paris, 2023",
    },
    {
      title: "Web3 for Mass Adoption with Starknet and React Native",
      meta: "App.js Conf, Europe, 2022, co-presented with Sean Han",
    },
  ],
  education: [
    "Self-taught engineer",
    "CS college dropout",
    "Continuous learning through open source, conferences, and production shipping",
  ],
  extras: [
    "Led audit coordination with top-tier audit firms in the past.",
    "Won $10,000+ in hackathon prizes through Ankh and DoraHacks.",
  ],
} as const;

const normalize = (value: string) => value.toLowerCase();

export const containsQuery = (values: readonly string[], query: string) => {
  const normalizedQuery = normalize(query);

  return values.some((value) => normalize(value).includes(normalizedQuery));
};

export const toMarkdownList = (items: readonly string[]) =>
  items.map((item) => `- ${item}`).join("\n");

export const toMarkdownCv = () => {
  const experience = PORTFOLIO.experiences
    .map(
      (entry) =>
        `### ${entry.company} - ${entry.role}\n${entry.period}${
          entry.note ? ` (${entry.note})` : ""
        }\n${toMarkdownList(entry.bullets)}`
    )
    .join("\n\n");

  const openSource = PORTFOLIO.openSource
    .map(
      (entry) => `- **${entry.name}** (${entry.stat}) - ${entry.description}`
    )
    .join("\n");

  const skills = PORTFOLIO.skills
    .map((entry) => `- **${entry.area}:** ${entry.items.join(", ")}`)
    .join("\n");

  return `# ${PORTFOLIO.profile.name} - ${PORTFOLIO.profile.role}

${PORTFOLIO.profile.summary}

## Location & Languages
- Location: ${PORTFOLIO.profile.location}
${PORTFOLIO.profile.languages.map((l) => `- ${l.language}: ${l.level}`).join("\n")}

## Availability
${PORTFOLIO.profile.availability}

## Proof points
${toMarkdownList(PORTFOLIO.profile.proofPoints)}

## Experience
${experience}

## Open Source
${openSource}

## Skills
${skills}

## Open to
${toMarkdownList(PORTFOLIO.profile.availableFor)}

## Contact
- Email: ${PORTFOLIO.contact.email}
- Website: ${PORTFOLIO.contact.website}
- GitHub: ${PORTFOLIO.contact.github}
- X: ${PORTFOLIO.contact.twitter}
`;
};
