import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je vois la vue globale des projets", async () => {
    await expect(page.getByText("La Cloche · Pilotage des financements")).toBeVisible();
    await expect(page.getByRole("table")).toBeVisible();
    await expect(page.getByText("Déploiement Carillon – Île-de-France")).toBeVisible();
  });

  await test.step("Je consulte le détail d'un projet", async () => {
    await page.getByRole("link", { name: "Déploiement Carillon – Île-de-France" }).click();
    await expect(page.getByText("Coordinatrice de terrain")).toBeVisible();
    await expect(page.getByText("Ville de Paris · 100 %")).toBeVisible();
  });
});
