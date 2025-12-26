'use client';

import { Skill } from '@/types/portfolio';
import { Code } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useAnimatedGradient } from '@/hooks/useAnimatedGradient';
import { groupBy } from '@/utils/helpers';
import AnimatedBackground from '@/components/AnimatedBackground';
import SkillCategory from './SkillCategory';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const { ref, isVisible } = useScrollAnimation();
  const { time, getGradient } = useAnimatedGradient(160, 10);
  const groupedSkills = groupBy(skills, 'category');

  return (
    <section id="skills" ref={ref} className="py-16 relative overflow-hidden" style={{ background: getGradient(160, 200, 140) }}>
      <AnimatedBackground time={time} hue={(time * 10 + 160) % 360} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`mb-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-2 rounded-2xl shadow-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            Skills & Technologies
          </h2>
        </div>
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <SkillCategory key={category} category={category} skills={categorySkills} />
          ))}
        </div>
      </div>
    </section>
  );
}

