import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">Living Atlas SA</p>
          <p className="mt-1 text-sm text-muted">
            Point anywhere. Understand what you are seeing.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/methodology" className="hover:text-foreground hover:underline">
            Methodology
          </Link>
          <Link href="/ground/roads" className="hover:text-foreground hover:underline">
            Roads
          </Link>
          <Link href="/ground/intersections" className="hover:text-foreground hover:underline">
            Intersections
          </Link>
          <Link href="/search" className="hover:text-foreground hover:underline">
            Search
          </Link>
          <Link href="/contribute" className="hover:text-foreground hover:underline">
            Contribute
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-5xl text-center text-xs text-muted">
        Johannesburg MVP · Ground &amp; Sky modules in active development
      </p>
    </footer>
  );
}
