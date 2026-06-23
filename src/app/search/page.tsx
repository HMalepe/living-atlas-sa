import type { Metadata } from "next";
import Link from "next/link";
import { SearchPanel } from "@/features/search/components/search-panel";

export const metadata: Metadata = {
  title: "Search",
  description: "Search roads, route numbers, and former names across Johannesburg.",
};

export default function SearchPage() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-10">
      <Link href="/" className="text-sm text-muted hover:underline">
        ← Living Atlas SA
      </Link>
      <h1 className="mt-6 text-3xl font-semibold">Search</h1>
      <p className="mt-2 text-muted">
        Find roads by current name, route number, or former official name.
      </p>
      <div className="mt-8">
        <SearchPanel />
      </div>
    </main>
  );
}
