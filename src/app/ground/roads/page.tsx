import type { Metadata } from "next";
import Link from "next/link";
import { RoadsExplorer } from "@/features/ground/roads/components/roads-explorer";
import { listRoads } from "@/repositories/roads";

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
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-border px-4 py-3 lg:px-6">
        <div className="flex items-center gap-4">
          <Link href="/ground" className="text-sm text-muted hover:underline">
            Ground
          </Link>
          <h1 className="font-semibold">Johannesburg roads</h1>
        </div>
        <Link href="/search" className="text-sm text-accent-ground hover:underline">
          Search
        </Link>
      </header>

      <RoadsExplorer roads={roads} initialSelectedSlug={params.road} />
    </div>
  );
}
