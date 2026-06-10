import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils';
import Header from './Header';

describe('Header', () => {
  it('renders the full name', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Meriem Hammouya')).toBeInTheDocument();
  });

  it('renders the skills navigation link', () => {
    renderWithProviders(<Header />);
    expect(
      screen.getByRole('link', { name: 'Compétences' }),
    ).toBeInTheDocument();
  });

  it('renders the career navigation link', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Parcours' })).toBeInTheDocument();
  });

  it('renders the contact navigation link', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('renders the theme toggle', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });
});
