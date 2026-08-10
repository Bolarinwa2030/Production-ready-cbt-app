import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";

async function loggerPlugin(app: FastifyInstance) {
  app.addHook("onRequest", async (request) => {
    request.log.info(
      {
        correlationId: request.correlationId,
        method: request.method,
        url: request.url,
      },
      "Incoming request",
    );
  });

  app.addHook("onResponse", async (request, reply) => {
    request.log.info(
      {
        correlationId: request.correlationId,
        method: request.method,
        url: request.url,
        statusCode: reply.statusCode,
      },
      "Request completed",
    );
  });
}

export default fp(loggerPlugin);