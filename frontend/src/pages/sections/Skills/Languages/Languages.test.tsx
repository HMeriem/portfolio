import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils';
import Languages from './Languages';
import { languages } from './Languages.data';

describe('Languages', () => {
  it('renders the category title', () => {
    renderWithProviders(<Languages />);
    expect(
      screen.getByRole('heading', { name: 'Langages' }),
    ).toBeInTheDocument();
  });

  it('renders all language entries', () => {
    renderWithProviders(<Languages />);
    languages.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('renders the correct number of items', () => {
    renderWithProviders(<Languages />);
    expect(screen.getAllByRole('listitem')).toHaveLength(languages.length);
  });
});
