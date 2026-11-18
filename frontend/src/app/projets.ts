export type Financeur = {
  nom: string;
  pct: number;
};

export type Poste = {
  id: string;
  nom: string;
  etp: number;
  coutAnnuel: number;
  financeurs: Financeur[];
};

export type Projet = {
  id: string;
  nom: string;
  periode: string;
  nombrePostes: number;
  nombreFinanceurs: number;
  tauxCouverture: number;
  postes: Poste[];
};

export type StatutCouverture = "couvert" | "partiel" | "falaise";

export function statutCouverture(tauxCouverture: number): StatutCouverture {
  if (tauxCouverture >= 100) return "couvert";
  if (tauxCouverture < 50) return "falaise";
  return "partiel";
}

export function sommeQuotesParts(poste: Poste): number {
  return poste.financeurs.reduce((total, f) => total + f.pct, 0);
}

export function quotePartDepassee(poste: Poste): boolean {
  return sommeQuotesParts(poste) > 100;
}

export const projets: Projet[] = [
  {
    id: "carillon-idf",
    nom: "Déploiement Carillon – Île-de-France",
    periode: "Jan 2026 → Déc 2026",
    nombrePostes: 3,
    nombreFinanceurs: 3,
    tauxCouverture: 68,
    postes: [
      {
        id: "coordinatrice-terrain",
        nom: "Coordinatrice de terrain",
        etp: 0.8,
        coutAnnuel: 34200,
        financeurs: [{ nom: "Ville de Paris", pct: 100 }],
      },
      {
        id: "responsable-antenne",
        nom: "Responsable d'antenne IDF",
        etp: 0.5,
        coutAnnuel: 21600,
        financeurs: [
          { nom: "Ville de Paris", pct: 30 },
          { nom: "Fondation SNCF", pct: 25 },
        ],
      },
      {
        id: "volontaire-service-civique",
        nom: "Volontaire en service civique",
        etp: 1,
        coutAnnuel: 7200,
        financeurs: [
          { nom: "Fondation SNCF", pct: 60 },
          { nom: "Mécénat entreprise", pct: 40 },
        ],
      },
    ],
  },
  {
    id: "formactions-2026",
    nom: "Form'Actions entreprises 2026",
    periode: "Mar 2026 → Nov 2026",
    nombrePostes: 2,
    nombreFinanceurs: 2,
    tauxCouverture: 100,
    postes: [
      {
        id: "formateur-entreprises",
        nom: "Formateur entreprises",
        etp: 1,
        coutAnnuel: 38000,
        financeurs: [
          { nom: "Fondation Total", pct: 70 },
          { nom: "Région Île-de-France", pct: 30 },
        ],
      },
      {
        id: "charge-partenariats",
        nom: "Chargé de partenariats",
        etp: 0.6,
        coutAnnuel: 19800,
        financeurs: [{ nom: "Région Île-de-France", pct: 100 }],
      },
    ],
  },
  {
    id: "reperes-paris",
    nom: "Lien social – Repères Paris",
    periode: "Avr 2025 → Mar 2026",
    nombrePostes: 4,
    nombreFinanceurs: 2,
    tauxCouverture: 40,
    postes: [
      {
        id: "mediateur-social",
        nom: "Médiateur social",
        etp: 1,
        coutAnnuel: 32000,
        financeurs: [{ nom: "CAF Paris", pct: 50 }],
      },
      {
        id: "psychologue",
        nom: "Psychologue",
        etp: 0.5,
        coutAnnuel: 21000,
        financeurs: [{ nom: "Fondation de France", pct: 40 }],
      },
      {
        id: "coordinateur",
        nom: "Coordinateur",
        etp: 0.4,
        coutAnnuel: 16800,
        financeurs: [
          { nom: "CAF Paris", pct: 20 },
          { nom: "Fondation de France", pct: 20 },
        ],
      },
      {
        id: "agent-accueil",
        nom: "Agent d'accueil",
        etp: 1,
        coutAnnuel: 24000,
        financeurs: [],
      },
    ],
  },
  {
    id: "changer-les-regards",
    nom: "Changer les regards – Écoles",
    periode: "Sep 2025 → Juin 2026",
    nombrePostes: 2,
    nombreFinanceurs: 3,
    tauxCouverture: 80,
    postes: [
      {
        id: "intervenant-pedagogique",
        nom: "Intervenant pédagogique",
        etp: 1,
        coutAnnuel: 29000,
        financeurs: [
          { nom: "Rectorat", pct: 50 },
          { nom: "Fondation Bettencourt", pct: 30 },
          { nom: "Mécénat local", pct: 25 },
        ],
      },
      {
        id: "assistant-logistique",
        nom: "Assistant logistique",
        etp: 0.5,
        coutAnnuel: 11000,
        financeurs: [{ nom: "Rectorat", pct: 100 }],
      },
    ],
  },
];
