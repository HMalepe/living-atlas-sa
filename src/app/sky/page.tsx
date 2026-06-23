import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sky",
};

export default function SkyPage() {
  return (
    <SiteShell mainClassName="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Sky</h1>
      <p className="mt-4 text-muted">
        Location-aware astronomy for South Africa — calculated from your
        position, date, and time.
      </p>
      <div className="mt-8 grid gap-4">
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="font-semibold">Coming in Milestone 4</h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted">
            <li>Live and tonight&apos;s sky</li>
            <li>Moon phase and rise/set times</li>
            <li>Planet finder and constellation guides</li>
            <li>Southern Hemisphere seasonal sky</li>
          </ul>
        </div>
        <Button variant="sky" asChild>
          <Link href="/sky/live">Tonight&apos;s sky preview</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
