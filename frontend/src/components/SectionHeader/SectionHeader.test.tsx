import { render, screen } from '@testing-library/react';
import SectionHeader from './SectionHeader';

describe('SectionHeader', () => {
  it('renders the section title', () => {
    render(<SectionHeader title="Compétences" index="01" />);
    expect(screen.getByText('Compétences')).toBeInTheDocument();
  });

  it('renders the section index', () => {
    render(<SectionHeader title="Compétences" index="01" />);
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders different title and index values', () => {
    render(<SectionHeader title="Parcours" index="02" />);
    expect(screen.getByText('Parcours')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
  });
});
