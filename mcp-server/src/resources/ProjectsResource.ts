import { MCPResource } from "mcp-framework";
import { PORTFOLIO } from "../data/portfolio.js";

export default class ProjectsResource extends MCPResource {
  uri = "portfolio://projects";
  name = "portfolio_projects";
  description =
    "Featured portfolio and open-source projects as structured JSON.";
  mimeType = "application/json";
  protected title = "Janek's Projects";
  protected resourceAnnotations = {
    audience: ["assistant"] as ("assistant" | "user")[],
    priority: 0.86,
  };

  async read() {
    return [
      {
        uri: this.uri,
        mimeType: this.mimeType,
        text: JSON.stringify(
          {
            featuredProjects: PORTFOLIO.featuredProjects,
            openSource: PORTFOLIO.openSource,
          },
          null,
          2
        ),
      },
    ];
  }
}
