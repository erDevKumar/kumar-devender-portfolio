'use client';

import { Project } from '@/types/portfolio';
import { Code } from 'lucide-react';
import Collapsible from '../common/Collapsible';
import { useExpandable } from '@/hooks/useExpandable';

interface ProjectItemProps {
  project: Project;
  index: number;
}

export default function ProjectItem({ project, index }: ProjectItemProps) {
  const { isExpanded, toggle } = useExpandable<number>();

  return (
    <Collapsible
      isExpanded={isExpanded(index)}
      onToggle={() => toggle(index)}
      className="hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
      header={
        <div className="flex items-center gap-2 flex-1">
          <div className="bg-emerald-100/60 p-1.5 rounded-lg">
            <Code className="h-3.5 w-3.5 text-emerald-600/70" />
          </div>
          <h4 className="text-base font-bold text-gray-900">{project.name}</h4>
        </div>
      }
    >
      <p className="text-xs text-gray-700/80 mb-2">{project.description}</p>
      <div className="flex flex-wrap gap-1">
        {project.technologies.map((tech, idx) => (
          <span key={idx} className="bg-emerald-100/60 text-emerald-800/80 text-xs font-medium px-1.5 py-0.5 rounded-full">
            {tech}
          </span>
        ))}
      </div>
    </Collapsible>
  );
}

