# Plan d'itérations — La Cloche (D224TR)

**Plan validé le 2026-11-18** (confirmé par le développeur avant le début de l'itération 1).

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation : ni fichier `cadrage/*iteration*`, ni clé `iterations` dans `passation.json`).
- **Temps restant annoncé** : 60 minutes (question reposée le 2026-11-18 ; la première estimation, 30 minutes, a été révisée à la hausse avant le début du codage).
- **Durée du tour de test de l'équipe** : 5 minutes.
- **Capacité déduite** : une itération coûte au moins codage (≤10 min) + publication (~5 min) + tour de test (5 min), soit 13 à 20 minutes. **60 minutes permettent 2 itérations complètes avec une marge confortable, et une 3e itération courte si les deux premières ne dépassent pas leur budget.** Voir ⚠️ ci-dessous.
- **Ce qui sort du périmètre pour l'instant** : nouveau projet (formulaire), branchement sur de vraies données/API, écran "Qui êtes-vous ?" (voir "À venir"). La fonctionnalité de prévisions par data science évoquée à l'étape 7 du scénario n'est pas listée dans le plan de livraison à 4 étapes ni dans le PRD validé par le Maestro : elle sort du périmètre du hackathon, à confirmer avec les cadreurs (❓) si l'équipe y tient.

## ⚠️ Signal sur le temps

Avec 60 minutes, je détaille 2 itérations (vue globale, puis détail du projet) en gardant une marge : 2 × 20 min max = 40 min, il reste ~20 min de coussin ou pour une itération 3 courte (détail du poste, qui couvre directement l'hypothèse mesurée de l'équipe). Je ne détaille pas cette 3e itération maintenant : je la précise à la fin de l'itération 2, avec le temps réellement restant à ce moment-là — il peut encore changer.

L'écran "Qui êtes-vous ?" (persona, requis par le PRD) est reporté après le flux de lecture : rien dans les itérations 1-2 n'a besoin de distinguer les rôles, puisque les données sont encore en dur et agrégées (pas de salaire individuel affiché, conforme à la règle de l'association). Je le replace dans "À venir" avant le formulaire "Nouveau projet" — à confirmer que ça convient pour la démo.

## Itération 1 : Le squelette est en ligne et montre la vue globale des projets, avec des données en dur

- **Dans le périmètre** :
  - `.env.example` et `DEPLOIEMENT.md` (le squelette `api/`/`frontend/` existe déjà).
  - L'écran "Vue globale des projets" (frontend) : liste de projets avec nom, période, nombre de postes, nombre de financeurs, taux de couverture, statut — données codées en dur dans le frontend (pas d'appel API dans cette itération).
  - Déploiement selon `docs/guidelines-deploiement.md` (= `/srv/team08/CLAUDE.md`), `/health` et `/sante` opérationnels.
- **Hors périmètre** : écran "Qui êtes-vous ?", détail projet, détail poste, nouveau projet, tout appel API réel (les routes `api/` existantes ne sont pas modifiées).
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'application déployée, quand on visite `/`, alors la liste des projets s'affiche avec nom, période, nb postes, nb financeurs, taux de couverture et statut (données en dur).
  - Étant donné le déploiement, quand on appelle `/health` (API) et `/sante` (front), alors les deux répondent 200.
  - Étant donné `./scripts/verifier-deployabilite.sh`, quand on le lance, alors il ne signale aucune borne.
- **Hypothèse de l'équipe couverte** : aucune directement — l'hypothèse mesurée (produire une équivalence chiffrable en 1 session) porte sur le détail par poste, prévu dans une itération ultérieure. Celle-ci pose la fondation visuelle du cas passant.
- **Codage estimé** : 10 minutes (plafond).
- **Fichiers prévus** (~5, hors tests) :
  - `.env.example`
  - `DEPLOIEMENT.md`
  - `frontend/src/app/page.tsx` (ou équivalent déjà en place) — écran vue globale, données en dur
  - un composant ou module de données en dur pour les projets (ex. `frontend/src/app/projets-mock.ts`)
  - ajustement mineur de style si le prototype `passation/prototype/index.html` l'impose
- **Tests unitaires prévus** : 1 à 3, sur une éventuelle logique de calcul du statut/couverture si elle existe déjà côté frontend (sinon, aucun test de logique métier n'est encore introduit — à signaler dans le bilan plutôt que de tester du balisage pur).
- **Étapes ajoutées à la démo (`e2e/demo.spec.ts`)** : ouvrir `/`, vérifier que la liste des projets s'affiche.
- **Bilan** :
  - **Durée de codage réelle** : 2 minutes (aucun dépassement, budget de 10 min largement tenu).
  - **Critères d'acceptation** : les 3 sont satisfaits — vue globale en dur vérifiée en local (`curl localhost:8080/`), `/health` (API) et `/sante` (front) répondent 200, `./scripts/verifier-deployabilite.sh` ne signale aucune borne.
  - **Reporté** : rien de prévu n'a été reporté.
  - **Ce que le harnais a bloqué ou refusé** : rien — `npm test` passait déjà et aucune borne n'a été détectée, donc `signaler-version.sh 1` n'a pas été bloqué.
  - **Blocage infrastructure (hors harnais)** : le démarrage de la plateforme (`gitlab-ci-local --force-shell-executor`) a buté sur le quota de pull anonyme de Docker Hub, partagé par toutes les VM du hackathon sortant par la même IP publique — plusieurs images (`registry:2`, `pgvector/pgvector`, `seaweedfs`, `temporal`, `casdoor`) ont échoué puis fini par passer au fil des tentatives et du relâchement du quota. Un token Docker Hub fourni par le développeur s'est révélé invalide. Finalement résolu sans identifiants : attente + nouvelles tentatives, et démarrage manuel du conteneur `registry.internal` une fois son image disponible.
  - **Modifications** :
    - `frontend/src/app/projets.ts` — données en dur des 4 projets + `statutCouverture()` (logique du critère 1 et du statut affiché).
    - `frontend/src/app/projets.test.ts` — 3 tests Vitest sur `statutCouverture()` (couvert/partiel/falaise).
    - `frontend/src/app/page.tsx` — écran "Vue globale des projets" (critère 1).
    - `frontend/src/app/page.module.css` — styles du tableau/KPI/badges, repris du prototype.
    - `frontend/src/app/layout.tsx` — titre/langue de la page.
    - `frontend/Dockerfile`, `api/Dockerfile` — image de base qualifiée (`docker.io/library/...`), nécessaire pour le build (critère 3).
    - `frontend/nginx.conf` — en-têtes de sécurité (CSP adaptée, sans les adresses injoignables du gabarit plateforme).
    - `.env.example`, `DEPLOIEMENT.md`, `podman-compose.yml` — contrat de déployabilité et recette de déploiement (critères 2 et 3).
    - `e2e/demo.spec.ts` — étape de démo ajoutée (hors DoD).

## Itération 2 : Le détail d'un projet affiche le coût réel par poste et la quote-part de chaque financeur

- **Dans le périmètre** :
  - Clic sur un projet de la vue globale → écran "Détail du projet" (nouvelle route frontend).
  - Liste des postes du projet avec coût réel, et pour chaque poste la quote-part de chaque financeur.
  - Contrôle visuel que la somme des quotes-parts d'un poste ne dépasse pas 100 % (règle non négociable de l'association).
  - Données toujours en dur (mock), cohérentes avec celles de la vue globale.
- **Hors périmètre** : détail du poste (mois par mois), nouveau projet, écran "Qui êtes-vous ?", tout appel API réel.
- **Critères d'acceptation** (3 au plus) :
  - Étant donné la vue globale affichée, quand on clique sur un projet, alors l'écran détail de ce projet s'ouvre avec ses postes et leur coût réel.
  - Étant donné un poste financé par plusieurs financeurs, quand la somme des quotes-parts est affichée, alors un signal visuel distingue le cas ≤ 100 % du cas > 100 %.
  - Étant donné l'écran détail, quand on revient en arrière, alors on retrouve la vue globale.
- **Hypothèse de l'équipe couverte** : partielle — prépare la lecture "coût réel par poste et par action sans recalcul manuel" ; la mesure complète (équivalence chiffrable en ETP/€) n'arrive qu'au détail du poste.
- **Codage estimé** : 10 minutes (plafond).
- **Fichiers prévus** (~5, hors tests) :
  - nouvelle route/page frontend "Détail du projet"
  - données mock enrichies (postes, financeurs, quotes-parts par projet)
  - composant d'affichage des quotes-parts avec contrôle visuel ≤ 100 %
  - lien/navigation depuis la vue globale
  - ajustement du routeur frontend si nécessaire
- **Tests unitaires prévus** : 1 à 3, sur le calcul/la détection "somme des quotes-parts > 100 %" (logique métier, pas du balisage).
- **Étapes ajoutées à la démo (`e2e/demo.spec.ts`)** : depuis la vue globale, cliquer sur un projet, vérifier que le détail (postes + quotes-parts) s'affiche.
- **Bilan** : _à remplir en fin d'itération (durée de codage réelle, dépassement éventuel, fait, reporté, modifications fichier par fichier)_

## À venir (liste ordonnée, à détailler au fil de l'eau)

1. Détail du poste : répartition mois par mois, taux de couverture, date de falaise — couvre directement l'hypothèse mesurée de l'équipe (équivalence chiffrable en 1 session). Candidat naturel pour l'itération 3, à confirmer avec le temps réellement restant après l'itération 2.
2. Écran "Qui êtes-vous ?" (choix de persona sans connexion, bouton de changement de rôle) — à introduire quand l'app commence à distinguer ce que chaque rôle peut voir.
3. Brancher la vue globale et le détail projet sur de vraies données (API + stockage), au lieu du codé en dur.
4. Nouveau projet : formulaire de saisie (budget, financeurs, quotes-parts, postes, coûts), blocage si la somme dépasse 100 %.
5. ❓ Prévisions par data science (étape 7 du scénario) : à confirmer avec les cadreurs — absente du plan de livraison et du PRD officiel.
