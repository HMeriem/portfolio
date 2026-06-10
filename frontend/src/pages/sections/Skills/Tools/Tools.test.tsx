import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils';
import Tools from './Tools';
import { tools } from './Tools.data';

describe('Tools', () => {
  it('renders the category title', () => {
    renderWithProviders(<Tools />);
    expect(
      screen.getByRole('heading', { name: 'Outils & Pratiques' }),
    ).toBeInTheDocument();
  });

  it('renders all tool entries', () => {
    renderWithProviders(<Tools />);
    tools.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('renders the correct number of items', () => {
    renderWithProviders(<Tools />);
    expect(screen.getAllByRole('listitem')).toHaveLength(tools.length);
  });
});
