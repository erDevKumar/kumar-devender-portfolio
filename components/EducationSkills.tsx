'use client';

import { Education as EducationType, Skill } from '@/types/portfolio';
import { GraduationCap, Code, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { groupBy } from '@/utils/helpers';
import EducationItem from './EducationItem';
import SkillCategory from './SkillCategory';

interface EducationSkillsProps {
  education: EducationType[];
  skills: Skill[];
}

export default function EducationSkills({ education, skills }: EducationSkillsProps) {
  const { ref } = useScrollAnimation();
  const groupedSkills = groupBy(skills, 'category');

  return (
    <section id="education" ref={ref} className="section-padding bg-[#111827] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        {/* Enhanced Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Education & Skills
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Academic background and technical expertise
          </p>
        </div>

        {/* Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Education Column */}
          <div className="space-y-6">
            <div className="mb-8 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                <GraduationCap className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                Education
              </h3>
              <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{education.length}</span>
              </span>
            </div>
            {education.map((edu, index) => (
              <EducationItem key={index} edu={edu} index={index} />
            ))}
          </div>

          {/* Skills Column */}
          <div id="skills" className="space-y-6">
            <div className="mb-8 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                <img src="/icons/ic_skills.svg" alt="Skills" className="h-6 w-6" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(96%) saturate(1234%) hue-rotate(199deg) brightness(101%) contrast(101%)' }} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                Skills & Technologies
              </h3>
              <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
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
