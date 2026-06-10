import { useState } from 'react';
import type {
  ContactFormData,
  FormErrors,
  FormStatus,
} from './ContactForm.types';
import { sendContactMessage } from '@/api/contact.api';
import { HttpError, NetworkError } from '@/api/http';
import { useTranslation } from '@/components/Langages/useTranslation';

const empty: ContactFormData = { name: '', email: '', message: '' };

export function useContactForm() {
  const translation = useTranslation();
  const [form, setForm] = useState<ContactFormData>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const isLoading = status === 'loading';

  function validate(data: ContactFormData): FormErrors {
    const formErrors: FormErrors = {};
    if (!data.name.trim()) {
      formErrors.name = translation.contact.form.validationName;
    }
    if (!data.email.trim()) {
      formErrors.email = translation.contact.form.validationEmail;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
    ) {
      formErrors.email = translation.contact.form.validationEmailFormat;
    }
    if (!data.message.trim()) {
      formErrors.message = translation.contact.form.validationMessage;
    }
    return formErrors;
  }

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

  const text = {
    namePlaceholder: translation.contact.form.namePlaceholder,
    emailPlaceholder: translation.contact.form.emailPlaceholder,
    messagePlaceholder: translation.contact.form.messagePlaceholder,
    submitIdle: translation.contact.form.submitIdle,
    submitLoading: translation.contact.form.submitLoading,
    success: translation.contact.form.success,
    errorServer: translation.contact.form.errorServer,
    errorNetwork: translation.contact.form.errorNetwork,
    errorRateLimit: translation.contact.form.errorRateLimit,
  };

  return { form, errors, status, isLoading, handleChange, handleSubmit, text };
}
