import { describe, expect, it } from "vitest";
import { env, isSupabaseConfigured } from "@/lib/env";

describe("env", () => {
  it("parses default app URL", () => {
    expect(env.NEXT_PUBLIC_APP_URL).toBeTruthy();
  });

  it("isSupabaseConfigured returns a boolean", () => {
    expect(typeof isSupabaseConfigured()).toBe("boolean");
  });
});
