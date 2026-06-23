import { Suspense } from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { RoadCompareView } from "@/features/ground/roads/components/road-compare-view";

export const metadata = {
  title: "Compare roads",
  description:
    "Side-by-side comparison of Johannesburg roads with relationships and parallel corridor explanations.",
};

export default function RoadComparePage() {
  return (
    <SiteShell mainClassName="mx-auto max-w-4xl px-6 py-10">
      <nav className="mb-8 text-sm">
        <Link href="/ground/roads" className="text-muted hover:text-foreground hover:underline">
          ← Roads map
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">Compare roads</h1>
      <p className="mt-2 text-muted">
        Explore how Johannesburg roads relate — parallel corridors, interchanges,
        and shared history. Every statement shows its confidence level and sources.
      </p>

      <div className="mt-8">
        <Suspense fallback={<p className="text-muted">Loading comparison…</p>}>
          <RoadCompareView />
        </Suspense>
      </div>
    </SiteShell>
  );
}
