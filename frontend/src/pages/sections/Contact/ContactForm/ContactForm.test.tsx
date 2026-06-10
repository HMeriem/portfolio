import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test-utils';
import ContactForm from './ContactForm';
import { sendContactMessage } from '@/api/contact.api';
import { HttpError, NetworkError } from '@/api/http';

vi.mock('@/api/contact.api');

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders name, email, and message fields', () => {
    renderWithProviders(<ContactForm />);
    expect(screen.getByPlaceholderText('Nom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Message...')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderWithProviders(<ContactForm />);
    expect(
      screen.getByRole('button', { name: /Envoyer/i }),
    ).toBeInTheDocument();
  });

  describe('field validation', () => {
    it('shows all three errors when submitting an empty form', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ContactForm />);
      await user.click(screen.getByRole('button', { name: /Envoyer/i }));
      expect(
        screen.getByText('Veuillez indiquer votre nom.'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Veuillez indiquer votre adresse email.'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Veuillez écrire votre message.'),
      ).toBeInTheDocument();
    });

    it('marks invalid fields with aria-invalid', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ContactForm />);
      await user.click(screen.getByRole('button', { name: /Envoyer/i }));
      expect(screen.getByPlaceholderText('Nom')).toHaveAttribute(
        'aria-invalid',
        'true',
      );
      expect(screen.getByPlaceholderText('Email')).toHaveAttribute(
        'aria-invalid',
        'true',
      );
      expect(screen.getByPlaceholderText('Message...')).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });

    it('shows email format error for a malformed email', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ContactForm />);
      await user.type(screen.getByPlaceholderText('Nom'), 'Alice');
      await user.type(screen.getByPlaceholderText('Email'), 'not-an-email');
      await user.type(screen.getByPlaceholderText('Message...'), 'Hello!');
      await user.click(screen.getByRole('button', { name: /Envoyer/i }));
      expect(screen.getByText('Adresse email invalide.')).toBeInTheDocument();
    });

    it('clears the name error when the user types in the name field', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ContactForm />);
      await user.click(screen.getByRole('button', { name: /Envoyer/i }));
      expect(
        screen.getByText('Veuillez indiquer votre nom.'),
      ).toBeInTheDocument();
      await user.type(screen.getByPlaceholderText('Nom'), 'A');
      expect(
        screen.queryByText('Veuillez indiquer votre nom.'),
      ).not.toBeInTheDocument();
    });

    it('does not call the API when validation fails', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ContactForm />);
      await user.click(screen.getByRole('button', { name: /Envoyer/i }));
      expect(sendContactMessage).not.toHaveBeenCalled();
    });
  });

  describe('submission feedback', () => {
    async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
      await user.type(screen.getByPlaceholderText('Nom'), 'Alice');
      await user.type(
        screen.getByPlaceholderText('Email'),
        'alice@example.com',
      );
      await user.type(screen.getByPlaceholderText('Message...'), 'Hello!');
      await user.click(screen.getByRole('button', { name: /Envoyer/i }));
    }

    it('shows success message after a successful submission', async () => {
      vi.mocked(sendContactMessage).mockResolvedValue(undefined);
      const user = userEvent.setup();
      renderWithProviders(<ContactForm />);
      await fillAndSubmit(user);
      expect(
        screen.getByText('Message envoyé avec succès.'),
      ).toBeInTheDocument();
    });

    it('resets all fields after a successful submission', async () => {
      vi.mocked(sendContactMessage).mockResolvedValue(undefined);
      const user = userEvent.setup();
      renderWithProviders(<ContactForm />);
      await fillAndSubmit(user);
      expect(screen.getByPlaceholderText('Nom')).toHaveValue('');
      expect(screen.getByPlaceholderText('Email')).toHaveValue('');
      expect(screen.getByPlaceholderText('Message...')).toHaveValue('');
    });

    it('shows server error message on HttpError 500', async () => {
      vi.mocked(sendContactMessage).mockRejectedValue(
        new HttpError(500, 'Internal Server Error', ''),
      );
      const user = userEvent.setup();
      renderWithProviders(<ContactForm />);
      await fillAndSubmit(user);
      expect(
        screen.getByText(
          'Une erreur est survenue côté serveur. Réessayez plus tard.',
        ),
      ).toBeInTheDocument();
    });

    it('shows network error message on NetworkError', async () => {
      vi.mocked(sendContactMessage).mockRejectedValue(
        new NetworkError(new Error('fail')),
      );
      const user = userEvent.setup();
      renderWithProviders(<ContactForm />);
      await fillAndSubmit(user);
      expect(
        screen.getByText(
          'Impossible de joindre le serveur. Vérifiez votre connexion internet.',
        ),
      ).toBeInTheDocument();
    });

    it('shows rate limit message on 429 error', async () => {
      vi.mocked(sendContactMessage).mockRejectedValue(
        new HttpError(429, 'Too Many Requests', ''),
      );
      const user = userEvent.setup();
      renderWithProviders(<ContactForm />);
      await fillAndSubmit(user);
      expect(
        screen.getByText(/Vous avez atteint la limite/),
      ).toBeInTheDocument();
    });
  });
});
