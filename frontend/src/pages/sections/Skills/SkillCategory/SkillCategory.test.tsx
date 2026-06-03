import { render, screen } from '@testing-library/react';
import SkillCategory from './SkillCategory';

const mockSkills = [
  { name: 'TypeScript', level: 4 },
  { name: 'JavaScript', level: 3 },
  { name: 'Python', level: 2 },
];

describe('SkillCategory', () => {
  it('renders the category title', () => {
    render(<SkillCategory title="Langages" skills={mockSkills} />);
    expect(screen.getByRole('heading', { name: 'Langages' })).toBeInTheDocument();
  });

  it('renders all skill names', () => {
    render(<SkillCategory title="Langages" skills={mockSkills} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('renders the correct number of skill items', () => {
    render(<SkillCategory title="Langages" skills={mockSkills} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(mockSkills.length);
  });

  it('renders SkillDots for each skill', () => {
    const { container } = render(<SkillCategory title="Langages" skills={mockSkills} />);
    const dotGroups = container.querySelectorAll('[aria-hidden="true"]');
    expect(dotGroups).toHaveLength(mockSkills.length);
  });

  it('renders an empty list when no skills are provided', () => {
    render(<SkillCategory title="Langages" skills={[]} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
