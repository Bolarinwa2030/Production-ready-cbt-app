import Fastify from "fastify";
import { healthRoute } from "./routes/health.js";
import { loggerPlugin } from "./plugins/logger.js";
import { requestIdMiddleware } from "./middleware/request-id.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

   
  app.register(requestIdMiddleware);
  app.register(loggerPlugin);
  app.register(healthRoute);

  return  app;
}