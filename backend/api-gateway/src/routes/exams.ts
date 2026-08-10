import { FastifyInstance } from "fastify";
import { env } from "../config/env.js";
import { proxyRequest } from "../proxy/service-proxy.js";

export async function examRoute(app: FastifyInstance) {
  const handler = async (request: any, reply: any) => {
    const response = await proxyRequest(
      request,
      env.EXAM_SERVICE_URL,
    );

    const body = await response.text();

    return reply
      .code(response.status)
      .send(body);
  };

  app.all("/api/exams", handler);
  app.all("/api/exams/*", handler);
}