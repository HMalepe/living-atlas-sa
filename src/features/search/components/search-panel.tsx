"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SeedTierBadge } from "@/components/content/seed-tier-badge";
import { Input } from "@/components/ui/input";
import type { SearchResult } from "@/data/roads/johannesburg-mvp";

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const runSearch = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(trimmed)}`,
      );
      const data = await response.json();
      setResults(data.results ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void runSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, runSearch]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="search" className="sr-only">
          Search roads
        </label>
        <Input
          id="search"
          type="search"
          placeholder="Search roads, route numbers, former names…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <p className="mt-2 text-xs text-muted">
          Try &quot;William Nicol&quot; or &quot;M1&quot;
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Searching…</p>
      ) : null}

      {!loading && searched && results.length === 0 ? (
        <p className="text-sm text-muted">No results for &quot;{query}&quot;</p>
      ) : null}

      <ul className="space-y-3">
        {results.map((result) => (
          <li key={`${result.slug}-${result.matchField}`}>
            <Link
              href={`/ground/roads/${result.slug}`}
              className="block rounded-xl border border-border bg-surface-elevated p-4 hover:border-accent-ground"
            >
              <p className="font-semibold">{result.currentName}</p>
              {result.currentName !== result.title ? (
                <p className="text-sm text-muted">{result.title}</p>
              ) : null}
              <p className="mt-2 text-sm text-accent-ground">
                {result.matchReason}
              </p>
              <div className="mt-2">
                <SeedTierBadge tier={result.seedTier} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
