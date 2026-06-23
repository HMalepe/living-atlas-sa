import { test, expect } from "@playwright/test";

test("404 page renders", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(
    page.getByRole("heading", { name: /not mapped yet/i }),
  ).toBeVisible();
});

test("contribute page renders", async ({ page }) => {
  await page.goto("/contribute");
  await expect(page.getByRole("heading", { name: "Contribute" })).toBeVisible();
});

test("site header navigation works", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Main").getByRole("link", { name: "Roads" }).click();
  await expect(page).toHaveURL(/\/ground\/roads/);
});
