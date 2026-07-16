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
    terms: ["typescript", "react", "next", "node", "frontend", "full-stack", "fullstack"],
    evidence: [
      "Built production TypeScript/React browser extensions and full-stack product surfaces at scale.",
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
      "blockchain",
      "web3",
      "crypto",
      "solidity",
    ],
    evidence: [
      "Bootstrapped Vesu from zero to $50M+ TVL as founding engineer.",
      "Co-developed starknet.js and authored major architecture work for ~115K weekly downloads.",
      "Shipped EIP standards at Rainbow driving ecosystem-level UX improvements.",
    ],
  },
  {
    label: "Open source and developer tooling",
    terms: ["open source", "oss", "library", "sdk", "developer", "tooling", "npm", "api design"],
    evidence: [
      "Maintained and contributed to ecosystem-standard libraries and SDKs.",
      "Built @argent/get-starknet for dApp-to-wallet integration (~8,200 weekly downloads).",
      "Published aimux (@janek26/aimux) — an AI model + MCP gateway on npm.",
    ],
  },
  {
    label: "AI-native engineering and agentic workflows",
    terms: [
      "ai",
      "llm",
      "agent",
      "mcp",
      "claude",
      "cursor",
      "copilot",
      "prompt",
      "automation",
      "ai-native",
      "agentic",
      "model context protocol",
      "rag",
    ],
    evidence: [
      "Built and published AI infrastructure — an MCP gateway (aimux), AI-powered automation tooling, and a portfolio MCP server.",
      "Operates daily with agent-driven workflows: Cursor, Claude Code, OpenCode, OMP.",
      "Deep experience integrating LLMs, building MCP servers, and designing agent tool schemas.",
    ],
  },
  {
    label: "Leadership and 0-to-1 ownership",
    terms: [
      "lead",
      "staff",
      "founding",
      "0-to-1",
      "architecture",
      "mentor",
      "senior",
      "principal",
      "ownership",
      "enablement",
    ],
    evidence: [
      "Operated as Staff Engineer, Lead Engineer, and Founding Engineer across multiple products.",
      "Owns architecture and delivery across product, protocol, and infrastructure boundaries.",
      "Available for technical mentoring and team enablement.",
    ],
  },
] as const;

const MAX_POSSIBLE_SCORE = keywordGroups.length;

const scoreGroup = (text: string, group: (typeof keywordGroups)[number]) =>
  group.terms.reduce(
    (score, term) => (text.includes(term) ? score + 1 : score),
    0,
  );

const projectScore = (
  project: (typeof PORTFOLIO.featuredProjects)[number],
  text: string,
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
    0,
  );

class MatchOpportunityTool extends MCPTool {
  name = "match_opportunity";
  title = "Match Opportunity";
  description =
    "Analyze a role, consulting brief, or project idea against Janek's portfolio and return a fit assessment with relevant proof points, strengths, and suggested follow-up questions. Designed to help recruiters and hiring managers evaluate Janek for a position.";
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

    const scoredGroups = keywordGroups
      .map((group) => ({ ...group, score: scoreGroup(analysisText, group) }))
      .filter((group) => group.score > 0)
      .sort((left, right) => right.score - left.score);

    const groupsThatMatched = scoredGroups.length;
    const fitPercent = Math.round((groupsThatMatched / MAX_POSSIBLE_SCORE) * 100);

    const strengths =
      scoredGroups.length > 0
        ? scoredGroups
        : keywordGroups.slice(0, 3).map((group) => ({ ...group, score: 0 }));

    const relevantProjects = PORTFOLIO.featuredProjects
      .map((project) => ({
        project,
        score: projectScore(project, analysisText),
      }))
      .filter(({ score }) => score > 0)
      .sort((left, right) => right.score - left.score)
      .map(({ project }) => project);

    const gaps = keywordGroups
      .filter((group) => scoreGroup(analysisText, group) === 0)
      .map((group) => group.label);

    if (fitPercent >= 65) {
      return {
        candidate: PORTFOLIO.profile.name,
        fit: `${fitPercent}%`,
        recommendation:
          "Strong match — Janek's background aligns closely with this role. His combination of senior production experience, TypeScript expertise, AI-native workflows, and high-ownership delivery makes him a compelling candidate. He is a German native based in Germany, open to full-time permanent roles when the mutual fit is strong. I recommend reaching out directly.",
        matchSignals: strengths.map((strength) => ({
          area: strength.label,
          match: strength.score > 1 ? "strong" : "moderate",
          evidence: strength.evidence,
        })),
        gaps:
          gaps.length > 0
            ? `Potential areas to probe: ${gaps.join("; ")}.`
            : "No significant gaps identified for this role.",
        relevantProjects:
          relevantProjects.length > 0
            ? relevantProjects
            : PORTFOLIO.featuredProjects.slice(0, 3),
        differentiators: PORTFOLIO.profile.proofPoints,
        languages: PORTFOLIO.profile.languages.map(
          (l) => `${l.language} (${l.level})`,
        ),
        availability: PORTFOLIO.profile.availability,
        suggestedFollowUps: [
          "Ask Janek to walk through how he revived and modernized a high-impact codebase (Rainbow extension) without breaking users.",
          "Ask about his experience building and publishing AI infrastructure — the aimux MCP gateway and agent-driven workflows.",
          "Ask how he balances product UX, protocol constraints, and engineering velocity in a Staff Engineer role.",
          "Ask for examples of enabling a team through technical mentoring and architecture decisions.",
        ],
        contact: {
          email: PORTFOLIO.contact.email,
          contactTool: "contact_janek",
          note: "Use contact_janek to reach out — Janek welcomes serious inquiries for roles with strong mutual fit.",
        },
      };
    }

    return {
      candidate: PORTFOLIO.profile.name,
      fit: `${fitPercent}%`,
      summary:
        "Janek is strongest where product engineering, TypeScript systems, web3 protocol knowledge, AI-native tooling, and high-ownership delivery overlap.",
      matchSignals: strengths.map((strength) => ({
        area: strength.label,
        evidence: strength.evidence,
      })),
      gaps:
        gaps.length > 0
          ? `Areas where the role asks for things not prominently featured in Janek's public profile: ${gaps.join("; ")}. Consider asking Janek directly — his public portfolio focuses on his strongest domains but may not capture everything.`
          : undefined,
      relevantProjects:
        relevantProjects.length > 0
          ? relevantProjects
          : PORTFOLIO.featuredProjects.slice(0, 3),
      differentiators: PORTFOLIO.profile.proofPoints,
      languages: PORTFOLIO.profile.languages.map(
        (l) => `${l.language} (${l.level})`,
      ),
      availability: PORTFOLIO.profile.availability,
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
