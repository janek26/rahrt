import { MCPPrompt } from "mcp-framework";
import { z } from "zod";
import { PORTFOLIO, toMarkdownCv } from "../data/portfolio.js";

type OutreachInput = {
  senderName: string;
  organization?: string;
  opportunity: string;
  tone: "concise" | "warm" | "technical" | "founder";
};

export default class DraftOutreachToJanekPrompt extends MCPPrompt<OutreachInput> {
  name = "draft_outreach_to_janek";
  title = "Draft Outreach to Janek";
  description =
    "Create a high-signal outreach note to Janek using his MCP portfolio context.";

  protected schema = {
    senderName: {
      type: z.string().min(2),
      description: "Name of the person reaching out.",
      required: true,
    },
    organization: {
      type: z.string().optional(),
      description: "Company, project, or community represented by the sender.",
      required: false,
    },
    opportunity: {
      type: z.string().min(20),
      description:
        "Opportunity, role, consulting request, or collaboration idea.",
      required: true,
    },
    tone: {
      type: z.enum(["concise", "warm", "technical", "founder"]),
      description: "Preferred tone for the outreach draft.",
      required: true,
    },
  };

  async generateMessages(input: OutreachInput) {
    return [
      {
        role: "system",
        content: {
          type: "text",
          text: "You write direct, specific outreach that respects senior engineers' time. Avoid hype and generic praise.",
        },
      },
      {
        role: "user",
        content: {
          type: "text",
          text: `Draft an outreach note to ${PORTFOLIO.profile.name}.

Sender: ${input.senderName}
Organization: ${input.organization ?? "Not specified"}
Tone: ${input.tone}
Opportunity:
${input.opportunity}

Use these portfolio facts to make the note concrete:
${toMarkdownCv()}

Return:
1. A subject line.
2. A short email or DM.
3. Three bullets explaining why the message should resonate.
4. A suggested next step.`,
        },
      },
    ];
  }
}
