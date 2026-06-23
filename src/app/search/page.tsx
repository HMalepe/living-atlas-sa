import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { SearchPanel } from "@/features/search/components/search-panel";

export const metadata: Metadata = {
  title: "Search",
  description: "Search roads, route numbers, and former names across Johannesburg.",
};

export default function SearchPage() {
  return (
    <SiteShell mainClassName="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Search</h1>
      <p className="mt-2 text-muted">
        Find roads by current name, route number, or former official name.
      </p>
      <div className="mt-8">
        <SearchPanel />
      </div>
      <p className="mt-8 text-center text-sm text-muted">
        <Link href="/ground/roads" className="hover:underline">
          Or browse the interactive map →
        </Link>
      </p>
    </SiteShell>
  );
}
