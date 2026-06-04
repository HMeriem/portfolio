import { useState } from 'react';
import type { ContactFormData, FormStatus } from './ContactForm.types';
import { sendContactMessage } from '@/api/contact.api';
import { HttpError, NetworkError } from '@/api/http';

const empty: ContactFormData = { name: '', email: '', message: '' };

export function useContactForm() {
  const [form, setForm] = useState<ContactFormData>(empty);
  const [status, setStatus] = useState<FormStatus>('idle');
  const isLoading = status === 'loading';

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      await sendContactMessage(form);
      setStatus('success');
      setForm(empty);
    } catch (err) {
      if (err instanceof NetworkError) {
        console.error('[contact] Network failure', err.cause);
      } else if (err instanceof HttpError) {
        console.error('[contact] Server error', {
          status: err.status,
          body: err.responseBody,
        });
      } else {
        console.error('[contact] Unexpected error', err);
      }
      setStatus('error');
    }
  }

  return { form, status, isLoading, handleChange, handleSubmit };
}
