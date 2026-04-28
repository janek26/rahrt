import { MCPInput, MCPTool } from "mcp-framework";
import { z } from "zod";
import { containsQuery, PORTFOLIO } from "../data/portfolio.js";

const GetExperienceSchema = z.object({
  company: z
    .string()
    .optional()
    .describe(
      "Optional company or project name to filter by, for example Rainbow, Argent, Vesu, or Joyn."
    ),
  query: z
    .string()
    .optional()
    .describe(
      "Optional keyword search across roles, periods, notes, and bullet points."
    ),
  includeBullets: z
    .boolean()
    .default(true)
    .describe("Whether to include detailed accomplishment bullet points."),
});

class GetExperienceTool extends MCPTool {
  name = "get_experience";
  title = "Get Experience";
  description =
    "Return Janek's career experience with optional filters by company or keyword.";
  annotations = {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  };

  protected schema = GetExperienceSchema;

  async execute({ company, query, includeBullets }: MCPInput<this>) {
    const matches = PORTFOLIO.experiences.filter((experience) => {
      const companyMatch = company
        ? containsQuery([experience.company, experience.role], company)
        : true;
      const queryMatch = query
        ? containsQuery(
            [
              experience.company,
              experience.role,
              experience.period,
              experience.note ?? "",
              ...experience.bullets,
            ],
            query
          )
        : true;

      return companyMatch && queryMatch;
    });

    return {
      count: matches.length,
      experiences: matches.map((experience) => ({
        ...experience,
        bullets: includeBullets ? experience.bullets : undefined,
      })),
    };
  }
}

export default GetExperienceTool;
