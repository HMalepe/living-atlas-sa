import { NextResponse } from "next/server";
import { z } from "zod";
import { searchRoads } from "@/repositories/search";
import { logger } from "@/lib/logger";

const querySchema = z.object({
  q: z.string().min(1).max(100),
  limit: z.preprocess(
    (value) => (value === null || value === "" ? undefined : value),
    z.coerce.number().min(1).max(50).default(20),
  ),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    q: searchParams.get("q") ?? "",
    limit: searchParams.get("limit"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Query parameter q is required (1–100 characters)" },
      { status: 400 },
    );
  }

  try {
    const results = await searchRoads(parsed.data.q, parsed.data.limit);
    return NextResponse.json({ results, query: parsed.data.q });
  } catch (error) {
    logger.error("Search failed", { error: String(error) });
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
