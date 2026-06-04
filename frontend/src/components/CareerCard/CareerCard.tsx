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
        {description.map((descriptionItem, descriptionIndex) => (
          <li
            key={descriptionIndex}
            className={styles.careerCard__description__item}
          >
            {descriptionItem.text}
            {descriptionItem.subItems && (
              <ul className={styles.careerCard__description__item__subitems}>
                {descriptionItem.subItems.map((subItem, subItemIndex) => (
                  <li
                    key={subItemIndex}
                    className={
                      styles.careerCard__description__item__subitems__item
                    }
                  >
                    {subItem}
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
