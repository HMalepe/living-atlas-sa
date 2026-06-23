import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/ground/roads", label: "Roads" },
  { href: "/ground/intersections", label: "Intersections" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
] as const;

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        className,
      )}
    >
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        aria-label="Main"
      >
        <Link
          href="/"
          className="font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          Living Atlas SA
        </Link>
        <div className="flex items-center gap-1 sm:gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-1 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="ml-1 rounded-md border border-border px-2 py-1 text-sm transition-colors hover:bg-surface"
          >
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
