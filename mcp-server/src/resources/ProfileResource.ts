import { MCPResource } from "mcp-framework";
import { PORTFOLIO } from "../data/portfolio.js";

export default class ProfileResource extends MCPResource {
  uri = "portfolio://profile";
  name = "portfolio_profile";
  description =
    "Structured profile summary, proof points, focus areas, and contact links for Janek.";
  mimeType = "application/json";
  protected title = "Janek Portfolio Profile";
  protected resourceAnnotations = {
    audience: ["assistant", "user"] as ("assistant" | "user")[],
    priority: 1,
  };

  async read() {
    return [
      {
        uri: this.uri,
        mimeType: this.mimeType,
        text: JSON.stringify(
          {
            profile: PORTFOLIO.profile,
            contact: PORTFOLIO.contact,
          },
          null,
          2
        ),
      },
    ];
  }
}
