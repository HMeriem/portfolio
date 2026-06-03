import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the full name', () => {
    render(<Header />);
    expect(screen.getByText('Meriem Hammouya')).toBeInTheDocument();
  });

  it('renders the skills navigation link', () => {
    render(<Header />);
    expect(
      screen.getByRole('link', { name: 'Compétences' }),
    ).toBeInTheDocument();
  });

  it('renders the career navigation link', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Parcours' })).toBeInTheDocument();
  });

  it('renders the contact navigation link', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('renders the theme toggle', () => {
    render(<Header />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });
});
