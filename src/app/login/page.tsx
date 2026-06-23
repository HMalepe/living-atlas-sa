import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/features/auth/components/auth-form";
import { isSupabaseConfigured } from "@/lib/env";

export const metadata: Metadata = {
  title: "Sign in",
};

type LoginPageProps = {
  searchParams: Promise<{ redirect?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <Link href="/" className="mb-8 text-sm text-muted hover:underline">
        ← Living Atlas SA
      </Link>
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="mt-2 text-sm text-muted">
        Access the research portal to create and review content.
      </p>
      <div className="mt-8">
        <AuthForm
          mode="login"
          redirectTo={params.redirect}
          supabaseConfigured={isSupabaseConfigured()}
        />
      </div>
    </main>
  );
}
