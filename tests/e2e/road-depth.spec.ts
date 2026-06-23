import { test, expect } from "@playwright/test";

test("road detail shows timeline and confidence badges", async ({ page }) => {
  await page.goto("/ground/roads/m1");
  await expect(page.getByRole("heading", { name: "Timeline", level: 2 })).toBeVisible();
  await expect(page.getByText("Supported").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Things you might never notice", level: 2 })).toBeVisible();
});

test("compare mode loads with parallel explanation", async ({ page }) => {
  await page.goto("/ground/roads/compare?a=m1&b=m2");
  await expect(page.getByRole("heading", { name: "Compare roads", level: 1 })).toBeVisible();
  await expect(page.getByText(/Why do the M1 and M2 run parallel/i)).toBeVisible();
});

test("intersections index and detail load", async ({ page }) => {
  await page.goto("/ground/intersections");
  await expect(page.getByRole("heading", { name: "Intersections", level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Gillooly's" }).click();
  await expect(
    page.getByRole("heading", { name: "Gillooly's Interchange", level: 1 }),
  ).toBeVisible();
});

test("renamed road shows strongly supported name claims", async ({ page }) => {
  await page.goto("/ground/roads/winnie-mandela-drive");
  await expect(page.getByText("Strongly supported").first()).toBeVisible();
  await expect(
    page.getByText("The road was formerly officially named William Nicol Drive."),
  ).toBeVisible();
});
