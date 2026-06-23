import { test, expect } from "@playwright/test";

test("homepage communicates core promise", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /everything around you has a story/i }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: /explore the ground/i }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: /explore the sky/i }),
  ).toBeVisible();
});

test("navigation routes resolve", async ({ page }) => {
  await page.goto("/ground");
  await expect(page.getByRole("heading", { name: "Ground" })).toBeVisible();

  await page.goto("/sky");
  await expect(page.getByRole("heading", { name: "Sky" })).toBeVisible();
});
