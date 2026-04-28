import { MCPTool, type MCPInput } from "mcp-framework";
import { z } from "zod";
import { containsQuery, PORTFOLIO } from "../data/portfolio.js";

const schema = z.object({
  query: z
    .string()
    .min(2)
    .optional()
    .describe(
      "Optional case-insensitive search across project title, description, role, focus, tags, and highlights."
    ),
  tag: z
    .string()
    .min(2)
    .optional()
    .describe(
      "Optional tag or technology filter such as TypeScript, Web3, Starknet, Extension, or DeFi."
    ),
  includeOpenSource: z
    .boolean()
    .default(true)
    .describe(
      "Whether to include the separate open-source contribution summary."
    ),
});

class GetProjectsTool extends MCPTool {
  name = "get_projects";
  title = "Get Projects";
  description =
    "Returns Janek's featured portfolio projects and open-source work, with optional filtering by technology, focus area, or keyword.";
  annotations = {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  };

  protected schema = schema;

  async execute(input: MCPInput<this>) {
    const matchesQuery = (
      values: readonly string[],
      query: string | undefined
    ) => (query ? containsQuery(values, query) : true);

    const projects = PORTFOLIO.featuredProjects.filter((project) => {
      const searchable = [
        project.title,
        project.description,
        project.role,
        project.focus,
        ...project.tags,
        ...project.highlights,
      ];

      return (
        matchesQuery(searchable, input.query) &&
        matchesQuery([project.focus, ...project.tags], input.tag)
      );
    });

    return {
      projects,
      openSource: input.includeOpenSource ? PORTFOLIO.openSource : undefined,
      count: projects.length,
      filters: {
        query: input.query,
        tag: input.tag,
      },
    };
  }
}

export default GetProjectsTool;
