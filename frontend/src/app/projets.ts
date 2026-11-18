export type Projet = {
  id: string;
  nom: string;
  periode: string;
  nombrePostes: number;
  nombreFinanceurs: number;
  tauxCouverture: number;
};

export type StatutCouverture = "couvert" | "partiel" | "falaise";

export function statutCouverture(tauxCouverture: number): StatutCouverture {
  if (tauxCouverture >= 100) return "couvert";
  if (tauxCouverture < 50) return "falaise";
  return "partiel";
}

export const projets: Projet[] = [
  {
    id: "carillon-idf",
    nom: "Déploiement Carillon – Île-de-France",
    periode: "Jan 2026 → Déc 2026",
    nombrePostes: 3,
    nombreFinanceurs: 3,
    tauxCouverture: 68,
  },
  {
    id: "formactions-2026",
    nom: "Form'Actions entreprises 2026",
    periode: "Mar 2026 → Nov 2026",
    nombrePostes: 2,
    nombreFinanceurs: 2,
    tauxCouverture: 100,
  },
  {
    id: "reperes-paris",
    nom: "Lien social – Repères Paris",
    periode: "Avr 2025 → Mar 2026",
    nombrePostes: 4,
    nombreFinanceurs: 2,
    tauxCouverture: 40,
  },
  {
    id: "changer-les-regards",
    nom: "Changer les regards – Écoles",
    periode: "Sep 2025 → Juin 2026",
    nombrePostes: 2,
    nombreFinanceurs: 3,
    tauxCouverture: 80,
  },
];
