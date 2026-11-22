export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  techStack: string[];
  image?: string;
  repositoryUrl?: string;
  demoUrl?: string;
  featured: boolean;
  published: boolean;
  problem?: string;
  solution?: string;
  contributions?: string[];
  architecture?: string;
  results?: string[];
  challenges?: string[];
  tags?: string[];
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    iconName?: string;
  }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  expectedGraduation: string;
  cgpa?: string; // Optional, kept hidden per prompt instructions
  highlights?: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  verificationLink?: string;
  certificateImage?: string;
}

export interface CreativeInterest {
  title: string;
  description: string;
  iconName: string;
  tags: string[];
}

