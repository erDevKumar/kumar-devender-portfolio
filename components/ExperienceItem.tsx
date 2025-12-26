'use client';

import { WorkExperience, Project } from '@/types/portfolio';
import { Calendar, MapPin, Briefcase, ExternalLink, Code } from 'lucide-react';
import Collapsible from '@/components/Collapsible';
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

  return (
    <div ref={ref} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
      <Collapsible
      isExpanded={isExpanded(index)}
      onToggle={() => toggle(index)}
      className="hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
      header={
        <div className="flex items-start gap-4 flex-1">
          <CompanyLogo
            logo={exp.companyInfo?.logo}
            companyName={exp.company}
            size="md"
            className="flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-3">
              <Briefcase className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <h4 className="text-lg md:text-xl font-bold text-gray-900">{exp.role}</h4>
            </div>
            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
              <h5 className="text-base md:text-lg font-semibold gradient-text">{exp.company}</h5>
              {relatedProjects.length > 0 && (
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 px-3 py-1.5 rounded-full border border-emerald-200/50 shadow-soft">
                  <Code className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-700">{relatedProjects.length} Project{relatedProjects.length > 1 ? 's' : ''}</span>
                </div>
              )}
              {exp.companyInfo?.website && (
                <a href={exp.companyInfo.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:scale-110 transition-transform p-1 rounded-lg hover:bg-emerald-50">
                  <ExternalLink className="h-4 w-4 text-emerald-600 hover:text-emerald-700" />
                </a>
              )}
              {exp.current && <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs md:text-sm font-bold px-3 py-1.5 rounded-full border border-green-200/50 shadow-soft">Current</span>}
            </div>
            <div className="flex items-center gap-3 text-sm md:text-base text-gray-600 flex-wrap">
              <div className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-emerald-50/50 px-3.5 py-1.5 rounded-full border border-gray-200/50 shadow-soft">
                <Calendar className="h-4 w-4 text-emerald-600" />
                <span className="font-semibold">{exp.duration}</span>
              </div>
              {exp.location && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-teal-50/50 px-3.5 py-1.5 rounded-full border border-gray-200/50 shadow-soft">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <span className="font-semibold">{exp.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    >
      {exp.companyInfo?.description && (
        <p className="text-sm md:text-base text-gray-700/90 mb-6 italic border-l-4 border-emerald-400/60 pl-5 pr-4 bg-gradient-to-r from-emerald-50/60 to-teal-50/60 py-3 rounded-r-xl shadow-soft">
          {exp.companyInfo.description}
        </p>
      )}
      <ul className="list-none space-y-3 text-sm md:text-base text-gray-700/90 mb-6">
        {exp.description.map((item, idx) => (
          <li key={idx} className="leading-relaxed flex items-start gap-3">
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mt-2"></span>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>

      {/* Nested Projects Section */}
      {relatedProjects.length > 0 && (
        <div className="mt-6 pt-6 border-t border-emerald-200/40">
          <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Code className="h-5 w-5 text-emerald-600" />
            Related Projects
          </h4>
          <div className="space-y-4 ml-4 md:ml-6">
            {relatedProjects.map((project, projIdx) => (
              <div 
                key={`proj-${index}-${projIdx}`}
                className="glass-card rounded-2xl p-5 md:p-6 hover:shadow-soft-lg transition-all duration-500 border border-emerald-200/30 shadow-soft card-hover"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl shadow-lg flex-shrink-0">
                    <Code className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <h5 className="text-base md:text-lg font-bold text-gray-900">{project.name}</h5>
                </div>
                <p className="text-sm md:text-base text-gray-700/90 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIdx) => (
                    <span 
                      key={techIdx} 
                      className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 font-semibold text-xs px-3 py-1.5 rounded-full border border-emerald-200/50 shadow-soft hover:shadow-md hover:scale-105 transition-all duration-300"
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
    </Collapsible>
    </div>
  );
}

