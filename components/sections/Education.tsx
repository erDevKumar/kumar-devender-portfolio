'use client';

import { Education as EducationType } from '@/types/portfolio';
import { GraduationCap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useAnimatedGradient } from '@/hooks/useAnimatedGradient';
import AnimatedBackground from '../common/AnimatedBackground';
import EducationItem from './EducationItem';

interface EducationProps {
  education: EducationType[];
}

export default function Education({ education }: EducationProps) {
  const { ref, isVisible } = useScrollAnimation();
  const { time, getGradient } = useAnimatedGradient(160, 10);

  return (
    <section id="education" ref={ref} className="py-16 relative overflow-hidden" style={{ background: getGradient(160, 200, 140) }}>
      <AnimatedBackground time={time} hue={(time * 10 + 160) % 360} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`mb-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-2xl shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            Education
          </h2>
        </div>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <EducationItem key={index} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}

