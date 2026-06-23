import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Contribute",
  description: "Share community memories, photographs, and local knowledge.",
};

export default function ContributePage() {
  return (
    <SiteShell mainClassName="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Contribute</h1>
      <p className="mt-4 text-muted">
        Community memory submissions — oral histories, photographs, nicknames,
        and local knowledge — arrive in Milestone 7 with moderation and consent
        workflows.
      </p>
      <div className="mt-8 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-semibold">What you will be able to share</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted">
          <li>Oral histories and family recollections</li>
          <li>Former road names and local nicknames</li>
          <li>Historical photographs and documents</li>
          <li>Cultural sky stories</li>
        </ul>
        <p className="mt-4 text-sm text-muted">
          All submissions enter moderation. Community memory is never presented
          as verified official history.
        </p>
      </div>
      <Link href="/methodology" className="mt-6 inline-block text-sm hover:underline">
        Read our methodology →
      </Link>
    </SiteShell>
  );
}
