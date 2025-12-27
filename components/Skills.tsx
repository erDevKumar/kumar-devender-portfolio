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
    <section id="skills" ref={ref} className="section-padding relative overflow-hidden" style={{ background: getGradient(160, 200, 140) }}>
      <AnimatedBackground time={time} hue={(time * 10 + 160) % 360} />
      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 flex items-center justify-center gap-4">
            <div className="bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-500 p-4 rounded-3xl shadow-2xl">
              <Code className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto text-balance">Technical expertise and proficiencies</p>
        </div>
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
            <SkillCategory key={category} category={category} skills={categorySkills} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

