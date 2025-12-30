'use client';

import { Project } from '@/types/portfolio';
import ScrollAnimated from './ScrollAnimated';
import { ICON_FILTER_STYLE } from '@/utils/helpers';

interface ProjectItemProps {
  project: Project;
  index: number;
  onClick?: () => void;
}

export default function ProjectItem({ project, index, onClick }: ProjectItemProps) {
  return (
    <ScrollAnimated index={index}>
      <div className="group rounded-xl p-4 sm:p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
            <img src="/icons/ic_projects.svg" alt="Projects" className="h-4 w-4 sm:h-5 sm:w-5" style={{ filter: ICON_FILTER_STYLE }} />
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
    </ScrollAnimated>
  );
}

