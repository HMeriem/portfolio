import { act } from '@testing-library/react';
import { renderHookWithProviders } from '@/test-utils';
import { useContactForm } from './useContactForm';
import { sendContactMessage } from '@/api/contact.api';
import { HttpError, NetworkError } from '@/api/http';

vi.mock('@/api/contact.api');

const change = (name: string, value: string) =>
  ({ target: { name, value } }) as React.ChangeEvent<HTMLInputElement>;

const submit = { preventDefault: vi.fn() } as unknown as React.FormEvent;

describe('useContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initialises with empty form, no errors, and idle status', () => {
    const { result } = renderHookWithProviders(() => useContactForm());
    expect(result.current.form).toEqual({ name: '', email: '', message: '' });
    expect(result.current.errors).toEqual({});
    expect(result.current.status).toBe('idle');
    expect(result.current.isLoading).toBe(false);
  });

  describe('handleChange', () => {
    it('updates the corresponding field value', () => {
      const { result } = renderHookWithProviders(() => useContactForm());
      act(() => {
        result.current.handleChange(change('name', 'Alice'));
      });
      expect(result.current.form.name).toBe('Alice');
    });

    it('clears the error for the changed field', async () => {
      const { result } = renderHookWithProviders(() => useContactForm());
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(result.current.errors.name).toBeTruthy();
      act(() => {
        result.current.handleChange(change('name', 'A'));
      });
      expect(result.current.errors.name).toBeUndefined();
    });

    it('does not clear errors for other fields', async () => {
      const { result } = renderHookWithProviders(() => useContactForm());
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      act(() => {
        result.current.handleChange(change('name', 'Alice'));
      });
      expect(result.current.errors.email).toBeTruthy();
      expect(result.current.errors.message).toBeTruthy();
    });
  });

  describe('validation', () => {
    it('sets name error when name is empty', async () => {
      const { result } = renderHookWithProviders(() => useContactForm());
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(result.current.errors.name).toBe('Veuillez indiquer votre nom.');
    });

    it('sets name error when name is whitespace only', async () => {
      const { result } = renderHookWithProviders(() => useContactForm());
      act(() => {
        result.current.handleChange(change('name', '   '));
      });
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(result.current.errors.name).toBe('Veuillez indiquer votre nom.');
    });

    it('sets email error when email is empty', async () => {
      const { result } = renderHookWithProviders(() => useContactForm());
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(result.current.errors.email).toBe(
        'Veuillez indiquer votre adresse email.',
      );
    });

    it('sets email error when email format is invalid', async () => {
      const { result } = renderHookWithProviders(() => useContactForm());
      act(() => {
        result.current.handleChange(change('name', 'Alice'));
        result.current.handleChange(change('email', 'not-an-email'));
        result.current.handleChange(change('message', 'Hello'));
      });
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(result.current.errors.email).toBe('Adresse email invalide.');
    });

    it('sets message error when message is empty', async () => {
      const { result } = renderHookWithProviders(() => useContactForm());
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(result.current.errors.message).toBe(
        'Veuillez écrire votre message.',
      );
    });

    it('does not call sendContactMessage when validation fails', async () => {
      const { result } = renderHookWithProviders(() => useContactForm());
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(sendContactMessage).not.toHaveBeenCalled();
    });

    it('keeps status idle when validation fails', async () => {
      const { result } = renderHookWithProviders(() => useContactForm());
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(result.current.status).toBe('idle');
    });
  });

  describe('submission with valid data', () => {
    function fillValid(result: { current: ReturnType<typeof useContactForm> }) {
      act(() => {
        result.current.handleChange(change('name', 'Alice'));
        result.current.handleChange(change('email', 'alice@example.com'));
        result.current.handleChange(change('message', 'Hello there!'));
      });
    }

    it('calls sendContactMessage with the form data', async () => {
      vi.mocked(sendContactMessage).mockResolvedValue(undefined);
      const { result } = renderHookWithProviders(() => useContactForm());
      fillValid(result);
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(sendContactMessage).toHaveBeenCalledWith({
        name: 'Alice',
        email: 'alice@example.com',
        message: 'Hello there!',
      });
    });

    it('sets status to success after a successful send', async () => {
      vi.mocked(sendContactMessage).mockResolvedValue(undefined);
      const { result } = renderHookWithProviders(() => useContactForm());
      fillValid(result);
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(result.current.status).toBe('success');
    });

    it('resets the form to empty after success', async () => {
      vi.mocked(sendContactMessage).mockResolvedValue(undefined);
      const { result } = renderHookWithProviders(() => useContactForm());
      fillValid(result);
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(result.current.form).toEqual({ name: '', email: '', message: '' });
    });

    it('sets status to network_error on NetworkError', async () => {
      vi.mocked(sendContactMessage).mockRejectedValue(
        new NetworkError(new Error('fail')),
      );
      const { result } = renderHookWithProviders(() => useContactForm());
      fillValid(result);
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(result.current.status).toBe('network_error');
    });

    it('sets status to rate_limited on 429 HttpError', async () => {
      vi.mocked(sendContactMessage).mockRejectedValue(
        new HttpError(429, 'Too Many Requests', ''),
      );
      const { result } = renderHookWithProviders(() => useContactForm());
      fillValid(result);
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(result.current.status).toBe('rate_limited');
    });

    it('sets status to error on non-429 HttpError', async () => {
      vi.mocked(sendContactMessage).mockRejectedValue(
        new HttpError(500, 'Internal Server Error', ''),
      );
      const { result } = renderHookWithProviders(() => useContactForm());
      fillValid(result);
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(result.current.status).toBe('error');
    });

    it('sets status to error on unexpected error', async () => {
      vi.mocked(sendContactMessage).mockRejectedValue(new Error('unexpected'));
      const { result } = renderHookWithProviders(() => useContactForm());
      fillValid(result);
      await act(async () => {
        await result.current.handleSubmit(submit);
      });
      expect(result.current.status).toBe('error');
    });
  });
});
