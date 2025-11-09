// Social links and contact information
export const SOCIAL_LINKS = {
  github: "https://github.com/janek26",
  twitter: "https://twitter.com/0xjanek",
  email: "mailto:hello@rahrt.me",
} as const;

export const CONTACT_EMAIL = "hello@rahrt.me";

export const GITHUB_AVATAR_URL = "/images/avatar.jpg";

// Project URLs
export const PROJECT_URLS = {
  argentX: {
    github: "https://github.com/argentlabs/argent-x",
    external: "https://www.argent.xyz/argent-x",
  },
  vesu: {
    external: "https://vesu.xyz",
  },
  starknetJs: {
    github: "https://github.com/starknet-io/starknet.js",
    external: "https://docs.starknetjs.com",
  },
  viem: {
    github: "https://github.com/wevm/viem",
    external: "https://viem.sh",
  },
  rainbow: {
    github: "https://github.com/rainbow-me/browser-extension",
    external: "https://rainbow.me",
  },
} as const;

// Tech stack
export const TECH_STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "Smart Contracts",
  "Web3",
  "Starknet",
  "Cairo",
] as const;

// Hero badges
export const HERO_BADGES = [
  { label: "Open Source", icon: "📖" },
  { label: "Web3 Dev", icon: "⛓️" },
  { label: "Libraries", icon: "🔧" },
  { label: "Extensions", icon: "🔌" },
  { label: "Impact Driven", icon: "🚀" },
  { label: "Full Stack", icon: "🏗️" },
] as const;
