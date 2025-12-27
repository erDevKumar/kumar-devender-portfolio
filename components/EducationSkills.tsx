'use client';

import { Education as EducationType, Skill } from '@/types/portfolio';
import { GraduationCap, Code } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useAnimatedGradient } from '@/hooks/useAnimatedGradient';
import { groupBy } from '@/utils/helpers';
import AnimatedBackground from '@/components/AnimatedBackground';
import EducationItem from './EducationItem';
import SkillCategory from './SkillCategory';

interface EducationSkillsProps {
  education: EducationType[];
  skills: Skill[];
}

export default function EducationSkills({ education, skills }: EducationSkillsProps) {
  const { ref } = useScrollAnimation();
  const { time, getGradient } = useAnimatedGradient(160, 10);
  const groupedSkills = groupBy(skills, 'category');

  return (
    <section id="education" ref={ref} className="section-padding relative overflow-hidden">
      <AnimatedBackground time={time} hue={(time * 10 + 240) % 360} />
      <div className="max-w-7xl mx-auto container-padding relative z-10">
        {/* Side by Side Layout - Improved Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Education Column */}
          <div className="space-y-6">
            {/* Mobile Header */}
            <div className="lg:hidden mb-6">
              <h3 className="text-2xl md:text-3xl font-bold gradient-text-tech mb-2 flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-cyan-400" />
                Education
              </h3>
              <p className="text-gray-300">Academic background and qualifications</p>
            </div>
            {/* Desktop Header - Horizontally Aligned */}
            <div className="hidden lg:block mb-8">
              <h3 className="text-2xl md:text-3xl font-bold gradient-text-tech mb-2 flex items-center gap-3">
                <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 p-3 rounded-2xl shadow-glow">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                Education
              </h3>
              <p className="text-gray-300 text-sm">Academic background and qualifications</p>
            </div>
            {education.map((edu, index) => (
              <EducationItem key={index} edu={edu} index={index} />
            ))}
          </div>

          {/* Skills Column */}
          <div id="skills" className="space-y-6">
            {/* Mobile Header */}
            <div className="lg:hidden mb-6">
              <h3 className="text-2xl md:text-3xl font-bold gradient-text-tech mb-2 flex items-center gap-3">
                <Code className="h-6 w-6 text-blue-400" />
                Skills & Technologies
              </h3>
              <p className="text-gray-300">Technical expertise and proficiencies</p>
            </div>
            {/* Desktop Header - Horizontally Aligned */}
            <div className="hidden lg:block mb-8">
              <h3 className="text-2xl md:text-3xl font-bold gradient-text-tech mb-2 flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-3 rounded-2xl shadow-glow">
                  <Code className="h-6 w-6 text-white" />
                </div>
                Skills & Technologies
              </h3>
              <p className="text-gray-300 text-sm">Technical expertise and proficiencies</p>
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

