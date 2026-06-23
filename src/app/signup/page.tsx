import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/features/auth/components/auth-form";
import { isSupabaseConfigured } from "@/lib/env";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border px-6 py-4">
        <Link href="/" className="text-sm font-semibold hover:underline">
          ← Living Atlas SA
        </Link>
      </header>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="mt-2 text-sm text-muted">
          New accounts receive the Viewer role. Administrators can upgrade roles
          in Supabase.
        </p>
        <div className="mt-8">
          <AuthForm mode="signup" supabaseConfigured={isSupabaseConfigured()} />
        </div>
      </main>
    </div>
  );
}
