import { fileURLToPath } from "node:url";
import {
  APIKeyAuthProvider,
  MCPServer,
  type TransportConfig,
} from "mcp-framework";

const defaultBasePath = fileURLToPath(new URL(".", import.meta.url));

const parsePort = (value: string | undefined) => {
  const parsed = Number(value ?? "8080");

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Invalid PORT value: ${value}`);
  }

  return parsed;
};

const parseAllowedOrigins = (value: string | undefined) =>
  value
    ?.split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

const createAuthConfig = () => {
  const apiKey = process.env.MCP_API_KEY;

  return apiKey
    ? {
        provider: new APIKeyAuthProvider({
          keys: [apiKey],
        }),
      }
    : undefined;
};

const createTransport = (): TransportConfig => {
  if (process.env.MCP_TRANSPORT !== "http") {
    return { type: "stdio" };
  }

  const allowedOrigins = parseAllowedOrigins(process.env.MCP_ALLOWED_ORIGINS);

  return {
    type: "http-stream",
    options: {
      port: parsePort(process.env.PORT),
      host: process.env.MCP_HTTP_HOST ?? "0.0.0.0",
      endpoint: process.env.MCP_HTTP_ENDPOINT ?? "/mcp",
      responseMode: "stream",
      cors: {
        allowOrigin: process.env.MCP_CORS_ORIGIN ?? "*",
        allowMethods: "GET, POST, DELETE, OPTIONS",
        allowHeaders:
          "Content-Type, Accept, Authorization, x-api-key, Mcp-Session-Id, Last-Event-ID",
        exposeHeaders: "Content-Type, Authorization, x-api-key, Mcp-Session-Id",
        maxAge: "86400",
        ...(allowedOrigins && allowedOrigins.length > 0
          ? { allowedOrigins }
          : {}),
      },
      health: {
        path: process.env.MCP_HEALTH_PATH ?? "/health",
        response: {
          ok: true,
          service: "rahrt-portfolio-mcp",
        },
      },
    },
    auth: createAuthConfig(),
  };
};

const server = new MCPServer({
  name: "rahrt-portfolio-mcp",
  version: "1.0.0",
  basePath: process.env.MCP_BASE_PATH ?? defaultBasePath,
  logging: true,
  transport: createTransport(),
});

await server.start();
