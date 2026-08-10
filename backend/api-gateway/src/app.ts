import Fastify from "fastify";
import { healthRoute } from "./routes/health.js";
import requestIdMiddleware from "./middleware/request-id.js";
import loggerPlugin from "./plugins/logger.js";
import { authRoute } from "./routes/auth.js";
import { examRoute } from "./routes/exams.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  
  app.register(requestIdMiddleware);
  
  app.register(loggerPlugin);
  
  app.register(healthRoute);
  app.register(authRoute);
  app.register(examRoute);

  return app;
}