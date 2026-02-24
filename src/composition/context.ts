import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "../config/env";

export type AppContext = {
  port: number;
  db: ReturnType<typeof drizzle>;
  sql: postgres.Sql;
  internalAuthSecret: string;
  authBaseUrl: string;
  onShutdown: () => Promise<void>;
};

export const buildContext = async (): Promise<AppContext> => {
  const port = env.PORT;
  const connectionString = env.DATABASE_URL;
  const sql = postgres(connectionString, { max: 10 });
  const db = drizzle(sql);
  const authBaseUrl = env.AUTH_BASE_URL;

  try {
    await db.execute("SELECT 1");
    console.log("Database is up and reachable!");
  } catch (error) {
    console.error("Database is not reachable:", error);
    throw error;
  }

  const internalAuthSecret = env.INTERNAL_AUTH_SECRET

  const onShutdown = async () => {
    await sql.end({ timeout: 5 });
  };

  return {
    port,
    db,
    sql,
    internalAuthSecret,
    authBaseUrl,
    onShutdown
  };
};
