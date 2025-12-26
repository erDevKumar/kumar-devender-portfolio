'use client';

import { Skill } from '@/types/portfolio';
import { Code, Users, Globe, Wrench, LucideIcon } from 'lucide-react';
import Collapsible from '@/components/Collapsible';
import { useExpandable } from '@/hooks/useExpandable';
import { CATEGORY_LABELS, PROFICIENCY_COLORS } from '@/utils/constants';
import { getTechIcon } from '@/utils/helpers';
import { useItemScrollAnimation } from '@/hooks/useItemScrollAnimation';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  technical: Code,
  soft: Users,
  language: Globe,
  tool: Wrench,
};

interface SkillCategoryProps {
  category: string;
  skills: Skill[];
  index: number;
}

export default function SkillCategory({ category, skills, index }: SkillCategoryProps) {
  const { isExpanded, toggle } = useExpandable<string>();
  const Icon = CATEGORY_ICONS[category] || Code;
  const { ref, isVisible } = useItemScrollAnimation(index, 0);

  return (
    <div ref={ref} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
      <Collapsible
      isExpanded={isExpanded(category)}
      onToggle={() => toggle(category)}
      className="hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
      header={
        <div className="flex items-center gap-4 flex-1">
          <div className="bg-gradient-to-br from-teal-100 to-emerald-100 p-3 rounded-2xl shadow-md flex-shrink-0">
            <Icon className="h-5 w-5 md:h-6 md:w-6 text-teal-600" />
          </div>
          <h4 className="text-lg md:text-xl font-bold text-gray-900">{CATEGORY_LABELS[category] || category}</h4>
          <span className="bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 text-xs md:text-sm font-bold px-3.5 py-1.5 rounded-full border border-teal-200/50 shadow-soft">
            {skills.length}
          </span>
        </div>
      }
    >
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => {
          const techIcon = getTechIcon(skill.name);
          return (
            <div key={idx} className="flex items-center gap-2.5 bg-gradient-to-r from-teal-50 to-emerald-50 px-4 py-2.5 rounded-2xl border border-teal-100/50 shadow-soft hover:shadow-md hover:scale-105 transition-all duration-300 card-hover">
              {techIcon && <img src={techIcon} alt={skill.name} className="h-5 w-5 object-contain flex-shrink-0" />}
              <span className="text-sm md:text-base font-semibold text-gray-900">{skill.name}</span>
              {skill.proficiency && (
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${PROFICIENCY_COLORS[skill.proficiency]}`}>
                  {skill.proficiency}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Collapsible>
    </div>
  );
}

