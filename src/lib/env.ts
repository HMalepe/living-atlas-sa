import { z } from "zod";

function emptyToUndefined(value: unknown): unknown {
  if (value === "" || value === undefined) {
    return undefined;
  }
  return value;
}

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.preprocess(
    emptyToUndefined,
    z.string().url().optional(),
  ),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.preprocess(
    emptyToUndefined,
    z.string().min(1).optional(),
  ),
  SUPABASE_SERVICE_ROLE_KEY: z.preprocess(
    emptyToUndefined,
    z.string().min(1).optional(),
  ),
});

export type AppEnv = z.infer<typeof envSchema>;

function parseEnv(): AppEnv {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });

  if (!parsed.success) {
    const formatted = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${formatted}`);
  }

  return parsed.data;
}

export const env = parseEnv();

export function isSupabaseConfigured(): boolean {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && url.startsWith("http"));
}
