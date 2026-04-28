import { MCPTool, type MCPInput } from "mcp-framework";
import { z } from "zod";
import { PORTFOLIO, toMarkdownCv } from "../data/portfolio.js";

const GetCvSchema = z.object({
  format: z
    .enum(["structured", "markdown"])
    .default("structured")
    .describe("Return structured JSON data or a markdown CV."),
});

export default class GetCvTool extends MCPTool {
  name = "get_cv";
  title = "Get CV";
  description =
    "Return Janek's CV as structured data or markdown for role screening, recruiter notes, and interview preparation.";
  annotations = {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  };
  protected schema = GetCvSchema;

  async execute({ format }: MCPInput<this>) {
    if (format === "markdown") {
      return {
        format,
        markdown: toMarkdownCv(),
      };
    }

    return {
      format,
      cv: {
        profile: PORTFOLIO.profile,
        contact: PORTFOLIO.contact,
        experiences: PORTFOLIO.experiences,
        openSource: PORTFOLIO.openSource,
        skills: PORTFOLIO.skills,
        speaking: PORTFOLIO.speaking,
        education: PORTFOLIO.education,
        extras: PORTFOLIO.extras,
      },
    };
  }
}
