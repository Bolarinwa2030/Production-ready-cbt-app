import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    correlationId: string;
  }
}

export async function requestIdMiddleware(app: FastifyInstance) {
  app.decorateRequest("correlationId", "");

  app.addHook("onRequest", async (request, reply) => {
    const incomingId = request.headers["x-correlation-id"];

    const correlationId =
      typeof incomingId === "string" && incomingId.length > 0
        ? incomingId
        : randomUUID();

    request.correlationId = correlationId;

    reply.header("X-Correlation-ID", correlationId);
  });
}