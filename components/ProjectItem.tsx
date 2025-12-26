'use client';

import { Project } from '@/types/portfolio';
import { Code, Building2 } from 'lucide-react';
import { useItemScrollAnimation } from '@/hooks/useItemScrollAnimation';

interface ProjectItemProps {
  project: Project;
  index: number;
  isHighlighted?: boolean;
  relatedCompany?: string | null;
  onClick?: () => void;
}

export default function ProjectItem({ project, index, isHighlighted = false, relatedCompany, onClick }: ProjectItemProps) {
  const { ref, isVisible } = useItemScrollAnimation(index, 0);

  return (
    <div 
      ref={ref} 
      className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}
      onClick={onClick}
    >
      <div className={`glass-card rounded-3xl p-6 md:p-8 hover:shadow-soft-lg transition-all duration-500 border shadow-soft-lg card-hover cursor-pointer ${
        isHighlighted 
          ? 'border-emerald-400 ring-4 ring-emerald-400/50 shadow-2xl scale-[1.02] bg-emerald-50/30' 
          : 'border-emerald-200/40'
      }`}>
        {/* Project Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-xl flex-shrink-0">
            <Code className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{project.name}</h4>
            {relatedCompany && (
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <Building2 className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">{relatedCompany}</span>
              </div>
            )}
          </div>
        </div>

        {/* Project Description - Always Visible */}
        <p className="text-sm md:text-base text-gray-700/90 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies - Always Visible */}
        <div className="flex flex-wrap gap-2.5">
          {project.technologies.map((tech, idx) => (
            <span 
              key={idx} 
              className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 font-semibold text-xs md:text-sm px-4 py-2 rounded-full border border-emerald-200/50 shadow-soft hover:shadow-md hover:scale-105 transition-all duration-300 focus-visible-ring"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

