import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { AdminDashboardStats } from "@/domain/types";

const EMPTY_STATS: AdminDashboardStats = {
  draftEntities: 0,
  missingCitations: 0,
  pendingSubmissions: 0,
  disputedClaims: 0,
};

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  if (!isSupabaseConfigured()) {
    return EMPTY_STATS;
  }

  const supabase = await createClient();

  const [draftRes, disputedRes, pendingRes, claimsRes] = await Promise.all([
    supabase
      .from("entities")
      .select("id", { count: "exact", head: true })
      .eq("status", "draft")
      .is("deleted_at", null),
    supabase
      .from("claims")
      .select("id", { count: "exact", head: true })
      .eq("status", "disputed"),
    supabase
      .from("community_submissions")
      .select("id", { count: "exact", head: true })
      .eq("moderation_status", "submitted"),
    supabase
      .from("claims")
      .select("id, claim_sources(source_id)")
      .in("status", ["draft", "in_review", "published"]),
  ]);

  let missingCitations = 0;
  for (const claim of claimsRes.data ?? []) {
    const sources = claim.claim_sources as { source_id: string }[] | null;
    if (!sources || sources.length === 0) {
      missingCitations += 1;
    }
  }

  return {
    draftEntities: draftRes.count ?? 0,
    missingCitations,
    pendingSubmissions: pendingRes.count ?? 0,
    disputedClaims: disputedRes.count ?? 0,
  };
}
