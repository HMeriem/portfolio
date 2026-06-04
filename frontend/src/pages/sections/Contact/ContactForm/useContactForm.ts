import { useState } from 'react';
import type {
  ContactFormData,
  FormErrors,
  FormStatus,
} from './ContactForm.types';
import { sendContactMessage } from '@/api/contact.api';
import { HttpError, NetworkError } from '@/api/http';

const empty: ContactFormData = { name: '', email: '', message: '' };

function validate(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) {
    errors.name = 'Veuillez indiquer votre nom.';
  }
  if (!data.email.trim()) {
    errors.email = 'Veuillez indiquer votre adresse email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Adresse email invalide.';
  }
  if (!data.message.trim()) {
    errors.message = 'Veuillez écrire votre message.';
  }
  return errors;
}

export function useContactForm() {
  const [form, setForm] = useState<ContactFormData>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const isLoading = status === 'loading';

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus('loading');
    try {
      await sendContactMessage(form);
      setStatus('success');
      setForm(empty);
    } catch (err) {
      if (err instanceof NetworkError) {
        console.error('[contact] Network failure', err.cause);
        setStatus('network_error');
      } else if (err instanceof HttpError) {
        console.error('[contact] Server error', {
          status: err.status,
          body: err.responseBody,
        });
        setStatus(err.status === 429 ? 'rate_limited' : 'error');
      } else {
        console.error('[contact] Unexpected error', err);
        setStatus('error');
      }
    }
  }

  return { form, errors, status, isLoading, handleChange, handleSubmit };
}
