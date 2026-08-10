import { FastifyInstance } from "fastify";

export async function authRoute(app: FastifyInstance) {
    
    app.all("/api/auth/*", async (request, reply) => {
        return reply.send({
            route: "auth-service",
            path: request.url,
        });
    });
}
