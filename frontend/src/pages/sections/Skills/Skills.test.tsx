import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils';
import Skills from './Skills';

describe('Skills', () => {
  it('renders the section heading', () => {
    renderWithProviders(<Skills />);
    expect(screen.getByText('Compétences')).toBeInTheDocument();
  });

  it('renders the section index', () => {
    renderWithProviders(<Skills />);
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders the Languages category', () => {
    renderWithProviders(<Skills />);
    expect(
      screen.getByRole('heading', { name: 'Langages' }),
    ).toBeInTheDocument();
  });

  it('renders the Frameworks category', () => {
    renderWithProviders(<Skills />);
    expect(
      screen.getByRole('heading', { name: 'Frameworks' }),
    ).toBeInTheDocument();
  });

  it('renders the Tools category', () => {
    renderWithProviders(<Skills />);
    expect(
      screen.getByRole('heading', { name: 'Outils & Pratiques' }),
    ).toBeInTheDocument();
  });
});
