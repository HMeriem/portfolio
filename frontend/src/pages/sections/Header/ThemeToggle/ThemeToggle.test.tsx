import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test-utils';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders the light label by default', () => {
    renderWithProviders(<ThemeToggle />);
    expect(screen.getByText('Clair')).toBeInTheDocument();
  });

  it('has the switch role', () => {
    renderWithProviders(<ThemeToggle />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    renderWithProviders(<ThemeToggle />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles to dark mode on click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);
    await user.click(screen.getByRole('switch'));
    expect(screen.getByText('Sombre')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('applies dark theme to the document on toggle', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);
    await user.click(screen.getByRole('switch'));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('persists the theme choice to localStorage', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);
    await user.click(screen.getByRole('switch'));
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('restores dark theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark');
    renderWithProviders(<ThemeToggle />);
    expect(screen.getByText('Sombre')).toBeInTheDocument();
  });
});
