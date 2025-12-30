'use client';

import { useMemo } from 'react';
import { WorkExperience, Project } from '@/types/portfolio';
import { Briefcase, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getProjectsForCompany, getCompanyFromProject, ICON_FILTER_STYLE } from '@/utils/helpers';
import ExperienceItem from './ExperienceItem';
import ProjectItem from './ProjectItem';
import SectionHeader from './SectionHeader';
import SectionBackground from './SectionBackground';

export default function ExperienceProjects({ experience, projects }: ExperienceProjectsProps) {
  const { ref } = useScrollAnimation();

  // Get all company names
  const companyNames = useMemo(() => experience.map(exp => exp.company), [experience]);

  // Group projects by company
  const projectsByCompany = useMemo(() => {
    const grouped: Record<string, Project[]> = {};
    experience.forEach(exp => {
      const companyProjects = getProjectsForCompany(exp.company, projects, companyNames);
      if (companyProjects.length > 0) {
        grouped[exp.company] = companyProjects;
      }
    });
    // Add ungrouped projects
    const ungrouped = projects.filter(project => {
      const projectCompany = getCompanyFromProject(project.name, companyNames);
      return !projectCompany;
    });
    if (ungrouped.length > 0) {
      grouped['Other'] = ungrouped;
    }
    return grouped;
  }, [experience, projects, companyNames]);

  return (
    <section id="experience" ref={ref} className="section-padding bg-[#111827] relative overflow-hidden">
      <SectionBackground color1="bg-blue-500" color2="bg-indigo-500" opacity={5} />

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <SectionHeader
          icon={Briefcase}
          title="Work Experience"
          description={`Professional journey and key achievements across ${experience.length} ${experience.length === 1 ? 'role' : 'roles'}`}
        />

        {/* Professional Experience List */}
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
          {experience.map((exp, index) => {
            const companyProjects = projectsByCompany[exp.company] || [];
            return (
              <ExperienceItem 
                key={`exp-${index}`} 
                exp={exp} 
                index={index}
                relatedProjects={companyProjects}
              />
            );
          })}
          
          {/* Show ungrouped projects if any */}
          {projectsByCompany['Other'] && projectsByCompany['Other'].length > 0 && (
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                  <img src="/icons/ic_projects.svg" alt="Projects" className="h-4 w-4 sm:h-5 sm:w-5" style={{ filter: ICON_FILTER_STYLE }} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  Other Projects
                </h3>
                <span className="px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span>{projectsByCompany['Other'].length}</span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {projectsByCompany['Other'].map((project, idx) => (
                  <ProjectItem key={`other-proj-${idx}`} project={project} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
