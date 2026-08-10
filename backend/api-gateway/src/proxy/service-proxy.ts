import { FastifyRequest } from "fastify";

export async function proxyRequest(
  request: FastifyRequest,
  targetUrl: string,
) {

  const target = `${targetUrl}${request.url}`;

  const headers = new Headers();

  for (const [key, value] of Object.entries(request.headers)) {
    if (typeof value === "string") {
      headers.set(key, value);
    }
  }

  const response = await fetch(target, {
    method: request.method,
    headers,
    body:
      request.method === "GET" || request.method === "HEAD"
        ? undefined
        : JSON.stringify(request.body),
  });

  return response;
}