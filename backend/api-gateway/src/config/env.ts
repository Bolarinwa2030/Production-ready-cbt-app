import dotenv from "dotenv";
import { z } from "zod";

// Load variables from the .env file
dotenv.config({path: ".env",});

// Define the expected environment variables
const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default("0.0.0.0"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  AUTH_SERVICE_URL: z.string().url(),
  EXAM_SERVICE_URL: z.string().url(),

  REDIS_URL: z.string(),
});

// Validate the environment
export const env = envSchema.parse(process.env);