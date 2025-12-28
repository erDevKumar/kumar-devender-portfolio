'use client';

import { WorkExperience, Project } from '@/types/portfolio';
import { Calendar, MapPin, Briefcase, ExternalLink, Code, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import CompanyLogo from '@/components/CompanyLogo';
import { useExpandable } from '@/hooks/useExpandable';
import { useItemScrollAnimation } from '@/hooks/useItemScrollAnimation';

interface ExperienceItemProps {
  exp: WorkExperience;
  index: number;
  relatedProjects?: Project[];
}

export default function ExperienceItem({ exp, index, relatedProjects = [] }: ExperienceItemProps) {
  const { isExpanded, toggle } = useExpandable<number>();
  const { ref, isVisible } = useItemScrollAnimation(index, 0);
  const expanded = isExpanded(index);

  return (
    <div ref={ref} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
      <div 
        className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
        onClick={() => toggle(index)}
      >
        {/* Gradient Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        
        {/* Content */}
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start gap-5 w-full">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <CompanyLogo
                  logo={exp.companyInfo?.logo}
                  companyName={exp.company}
                  size="lg"
                  className="w-16 h-16 lg:w-20 lg:h-20"
                />
                {exp.current && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse">
                    <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    <h4 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {exp.role}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h5 className="text-lg font-semibold text-gray-200">{exp.company}</h5>
                    {exp.companyInfo?.website && (
                      <a 
                        href={exp.companyInfo.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()} 
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Expand/Collapse Indicator */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {relatedProjects.length > 0 && (
                    <div className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                      <img src="/icons/ic_projects.svg" alt="Projects" className="h-3.5 w-3.5" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(96%) saturate(1234%) hue-rotate(199deg) brightness(101%) contrast(101%)' }} />
                      <span>{relatedProjects.length}</span>
                    </div>
                  )}
                  {exp.current && (
                    <div className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Current</span>
                    </div>
                  )}
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-700/50 text-gray-300 group-hover:bg-blue-500/20 group-hover:text-blue-400 group-hover:border-blue-500/50 border border-gray-600/50 transition-all duration-200">
                    {expanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700/50 border border-gray-600/50">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-200 font-medium">{exp.duration}</span>
                </div>
                {exp.location && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700/50 border border-gray-600/50">
                    <MapPin className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-200 font-medium">{exp.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Collapsible Content */}
          <div
            className="grid grid-rows-transition mt-6"
            style={{
              gridTemplateRows: expanded ? '1fr' : '0fr',
            }}
          >
            <div className="overflow-hidden min-h-0">
              <div className="pt-6 border-t border-gray-700/50">
                {/* Description */}
                <div className="mb-6">
                  <h5 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Key Responsibilities & Achievements</h5>
                  <ul className="space-y-3">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 group/item">
                        <div className="flex-shrink-0 mt-1.5">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 group-hover/item:scale-125 transition-transform duration-200"></div>
                        </div>
                        <span className="text-gray-200 leading-relaxed flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-700/50">
                    <div className="flex items-center gap-2 mb-4">
                      <img src="/icons/ic_projects.svg" alt="Projects" className="h-5 w-5" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(96%) saturate(1234%) hue-rotate(199deg) brightness(101%) contrast(101%)' }} />
                      <h5 className="text-lg font-bold text-white">Related Projects</h5>
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {relatedProjects.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {relatedProjects.map((project, projIdx) => (
                        <div 
                          key={`proj-${index}-${projIdx}`}
                          className="group/project rounded-xl p-5 bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 group-hover/project:scale-110 transition-transform duration-200">
                              <img src="/icons/ic_projects.svg" alt="Projects" className="h-4 w-4" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(96%) saturate(1234%) hue-rotate(199deg) brightness(101%) contrast(101%)' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h6 className="text-base font-bold text-white group-hover/project:text-blue-400 transition-colors mb-1">
                                {project.name}
                              </h6>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 4).map((tech, techIdx) => (
                              <span 
                                key={techIdx} 
                                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-700/50 text-gray-400 border border-gray-600/50">
                                +{project.technologies.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
