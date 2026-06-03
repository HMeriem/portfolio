import { render, screen } from '@testing-library/react';
import Languages from './Languages';
import { languages } from './Languages.data';

describe('Languages', () => {
  it('renders the category title', () => {
    render(<Languages />);
    expect(screen.getByRole('heading', { name: 'Langages' })).toBeInTheDocument();
  });

  it('renders all language entries', () => {
    render(<Languages />);
    languages.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('renders the correct number of items', () => {
    render(<Languages />);
    expect(screen.getAllByRole('listitem')).toHaveLength(languages.length);
  });
});
