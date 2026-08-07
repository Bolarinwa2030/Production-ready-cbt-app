*** Config/ ***
*** It contain the configuration needed ***
API_PORT =
AUTH_SERVICE_URL (THis will be reference in other file instead of writing the localhost:3001)

**** Middleware/ ****
These run every incoming request before it reaches a route. Which means every request goes through middleware.
 - It check for valid API keys or User login tokens
 - Block bad request and logs request

 *** plugins/ ***
 Fastify uses plugines for reusable functionality
 - Add extra tools or block of code
 - Handles thing like rate limiting or security headers.
 Rate Limiting - LOgger - CORS - JWT - Redis

 *** routes/ ***
 This folder only defines URL
 - These matches incoming URL paths to specific actions
- Tell the gateway where to send incoming traffic
Example: GET /health POST /auth/login GET /exams

*** services/ ***
This folder simpoy knows how to contact other microservices
- It handle forwarding requests to microservices or other APIs
- it mainly contain business login for feteching data

*** app.ts ***
The app.ts is like a builder
- It loads the config, middleware, plugin and route together
- It creates the Fastify APplication. it doesnt start server

*** Server.ts ***
This file start the application