import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils';
import Career from './Career';
import { fr } from '@/utils/langages/fr';

const { entries } = fr.career;

describe('Career', () => {
  it('renders the section title', () => {
    renderWithProviders(<Career />);
    expect(screen.getByText('Parcours')).toBeInTheDocument();
  });

  it('renders the section index', () => {
    renderWithProviders(<Career />);
    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('renders all experience cards', () => {
    renderWithProviders(<Career />);
    expect(screen.getAllByRole('article')).toHaveLength(entries.length);
  });

  it('renders each company name', () => {
    renderWithProviders(<Career />);
    entries.forEach(({ company }) => {
      expect(screen.getByText(company)).toBeInTheDocument();
    });
  });

  it('renders job titles', () => {
    renderWithProviders(<Career />);
    expect(
      screen.getByText('Lead développeuse TS / Python'),
    ).toBeInTheDocument();
    expect(screen.getByText('Développeuse JavaScript')).toBeInTheDocument();
    expect(screen.getAllByText('Développeuse Full-stack')).toHaveLength(2);
  });

  it('renders each period', () => {
    renderWithProviders(<Career />);
    entries.forEach(({ period }) => {
      expect(screen.getByText(period)).toBeInTheDocument();
    });
  });
});
