import { render, screen } from '@testing-library/react';
import Tools from './Tools';
import { tools } from './Tools.data';

describe('Tools', () => {
  it('renders the category title', () => {
    render(<Tools />);
    expect(
      screen.getByRole('heading', { name: 'Outils & Pratiques' }),
    ).toBeInTheDocument();
  });

  it('renders all tool entries', () => {
    render(<Tools />);
    tools.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('renders the correct number of items', () => {
    render(<Tools />);
    expect(screen.getAllByRole('listitem')).toHaveLength(tools.length);
  });
});
