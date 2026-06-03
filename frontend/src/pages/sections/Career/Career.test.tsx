import { render, screen } from '@testing-library/react';
import Career from './Career';
import { experiences } from './experiences.data';

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
    expect(screen.getAllByRole('article')).toHaveLength(experiences.length);
  });

  it('renders each company name', () => {
    render(<Career />);
    experiences.forEach(({ company }) => {
      expect(screen.getByText(company)).toBeInTheDocument();
    });
  });

  it('renders the correct number of job titles', () => {
    render(<Career />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      experiences.length,
    );
  });

  it('renders each period', () => {
    render(<Career />);
    experiences.forEach(({ period }) => {
      expect(screen.getByText(period)).toBeInTheDocument();
    });
  });
});
