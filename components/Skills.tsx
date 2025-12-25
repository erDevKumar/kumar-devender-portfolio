'use client';

import { Skill } from '@/types/portfolio';
import { ChevronDown, ChevronUp, Code, Users, Globe, Wrench } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SkillsProps {
  skills: Skill[];
}

const categoryLabels: Record<string, string> = {
  technical: 'Technical Skills',
  soft: 'Soft Skills',
  language: 'Languages',
  tool: 'Tools & Technologies',
};

const categoryIcons: Record<string, any> = {
  technical: Code,
  soft: Users,
  language: Globe,
  tool: Wrench,
};

const proficiencyColors: Record<string, string> = {
  beginner: 'bg-blue-100/70 text-blue-800/80',
  intermediate: 'bg-yellow-100/70 text-yellow-800/80',
  advanced: 'bg-green-100/70 text-green-800/80',
  expert: 'bg-purple-100/70 text-purple-800/80',
};

// Technology icon mapping
const getTechIcon = (skillName: string): string | null => {
  const iconMap: Record<string, string> = {
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'Kotlin': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'Android': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  };

  // Try exact match first
  if (iconMap[skillName]) return iconMap[skillName];
  
  // Try partial matches
  const lowerName = skillName.toLowerCase();
  if (lowerName.includes('java') && !lowerName.includes('javascript')) return iconMap['Java'];
  if (lowerName.includes('kotlin')) return iconMap['Kotlin'];
  if (lowerName.includes('javascript')) return iconMap['JavaScript'];
  if (lowerName.includes('typescript')) return iconMap['TypeScript'];
  if (lowerName.includes('react')) return iconMap['React'];
  if (lowerName.includes('node')) return iconMap['Node.js'];
  if (lowerName.includes('python')) return iconMap['Python'];
  if (lowerName.includes('git')) return iconMap['Git'];
  if (lowerName.includes('docker')) return iconMap['Docker'];
  if (lowerName.includes('android')) return iconMap['Android'];
  if (lowerName.includes('html')) return iconMap['HTML'];
  if (lowerName.includes('css')) return iconMap['CSS'];
  
  return null;
};

export default function Skills({ skills }: SkillsProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set()); // All collapsed by default
  const { ref, isVisible } = useScrollAnimation();
  
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <section 
      id="skills" 
      ref={ref}
      className="py-12 bg-gradient-to-br from-slate-50/80 via-gray-50/60 to-zinc-50/80 relative overflow-hidden"
    >
      {/* Unified theme background pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className={`text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(groupedSkills).map(([category, categorySkills], catIndex) => {
            const Icon = categoryIcons[category] || Code;
            const isExpanded = expandedCategories.has(category);
            return (
              <div
                key={category}
                className={`bg-white/70 backdrop-blur-sm rounded-lg shadow-sm p-3 hover:shadow-md hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-0.5 border border-primary-200/50 cursor-pointer transition-all duration-700 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${catIndex * 100}ms` }}
              >
                <button
                  className="w-full flex items-center justify-between mb-2 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(category);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-primary-100/60 p-1.5 rounded-lg group-hover:bg-primary-200/60 transition-colors">
                      <Icon className="h-3.5 w-3.5 text-primary-600/70" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">
                      {categoryLabels[category] || category}
                    </h3>
                    <span className="text-xs text-gray-500/70 bg-gray-100/60 px-1.5 py-0.5 rounded-full">
                      {categorySkills.length}
                    </span>
                  </div>
                  <div className="transition-transform duration-300 transform group-hover:scale-110 flex items-center gap-1">
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-3.5 w-3.5 text-gray-500/70 group-hover:text-primary-600/80 transition-colors" />
                        <span className="text-xs">Less</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3.5 w-3.5 text-gray-500/70 group-hover:text-primary-600/80 transition-colors" />
                        <span className="text-xs">More</span>
                      </>
                    )}
                  </div>
                </button>
                
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap gap-1.5">
                      {categorySkills.map((skill, index) => {
                        const techIcon = getTechIcon(skill.name);
                        return (
                          <div
                            key={index}
                            className="group/skill flex items-center gap-1.5 bg-gradient-to-r from-primary-50/60 to-primary-100/60 px-2.5 py-1 rounded-full hover:from-primary-100/80 hover:to-primary-200/80 transition-all duration-300 transform hover:scale-105 cursor-default"
                          >
                            {techIcon && (
                              <img
                                src={techIcon}
                                alt={skill.name}
                                className="h-3.5 w-3.5 object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            )}
                            <span className="text-xs text-gray-900 font-medium">{skill.name}</span>
                            {skill.proficiency && (
                              <span
                                className={`text-xs px-1 py-0.5 rounded-full font-semibold ${proficiencyColors[skill.proficiency]}`}
                              >
                                {skill.proficiency}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
