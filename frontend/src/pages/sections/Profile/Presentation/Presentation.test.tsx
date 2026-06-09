import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils';
import Presentation from './Presentation';

describe('Presentation', () => {
  it('renders the bio text', () => {
    renderWithProviders(<Presentation />);
    expect(screen.getByText(/passionnée/)).toBeInTheDocument();
  });

  it('renders all stat values', () => {
    renderWithProviders(<Presentation />);
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('TS')).toBeInTheDocument();
    expect(screen.getByText('M2')).toBeInTheDocument();
  });

  it('renders all stat labels', () => {
    renderWithProviders(<Presentation />);
    expect(screen.getByText("Ans d'exp.")).toBeInTheDocument();
    expect(screen.getByText('Entreprises')).toBeInTheDocument();
    expect(screen.getByText('Stack principale')).toBeInTheDocument();
    expect(screen.getByText('MIASHS DCISS')).toBeInTheDocument();
  });

  it('renders exactly 4 stat blocks', () => {
    renderWithProviders(<Presentation />);
    const allLabels = [
      "Ans d'exp.",
      'Entreprises',
      'Stack principale',
      'MIASHS DCISS',
    ];
    allLabels.forEach((label) => {
      expect(screen.getAllByText(label)).toHaveLength(1);
    });
  });
});
