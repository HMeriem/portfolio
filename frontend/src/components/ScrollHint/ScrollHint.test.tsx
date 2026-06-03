import { render } from '@testing-library/react';
import ScrollHint from './ScrollHint';

describe('ScrollHint', () => {
  it('renders the hint element', () => {
    const { container } = render(<ScrollHint />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('is hidden from assistive technologies', () => {
    const { container } = render(<ScrollHint />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the chevron element', () => {
    const { container } = render(<ScrollHint />);
    expect(container.querySelector('span')).toBeInTheDocument();
  });
});
