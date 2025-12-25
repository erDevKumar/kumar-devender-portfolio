export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  bio: string;
  email?: string;
  phone?: string;
  profileImage?: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string[];
  location?: string;
  companyInfo?: {
    industry?: string;
    founded?: string;
    website?: string;
    description?: string;
    logo?: string;
  };
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  duration: string;
  startDate: string;
  endDate?: string;
  description?: string;
  location?: string;
}

export interface Skill {
  name: string;
  category: 'technical' | 'soft' | 'language' | 'tool';
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
  image?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  socialLinks: SocialLink[];
}

