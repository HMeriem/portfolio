import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils';
import Identity from './Identity';

describe('Identity', () => {
  it('renders the first name', () => {
    renderWithProviders(<Identity />);
    expect(screen.getByText('Meriem')).toBeInTheDocument();
  });

  it('renders the last name', () => {
    renderWithProviders(<Identity />);
    expect(screen.getByText('Hammouya')).toBeInTheDocument();
  });

  it('renders the availability badge', () => {
    renderWithProviders(<Identity />);
    expect(
      screen.getByText('Disponible pour de nouvelles opportunités'),
    ).toBeInTheDocument();
  });

  it('renders the location', () => {
    renderWithProviders(<Identity />);
    expect(screen.getByText('Marseille | France')).toBeInTheDocument();
  });

  it('renders the CV download link', () => {
    renderWithProviders(<Identity />);
    const link = screen.getByRole('link', { name: /Mon CV/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('download');
  });
});
