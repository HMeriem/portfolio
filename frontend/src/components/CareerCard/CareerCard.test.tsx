import { render, screen } from '@testing-library/react';
import CareerCard from './CareerCard';
import type { Experience } from './CareerCard.types';

const mockExperience: Experience = {
  period: "2024 — aujourd'hui",
  title: 'Lead développeuse TS / Python',
  company: 'Ergonova',
  description: [
    { text: 'Planification et pilotage du projet.' },
    {
      text: 'Modernisation des outils :',
      subItems: ['Choix des technologies', 'Réalisation de tests'],
    },
  ],
};

describe('CareerCard', () => {
  it('renders the period', () => {
    render(<CareerCard experience={mockExperience} />);
    expect(screen.getByText("2024 — aujourd'hui")).toBeInTheDocument();
  });

  it('renders the job title', () => {
    render(<CareerCard experience={mockExperience} />);
    expect(
      screen.getByText('Lead développeuse TS / Python'),
    ).toBeInTheDocument();
  });

  it('renders the company name', () => {
    render(<CareerCard experience={mockExperience} />);
    expect(screen.getByText('Ergonova')).toBeInTheDocument();
  });

  it('renders top-level description items', () => {
    render(<CareerCard experience={mockExperience} />);
    expect(
      screen.getByText('Planification et pilotage du projet.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Modernisation des outils :')).toBeInTheDocument();
  });

  it('renders sub-items when present', () => {
    render(<CareerCard experience={mockExperience} />);
    expect(screen.getByText('Choix des technologies')).toBeInTheDocument();
    expect(screen.getByText('Réalisation de tests')).toBeInTheDocument();
  });

  it('renders as an article element', () => {
    render(<CareerCard experience={mockExperience} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('does not render sub-list when no subItems', () => {
    const simple: Experience = {
      ...mockExperience,
      description: [{ text: 'Simple item.' }],
    };
    render(<CareerCard experience={simple} />);
    expect(screen.getAllByRole('list')).toHaveLength(1);
  });
});
