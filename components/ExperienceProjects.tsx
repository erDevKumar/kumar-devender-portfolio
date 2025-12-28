'use client';

import { useMemo } from 'react';
import { WorkExperience, Project } from '@/types/portfolio';
import { Briefcase, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ExperienceItem from './ExperienceItem';

interface ExperienceProjectsProps {
  experience: WorkExperience[];
  projects: Project[];
}

// Helper function to extract company name from project name
function getCompanyFromProject(projectName: string, companies: string[]): string | null {
  for (const company of companies) {
    if (projectName.toLowerCase().includes(company.toLowerCase())) {
      return company;
    }
  }
  return null;
}

// Helper function to get projects for a company
function getProjectsForCompany(company: string, projects: Project[], allCompanies: string[]): Project[] {
  return projects.filter(project => {
    const projectCompany = getCompanyFromProject(project.name, allCompanies);
    return projectCompany === company;
  });
}

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
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        {/* Enhanced Header */}
        <div className="mb-8 sm:mb-12 lg:mb-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
              <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
              Work Experience
            </h2>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Professional journey and key achievements across {experience.length} {experience.length === 1 ? 'role' : 'roles'}
          </p>
        </div>

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
                  <img src="/icons/ic_projects.svg" alt="Projects" className="h-4 w-4 sm:h-5 sm:w-5" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(96%) saturate(1234%) hue-rotate(199deg) brightness(101%) contrast(101%)' }} />
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
                  <div 
                    key={`other-proj-${idx}`} 
                    className="group rounded-xl p-4 sm:p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <img src="/icons/ic_projects.svg" alt="Projects" className="h-4 w-4 sm:h-5 sm:w-5" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(96%) saturate(1234%) hue-rotate(199deg) brightness(101%) contrast(101%)' }} />
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors break-words">
                        {project.name}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.slice(0, 5).map((tech, techIdx) => (
                        <span 
                          key={techIdx} 
                          className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium bg-gray-700/50 text-gray-400 border border-gray-600/50">
                          +{project.technologies.length - 5}
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
    </section>
  );
}
