'use client';

import { Skill } from '@/types/portfolio';
import { Code, Users, Globe, Wrench, LucideIcon, ChevronDown, ChevronUp } from 'lucide-react';
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
  const expanded = isExpanded(category);

  return (
    <div ref={ref} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
      <div 
        className="glass-card-dark rounded-3xl p-6 md:p-8 hover:shadow-tech-lg transition-all duration-500 border border-cyan-500/30 shadow-tech card-hover code-border cursor-pointer hover:-translate-y-2 hover:scale-[1.02]"
        onClick={() => toggle(category)}
      >
        {/* Clickable Header - Entire area is clickable */}
        <div className="flex items-center gap-4 w-full group">
          <div className="bg-gradient-to-br from-blue-500/30 to-indigo-500/30 p-3 rounded-2xl shadow-md flex-shrink-0 border border-blue-500/30">
            <Icon className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
          </div>
          <h4 className="text-lg md:text-xl font-bold text-gray-100 flex-1">
            {CATEGORY_LABELS[category] || category}
          </h4>
          <span className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 text-xs md:text-sm font-bold px-3.5 py-1.5 rounded-full border border-cyan-500/30 shadow-soft">
            {skills.length}
          </span>
          {/* Expand/Collapse Indicator */}
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300 border border-cyan-500/30 flex-shrink-0">
            {expanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>

        {/* Collapsible Content - Using CSS Grid for instant expansion */}
        <div
          className="grid grid-rows-transition mt-6"
          style={{
            gridTemplateRows: expanded ? '1fr' : '0fr',
          }}
        >
          <div className="overflow-hidden min-h-0">
            <div className="pt-2">
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => {
                  const techIcon = getTechIcon(skill.name);
                  return (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-2.5 rounded-2xl border border-cyan-500/30 shadow-soft hover:shadow-glow hover:scale-105 transition-all duration-300 card-hover"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {techIcon && (
                        <img 
                          src={techIcon} 
                          alt={skill.name} 
                          className="h-5 w-5 object-contain flex-shrink-0" 
                        />
                      )}
                      <span className="text-sm md:text-base font-semibold text-gray-100">{skill.name}</span>
                      {skill.proficiency && (
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${PROFICIENCY_COLORS[skill.proficiency]}`}>
                          {skill.proficiency}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
