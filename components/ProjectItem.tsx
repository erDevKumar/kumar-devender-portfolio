'use client';

import { Project } from '@/types/portfolio';
import { Code } from 'lucide-react';
import Collapsible from '@/components/Collapsible';
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
        <div className="flex items-center gap-3 flex-1">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-2xl shadow-lg">
            <Code className="h-5 w-5 text-white" />
          </div>
          <h4 className="text-lg font-bold text-gray-900">{project.name}</h4>
        </div>
      }
    >
      <p className="text-sm text-gray-700/90 mb-4 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, idx) => (
          <span key={idx} className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 font-semibold text-xs px-3 py-1.5 rounded-full border border-emerald-200/50 shadow-sm">
            {tech}
          </span>
        ))}
      </div>
    </Collapsible>
  );
}

