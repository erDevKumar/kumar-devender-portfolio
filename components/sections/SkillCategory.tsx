'use client';

import { Skill } from '@/types/portfolio';
import { Code, Users, Globe, Wrench, LucideIcon } from 'lucide-react';
import Collapsible from '../common/Collapsible';
import { useExpandable } from '@/hooks/useExpandable';
import { CATEGORY_LABELS, PROFICIENCY_COLORS } from '@/utils/constants';
import { getTechIcon } from '@/utils/helpers';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  technical: Code,
  soft: Users,
  language: Globe,
  tool: Wrench,
};

interface SkillCategoryProps {
  category: string;
  skills: Skill[];
}

export default function SkillCategory({ category, skills }: SkillCategoryProps) {
  const { isExpanded, toggle } = useExpandable<string>();
  const Icon = CATEGORY_ICONS[category] || Code;

  return (
    <Collapsible
      isExpanded={isExpanded(category)}
      onToggle={() => toggle(category)}
      className="hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
      header={
        <div className="flex items-center gap-3 flex-1">
          <div className="bg-gradient-to-br from-teal-100 to-emerald-100 p-2.5 rounded-2xl shadow-md">
            <Icon className="h-5 w-5 text-teal-600" />
          </div>
          <h4 className="text-lg font-bold text-gray-900">{CATEGORY_LABELS[category] || category}</h4>
          <span className="bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
            {skills.length}
          </span>
        </div>
      }
    >
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => {
          const techIcon = getTechIcon(skill.name);
          return (
            <div key={idx} className="flex items-center gap-2 bg-gradient-to-r from-teal-50 to-emerald-50 px-3 py-2 rounded-2xl border border-teal-100/50">
              {techIcon && <img src={techIcon} alt={skill.name} className="h-4 w-4 object-contain" />}
              <span className="text-sm font-medium text-gray-900">{skill.name}</span>
              {skill.proficiency && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${PROFICIENCY_COLORS[skill.proficiency]}`}>
                  {skill.proficiency}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Collapsible>
  );
}

