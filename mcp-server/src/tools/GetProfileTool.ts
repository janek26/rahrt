import { MCPTool, type MCPInput } from "mcp-framework";
import { z } from "zod";
import { PORTFOLIO, toMarkdownList } from "../data/portfolio.js";

const GetProfileSchema = z.object({
  format: z
    .enum(["structured", "markdown"])
    .default("structured")
    .describe("Response format to return for the profile."),
});

class GetProfileTool extends MCPTool {
  name = "get_profile";
  title = "Get Janek's Profile";
  description =
    "Returns Janek's concise portfolio profile, availability, strongest proof points, focus areas, and contact links.";
  schema = GetProfileSchema;
  annotations = {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  };

  async execute({ format }: MCPInput<this>) {
    if (format === "markdown") {
      return `# ${PORTFOLIO.profile.name} (${PORTFOLIO.profile.handle})

${PORTFOLIO.profile.headline}

${PORTFOLIO.profile.summary}

## Availability
${PORTFOLIO.profile.availability}

## Proof points
${toMarkdownList(PORTFOLIO.profile.proofPoints)}

## Focus areas
${toMarkdownList(PORTFOLIO.profile.focusAreas)}

## Contact
- Email: ${PORTFOLIO.contact.email}
- Website: ${PORTFOLIO.contact.website}
- GitHub: ${PORTFOLIO.contact.github}
- X: ${PORTFOLIO.contact.twitter}`;
    }

    return {
      profile: PORTFOLIO.profile,
      contact: PORTFOLIO.contact,
    };
  }
}

export default GetProfileTool;
