import styles from './presentation.module.css';

const stats = [
  { value: '5+', label: "Ans d'exp." },
  { value: '4', label: 'Entreprises' },
  { value: 'TS', label: 'Stack principale' },
  { value: 'M2', label: 'MIASHS DCISS' },
];

export default function Presentation() {
  return (
    <div className={styles.presentation}>
      <p className={styles.presentation__bio}>
        Développeuse passionnée et curieuse, j’ai acquis, au fil de mes cinq
        années d’expérience professionnelle, une base solide de compétences
        techniques et humaines. Ces dernières me permettent aujourd’hui de
        m’adapter à des environnements variés, de collaborer avec des équipes
        aux profils divers, et surtout de relever des défis complexes Ce que je
        recherche avant tout : des partenariats stimulants, la satisfaction d’un
        code utile, bien pensé et bien écrit.
      </p>
      <div className={styles.presentation__stats}>
        {stats.map(({ value, label }) => (
          <div key={label} className={styles.presentation__stat}>
            <span className={styles.presentation__stat__value}>{value}</span>
            <span className={styles.presentation__stat__label}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
