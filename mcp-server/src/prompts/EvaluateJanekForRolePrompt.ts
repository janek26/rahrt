import { MCPPrompt } from "mcp-framework";
import { z } from "zod";
import { PORTFOLIO, toMarkdownCv } from "../data/portfolio.js";

type EvaluateJanekForRoleInput = {
  readonly roleBrief: string;
  readonly evaluationStyle?:
    | "interview"
    | "hiring_manager"
    | "technical_screen";
};

export default class EvaluateJanekForRolePrompt extends MCPPrompt<EvaluateJanekForRoleInput> {
  name = "evaluate_janek_for_role";
  title = "Evaluate Janek for a Role";
  description =
    "Creates a structured evaluation prompt for comparing Janek's portfolio against a role, contract, or interview brief.";

  protected schema = {
    roleBrief: {
      type: z
        .string()
        .min(20)
        .describe("The job description, project brief, or interview context."),
      description: "The job description, project brief, or interview context.",
      required: true,
    },
    evaluationStyle: {
      type: z
        .enum(["interview", "hiring_manager", "technical_screen"])
        .optional()
        .describe("The perspective to use for the evaluation."),
      description: "The perspective to use for the evaluation.",
      required: false,
    },
  };

  async generateMessages({
    roleBrief,
    evaluationStyle = "interview",
  }: EvaluateJanekForRoleInput) {
    return [
      {
        role: "user",
        content: {
          type: "text",
          text: `Use the portfolio context below to evaluate Janek for this opportunity.

Evaluation style: ${evaluationStyle}

Role or project brief:
${roleBrief}

Portfolio context:
${toMarkdownCv()}

Return:
1. Strongest matches with concrete proof points.
2. Potential concerns or follow-up questions.
3. Interview questions that would reveal seniority.
4. A concise recommendation.

Keep the assessment evidence-based and reference specific projects such as ${PORTFOLIO.featuredProjects
            .map((project) => project.title)
            .join(", ")} where relevant.`,
        },
      },
    ];
  }
}
