export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type FormErrors = Partial<Record<keyof ContactFormData, string>>;

export type FormStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error'
  | 'network_error'
  | 'rate_limited';
