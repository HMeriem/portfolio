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

export interface CareerCardProps {
  experience: Experience;
}
