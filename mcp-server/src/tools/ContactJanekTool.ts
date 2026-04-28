import { MCPTool, type MCPInput } from "mcp-framework";
import { Resend } from "resend";
import { z } from "zod";
import { PORTFOLIO } from "../data/portfolio.js";

const ContactJanekSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(120)
    .describe("Name of the person or organization trying to contact Janek."),
  email: z
    .string()
    .email()
    .describe("Reply-to email address for the person contacting Janek."),
  company: z
    .string()
    .max(160)
    .optional()
    .describe("Optional company, project, or organization name."),
  reason: z
    .enum([
      "freelance",
      "consulting",
      "job_opportunity",
      "open_source",
      "speaking",
      "other",
    ])
    .describe("Primary reason for the outreach."),
  message: z
    .string()
    .min(20)
    .max(4000)
    .describe("Detailed message, request, role brief, or project context."),
  urgency: z
    .enum(["low", "normal", "high"])
    .default("normal")
    .describe("How time-sensitive the request is."),
});

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const env = (key: string) => process.env[key]?.trim();

class ContactJanekTool extends MCPTool {
  name = "contact_janek";
  title = "Contact Janek";
  description =
    "Send Janek a validated email through Resend with the MCP user's contact details and request. Use this for serious outreach, freelance, consulting, interview, speaking, or open-source collaboration requests.";

  annotations = {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  };

  protected schema = ContactJanekSchema;

  async execute(input: MCPInput<this>) {
    const apiKey = env("RESEND_API_KEY");
    const to = env("MCP_CONTACT_TO_EMAIL") ?? PORTFOLIO.contact.email;
    const from = env("RESEND_FROM_EMAIL");

    if (!apiKey || !from) {
      throw new Error(
        "Email delivery is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL on the MCP server."
      );
    }

    const resend = new Resend(apiKey);
    const companyLine = input.company ? `\nCompany: ${input.company}` : "";
    const text = `New MCP contact request for Janek

Name: ${input.name}
Email: ${input.email}${companyLine}
Reason: ${input.reason}
Urgency: ${input.urgency}

Message:
${input.message}

Sent from the rahrt.me MCP server.`;

    const html = `<h1>New MCP contact request</h1>
<dl>
  <dt>Name</dt><dd>${escapeHtml(input.name)}</dd>
  <dt>Email</dt><dd>${escapeHtml(input.email)}</dd>
  ${
    input.company ? `<dt>Company</dt><dd>${escapeHtml(input.company)}</dd>` : ""
  }
  <dt>Reason</dt><dd>${escapeHtml(input.reason)}</dd>
  <dt>Urgency</dt><dd>${escapeHtml(input.urgency)}</dd>
</dl>
<h2>Message</h2>
<p>${escapeHtml(input.message).replaceAll("\n", "<br />")}</p>
<p><small>Sent from the rahrt.me MCP server.</small></p>`;

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: input.email,
      subject: `MCP contact: ${input.reason} from ${input.name}`,
      text,
      html,
      tags: [
        { name: "source", value: "mcp" },
        { name: "reason", value: input.reason },
        { name: "urgency", value: input.urgency },
      ],
    });

    if (error) {
      throw new Error(
        `Resend failed to send the contact email: ${error.message}`
      );
    }

    return {
      ok: true,
      emailId: data?.id,
      deliveredTo: to,
      nextStep:
        "Tell the user their request was sent to Janek and he can reply using the provided email address.",
    };
  }
}

export default ContactJanekTool;
