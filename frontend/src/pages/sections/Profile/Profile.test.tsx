import { render, screen } from '@testing-library/react';
import Profile from './Profile';

describe('Profile', () => {
  it('renders the Identity section', () => {
    render(<Profile />);
    expect(screen.getByText('Meriem')).toBeInTheDocument();
    expect(screen.getByText('Hammouya')).toBeInTheDocument();
  });

  it('renders the Presentation section', () => {
    render(<Profile />);
    expect(screen.getByText(/passionnée/)).toBeInTheDocument();
  });

  it('renders both sections together', () => {
    render(<Profile />);
    expect(screen.getByRole('link', { name: /Mon CV/i })).toBeInTheDocument();
    expect(screen.getByText('5+')).toBeInTheDocument();
  });
});
