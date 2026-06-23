import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import {
  searchRoadsLocal,
  type SearchResult,
} from "@/data/roads/johannesburg-mvp";

export async function searchRoads(
  query: string,
  limit = 20,
): Promise<SearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  if (!isSupabaseConfigured()) {
    return searchRoadsLocal(trimmed, limit);
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("search_roads", {
      search_query: trimmed,
      result_limit: limit,
    });

    if (!error && data?.length) {
      return data.map(
        (row: {
          slug: string;
          title: string;
          current_name: string;
          match_reason: string;
          match_field: string;
          former_name: string | null;
          seed_tier: SearchResult["seedTier"];
        }) => ({
          slug: row.slug,
          title: row.title,
          currentName: row.current_name,
          matchReason: row.match_reason,
          matchField: row.match_field as SearchResult["matchField"],
          formerName: row.former_name ?? undefined,
          seedTier: row.seed_tier,
        }),
      );
    }
  } catch {
    // Use static catalogue when Supabase is unavailable
  }

  return searchRoadsLocal(trimmed, limit);
}
