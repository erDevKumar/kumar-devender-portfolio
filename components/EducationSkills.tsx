'use client';

import { Education as EducationType, Skill } from '@/types/portfolio';
import { GraduationCap, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { groupBy, ICON_FILTER_STYLE } from '@/utils/helpers';
import EducationItem from './EducationItem';
import SkillCategory from './SkillCategory';
import SectionBackground from './SectionBackground';

interface EducationSkillsProps {
  education: EducationType[];
  skills: Skill[];
}

export default function EducationSkills({ education, skills }: EducationSkillsProps) {
  const { ref } = useScrollAnimation();
  const groupedSkills = groupBy(skills, 'category');

  return (
    <section id="education" ref={ref} className="section-padding bg-[#111827] relative overflow-hidden">
      <SectionBackground color1="bg-purple-500" color2="bg-indigo-500" opacity={5} />

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        {/* Enhanced Section Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4 px-4">
            Education & Skills
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Academic background and technical expertise
          </p>
        </div>

        {/* Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Education Column */}
          <div className="space-y-4 sm:space-y-6">
            <div className="mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Education
              </h3>
              <span className="px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>{education.length}</span>
              </span>
            </div>
            {education.map((edu, index) => (
              <EducationItem key={index} edu={edu} index={index} />
            ))}
          </div>

          {/* Skills Column */}
          <div id="skills" className="space-y-4 sm:space-y-6">
            <div className="mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                <img src="/icons/ic_skills.svg" alt="Skills" className="h-5 w-5 sm:h-6 sm:w-6" style={{ filter: ICON_FILTER_STYLE }} />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Skills & Technologies
              </h3>
              <span className="px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>{skills.length}</span>
              </span>
            </div>
            {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
              <SkillCategory key={category} category={category} skills={categorySkills} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
