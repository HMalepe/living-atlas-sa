import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { RoadsExplorer } from "@/features/ground/roads/components/roads-explorer";
import { listRoads } from "@/repositories/roads";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Johannesburg Roads",
  description: "Explore significant Johannesburg roads on an interactive map.",
};

type RoadsPageProps = {
  searchParams: Promise<{ road?: string }>;
};

export default async function RoadsPage({ searchParams }: RoadsPageProps) {
  const params = await searchParams;
  const roads = await listRoads();

  return (
    <SiteShell hideFooter mainClassName="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 lg:px-6">
        <div>
          <p className="text-xs text-muted">
            <Link href="/ground" className="hover:text-foreground hover:underline">
              Ground
            </Link>
          </p>
          <h1 className="font-semibold">Johannesburg roads</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/ground/intersections">Intersections</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/ground/roads/compare">Compare</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/search">Search</Link>
          </Button>
        </div>
      </div>

      <RoadsExplorer roads={roads} initialSelectedSlug={params.road} />
    </SiteShell>
  );
}
