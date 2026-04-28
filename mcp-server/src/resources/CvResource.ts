import { MCPResource } from "mcp-framework";
import { toMarkdownCv } from "../data/portfolio.js";

export default class CvResource extends MCPResource {
  uri = "portfolio://cv";
  name = "portfolio_cv";
  description =
    "A markdown CV for Janek including experience, OSS work, skills, and contact links.";
  mimeType = "text/markdown";
  protected title = "Janek CV";
  protected resourceAnnotations = {
    audience: ["user", "assistant"] as ("user" | "assistant")[],
    priority: 0.95,
  };

  async read() {
    return [
      {
        uri: this.uri,
        mimeType: this.mimeType,
        text: toMarkdownCv(),
      },
    ];
  }
}
