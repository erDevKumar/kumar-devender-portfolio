'use client';

import { Project } from '@/types/portfolio';
import { Github, ExternalLink, Code, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set()); // All collapsed by default
  const { ref, isVisible } = useScrollAnimation();

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedProjects(newExpanded);
  };

  return (
    <section 
      id="projects" 
      ref={ref}
      className="py-12 bg-gradient-to-br from-amber-50/60 via-orange-50/50 to-yellow-50/60 relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className={`text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projects.map((project, index) => {
            const isExpanded = expandedProjects.has(index);
            return (
              <div
                key={index}
                className={`bg-white/70 backdrop-blur-sm rounded-lg shadow-sm p-3 hover:shadow-md hover:from-gray-50/90 hover:to-white/90 transition-all duration-300 transform hover:-translate-y-0.5 border border-amber-200/50 group cursor-pointer transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="bg-amber-100/60 p-1.5 rounded-lg group-hover:bg-amber-200/60 transition-colors">
                      <Code className="h-3.5 w-3.5 text-amber-600/70" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 truncate">{project.name}</h3>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-600/70 hover:text-amber-600/80 transition-all transform hover:scale-125"
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
                        className="text-gray-600/70 hover:text-amber-600/80 transition-all transform hover:scale-125"
                        aria-label="Live demo"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(index);
                      }}
                      className="text-amber-600/70 hover:text-amber-700/80 transition-all transform hover:scale-110 flex items-center gap-1"
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
                        className="bg-amber-100/60 text-amber-800/80 text-xs font-medium px-1.5 py-0.5 rounded-full hover:bg-amber-200/80 transition-colors"
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
                          className="bg-amber-100/60 text-amber-800/80 text-xs font-medium px-1.5 py-0.5 rounded-full hover:bg-amber-200/80 transition-colors"
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
    </section>
  );
}
