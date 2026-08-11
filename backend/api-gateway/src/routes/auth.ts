import { FastifyInstance } from "fastify";
import { env } from "../config/env.js";
import { proxyRequest } from "../proxy/service-proxy.js";

export async function authRoute(app: FastifyInstance) {
  app.all("/api/auth/*", async (request, reply) => {
    try {
      const response = await proxyRequest(
        request,
        env.AUTH_SERVICE_URL,
      );

      const body = await response.text();

      return reply
        .code(response.status)
        .send(body);
    } catch (error) {
      request.log.error(
        { error },
        "Auth service unavailable",
      );

      return reply.code(503).send({
        error: "Auth service unavailable",
      });
    }
  });
}