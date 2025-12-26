'use client';

import { useMemo } from 'react';
import { WorkExperience, Project } from '@/types/portfolio';
import { Briefcase, Code } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useAnimatedGradient } from '@/hooks/useAnimatedGradient';
import AnimatedBackground from '@/components/AnimatedBackground';
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
  const { time, getGradient } = useAnimatedGradient(120, 10);

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
    <section id="experience" ref={ref} className="section-padding relative overflow-hidden" style={{ background: getGradient(120, 80, 100) }}>
      <AnimatedBackground time={time} hue={(time * 10 + 120) % 360} />
      <div className="max-w-7xl mx-auto container-padding relative z-10">
        {/* Combined Header */}
        <div className="mb-12 md:mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-4 rounded-3xl shadow-2xl">
                <Briefcase className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text">Experience</h2>
            </div>
            <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-emerald-300 to-transparent"></div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-500 p-4 rounded-3xl shadow-2xl">
                <Code className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text">Projects</h2>
            </div>
          </div>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto text-balance">
            Professional journey and innovative projects
          </p>
        </div>

        {/* Single Column Layout - Experience with nested Projects */}
        <div className="max-w-4xl mx-auto space-y-8">
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
            <div className="mt-12 pt-8 border-t border-emerald-200/40">
              <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-6 flex items-center gap-3">
                <div className="bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-500 p-3 rounded-2xl shadow-xl">
                  <Code className="h-6 w-6 text-white" />
                </div>
                Other Projects
              </h3>
              <div className="space-y-6">
                {projectsByCompany['Other'].map((project, idx) => (
                  <div key={`other-proj-${idx}`} className="ml-8 md:ml-12">
                    <div className="glass-card rounded-3xl p-6 md:p-8 hover:shadow-soft-lg transition-all duration-500 border border-emerald-200/40 shadow-soft-lg card-hover">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-xl flex-shrink-0">
                          <Code className="h-5 w-5 md:h-6 md:w-6 text-white" />
                        </div>
                        <h4 className="text-lg md:text-xl font-bold text-gray-900">{project.name}</h4>
                      </div>
                      <p className="text-sm md:text-base text-gray-700/90 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        {project.technologies.map((tech, techIdx) => (
                          <span 
                            key={techIdx} 
                            className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 font-semibold text-xs md:text-sm px-4 py-2 rounded-full border border-emerald-200/50 shadow-soft hover:shadow-md hover:scale-105 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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

