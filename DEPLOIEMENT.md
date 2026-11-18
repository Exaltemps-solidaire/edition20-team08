# Déploiement

L'application aide La Cloche à savoir, poste par poste, jusqu'à quelle date chaque emploi est financé. Elle montre une vue globale des projets avec leur taux de couverture, pour préparer les dossiers de renouvellement avant la date de falaise.

## Services

- `frontend/` : export statique Next.js servi par nginx, port 80 (conteneur) → **8080** publié, exposé au public.
- `api/` : service Node, port 8081 (conteneur) → **8081** publié, atteint via `/api/` par le proxy d'entrée.

## Services externes

Aucun pour l'instant : les données de l'itération 1 (vue globale des projets) sont codées en dur dans le frontend, sans appel API ni base de données. Rien ne casse si un service externe tombe, puisqu'aucun n'est encore appelé.

## Connu fragile ou inachevé

- Les données affichées sont statiques (mock), pas encore branchées sur une base ou une API.
- Le détail d'un projet, le détail d'un poste, l'écran "Qui êtes-vous ?" et le formulaire "Nouveau projet" ne sont pas encore construits (voir `ITERATIONS.md`).

## Contact

- Équipe : Équipe 08 (D224TR).
- Association : La Cloche.
