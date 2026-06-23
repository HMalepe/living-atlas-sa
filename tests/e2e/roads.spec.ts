import { test, expect } from "@playwright/test";

test("roads map page loads", async ({ page }) => {
  await page.goto("/ground/roads");
  await expect(
    page.getByRole("heading", { name: /johannesburg roads/i }),
  ).toBeVisible();
  await expect(page.getByText(/Johannesburg MVP roads/i)).toBeVisible();
});

test("road detail page loads", async ({ page }) => {
  await page.goto("/ground/roads/m1");
  await expect(page.getByRole("heading", { name: "M1", level: 1 })).toBeVisible();
});

test("search finds former name", async ({ page }) => {
  await page.goto("/search");
  await page.getByPlaceholder(/search roads/i).fill("William Nicol");
  await expect(page.getByText(/Formerly William Nicol Drive/i)).toBeVisible({
    timeout: 5000,
  });
});

test("search API returns match reason", async ({ request }) => {
  const response = await request.get("/api/search?q=M1");
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.results.length).toBeGreaterThan(0);
  expect(body.results[0].matchReason).toBeTruthy();
});

test("roads GeoJSON API returns features", async ({ request }) => {
  const response = await request.get("/api/ground/roads");
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.type).toBe("FeatureCollection");
  expect(body.features.length).toBe(10);
});
