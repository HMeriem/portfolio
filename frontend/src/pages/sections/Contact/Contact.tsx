import styles from './contact.module.css';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import Icon from '@/components/Icon/Icon';
import ContactForm from './ContactForm/ContactForm';
import { contactLinks } from './contact.data';
import { useTranslation } from '@/components/Langages/useTranslation';

export default function Contact() {
  const translation = useTranslation();

  return (
    <div className={styles.contact}>
      <SectionHeader title={translation.contact.sectionTitle} index="04" />
      <div className={styles.contact__body}>
        <div className={styles.contact__body__info}>
          <span className={styles.contact__body__info__title}>
            {translation.contact.tagline}
          </span>
          <div className={styles.contact__body__info__links}>
            {contactLinks.map(({ id, href }) =>
              href ? (
                <a
                  key={id}
                  href={href}
                  aria-label={translation.contact.links[id]}
                  className={styles.contact__body__info__links__link}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    href.startsWith('http') ? 'noopener noreferrer' : undefined
                  }
                >
                  <Icon name={id} />
                </a>
              ) : (
                <span
                  key={id}
                  title={translation.contact.links[id]}
                  className={styles.contact__body__info__links__link}
                >
                  <Icon name={id} />
                </span>
              ),
            )}
          </div>
        </div>
        <div className={styles.contact__body__form}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
