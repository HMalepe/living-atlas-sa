export const ROLES = {
  VIEWER: "viewer",
  CONTRIBUTOR: "contributor",
  RESEARCHER: "researcher",
  EDITOR: "editor",
  MODERATOR: "moderator",
  ADMINISTRATOR: "administrator",
} as const;

export type RoleSlug = (typeof ROLES)[keyof typeof ROLES];

/** Mirrors database roles.rank */
export const ROLE_RANK: Record<RoleSlug, number> = {
  viewer: 1,
  contributor: 2,
  researcher: 3,
  editor: 4,
  moderator: 4,
  administrator: 5,
};

export const PERMISSIONS = {
  ENTITIES_READ: "entities.read",
  ENTITIES_WRITE: "entities.write",
  ENTITIES_PUBLISH: "entities.publish",
  SOURCES_WRITE: "sources.write",
  COMMUNITY_SUBMIT: "community.submit",
  COMMUNITY_MODERATE: "community.moderate",
  ADMIN_ACCESS: "admin.access",
  ADMIN_USERS: "admin.users",
  ADMIN_AUDIT: "admin.audit",
} as const;

export type PermissionSlug = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export function getHighestRoleRank(roleSlugs: string[]): number {
  return roleSlugs.reduce((max, slug) => {
    const rank = ROLE_RANK[slug as RoleSlug] ?? 0;
    return rank > max ? rank : max;
  }, 0);
}

export function hasMinRole(roleSlugs: string[], minRole: RoleSlug): boolean {
  return getHighestRoleRank(roleSlugs) >= ROLE_RANK[minRole];
}

export function hasPermission(
  userPermissions: string[],
  permission: PermissionSlug,
): boolean {
  return userPermissions.includes(permission);
}

/** Minimum role required to access /admin */
export const ADMIN_MIN_ROLE: RoleSlug = ROLES.RESEARCHER;
