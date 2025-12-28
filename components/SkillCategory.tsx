'use client';

import { Skill } from '@/types/portfolio';
import { Code, Users, Globe, Wrench, LucideIcon, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useExpandable } from '@/hooks/useExpandable';
import { CATEGORY_LABELS } from '@/utils/constants';
import { getTechIcon } from '@/utils/helpers';
import { useItemScrollAnimation } from '@/hooks/useItemScrollAnimation';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  technical: Code,
  soft: Users,
  language: Globe,
  tool: Wrench,
};

const CATEGORY_COLORS: Record<string, { gradient: string; icon: string; border: string; badge: string }> = {
  technical: {
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    icon: 'text-blue-400',
    border: 'border-blue-500/30',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  soft: {
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    icon: 'text-purple-400',
    border: 'border-purple-500/30',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  language: {
    gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    icon: 'text-green-400',
    border: 'border-green-500/30',
    badge: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  tool: {
    gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
    icon: 'text-orange-400',
    border: 'border-orange-500/30',
    badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  },
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
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.technical;

  return (
    <div ref={ref} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
      <div 
        className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
        onClick={() => toggle(category)}
      >
        {/* Gradient Accent Bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
          category === 'technical' ? 'from-blue-500 via-cyan-500 to-teal-500' :
          category === 'soft' ? 'from-purple-500 via-pink-500 to-rose-500' :
          category === 'language' ? 'from-green-500 via-emerald-500 to-teal-500' :
          'from-orange-500 via-amber-500 to-yellow-500'
        }`}></div>
        
        {/* Content */}
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 w-full">
            {/* Icon */}
            <div className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${colors.gradient} border ${colors.border} group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`h-6 w-6 ${colors.icon}`} />
            </div>

            {/* Title and Count */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                {CATEGORY_LABELS[category] || category}
              </h4>
              <p className="text-sm text-gray-400">
                {skills.length} {skills.length === 1 ? 'skill' : 'skills'}
              </p>
            </div>

            {/* Badge and Expand Indicator */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`px-3 py-1.5 rounded-lg text-sm font-bold ${colors.badge} border flex items-center gap-1.5`}>
                <Sparkles className="h-3.5 w-3.5" />
                <span>{skills.length}</span>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-700/50 text-gray-300 group-hover:bg-blue-500/20 group-hover:text-blue-400 group-hover:border-blue-500/50 border border-gray-600/50 transition-all duration-200">
                {expanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </div>
          </div>

          {/* Collapsible Content */}
          <div
            className="grid grid-rows-transition mt-6"
            style={{
              gridTemplateRows: expanded ? '1fr' : '0fr',
            }}
          >
            <div className="overflow-hidden min-h-0">
              <div className="pt-6 border-t border-gray-700/50">
                <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                  {skills.map((skill, idx) => {
                    const techIcon = getTechIcon(skill.name);
                    return (
                      <div 
                        key={idx} 
                        className="group/skill flex items-start gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-700/50 border border-gray-600/50 flex items-center justify-center group-hover/skill:scale-110 transition-transform duration-200 mt-0.5">
                          {techIcon ? (
                            <img 
                              src={techIcon} 
                              alt={skill.name} 
                              className="h-5 w-5 object-contain" 
                            />
                          ) : (
                            <Icon className={`h-5 w-5 ${colors.icon}`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <span className="text-sm font-semibold text-white group-hover/skill:text-blue-400 transition-colors" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
