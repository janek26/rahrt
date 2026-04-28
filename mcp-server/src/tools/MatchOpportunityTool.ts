import { defineSchema, MCPInput, MCPTool } from "mcp-framework";
import { z } from "zod";
import { PORTFOLIO } from "../data/portfolio.js";

const MatchOpportunitySchema = defineSchema({
  brief: z
    .string()
    .min(20)
    .describe(
      "Role description, project brief, job post, or technical challenge to match against Janek's background."
    ),
  priorities: z
    .array(z.string())
    .default([])
    .describe(
      "Optional hiring or project priorities, such as wallet infrastructure, TypeScript, leadership, DeFi, or AI tooling."
    ),
});

const keywordGroups = [
  {
    label: "TypeScript and product engineering",
    terms: ["typescript", "react", "next", "node", "frontend", "full-stack"],
    evidence: [
      "Built production TypeScript/React browser extensions and full-stack product surfaces.",
      "Contributed to TypeScript-heavy open-source projects including starknet.js, viem, and Next.js.",
    ],
  },
  {
    label: "Wallets, extensions, and account abstraction",
    terms: [
      "wallet",
      "extension",
      "browser",
      "account abstraction",
      "eip-7702",
      "eip-5792",
      "connector",
      "signing",
    ],
    evidence: [
      "Built Argent X from zero to 300,000+ Chrome users.",
      "Revived Rainbow's browser extension and shipped EIP-7702 and EIP-5792 support.",
    ],
  },
  {
    label: "Protocol and DeFi execution",
    terms: [
      "defi",
      "protocol",
      "starknet",
      "ethereum",
      "smart contract",
      "lending",
    ],
    evidence: [
      "Bootstrapped Vesu from zero to $50M+ TVL as founding engineer.",
      "Co-developed starknet.js and authored major architecture work for ~115K weekly downloads.",
    ],
  },
  {
    label: "Open source and developer tooling",
    terms: ["open source", "oss", "library", "sdk", "developer", "tooling"],
    evidence: [
      "Maintained and contributed to ecosystem-standard libraries and SDKs.",
      "Built @argent/get-starknet for dApp-to-wallet integration.",
    ],
  },
  {
    label: "Leadership and 0-to-1 ownership",
    terms: ["lead", "staff", "founding", "0-to-1", "architecture", "mentor"],
    evidence: [
      "Operated as Staff Engineer, Lead Engineer, and Founding Engineer across multiple products.",
      "Owns architecture and delivery across product, protocol, and infrastructure boundaries.",
    ],
  },
] as const;

const scoreGroup = (text: string, group: (typeof keywordGroups)[number]) =>
  group.terms.reduce(
    (score, term) => (text.includes(term) ? score + 1 : score),
    0
  );

const projectScore = (
  project: (typeof PORTFOLIO.featuredProjects)[number],
  text: string
) =>
  keywordGroups.reduce(
    (score, group) =>
      score +
      group.terms.reduce((groupScore, term) => {
        const projectText = [
          project.title,
          project.description,
          project.focus,
          project.role,
          ...project.tags,
          ...project.highlights,
        ]
          .join(" ")
          .toLowerCase();

        return text.includes(term) && projectText.includes(term)
          ? groupScore + 1
          : groupScore;
      }, 0),
    0
  );

class MatchOpportunityTool extends MCPTool {
  name = "match_opportunity";
  title = "Match Opportunity";
  description =
    "Analyze a role, consulting brief, or project idea against Janek's portfolio and return relevant proof points, strengths, and suggested follow-up questions.";
  annotations = {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  };
  schema = MatchOpportunitySchema;

  async execute(input: MCPInput<this>) {
    const analysisText =
      `${input.brief} ${input.priorities.join(" ")}`.toLowerCase();
    const matchedStrengths = keywordGroups
      .map((group) => ({ ...group, score: scoreGroup(analysisText, group) }))
      .filter((group) => group.score > 0)
      .sort((left, right) => right.score - left.score);

    const fallbackStrengths = keywordGroups.slice(0, 3).map((group) => ({
      ...group,
      score: 0,
    }));

    const strengths =
      matchedStrengths.length > 0 ? matchedStrengths : fallbackStrengths;

    const relevantProjects = PORTFOLIO.featuredProjects
      .map((project) => ({
        project,
        score: projectScore(project, analysisText),
      }))
      .filter(({ score }) => score > 0)
      .sort((left, right) => right.score - left.score)
      .map(({ project }) => project);

    return {
      candidate: PORTFOLIO.profile.name,
      summary:
        "Janek is strongest where product engineering, TypeScript systems, web3 protocol knowledge, and high-ownership delivery overlap.",
      matchSignals: strengths.map((strength) => ({
        area: strength.label,
        evidence: strength.evidence,
      })),
      relevantProjects:
        relevantProjects.length > 0
          ? relevantProjects
          : PORTFOLIO.featuredProjects.slice(0, 3),
      differentiators: PORTFOLIO.profile.proofPoints,
      suggestedFollowUps: [
        "Ask for a walkthrough of an extension transaction pipeline or connector API design.",
        "Ask how Janek balances product UX and protocol constraints in wallet flows.",
        "Ask for examples of migrating or reviving a high-impact codebase without breaking users.",
        "Ask how open-source maintenance shaped Janek's API design standards.",
      ],
      contact: {
        email: PORTFOLIO.contact.email,
        contactTool: "contact_janek",
      },
    };
  }
}

export default MatchOpportunityTool;
