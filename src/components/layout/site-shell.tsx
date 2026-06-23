import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { cn } from "@/lib/utils";

type SiteShellProps = {
  children: React.ReactNode;
  className?: string;
  mainClassName?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
};

export function SiteShell({
  children,
  className,
  mainClassName,
  hideHeader,
  hideFooter,
}: SiteShellProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface-elevated focus:px-4 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>
      {hideHeader ? null : <SiteHeader />}
      <main id="main-content" className={cn("flex-1", mainClassName)}>
        {children}
      </main>
      {hideFooter ? null : <SiteFooter />}
    </div>
  );
}
