import { FastifyInstance } from "fastify";
import { env } from "../config/env.js";
import { proxyRequest } from "../proxy/service-proxy.js";

export async function examRoute(app: FastifyInstance) {
  app.all("/api/exams/*", async (request, reply) => {
    const response = await proxyRequest(
      request,
      env.EXAM_SERVICE_URL,
    );

    const body = await response.text();

    return reply
      .code(response.status)
      .send(body);
  });
}