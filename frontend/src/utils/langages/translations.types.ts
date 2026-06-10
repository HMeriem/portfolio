export type Language = 'fr' | 'en';

export interface DescriptionItem {
  text: string;
  subItems?: string[];
}

export interface Experience {
  period: string;
  title: string;
  company: string;
  description: DescriptionItem[];
}

export interface Translations {
  header: {
    skills: string;
    career: string;
    contact: string;
    langToggle: string;
  };
  theme: {
    dark: string;
    light: string;
    ariaLabel: string;
  };
  identity: {
    availability: string;
    jobTitle: string;
    contractTypes: string;
    cvButton: string;
    cvPath: string;
    cvDownloadName: string;
  };
  presentation: {
    bio: string;
    stats: readonly { value: string; label: string }[];
  };
  skills: {
    sectionTitle: string;
    languages: string;
    frameworks: string;
    tools: string;
  };
  career: {
    sectionTitle: string;
    entries: Experience[];
  };
  contact: {
    sectionTitle: string;
    tagline: string;
    links: {
      email: string;
      github: string;
      linkedin: string;
      location: string;
    };
    form: {
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submitIdle: string;
      submitLoading: string;
      success: string;
      errorServer: string;
      errorNetwork: string;
      errorRateLimit: string;
      validationName: string;
      validationEmail: string;
      validationEmailFormat: string;
      validationMessage: string;
    };
  };
}
