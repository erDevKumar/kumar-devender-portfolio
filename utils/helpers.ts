import { TECH_ICONS } from './constants';

export const getTechIcon = (skillName: string): string | null => {
  if (TECH_ICONS[skillName]) return TECH_ICONS[skillName];
  
  const lowerName = skillName.toLowerCase();
  const mappings: Record<string, string> = {
    java: 'Java',
    kotlin: 'Kotlin',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    react: 'React',
    node: 'Node.js',
    python: 'Python',
    git: 'Git',
    docker: 'Docker',
    android: 'Android',
    html: 'HTML',
    css: 'CSS',
  };

  for (const [key, value] of Object.entries(mappings)) {
    if (lowerName.includes(key) && !(key === 'java' && lowerName.includes('javascript'))) {
      return TECH_ICONS[value] || null;
    }
  }
  
  return null;
};

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((acc, item) => {
    const category = String(item[key]);
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

