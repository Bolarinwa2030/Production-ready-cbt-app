import { FastifyInstance } from "fastify";

export async function examsRoute(app: FastifyInstance) {
    
    app.all("/api/exams/*", async (request, reply) => {
        return reply.send({
            route: "exams-service",
            path: request.url,
        });
    });
}
