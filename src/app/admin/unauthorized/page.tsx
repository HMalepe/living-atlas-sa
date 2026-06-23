import Link from "next/link";
import { getSessionUser } from "@/services/auth/get-session-user";

export default async function AdminUnauthorizedPage() {
  const user = await getSessionUser();

  return (
    <main className="mx-auto max-w-lg px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold">Access restricted</h1>
      <p className="mt-4 text-muted">
        The admin portal requires the Researcher role or above.
        {user ? (
          <>
            {" "}
            Your current roles:{" "}
            <strong>{user.roles.join(", ") || "viewer only"}</strong>.
          </>
        ) : null}
      </p>
      <p className="mt-2 text-sm text-muted">
        Contact a platform administrator to request access.
      </p>
      <Link href="/" className="mt-8 inline-block text-sm hover:underline">
        ← Back to home
      </Link>
    </main>
  );
}
