import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { projets, quotePartDepassee, sommeQuotesParts } from "../../projets";

export const dynamicParams = false;

export function generateStaticParams() {
  return projets.map((projet) => ({ id: projet.id }));
}

export default async function DetailProjet({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projet = projets.find((p) => p.id === id);
  if (!projet) notFound();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/" className={styles.retour}>
          ←
        </Link>
        <div>
          <div className={styles.headerTitle}>{projet.nom}</div>
          <div className={styles.headerSub}>{projet.periode}</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sectionTitle}>Postes · coûts et financement</div>
        {projet.postes.map((poste) => {
          const somme = sommeQuotesParts(poste);
          const depassee = quotePartDepassee(poste);
          return (
            <div key={poste.id} className={styles.posteCard}>
              <div className={styles.posteHeader}>
                <div>
                  <div className={styles.posteNom}>{poste.nom}</div>
                  <div className={styles.posteEtp}>{poste.etp} ETP · affecté à ce projet</div>
                </div>
                <div className={styles.posteCout}>
                  {poste.coutAnnuel.toLocaleString("fr-FR")} €
                  <div className={styles.posteCoutLabel}>coût annuel</div>
                </div>
              </div>
              <div className={styles.financeurs}>
                {poste.financeurs.length === 0 && (
                  <span className={styles.pillNonFinance}>Non financé</span>
                )}
                {poste.financeurs.map((f) => (
                  <span key={f.nom} className={styles.pill}>
                    {f.nom} · {f.pct} %
                  </span>
                ))}
              </div>
              <div className={depassee ? styles.sommeDepassee : styles.sommeOk}>
                Total des quotes-parts : {somme} %{depassee ? " — dépasse 100 %" : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
