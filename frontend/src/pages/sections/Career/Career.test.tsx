import { render, screen } from '@testing-library/react';
import Career from './Career';
import { careers } from './career.data';

describe('Career', () => {
  it('renders the section title', () => {
    render(<Career />);
    expect(screen.getByText('Parcours')).toBeInTheDocument();
  });

  it('renders the section index', () => {
    render(<Career />);
    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('renders all experience cards', () => {
    render(<Career />);
    expect(screen.getAllByRole('article')).toHaveLength(careers.length);
  });

  it('renders each company name', () => {
    render(<Career />);
    careers.forEach(({ company }) => {
      expect(screen.getByText(company)).toBeInTheDocument();
    });
  });

  it('renders job titles', () => {
    render(<Career />);
    expect(
      screen.getByText('Lead développeuse TS / Python'),
    ).toBeInTheDocument();
    expect(screen.getByText('Développeuse JavaScript')).toBeInTheDocument();
    expect(screen.getAllByText('Développeuse Full-stack')).toHaveLength(2);
  });

  it('renders each period', () => {
    render(<Career />);
    careers.forEach(({ period }) => {
      expect(screen.getByText(period)).toBeInTheDocument();
    });
  });
});
