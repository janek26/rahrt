import { MCPResource } from "mcp-framework";
import { PORTFOLIO } from "../data/portfolio.js";

export default class ContactResource extends MCPResource {
  uri = "portfolio://contact";
  name = "Portfolio Contact";
  description = "Safe contact instructions and environment requirements.";
  mimeType = "application/json";
  protected title = "Contact Janek";
  protected resourceAnnotations = {
    audience: ["assistant", "user"] as ("assistant" | "user")[],
    priority: 0.7,
  };

  async read() {
    const contact = {
      public: PORTFOLIO.contact,
      contactTool: "contact_janek",
      resendEnvironment: [
        "RESEND_API_KEY",
        "RESEND_FROM_EMAIL",
        "MCP_CONTACT_TO_EMAIL",
      ],
      guidance:
        "Use contact_janek for serious, user-approved outreach. It sends Janek an email via Resend when the server is configured.",
    };

    return [
      {
        uri: this.uri,
        mimeType: this.mimeType,
        text: JSON.stringify(contact, null, 2),
      },
    ];
  }
}
