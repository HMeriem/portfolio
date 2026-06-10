import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils';
import Frameworks from './Frameworks';
import { frameworks } from './Frameworks.data';

describe('Frameworks', () => {
  it('renders the category title', () => {
    renderWithProviders(<Frameworks />);
    expect(
      screen.getByRole('heading', { name: 'Frameworks' }),
    ).toBeInTheDocument();
  });

  it('renders all framework entries', () => {
    renderWithProviders(<Frameworks />);
    frameworks.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('renders the correct number of items', () => {
    renderWithProviders(<Frameworks />);
    expect(screen.getAllByRole('listitem')).toHaveLength(frameworks.length);
  });
});
