import type { CareerCardProps } from './CareerCard.types';
import styles from './CareerCard.module.css';

export default function CareerCard({ experience }: CareerCardProps) {
  const { period, title, company, description } = experience;
  return (
    <article className={styles.careerCard}>
      <span className={styles.careerCard__period}>{period}</span>
      <span className={styles.careerCard__title}>{title}</span>
      <span className={styles.careerCard__company}>{company}</span>
      <ul className={styles.careerCard__description}>
        {description.map((item, i) => (
          <li key={i} className={styles.careerCard__description__item}>
            {item.text}
            {item.subItems && (
              <ul className={styles.careerCard__description__item__subitems}>
                {item.subItems.map((sub, j) => (
                  <li
                    key={j}
                    className={
                      styles.careerCard__description__item__subitems__item
                    }
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
