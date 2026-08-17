import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    PORT: z.coerce.number().default(3001),
    HOST: z.string().default("0.0.0.0"),
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    
    DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);