import { render, screen } from '@testing-library/react';
import Frameworks from './Frameworks';
import { frameworks } from './Frameworks.data';

describe('Frameworks', () => {
  it('renders the category title', () => {
    render(<Frameworks />);
    expect(
      screen.getByRole('heading', { name: 'Frameworks' }),
    ).toBeInTheDocument();
  });

  it('renders all framework entries', () => {
    render(<Frameworks />);
    frameworks.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('renders the correct number of items', () => {
    render(<Frameworks />);
    expect(screen.getAllByRole('listitem')).toHaveLength(frameworks.length);
  });
});
