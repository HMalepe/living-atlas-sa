import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteShell mainClassName="mx-auto flex max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-muted">
        404
      </p>
      <h1 className="mt-2 text-3xl font-semibold">This place is not mapped yet</h1>
      <p className="mt-4 text-muted">
        The page you requested does not exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/ground/roads">Roads map</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
