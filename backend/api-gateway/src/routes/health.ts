import { FastifyInstance } from "fastify";

export async function healthRoute(app: FastifyInstance) {
  app.get("/health", async (request, reply) => {
    return {
      status: "ok",
    };
  });
}
