'use client';

import { WorkExperience, Project } from '@/types/portfolio';
import { Calendar, MapPin, Briefcase, ExternalLink, Code, ChevronDown, ChevronUp } from 'lucide-react';
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
        className="glass-card-dark rounded-3xl p-6 md:p-8 hover:shadow-tech-lg transition-all duration-500 border border-cyan-500/30 shadow-tech card-hover code-border cursor-pointer hover:-translate-y-2 hover:scale-[1.02]"
        onClick={() => toggle(index)}
      >
        {/* Clickable Header - Entire area is clickable */}
        <div className="flex items-start gap-4 w-full group">
          <CompanyLogo
            logo={exp.companyInfo?.logo}
            companyName={exp.company}
            size="lg"
            className="flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-3">
              <Briefcase className="h-5 w-5 text-cyan-400 flex-shrink-0" />
              <h4 className="text-lg md:text-xl font-bold text-gray-100">{exp.role}</h4>
            </div>
            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
              <h5 className="text-base md:text-lg font-semibold gradient-text-tech">{exp.company}</h5>
              {relatedProjects.length > 0 && (
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-3 py-1.5 rounded-full border border-cyan-500/30 shadow-soft">
                  <Code className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-xs font-semibold text-cyan-300">{relatedProjects.length} Project{relatedProjects.length > 1 ? 's' : ''}</span>
                </div>
              )}
              {exp.companyInfo?.website && (
                <a 
                  href={exp.companyInfo.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={(e) => e.stopPropagation()} 
                  className="hover:scale-110 transition-transform p-1 rounded-lg hover:bg-cyan-500/10"
                >
                  <ExternalLink className="h-4 w-4 text-cyan-400 hover:text-cyan-300" />
                </a>
              )}
              {exp.current && (
                <span className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 text-xs md:text-sm font-bold px-3 py-1.5 rounded-full border border-cyan-500/30 shadow-soft">
                  Current
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm md:text-base text-gray-300 flex-wrap">
              <div className="flex items-center gap-2 bg-gradient-to-r from-tech-800/50 to-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20 shadow-soft">
                <Calendar className="h-4 w-4 text-cyan-400" />
                <span className="font-semibold">{exp.duration}</span>
              </div>
              {exp.location && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-tech-800/50 to-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20 shadow-soft">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="font-semibold">{exp.location}</span>
                </div>
              )}
            </div>
          </div>
          {/* Expand/Collapse Indicator */}
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300 border border-cyan-500/30 flex-shrink-0">
            {expanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>

        {/* Collapsible Content - Using CSS Grid for instant expansion */}
        <div
          className="grid grid-rows-transition mt-6"
          style={{
            gridTemplateRows: expanded ? '1fr' : '0fr',
          }}
        >
          <div className="overflow-hidden min-h-0">
            <div className="pt-2">
              {exp.companyInfo?.description && (
                <p className="text-sm md:text-base text-gray-300/90 mb-6 italic border-l-4 border-cyan-500/60 pl-5 pr-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 py-3 rounded-r-xl shadow-soft">
                  {exp.companyInfo.description}
                </p>
              )}
              
              <ul className="list-none space-y-3 text-sm md:text-base text-gray-300/90 mb-6">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="leading-relaxed flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mt-2"></span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Projects Section */}
              {relatedProjects.length > 0 && (
                <div className="mt-6 pt-6 border-t border-cyan-500/30">
                  <h4 className="text-lg md:text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                    <Code className="h-5 w-5 text-cyan-400" />
                    Related Projects
                  </h4>
                  <div className="space-y-4">
                    {relatedProjects.map((project, projIdx) => (
                      <div 
                        key={`proj-${index}-${projIdx}`}
                        className="glass-card-dark rounded-2xl p-5 md:p-6 hover:shadow-tech-lg transition-all duration-500 border border-cyan-500/30 shadow-tech card-hover code-border"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-xl shadow-glow flex-shrink-0">
                            <Code className="h-4 w-4 md:h-5 md:w-5 text-white" />
                          </div>
                          <h5 className="text-base md:text-lg font-bold text-gray-100">{project.name}</h5>
                        </div>
                        <p className="text-sm md:text-base text-gray-300/90 mb-4 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIdx) => (
                            <span 
                              key={techIdx} 
                              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 font-semibold text-xs px-3 py-1.5 rounded-full border border-cyan-500/30 shadow-soft hover:shadow-glow hover:scale-105 transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
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
  );
}
