# MCP Server Deployment Guide

This guide explains how to deploy the portfolio MCP server as a hosted HTTP
service. The portfolio website itself is still a static Next.js export; see
[DEPLOYMENT.md](./DEPLOYMENT.md) for the GitHub Pages flow.

## What gets deployed

- MCP endpoint: `POST /mcp` and `GET /mcp` over HTTP Stream transport
- Health check: `GET /health`
- Runtime: Bun + TypeScript-compiled JavaScript
- Contact delivery: Resend via `contact_janek`

## Required environment variables

```bash
MCP_TRANSPORT=http
PORT=8080
MCP_HTTP_HOST=0.0.0.0
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL="Janek MCP <mcp@your-verified-domain.com>"
MCP_CONTACT_TO_EMAIL=hello@rahrt.me
```

Recommended for public deployments:

```bash
MCP_API_KEY=replace-with-a-long-random-secret
MCP_ALLOWED_ORIGINS=https://your-mcp-client.example
```

Resend requires a verified sending domain for production. Configure the domain
at <https://resend.com/domains>, then use an address from that domain in
`RESEND_FROM_EMAIL`.

## Docker

Build and run the MCP service locally:

```bash
docker build -f Dockerfile.mcp -t rahrt-portfolio-mcp .
docker run --rm -p 8080:8080 \
  -e MCP_TRANSPORT=http \
  -e MCP_HTTP_HOST=0.0.0.0 \
  -e PORT=8080 \
  -e RESEND_API_KEY="$RESEND_API_KEY" \
  -e RESEND_FROM_EMAIL="$RESEND_FROM_EMAIL" \
  -e MCP_CONTACT_TO_EMAIL=hello@rahrt.me \
  rahrt-portfolio-mcp
```

Check health:

```bash
curl http://localhost:8080/health
```

If `MCP_API_KEY` is set, clients must include:

```text
X-API-Key: your-api-key
```

## Railway

This repository includes `[railway.json](./railway.json)` configured to build
with `[Dockerfile.mcp](./Dockerfile.mcp)`.

1. Create a new Railway project from this repository.
2. Set these variables:
   - `MCP_TRANSPORT=http`
   - `MCP_HTTP_HOST=0.0.0.0`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `MCP_CONTACT_TO_EMAIL`
   - `MCP_API_KEY` for a public deployment
   - `MCP_ALLOWED_ORIGINS` if you know the client origins
3. Deploy.
4. Use Railway's public domain as the MCP base URL:
   - MCP endpoint: `https://<your-service>.up.railway.app/mcp`
   - Health endpoint: `https://<your-service>.up.railway.app/health`

Railway provides `PORT`; the server reads it automatically.

## Add the hosted MCP to popular AI tools

After deployment, you can use the hosted endpoint directly:

- Base URL: `https://rahrt-portfolio-mcp-production.up.railway.app`
- MCP endpoint: `https://rahrt-portfolio-mcp-production.up.railway.app/mcp`
- Health endpoint: `https://rahrt-portfolio-mcp-production.up.railway.app/health`

If you deploy your own instance, replace the URL with your domain.

### Cursor

Create either:

- project config: `.cursor/mcp.json`, or
- global config: `~/.cursor/mcp.json`

```json
{
  "mcpServers": {
    "janek-portfolio": {
      "url": "https://rahrt-portfolio-mcp-production.up.railway.app/mcp"
    }
  }
}
```

If `MCP_API_KEY` is enabled on the server:

```json
{
  "mcpServers": {
    "janek-portfolio": {
      "url": "https://rahrt-portfolio-mcp-production.up.railway.app/mcp",
      "headers": {
        "x-api-key": "${env:MCP_API_KEY}"
      }
    }
  }
}
```

### OpenCode

Add to your `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "janek-portfolio": {
      "type": "remote",
      "url": "https://rahrt-portfolio-mcp-production.up.railway.app/mcp",
      "enabled": true
    }
  }
}
```

If API key auth is enabled:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "janek-portfolio": {
      "type": "remote",
      "url": "https://rahrt-portfolio-mcp-production.up.railway.app/mcp",
      "enabled": true,
      "oauth": false,
      "headers": {
        "x-api-key": "{env:MCP_API_KEY}"
      }
    }
  }
}
```

### Claude Code

Claude Code is commonly wired to remote MCP servers through `mcp-remote`:

```bash
claude mcp add janek-portfolio -- npx -y mcp-remote https://rahrt-portfolio-mcp-production.up.railway.app/mcp
```

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "janek-portfolio": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://rahrt-portfolio-mcp-production.up.railway.app/mcp"
      ]
    }
  }
}
```

### VS Code (Cline / Roo Code style setup)

Use the extension MCP settings with a stdio bridge command:

```json
{
  "mcpServers": {
    "janek-portfolio": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://rahrt-portfolio-mcp-production.up.railway.app/mcp"
      ]
    }
  }
}
```

### Quick smoke test in your client

After adding the server, try one of these prompts:

- "Use `get_profile` and summarize Janek in 5 bullet points."
- "Use `get_projects` and show blockchain-related work."

## Generic server

On a VM or long-running server:

```bash
bun install --frozen-lockfile
bun run mcp:build
MCP_TRANSPORT=http MCP_HTTP_HOST=0.0.0.0 PORT=8080 bun run mcp:start
```

Put the service behind HTTPS with a reverse proxy such as Caddy, Nginx, or
Cloudflare Tunnel before exposing it publicly.

## Security checklist

- Use HTTPS in production.
- Set `MCP_API_KEY` for hosted deployments.
- Set `MCP_ALLOWED_ORIGINS` for browser-based clients.
- Keep `RESEND_API_KEY` server-side only.
- Use a verified Resend sender domain.
- Monitor `/health` and Resend delivery logs.

## Local debugging

Use the MCP Inspector against the stdio build:

```bash
bun run mcp:build
npx @modelcontextprotocol/inspector bun mcp-server/dist/index.js
```

For hosted HTTP debugging, run:

```bash
MCP_TRANSPORT=http bun run mcp:http
```

Then connect an MCP HTTP-compatible client to `http://localhost:8080/mcp`.
