import { render, screen } from '@testing-library/react';
import Identity from './Identity';

describe('Identity', () => {
  it('renders the first name', () => {
    render(<Identity />);
    expect(screen.getByText('Meriem')).toBeInTheDocument();
  });

  it('renders the last name', () => {
    render(<Identity />);
    expect(screen.getByText('Hammouya')).toBeInTheDocument();
  });

  it('renders the availability badge', () => {
    render(<Identity />);
    expect(
      screen.getByText('Disponible pour de nouvelles opportunités'),
    ).toBeInTheDocument();
  });

  it('renders the location', () => {
    render(<Identity />);
    expect(screen.getByText('Marseille | France')).toBeInTheDocument();
  });

  it('renders the CV download link', () => {
    render(<Identity />);
    const link = screen.getByRole('link', { name: /Mon CV/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('download');
  });
});
