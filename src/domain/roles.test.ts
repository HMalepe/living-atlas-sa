import { describe, expect, it } from "vitest";
import {
  ADMIN_MIN_ROLE,
  ROLES,
  getHighestRoleRank,
  hasMinRole,
  hasPermission,
} from "@/domain/roles";

describe("roles", () => {
  it("ranks administrator above researcher", () => {
    expect(getHighestRoleRank([ROLES.VIEWER])).toBe(1);
    expect(getHighestRoleRank([ROLES.RESEARCHER, ROLES.VIEWER])).toBe(3);
    expect(getHighestRoleRank([ROLES.ADMINISTRATOR])).toBe(5);
  });

  it("checks minimum role for admin access", () => {
    expect(hasMinRole([ROLES.VIEWER], ADMIN_MIN_ROLE)).toBe(false);
    expect(hasMinRole([ROLES.CONTRIBUTOR], ADMIN_MIN_ROLE)).toBe(false);
    expect(hasMinRole([ROLES.RESEARCHER], ADMIN_MIN_ROLE)).toBe(true);
    expect(hasMinRole([ROLES.EDITOR], ADMIN_MIN_ROLE)).toBe(true);
  });

  it("checks permissions", () => {
    expect(hasPermission(["entities.read"], "entities.read")).toBe(true);
    expect(hasPermission(["entities.read"], "admin.access")).toBe(false);
  });
});
