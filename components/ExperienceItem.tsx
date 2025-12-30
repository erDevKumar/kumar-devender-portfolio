'use client';

import { WorkExperience, Project } from '@/types/portfolio';
import { Calendar, MapPin, Briefcase, ExternalLink, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import CompanyLogo from '@/components/CompanyLogo';
import ScrollAnimated from '@/components/ScrollAnimated';
import MetaBadge from '@/components/MetaBadge';
import { useExpandable } from '@/hooks/useExpandable';
import { ICON_FILTER_STYLE } from '@/utils/helpers';
import ProjectItem from './ProjectItem';

interface ExperienceItemProps {
  exp: WorkExperience;
  index: number;
  relatedProjects?: Project[];
}

export default function ExperienceItem({ exp, index, relatedProjects = [] }: ExperienceItemProps) {
  const { isExpanded, toggle } = useExpandable<number>();
  const expanded = isExpanded(index);

  return (
    <ScrollAnimated index={index}>
      <div 
        className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
        onClick={() => toggle(index)}
      >
        {/* Gradient Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        
        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start gap-3 sm:gap-5 w-full">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <CompanyLogo
                  logo={exp.companyInfo?.logo}
                  companyName={exp.company}
                  size="lg"
                  className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                />
                {exp.current && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse">
                    <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors break-words">
                      {exp.role}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 flex-wrap">
                    <h5 className="text-base sm:text-lg font-semibold text-gray-200 break-words">{exp.company}</h5>
                    {exp.companyInfo?.website && (
                      <a 
                        href={exp.companyInfo.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()} 
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm flex-shrink-0"
                      >
                        <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="hidden sm:inline">Website</span>
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Expand/Collapse Indicator */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {relatedProjects.length > 0 && (
                    <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1 sm:gap-1.5">
                      <img src="/icons/ic_projects.svg" alt="Projects" className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ filter: ICON_FILTER_STYLE }} />
                      <span>{relatedProjects.length}</span>
                    </div>
                  )}
                  {exp.current && (
                    <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30 flex items-center gap-1 sm:gap-1.5">
                      <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span className="hidden sm:inline">Current</span>
                    </div>
                  )}
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gray-700/50 text-gray-300 group-hover:bg-blue-500/20 group-hover:text-blue-400 group-hover:border-blue-500/50 border border-gray-600/50 transition-all duration-200">
                    {expanded ? (
                      <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <MetaBadge icon={Calendar} text={exp.duration} iconColor="text-blue-400" />
                {exp.location && <MetaBadge icon={MapPin} text={exp.location} iconColor="text-purple-400" />}
              </div>
            </div>
          </div>

          {/* Collapsible Content */}
          <div
            className="grid grid-rows-transition mt-4 sm:mt-6"
            style={{
              gridTemplateRows: expanded ? '1fr' : '0fr',
            }}
          >
            <div className="overflow-hidden min-h-0">
              <div className="pt-4 sm:pt-6 border-t border-gray-700/50">
                {/* Description */}
                <div className="mb-4 sm:mb-6">
                  <h5 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">Key Responsibilities & Achievements</h5>
                  <ul className="space-y-2 sm:space-y-3">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3 group/item">
                        <div className="flex-shrink-0 mt-1.5">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 group-hover/item:scale-125 transition-transform duration-200"></div>
                        </div>
                        <span className="text-sm sm:text-base text-gray-200 leading-relaxed flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700/50">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                      <img src="/icons/ic_projects.svg" alt="Projects" className="h-4 w-4 sm:h-5 sm:w-5" style={{ filter: ICON_FILTER_STYLE }} />
                      <h5 className="text-base sm:text-lg font-bold text-white">Related Projects</h5>
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {relatedProjects.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {relatedProjects.map((project, projIdx) => (
                        <div key={`proj-${index}-${projIdx}`} onClick={(e) => e.stopPropagation()}>
                          <ProjectItem project={project} index={projIdx} />
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
    </ScrollAnimated>
  );
}
