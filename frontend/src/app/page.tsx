import Link from "next/link";
import styles from "./page.module.css";
import { projets, statutCouverture, type StatutCouverture } from "./projets";

const libelleStatut: Record<StatutCouverture, string> = {
  couvert: "Couvert",
  partiel: "Partiel",
  falaise: "Falaise",
};

const classeBadge: Record<StatutCouverture, string> = {
  couvert: styles.badgeCouvert,
  partiel: styles.badgePartiel,
  falaise: styles.badgeFalaise,
};

export default function Home() {
  const projetsFalaise = projets.filter((p) => statutCouverture(p.tauxCouverture) === "falaise").length;
  const couvertureMoyenne = Math.round(
    projets.reduce((total, p) => total + p.tauxCouverture, 0) / projets.length
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>La Cloche · Pilotage des financements</div>
        <div className={styles.headerSub}>Vue d&apos;ensemble des projets — exercice 2026</div>
      </div>

      <div className={styles.content}>
        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <span className={styles.kpiValue}>{projets.length}</span>
            <span className={styles.kpiLabel}>Projets actifs</span>
          </div>
          <div className={styles.kpiCard}>
            <span className={styles.kpiValue}>{projetsFalaise}</span>
            <span className={styles.kpiLabel}>Projets en falaise</span>
          </div>
          <div className={styles.kpiCard}>
            <span className={styles.kpiValue}>{couvertureMoyenne} %</span>
            <span className={styles.kpiLabel}>Couverture moyenne</span>
          </div>
        </div>

        <div className={styles.sectionTitle}>Projets en cours</div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Projet / action</th>
              <th>Période</th>
              <th>Postes</th>
              <th>Financeurs</th>
              <th>Couverture</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {projets.map((projet) => {
              const statut = statutCouverture(projet.tauxCouverture);
              return (
                <tr key={projet.id}>
                  <td>
                    <Link href={`/projets/${projet.id}`} className={styles.lienProjet}>
                      {projet.nom}
                    </Link>
                  </td>
                  <td>{projet.periode}</td>
                  <td>{projet.nombrePostes}</td>
                  <td>{projet.nombreFinanceurs}</td>
                  <td>
                    <span className={styles.barWrap}>
                      <span
                        className={styles.barFill}
                        style={{ width: `${projet.tauxCouverture}%` }}
                      />
                    </span>
                    {projet.tauxCouverture} %
                  </td>
                  <td>
                    <span className={`${styles.badge} ${classeBadge[statut]}`}>
                      {libelleStatut[statut]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
