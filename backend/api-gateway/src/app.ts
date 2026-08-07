import Fastify from "fastify";

export function buildApp() {
    const app = Fastify({
        logger:true,
    })
};

// Register routes here

app.get("/health", async () => )