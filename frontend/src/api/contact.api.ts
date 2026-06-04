import { post } from './http';
import type { ContactFormData } from '@/pages/sections/Contact/ContactForm/ContactForm.types';

export function sendContactMessage(data: ContactFormData): Promise<void> {
  return post('/api/contact', data);
}
