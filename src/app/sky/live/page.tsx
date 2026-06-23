import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tonight's sky",
  description: "Live location-aware sky view for South Africa.",
};

export default function SkyLivePage() {
  return (
    <SiteShell mainClassName="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Tonight&apos;s sky</h1>
      <p className="mt-4 text-muted">
        Live location-aware astronomy — visible planets, Moon phase, rise and
        set times, and constellation guides — arrives in Milestone 4.
      </p>
      <Button variant="sky" className="mt-8" asChild>
        <Link href="/sky">Back to Sky module</Link>
      </Button>
    </SiteShell>
  );
}
