'use client';

import { WorkExperience, Project } from '@/types/portfolio';
import { Calendar, MapPin, Briefcase, Building2, ExternalLink, ChevronDown, ChevronUp, Code, Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ExperienceAndProjectsProps {
  experience: WorkExperience[];
  projects: Project[];
}

export default function ExperienceAndProjects({ experience, projects }: ExperienceAndProjectsProps) {
  const [expandedExperience, setExpandedExperience] = useState<Set<number>>(new Set());
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const [time, setTime] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.02);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const toggleExperience = (index: number) => {
    const newExpanded = new Set(expandedExperience);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedExperience(newExpanded);
  };

  const toggleProject = (index: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedProjects(newExpanded);
  };

  // Nature-based animated gradient colors (forest to earth)
  const gradient1 = `hsl(${(time * 10 + 120) % 360}, 60%, 88%)`; // Forest green
  const gradient2 = `hsl(${(time * 10 + 80) % 360}, 55%, 85%)`; // Earth brown
  const gradient3 = `hsl(${(time * 10 + 100) % 360}, 50%, 87%)`; // Moss green

  return (
    <section 
      id="experience-projects" 
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
            background: `radial-gradient(circle, hsl(${(time * 10 + 120) % 360}, 70%, 80%) 0%, transparent 70%)`,
            opacity: 0.25
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl animate-float transition-all duration-700"
          style={{ 
            animationDelay: '2s',
            transform: `translate(${Math.cos(time) * -20}px, ${Math.sin(time) * 20}px)`,
            background: `radial-gradient(circle, hsl(${(time * 10 + 80) % 360}, 70%, 80%) 0%, transparent 70%)`,
            opacity: 0.25
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl animate-float transition-all duration-700"
          style={{ 
            animationDelay: '3s',
            transform: `translate(${Math.sin(time * 0.5) * 30}px, ${Math.cos(time * 0.5) * 30}px)`,
            background: `radial-gradient(circle, hsl(${(time * 10 + 100) % 360}, 70%, 80%) 0%, transparent 70%)`,
            opacity: 0.2
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`mb-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Experience & Projects</h2>
          <p className="text-gray-600/80">Professional journey and notable work</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Experience */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-2xl shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span>Work Experience</span>
            </h3>
            <div className="space-y-4">
              {experience.map((exp, index) => {
                const isExpanded = expandedExperience.has(index);
                return (
                  <div
                    key={index}
                    className={`bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-5 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-emerald-200/30 group cursor-pointer transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 150}ms`,
                      boxShadow: isVisible ? '0 10px 40px rgba(76,175,80,0.15)' : '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                    onClick={() => toggleExperience(index)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-white/90 border-2 border-emerald-200/70 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
                          {exp.companyInfo?.logo ? (
                            <img
                              src={exp.companyInfo.logo}
                              alt={`${exp.company} logo`}
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const container = target.parentElement;
                                if (container && !container.querySelector('.company-initial')) {
                                  const fallback = document.createElement('div');
                                  fallback.className = 'company-initial text-emerald-600/80 font-bold text-base sm:text-lg';
                                  fallback.textContent = exp.company.charAt(0);
                                  container.appendChild(fallback);
                                }
                              }}
                            />
                          ) : (
                            <div className="text-primary-600/80 font-bold text-base sm:text-lg">
                              {exp.company.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1">
                          <Briefcase className="h-3.5 w-3.5 text-emerald-600/70 flex-shrink-0" />
                          <h4 className="text-base font-bold text-gray-900 truncate">{exp.role}</h4>
                        </div>
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <h5 className="text-sm font-semibold text-emerald-600/80">
                                {exp.company}
                              </h5>
                              {exp.companyInfo?.website && (
                                <a
                                  href={exp.companyInfo.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-emerald-600/70 hover:text-emerald-700 transition-all transform hover:scale-125"
                                  aria-label={`Visit ${exp.company} website`}
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                              {exp.current && (
                                <span className="bg-green-100/80 text-green-800 text-xs font-semibold px-1.5 py-0.5 rounded-full animate-pulse">
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600/80 flex-wrap">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{exp.duration}</span>
                              </div>
                              {exp.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{exp.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExperience(index);
                            }}
                            className="flex-shrink-0 text-emerald-600/70 hover:text-emerald-700 transition-all transform hover:scale-110 flex items-center gap-1"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="h-4 w-4" />
                                <span className="text-xs">Less</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4" />
                                <span className="text-xs">More</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Collapsible Content */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            {exp.companyInfo?.description && (
                              <p className="text-xs text-gray-600/80 mb-2 italic border-l-2 border-emerald-200/50 pl-2 bg-emerald-50/50 py-1 rounded-r">
                                {exp.companyInfo.description}
                              </p>
                            )}
                            
                            {exp.description.length > 0 && (
                              <ul className="list-disc list-inside space-y-1 text-xs text-gray-700/80 pl-1">
                                {exp.description.map((item, idx) => (
                                  <li key={idx} className="hover:text-emerald-600/80 transition-colors duration-200">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Projects */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-2 rounded-2xl shadow-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span>Projects</span>
            </h3>
            <div className="space-y-4">
              {projects.map((project, index) => {
                const isExpanded = expandedProjects.has(index);
                return (
                  <div
                    key={index}
                    className={`bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-5 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-emerald-200/30 group cursor-pointer transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 150}ms`,
                      boxShadow: isVisible ? '0 10px 40px rgba(20,184,166,0.15)' : '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                    onClick={() => toggleProject(index)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="bg-emerald-100/60 p-1.5 rounded-lg group-hover:bg-emerald-200/60 transition-colors">
                          <Code className="h-3.5 w-3.5 text-emerald-600/70" />
                        </div>
                        <h4 className="text-base font-bold text-gray-900 truncate">{project.name}</h4>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        {project.links?.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-600/70 hover:text-primary-600/80 transition-all transform hover:scale-125"
                            aria-label="GitHub repository"
                          >
                            <Github className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {(project.links?.live || project.links?.demo) && (
                          <a
                            href={project.links.live || project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-600/70 hover:text-primary-600/80 transition-all transform hover:scale-125"
                            aria-label="Live demo"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleProject(index);
                          }}
                          className="text-emerald-600/70 hover:text-emerald-700/80 transition-all transform hover:scale-110 flex items-center gap-1"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="h-3.5 w-3.5" />
                              <span className="text-xs">Less</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3.5 w-3.5" />
                              <span className="text-xs">More</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-700/80 mb-2 line-clamp-2">{project.description}</p>
                    
                    <div className="mb-2">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-emerald-100/60 text-emerald-800/80 text-xs font-medium px-1.5 py-0.5 rounded-full hover:bg-emerald-200/80 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs text-gray-500/70 px-1.5 py-0.5">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-xs text-gray-700/80 mb-2 leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="bg-emerald-100/60 text-emerald-800/80 text-xs font-medium px-1.5 py-0.5 rounded-full hover:bg-emerald-200/80 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
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

