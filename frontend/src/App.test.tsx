import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the page without crashing', () => {
    render(<App />);
    expect(screen.getByText('Meriem Hammouya')).toBeInTheDocument();
  });

  it('provides the language context to children', () => {
    render(<App />);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });
});
