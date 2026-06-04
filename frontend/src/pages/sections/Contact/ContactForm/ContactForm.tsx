import styles from './ContactForm.module.css';
import { useContactForm } from './useContactForm';

export default function ContactForm() {
  const { form, status, isLoading, handleChange, handleSubmit } =
    useContactForm();

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
      <input
        className={styles.contactForm__field}
        type="text"
        name="name"
        placeholder="Nom"
        value={form.name}
        onChange={handleChange}
        required
        disabled={isLoading}
      />
      <input
        className={styles.contactForm__field}
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        disabled={isLoading}
      />
      <textarea
        className={`${styles.contactForm__field} ${styles['contactForm__field--textarea']}`}
        name="message"
        placeholder="Message..."
        value={form.message}
        onChange={handleChange}
        required
        disabled={isLoading}
      />
      <button
        className={styles.contactForm__submit}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Envoi...' : 'Envoyer →'}
      </button>
      {status === 'success' && (
        <p
          className={`${styles.contactForm__feedback} ${styles['contactForm__feedback--success']}`}
        >
          Message envoyé avec succès.
        </p>
      )}
      {status === 'error' && (
        <p
          className={`${styles.contactForm__feedback} ${styles['contactForm__feedback--error']}`}
        >
          Une erreur est survenue.
        </p>
      )}
      {status === 'rate_limited' && (
        <p
          className={`${styles.contactForm__feedback} ${styles['contactForm__feedback--error']}`}
        >
          Vous avez atteint la limite de messages par jour. Réessayez
          ultérieurement.
        </p>
      )}
    </form>
  );
}
