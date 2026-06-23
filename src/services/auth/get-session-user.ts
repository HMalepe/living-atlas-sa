import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { SessionUser } from "@/domain/types";
import type { RoleSlug } from "@/domain/roles";

type RoleRow = { slug: string };
type UserRoleRow = { roles: RoleRow | RoleRow[] | null };

type PermissionRow = { slug: string };
type RolePermissionRow = { permissions: PermissionRow | PermissionRow[] | null };
type RoleWithPermissions = {
  role_permissions: RolePermissionRow[] | null;
};
type UserRoleWithPermissionsRow = { roles: RoleWithPermissions | RoleWithPermissions[] | null };

function unwrapOne<T>(value: T | T[] | null | undefined): T | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value ?? undefined;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const { data: roleRows } = await supabase
    .from("user_roles")
    .select("roles(slug)")
    .eq("user_id", user.id);

  const roles = ((roleRows ?? []) as UserRoleRow[])
    .map((row) => unwrapOne(row.roles)?.slug)
    .filter((slug): slug is RoleSlug => Boolean(slug));

  const { data: permRows } = await supabase
    .from("user_roles")
    .select("roles(role_permissions(permissions(slug)))")
    .eq("user_id", user.id);

  const permissions = new Set<string>();
  for (const row of (permRows ?? []) as UserRoleWithPermissionsRow[]) {
    const role = unwrapOne(row.roles);
    for (const rp of role?.role_permissions ?? []) {
      const permission = unwrapOne(rp.permissions);
      if (permission?.slug) {
        permissions.add(permission.slug);
      }
    }
  }

  return {
    id: user.id,
    email: user.email ?? "",
    roles,
    permissions: [...permissions],
  };
}
