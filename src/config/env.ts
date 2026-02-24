import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(5200),
  DATABASE_URL: z.url(),
  INTERNAL_AUTH_SECRET: z.string().min(1),
  AUTH_BASE_URL: z.url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid enviroment variables');
  console.error(z.treeifyError(parsed.error).properties);
  process.exit(1);
}

export const env = parsed.data;