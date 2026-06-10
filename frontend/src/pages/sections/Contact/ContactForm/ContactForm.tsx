import styles from './ContactForm.module.css';
import { useContactForm } from './useContactForm';

export default function ContactForm() {
  const { form, errors, status, isLoading, handleChange, handleSubmit, text } =
    useContactForm();

  const fieldClass = (hasError: boolean) =>
    [styles.contactForm__field, hasError && styles['contactForm__field--error']]
      .filter(Boolean)
      .join(' ');

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.contactForm__group}>
        <input
          className={fieldClass(!!errors.name)}
          type="text"
          name="name"
          placeholder={text.namePlaceholder}
          value={form.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          disabled={isLoading}
        />
        {errors.name && (
          <p className={styles.contactForm__fieldError}>{errors.name}</p>
        )}
      </div>
      <div className={styles.contactForm__group}>
        <input
          className={fieldClass(!!errors.email)}
          type="email"
          name="email"
          placeholder={text.emailPlaceholder}
          value={form.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          disabled={isLoading}
        />
        {errors.email && (
          <p className={styles.contactForm__fieldError}>{errors.email}</p>
        )}
      </div>
      <div className={styles.contactForm__group}>
        <textarea
          className={`${fieldClass(!!errors.message)} ${styles['contactForm__field--textarea']}`}
          name="message"
          placeholder={text.messagePlaceholder}
          value={form.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          disabled={isLoading}
        />
        {errors.message && (
          <p className={styles.contactForm__fieldError}>{errors.message}</p>
        )}
      </div>
      <button
        className={styles.contactForm__submit}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? text.submitLoading : text.submitIdle}
      </button>
      {status === 'success' && (
        <p
          className={`${styles.contactForm__feedback} ${styles['contactForm__feedback--success']}`}
        >
          {text.success}
        </p>
      )}
      {status === 'error' && (
        <p
          className={`${styles.contactForm__feedback} ${styles['contactForm__feedback--error']}`}
        >
          {text.errorServer}
        </p>
      )}
      {status === 'network_error' && (
        <p
          className={`${styles.contactForm__feedback} ${styles['contactForm__feedback--error']}`}
        >
          {text.errorNetwork}
        </p>
      )}
      {status === 'rate_limited' && (
        <p
          className={`${styles.contactForm__feedback} ${styles['contactForm__feedback--error']}`}
        >
          {text.errorRateLimit}
        </p>
      )}
    </form>
  );
}
