import { describe, expect, it } from "vitest";
import { env, isSupabaseConfigured } from "@/lib/env";

describe("env", () => {
  it("parses default app URL", () => {
    expect(env.NEXT_PUBLIC_APP_URL).toBe("http://localhost:3000");
  });

  it("reports Supabase as not configured without keys", () => {
    expect(isSupabaseConfigured()).toBe(false);
  });
});
