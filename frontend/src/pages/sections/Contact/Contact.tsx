import styles from './contact.module.css';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import Icon from '@/components/Icon/Icon';
import ContactForm from './ContactForm/ContactForm';
import { contactLinks } from './contact.data';

export default function Contact() {
  return (
    <div className={styles.contact}>
      <SectionHeader title="Contact" index="04" />
      <div className={styles.contact__body}>
        <div className={styles.contact__body__info}>
          <span className={styles.contact__body__info__title}>Parlons-en.</span>
          <div className={styles.contact__body__info__links}>
            {contactLinks.map(({ id, ariaLabel, href }) =>
              href ? (
                <a
                  key={id}
                  href={href}
                  aria-label={ariaLabel}
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
                  title={ariaLabel}
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
