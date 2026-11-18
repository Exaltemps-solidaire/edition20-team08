import { describe, expect, it } from "vitest";
import { statutCouverture } from "./projets";

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
