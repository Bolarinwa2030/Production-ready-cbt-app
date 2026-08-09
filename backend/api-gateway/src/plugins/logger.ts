import { FastifyInstance } from "fastify";

export async function loggerPlugin(app: FastifyInstance) {
  app.addHook("onRequest", async (request) => {
    const correlationId = request.correlationId;

    request.log.info(
      {
        correlationId,
        method: request.method,
        url: request.url,
      },
      "Incoming request",
    );
  });

  app.addHook("onResponse", async (request, reply) => {
    const correlationId = request.correlationId;

    request.log.info(
      {
        correlationId,
        method: request.method,
        url: request.url,
        statusCode: reply.statusCode,
      },
      "Request completed",
    );
  });
}