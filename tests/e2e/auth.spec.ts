import { test, expect } from "@playwright/test";

test("login page renders", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
});

test("admin redirects unauthenticated users or shows setup", async ({ page }) => {
  await page.goto("/admin");
  const onLogin = /\/login/.test(page.url());
  const configureVisible = await page
    .getByText(/Configure Supabase|Sign in/i)
    .first()
    .isVisible()
    .catch(() => false);
  expect(onLogin || configureVisible).toBeTruthy();
});

test("signup page renders", async ({ page }) => {
  await page.goto("/signup");
  await expect(page.getByRole("heading", { name: "Create account" })).toBeVisible();
});
