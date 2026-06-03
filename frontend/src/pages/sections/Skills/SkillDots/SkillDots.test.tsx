import { render } from '@testing-library/react';
import SkillDots from './SkillDots';

describe('SkillDots', () => {
  it('renders 5 dots by default', () => {
    const { container } = render(<SkillDots level={3} />);
    const dots = container.querySelectorAll('[data-filled]');
    expect(dots).toHaveLength(5);
  });

  it('renders the correct number of filled dots', () => {
    const { container } = render(<SkillDots level={4} />);
    expect(container.querySelectorAll('[data-filled="true"]')).toHaveLength(4);
    expect(container.querySelectorAll('[data-filled="false"]')).toHaveLength(1);
  });

  it('renders all dots filled when level equals max', () => {
    const { container } = render(<SkillDots level={5} />);
    expect(container.querySelectorAll('[data-filled="true"]')).toHaveLength(5);
    expect(container.querySelectorAll('[data-filled="false"]')).toHaveLength(0);
  });

  it('renders all dots empty when level is 0', () => {
    const { container } = render(<SkillDots level={0} />);
    expect(container.querySelectorAll('[data-filled="true"]')).toHaveLength(0);
    expect(container.querySelectorAll('[data-filled="false"]')).toHaveLength(5);
  });

  it('respects a custom max prop', () => {
    const { container } = render(<SkillDots level={2} max={3} />);
    const dots = container.querySelectorAll('[data-filled]');
    expect(dots).toHaveLength(3);
    expect(container.querySelectorAll('[data-filled="true"]')).toHaveLength(2);
  });

  it('is hidden from assistive technologies', () => {
    const { container } = render(<SkillDots level={3} />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
