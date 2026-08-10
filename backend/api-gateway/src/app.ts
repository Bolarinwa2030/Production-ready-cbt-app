import Fastify from "fastify";
import { healthRoute } from "./routes/health.js";
import requestIdMiddleware from "./middleware/request-id.js";
import loggerPlugin from "./plugins/logger.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  console.log("BUILDING APP");

  app.register(requestIdMiddleware);
  console.log("REGISTERED REQUEST ID");

  app.register(loggerPlugin);
  console.log("REGISTERED LOGGER");

  app.register(healthRoute);
  console.log("REGISTERED HEALTH");

  return app;
}