import Link from "next/link";
import { redirect } from "next/navigation";
import { ADMIN_MIN_ROLE, hasMinRole } from "@/domain/roles";
import { signOut } from "@/features/auth/actions";
import { isSupabaseConfigured } from "@/lib/env";
import { getSessionUser } from "@/services/auth/get-session-user";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-surface">
        <header className="border-b border-border px-6 py-4">
          <span className="font-semibold">Living Atlas — Admin</span>
        </header>
        <main className="mx-auto max-w-2xl px-6 py-16">
          <h1 className="text-2xl font-semibold">Configure Supabase</h1>
          <p className="mt-4 text-muted">
            Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
            <code>.env.local</code>, then apply migrations.
          </p>
          <Link href="/" className="mt-6 inline-block text-sm hover:underline">
            ← Back to home
          </Link>
        </main>
      </div>
    );
  }

  const user = await getSessionUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  if (!hasMinRole(user.roles, ADMIN_MIN_ROLE)) {
    redirect("/admin/unauthorized");
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-semibold">
            Living Atlas — Admin
          </Link>
          <nav className="flex gap-4 text-sm text-muted">
            <Link href="/admin" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/" className="hover:text-foreground">
              Public site
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted">{user.email}</span>
          <form action={signOut}>
            <Button type="submit" variant="outline" size="sm">
              Sign out
            </Button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
