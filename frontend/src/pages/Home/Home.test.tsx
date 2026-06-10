import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test-utils';
import Home from './Home';

describe('Home — integration', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  describe('layout', () => {
    it('renders the header', () => {
      renderWithProviders(<Home />);
      expect(screen.getByText('Meriem Hammouya')).toBeInTheDocument();
    });

    it('renders the profile section', () => {
      renderWithProviders(<Home />);
      const profileSection = document.getElementById('profile');
      expect(profileSection).toBeInTheDocument();
    });

    it('renders the skills section', () => {
      renderWithProviders(<Home />);
      const skillsSection = document.getElementById('skills');
      expect(skillsSection).toBeInTheDocument();
    });

    it('renders the career section', () => {
      renderWithProviders(<Home />);
      const careerSection = document.getElementById('career');
      expect(careerSection).toBeInTheDocument();
    });

    it('renders scroll hints in each section', () => {
      const { container } = renderWithProviders(<Home />);
      const hints = container.querySelectorAll('[aria-hidden="true"]');
      const scrollHints = Array.from(hints).filter(
        (el) => el.tagName === 'DIV' && el.querySelector('span'),
      );
      expect(scrollHints.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('navigation', () => {
    it('the skills nav link points to the skills section', () => {
      renderWithProviders(<Home />);
      const link = screen.getByRole('link', { name: 'Compétences' });
      expect(link).toHaveAttribute('href', '#skills');
    });

    it('the career nav link points to the career section', () => {
      renderWithProviders(<Home />);
      const link = screen.getByRole('link', { name: 'Parcours' });
      expect(link).toHaveAttribute('href', '#career');
    });

    describe('career section content', () => {
      it('displays the section title', () => {
        renderWithProviders(<Home />);
        const careerSection = document.getElementById('career')!;
        expect(within(careerSection).getByText('Parcours')).toBeInTheDocument();
      });

      it('displays all experience cards', () => {
        renderWithProviders(<Home />);
        const careerSection = document.getElementById('career')!;
        expect(within(careerSection).getAllByRole('article')).toHaveLength(4);
      });
    });

    it('the contact nav link points to the contact section', () => {
      renderWithProviders(<Home />);
      const link = screen.getByRole('link', { name: 'Contact' });
      expect(link).toHaveAttribute('href', '#contact');
    });
  });

  describe('profile section content', () => {
    it('displays the full identity', () => {
      renderWithProviders(<Home />);
      const profileSection = document.getElementById('profile')!;
      expect(within(profileSection).getByText('Meriem')).toBeInTheDocument();
      expect(within(profileSection).getByText('Hammouya')).toBeInTheDocument();
    });

    it('displays the CV download link', () => {
      renderWithProviders(<Home />);
      const link = screen.getByRole('link', { name: /Mon CV/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('download');
    });
  });

  describe('skills section content', () => {
    it('displays the three skill categories', () => {
      renderWithProviders(<Home />);
      const skillsSection = document.getElementById('skills')!;
      expect(
        within(skillsSection).getByRole('heading', { name: 'Langages' }),
      ).toBeInTheDocument();
      expect(
        within(skillsSection).getByRole('heading', { name: 'Frameworks' }),
      ).toBeInTheDocument();
      expect(
        within(skillsSection).getByRole('heading', {
          name: 'Outils & Pratiques',
        }),
      ).toBeInTheDocument();
    });
  });

  describe('theme toggle', () => {
    it('switches to dark mode and updates the document attribute', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Home />);
      await user.click(screen.getByRole('switch'));
      expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    });

    it('switches back to light mode on second click', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Home />);
      await user.click(screen.getByRole('switch'));
      await user.click(screen.getByRole('switch'));
      expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    });

    it('persists the theme choice across toggle interactions', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Home />);
      await user.click(screen.getByRole('switch'));
      expect(localStorage.getItem('theme')).toBe('dark');
    });
  });
});
