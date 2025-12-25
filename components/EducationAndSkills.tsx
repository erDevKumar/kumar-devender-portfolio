'use client';

import { Education as EducationType, Skill } from '@/types/portfolio';
import { GraduationCap, Calendar, MapPin, ChevronDown, ChevronUp, Code, Users, Globe, Wrench } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface EducationAndSkillsProps {
  education: EducationType[];
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
  beginner: 'bg-blue-100/80 text-blue-800',
  intermediate: 'bg-amber-100/80 text-amber-800',
  advanced: 'bg-emerald-100/80 text-emerald-800',
  expert: 'bg-purple-100/80 text-purple-800',
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

  if (iconMap[skillName]) return iconMap[skillName];
  
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

export default function EducationAndSkills({ education, skills }: EducationAndSkillsProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [time, setTime] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.02);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Nature-based animated gradient colors (sage to sky)
  const gradient1 = `hsl(${(time * 10 + 160) % 360}, 60%, 90%)`; // Sage green
  const gradient2 = `hsl(${(time * 10 + 200) % 360}, 65%, 92%)`; // Sky blue
  const gradient3 = `hsl(${(time * 10 + 140) % 360}, 55%, 88%)`; // Mint green

  return (
    <section 
      id="education-skills" 
      ref={ref}
      className="py-16 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${gradient1} 0%, ${gradient2} 50%, ${gradient3} 100%)`,
      }}
    >
      {/* Dynamic animated blending background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(76,175,80,0.12),transparent_60%)] animate-pulse-slow"
          style={{ animationDuration: '4s' }}
        ></div>
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl animate-float transition-all duration-700"
          style={{ 
            animationDelay: '1s',
            transform: `translate(${Math.sin(time) * 20}px, ${Math.cos(time) * 20}px)`,
            background: `radial-gradient(circle, hsl(${(time * 10 + 160) % 360}, 70%, 80%) 0%, transparent 70%)`,
            opacity: 0.25
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl animate-float transition-all duration-700"
          style={{ 
            animationDelay: '2s',
            transform: `translate(${Math.cos(time) * -20}px, ${Math.sin(time) * 20}px)`,
            background: `radial-gradient(circle, hsl(${(time * 10 + 200) % 360}, 70%, 80%) 0%, transparent 70%)`,
            opacity: 0.25
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl animate-float transition-all duration-700"
          style={{ 
            animationDelay: '3s',
            transform: `translate(${Math.sin(time * 0.5) * 30}px, ${Math.cos(time * 0.5) * 30}px)`,
            background: `radial-gradient(circle, hsl(${(time * 10 + 140) % 360}, 70%, 80%) 0%, transparent 70%)`,
            opacity: 0.2
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`mb-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Education & Skills</h2>
          <p className="text-gray-600/80">Academic background and technical expertise</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Education */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-2xl shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span>Education</span>
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className={`bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-5 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-white/50 group transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                    style={{ 
                      transitionDelay: `${index * 150}ms`,
                      boxShadow: isVisible ? '0 10px 40px rgba(76,175,80,0.15)' : '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:rotate-6">
                      <GraduationCap className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-1">
                        {edu.degree}
                        {edu.field && <span className="text-gray-600"> in {edu.field}</span>}
                      </h4>
                      <h5 className="text-base font-semibold text-emerald-600 mb-2">
                        {edu.institution}
                      </h5>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600/80 mb-2">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                      <span className="font-medium">{edu.duration}</span>
                    </div>
                    {edu.location && (
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">{edu.location}</span>
                      </div>
                    )}
                  </div>
                  {edu.description && (
                    <p className="text-sm text-gray-700/80 mt-3 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Skills */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-2 rounded-2xl shadow-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span>Skills & Technologies</span>
            </h3>
            <div className="space-y-4">
              {Object.entries(groupedSkills).map(([category, categorySkills], catIndex) => {
                const Icon = categoryIcons[category] || Code;
                const isExpanded = expandedCategories.has(category);
                return (
                  <div
                    key={category}
                    className={`bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-5 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-white/50 cursor-pointer transition-all duration-700 ${
                      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    style={{ 
                      transitionDelay: `${catIndex * 150}ms`,
                      boxShadow: isVisible ? '0 10px 40px rgba(20,184,166,0.15)' : '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  >
                    <button
                      className="w-full flex items-center justify-between mb-4 group"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(category);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-teal-100 to-emerald-100 p-2.5 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:rotate-6">
                          <Icon className="h-5 w-5 text-teal-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {categoryLabels[category] || category}
                        </h4>
                        <span className="bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          {categorySkills.length}
                        </span>
                      </div>
                      <div className="transition-all duration-300 transform group-hover:scale-110 flex items-center gap-2">
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-5 w-5 text-teal-600 group-hover:text-teal-700 transition-colors" />
                            <span className="text-sm font-medium text-teal-600">Less</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-5 w-5 text-teal-600 group-hover:text-teal-700 transition-colors" />
                            <span className="text-sm font-medium text-teal-600">More</span>
                          </>
                        )}
                      </div>
                    </button>
                    
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-wrap gap-2">
                          {categorySkills.map((skill, index) => {
                            const techIcon = getTechIcon(skill.name);
                            return (
                              <div
                                key={index}
                                className="group/skill flex items-center gap-2 bg-gradient-to-r from-teal-50 to-emerald-50 px-3 py-2 rounded-2xl hover:from-teal-100 hover:to-emerald-100 transition-all duration-300 transform hover:scale-110 hover:shadow-md cursor-default border border-teal-100/50"
                              >
                                {techIcon && (
                                  <img
                                    src={techIcon}
                                    alt={skill.name}
                                    className="h-4 w-4 object-contain transition-transform duration-300 group-hover/skill:scale-125"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                )}
                                <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                                {skill.proficiency && (
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full font-semibold shadow-sm ${proficiencyColors[skill.proficiency]}`}
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
        </div>
      </div>
    </section>
  );
}

