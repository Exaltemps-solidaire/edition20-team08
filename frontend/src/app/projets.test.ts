import { describe, expect, it } from "vitest";
import { quotePartDepassee, statutCouverture, type Poste } from "./projets";

function poste(pcts: number[]): Poste {
  return {
    id: "test",
    nom: "test",
    etp: 1,
    coutAnnuel: 0,
    financeurs: pcts.map((pct, i) => ({ nom: `financeur-${i}`, pct })),
  };
}

describe("statutCouverture", () => {
  it("renvoie couvert quand la couverture atteint 100 %", () => {
    expect(statutCouverture(100)).toBe("couvert");
  });

  it("renvoie partiel entre 50 % (inclus) et 100 % (exclu)", () => {
    expect(statutCouverture(68)).toBe("partiel");
  });

  it("renvoie falaise sous 50 % de couverture", () => {
    expect(statutCouverture(40)).toBe("falaise");
  });
});

describe("quotePartDepassee", () => {
  it("n'est pas dépassée quand la somme des quotes-parts fait 100 %", () => {
    expect(quotePartDepassee(poste([60, 40]))).toBe(false);
  });

  it("n'est pas dépassée quand la somme des quotes-parts est sous 100 %", () => {
    expect(quotePartDepassee(poste([30, 25]))).toBe(false);
  });

  it("est dépassée quand la somme des quotes-parts dépasse 100 %", () => {
    expect(quotePartDepassee(poste([50, 30, 25]))).toBe(true);
  });
});
