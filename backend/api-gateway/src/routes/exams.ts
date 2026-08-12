import { FastifyInstance } from "fastify";
import { env } from "../config/env.js";
import { proxyRequest } from "../proxy/service-proxy.js";

export async function examRoute(app: FastifyInstance) {
  const handler = async (request: any, reply: any) => {
    try {
      const response = await proxyRequest(
        request,
        env.EXAM_SERVICE_URL,
      );

      const body = await response.text();

      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      return reply
        .code(response.status)
        .send(body);
    } catch (error) {
      request.log.error(
        { error },
        "Exam service unavailable",
      );

      return reply.code(503).send({
        error: "Exam service unavailable",
      });
    }
  };

  app.all("/api/exams", handler);
  app.all("/api/exams/*", handler);
}